import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as Sentry from "@sentry/node";
import { sentryInit } from "../src/config/sentry.config";
import { connect } from "../src/config/db.config";
import { AssignDocumentInput } from "../src/types/types";
import { verifyToken } from "../src/utils/verifyToken";
import { assignDocument } from "../src/controller/Admin/assignDocument";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const HEADERS = { "Content-Type": "application/json" };
    sentryInit();
    connect();
    try {
        // Check for Token in Headers
        const authToken = req.headers.authorization;
        if (!authToken) {
            context.res = {
                status: 401,
                body: {
                    message: "No authorization token provided!"
                },
                headers: HEADERS
            };
            return;
        }
        const unsealedToken = await verifyToken(authToken, "admin");
        if (unsealedToken.error) {
            context.res = {
                status: 401,
                body: {
                    message: "Unauthorized!"
                },
                headers: HEADERS
            };
            return;
        }
        const body = req.body as AssignDocumentInput;
        const document = await assignDocument(body);
        if (document.error) {
            context.res = {
                status: 400,
                body: {
                    message: document.message
                },
                headers: HEADERS
            };
            return;
        }
        context.res = {
            status: 200,
            body: {
                message: "Document assigned successfully",
                data: document.data
            }
        };
    }
    catch (err) {
        Sentry.captureException(err);
        await Sentry.flush(2000);
        context.res = {
            status: 500,
            body: {
                message: err.message
            },
            headers: HEADERS
        };
    }
};

export default httpTrigger;