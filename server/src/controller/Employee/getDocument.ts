import * as Sentry from "@sentry/node";
import { Document } from "../../models/document.model";
import { Employee, EmployeeDocument } from "../../models/employee.model";
import { Admin, AdminDocument } from "../../models/admin.model";
export const getDocument = async (documentId: string, employeeId: string, role: string) => {
    try {
        if (!documentId || !employeeId || !role) {
            return {
                error: true,
                message: "Document Id and Employee Id and Role is required!"
            };
        }
        let userModel: EmployeeDocument | AdminDocument;
        if (role == "admin") {
            userModel = await Admin.findOne({ employeeId: employeeId });
        }
        else if (role == "employee" || role == "hod") {
            userModel = await Employee.findOne({ employeeId: employeeId });
        }
        else {
            return {
                error: true,
                message: "Invalid role!"
            };
        }
        if (!userModel) {
            return {
                error: true,
                message: "User not found!"
            };
        }
        // Check if employee has permission to view the document
        // $or: [{ permissions: employeeId }, { employeeId: employeeId }];
        const document = await Document.findOne({ documentId: documentId, $or: [{ permissions: employeeId }, { employeeId: employeeId }] });
        if (!document) {
            return {
                error: true,
                message: "You do not have permission to view this document!"
            };
        }
        return {
            error: false,
            message: "Document found!",
            data: document
        };
    }
    catch (err) {
        Sentry.captureException(err);
        await Sentry.flush(2000);
        return {
            error: true,
            message: err.message
        };
    }
}