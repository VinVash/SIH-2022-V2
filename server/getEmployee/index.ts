import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as Sentry from "@sentry/node";
import { connect } from "../src/config/db.config";
import { sentryInit } from "../src/config/sentry.config";
import { getEmployee } from "../src/controller/Admin/getEmployee";
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
        const unsealedToken = await verifyToken(authToken, "employee", "hod", "admin");
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
        const employeeId = req.query.employeeId;
        const department = req.query.department;
        const result = await getEmployee(employeeId, department);
        if (result.error) {
            context.res = {
                status: 400,
                body: {
                    message: result.message
                },
                headers: HEADERS
            };
            return;
        }
        context.res = {
            status: 200,
            body: result,
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