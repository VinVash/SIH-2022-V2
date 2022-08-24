import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../src/config/db.config";
import { sentryInit } from "../src/config/sentry.config";
import * as Sentry from "@sentry/node";
import { CreateAdminInput } from "../src/types/types";
import { createAdmin } from "../src/controller/Admin/createAdmin";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const HEADERS = { "Content-Type": "application/json" };
    sentryInit();
    connect();
    try {
        if (!req.body) {
            context.res = {
                status: 400,
                body: {
                    message: "Body cannot be empty"
                },
                headers: HEADERS
            };
            return;
        }
        const body = req.body as CreateAdminInput;
        const admin = await createAdmin(body);
        if (admin.error) {
            context.res = {
                status: 400,
                body: {
                    message: admin.message
                },
                headers: HEADERS
            };
            return;
        }
        context.res = {
            status: 200,
            body: {
                message: "Admin created successfully"
            },
            headers: HEADERS
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