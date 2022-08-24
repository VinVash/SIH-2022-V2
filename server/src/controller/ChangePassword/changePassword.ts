import * as Sentry from "@sentry/node";
import { Employee, EmployeeDocument } from "../../models/employee.model";
import { Admin, AdminDocument } from "../../models/admin.model";

export const changePassword = async (newPassword: string, oldPassword: string, employeeId: string, role: string) => {
    try {
        if (!newPassword || !oldPassword) {
            return {
                error: true,
                message: "New password and Old Password is required!"
            };
        }
        let userModel: EmployeeDocument | AdminDocument;
        if (role == "admin") {
            userModel = await Admin.findOne({ employeeId: employeeId });
        }
        else if (role == "employee" || role == "hod") {
            userModel = await Employee.findOne({ employeeId: employeeId });
        }
        // check if old password is correct
        const isMatch = await userModel.comparePassword(oldPassword);
        if (!isMatch) {
            return {
                error: true,
                message: "Old password is incorrect!"
            };
        }
        userModel.password = newPassword;
        userModel.resetPasswordToken = null;
        userModel.resetPasswordExpires = null;
        await userModel.save();
        return {
            error: false,
            message: "Password changed successfully!",
            data: userModel
        };
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