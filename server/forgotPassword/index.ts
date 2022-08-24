import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as Sentry from "@sentry/node";
import { connect } from "../src/config/db.config";
import { sentryInit } from "../src/config/sentry.config";
import { valdiateForgotPasswordToken } from "../src/controller/ForgotPassword/validateForgotPassword";
import { changePassword } from "../src/controller/ForgotPassword/changePassword";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const HEADERS = { "Content-Type": "application/json" };
    sentryInit();
    connect();
    try {
        const token = req.query.token;
        const newPassword = req.query.newPassword;
        if (!token || !newPassword) {
            context.res = {
                status: 400,
                body: {
                    message: "Missing required parameters!"
                },
                headers: HEADERS
            };
            return;
        }
        const { error, message, data } = await valdiateForgotPasswordToken(token);
        if (error) {
            context.res = {
                status: 400,
                body: {
                    message: message
                },
                headers: HEADERS
            };
            return;
        }
        const { error: error2, message: message2, data: newUser } = await changePassword(newPassword, data);
        if (error2) {
            context.res = {
                status: 400,
                body: {
                    message: message2
                },
                headers: HEADERS
            };
            return;
        }
        context.res = {
            status: 200,
            body: {
                message: message2
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
        }
    }
};

export default httpTrigger;