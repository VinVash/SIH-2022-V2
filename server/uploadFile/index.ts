import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as multipart from "parse-multipart";
import * as Sentry from "@sentry/node";
import { connect } from "../src/config/db.config";
import { sentryInit } from "../src/config/sentry.config";
import { verifyToken } from "../src/utils/verifyToken";

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
        const unsealedToken = await verifyToken(authToken, "employee", "hod");
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
        if (!req.headers["content-type"] && !req.headers["content-type"].includes("multipart/form-data")) {
            context.res = {
                status: 400,
                body: {
                    message: "Content type must be multipart/form-data"
                },
                headers: HEADERS
            };
            return;
        }
        if (!req.query?.filename) {
            context.res = {
                status: 400,
                body: {
                    message: "filename is not defined"
                },
                headers: HEADERS
            };
            return;
        }
        if (!req.body || !req.body.length) {
            context.res = {
                status: 400,
                body: {
                    message: "File should be present in the request body"
                },
                headers: HEADERS
            };
            return;
        }
        // Each chunk of the file is delimited by a special string
        const bodyBuffer = Buffer.from(req.body);
        const boundary = multipart.getBoundary(req.headers["content-type"]);
        const parts = multipart.Parse(bodyBuffer, boundary);
        // The file buffer is corrupted or incomplete ?
        if (!parts?.length) {
            context.res = {
                status: 400,
                body: {
                    message: "File buffer is incorrect"
                },
                headers: HEADERS
            };
            return;
        }
        // Passed to Storage
        context.bindings.storage = parts[0]?.data;
        const url = `${process.env.StorageUrl}/documents/${req.query.filename}`;
        context.res = {
            status: 200,
            body: {
                message: "File uploaded successfully",
                url: url
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