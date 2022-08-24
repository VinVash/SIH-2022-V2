import * as Sentry from "@sentry/node";
import { Document } from "../../models/document.model";
import { Employee } from "../../models/employee.model";

export const getApprovedDocuments = async (employeeId: string) => {
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
                error: true,
                message: "No documents found!"
            };
        }
        let yourApprovedDocuments: Document[] = [];
        for (let document of documents) {
            const index = document.permissions.indexOf(employeeId);
            const yourStatus = document.status[index];
            if (yourStatus == "Approved") {
                yourApprovedDocuments.push(document);
            }
        }
        return {
            error: false,
            message: "Documents found!",
            data: yourApprovedDocuments
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