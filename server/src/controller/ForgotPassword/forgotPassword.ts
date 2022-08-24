import * as Sentry from "@sentry/node";
import { Employee } from "../../models/employee.model";
import { Admin } from "../../models/admin.model";
import { createToken } from "../../utils/createToken";
import { sendForgotPassowrdEmail } from "../../utils/forgotPasswordMail";

export const forgotPasswordSendEmail = async (email: string) => {
    try {
        if (!email) {
            return {
                error: true,
                message: "Email is required!"
            };
        }
        const employee = await Employee.findOne({ personal_email: email });
        const admin = await Admin.findOne({ personal_email: email });
        if (!employee && !admin) {
            return {
                error: true,
                message: "User with that email not found!"
            };
        }
        if (employee) {
            const token = await createToken({
                id: employee.employeeId,
                role: employee.role
            });
            if (token.error) {
                return {
                    error: true,
                    message: token.message
                };
            }
            employee.resetPasswordToken = token.message;
            employee.resetPasswordExpires = new Date(Date.now() + 60 * 1000 * 15);
            await employee.save();

            const sendEmail = await sendForgotPassowrdEmail(token.message, employee.profile.firstName, employee.personal_email);
            if (sendEmail.error) {
                return {
                    error: true,
                    message: sendEmail.message
                };
            }
            return {
                error: false,
                message: "Reset password email sent successfully!"
            };
        }
        else if (admin) {
            const token = await createToken({
                id: admin.employeeId,
                role: "admin"
            });
            if (token.error) {
                return {
                    error: true,
                    message: token.message
                };
            }
            admin.resetPasswordToken = token.message;
            admin.resetPasswordExpires = new Date(Date.now() + 60 * 1000 * 15);
            await admin.save();

            const sendEmail = await sendForgotPassowrdEmail(token.message, admin.profile.firstName, admin.personal_email);
            if (sendEmail.error) {
                return {
                    error: true,
                    message: sendEmail.message
                };
            }
            return {
                error: false,
                message: "Reset password email sent successfully!"
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