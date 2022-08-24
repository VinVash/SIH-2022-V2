import * as Sentry from "@sentry/node";
import { Document } from "../../models/document.model";
import { Employee } from "../../models/employee.model";

export const getRejectedDocuments = async (employeeId: string) => {
    try {
        if (!employeeId) {
            return {
                error: true,
                message: "Employee Id is required!"
            };
        }
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return {
                error: true,
                message: "Employee not found!"
            };
        }
        const documents = await Document.find({ permissions: employeeId });
        if (!documents) {
            return {
                error: false,
                message: "No documents found!"
            };
        }
        let yourRejectedDocuments: Document[] = [];
        for (let document of documents) {
            const index = document.permissions.indexOf(employeeId);
            const yourStatus = document.status[index];
            if (yourStatus == "Rejected") {
                yourRejectedDocuments.push(document);
            }
        }
        return {
            error: false,
            message: "Documents found!",
            data: yourRejectedDocuments
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