import * as Sentry from "@sentry/node";
import { Admin, AdminDocument } from "../../models/admin.model";
import { Document } from "../../models/document.model";
import { Employee, EmployeeDocument } from "../../models/employee.model";

export const getPendingDocuments = async (employeeId: string, role: string) => {
    try {
        if (!employeeId || !role) {
            return {
                error: true,
                message: "Employee Id and Role are required!"
            };
        }
        let employee: EmployeeDocument | AdminDocument;
        if (role === "admin") {
            employee = await Admin.findOne({ employeeId });
        }
        else if (role === "employee" || role === "hod") {
            employee = await Employee.findOne({ employeeId });
        }
        else {
            return {
                error: true,
                message: "Invalid role!"
            };
        }
        if (!employee) {
            return {
                error: true,
                message: "Employee not found!"
            };
        }
        const documents = await Document.find({ permissions: employeeId });
        if (!documents) {
            return {
                error: true,
                message: "No documents found!"
            };
        }
        console.log(documents);
        let yourPendingDocuments: Document[] = [];
        for (let document of documents) {
            const index = document.permissions.indexOf(employeeId);
            const yourStatus = document.status[index];
            if (yourStatus == "Pending") {
                yourPendingDocuments.push(document);
            }
        }
        return {
            error: false,
            message: "Documents found!",
            data: yourPendingDocuments
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