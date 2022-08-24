import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../src/config/db.config";
import { sentryInit } from "../src/config/sentry.config";
import * as Sentry from "@sentry/node";
import { LoginInput } from "../src/types/types";
import { Login } from "../src/controller/Login/login";

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
        const body = req.body as LoginInput;
        const login = await Login(body);
        if (login.error) {
            context.res = {
                status: 400,
                body: {
                    message: login.message
                },
                headers: HEADERS
            };
            return;
        }
        context.res = {
            status: 200,
            body: {
                message: "Login successful",
                data: login.data,
                token: login.token
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