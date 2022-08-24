import * as Sentry from "@sentry/node";
import iron from "@hapi/iron";
import { Employee } from "../../models/employee.model";
import { Admin } from "../../models/admin.model";

const secretToken = process.env.SECRET_TOKEN;

export const valdiateForgotPasswordToken = async (token: string) => {
    try {
        if (!token) {
            return {
                error: true,
                message: "Token is required!"
            };
        }
        const decoded = await iron.unseal(token, secretToken, iron.defaults);
        if (decoded.role == "employee" || decoded.role == "hod") {
            const employee = await Employee.findOne({
                employeeId: decoded.id
            });
            if (!employee) {
                return {
                    error: true,
                    message: "Invalid token"
                };
            }
            if (employee.resetPasswordToken != token) {
                return {
                    error: true,
                    message: "Invalid token"
                };
            }
            if (employee.resetPasswordExpires < new Date()) {
                return {
                    error: true,
                    message: "Token expired"
                };
            }
            return {
                error: false,
                message: "Token is valid",
                data: employee
            };
        }
        else if (decoded.role == "admin") {
            const admin = await Admin.findOne({
                employeeId: decoded.id
            });
            if (!admin) {
                return {
                    error: true,
                    message: "Invalid token"
                };
            }
            if (admin.resetPasswordToken != token) {
                return {
                    error: true,
                    message: "Invalid token"
                };
            }
            if (admin.resetPasswordExpires < new Date()) {
                return {
                    error: true,
                    message: "Token expired"
                };
            }
            return {
                error: false,
                message: "Token is valid",
                data: admin
            };
        }
        else {
            return {
                error: true,
                message: "Invalid token!"
            };
        }

    }
    catch (err) {
        Sentry.captureException(err);
        await Sentry.flush(2000);
        return {
            error: true,
            message: JSON.stringify({
                error: err.message
            })
        };
    }
};
