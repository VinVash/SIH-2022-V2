import * as Sentry from "@sentry/node";
import { Employee } from "../../models/employee.model";
import { Document } from "../../models/document.model";
import axios from "axios";
import { RejectDocumentInput } from "../../types/types";

export const rejectDocument = async (body: RejectDocumentInput) => {
    try {
        if (!body) {
            return {
                error: true,
                message: "No data provided"
            };
        }
        const document = await Document.findOne({ documentId: body.documentId });
        if (!document) {
            return {
                error: true,
                message: "Document does not exist"
            };
        }
        const employee = await Employee.findOne({ employeeId: body.employeeId });
        if (!employee) {
            return {
                error: true,
                message: "Employee does not exist"
            };
        }
        if (!document.permissions.includes(employee.employeeId)) {
            return {
                error: true,
                message: "Employee is not assigned to the document"
            };
        }
        // Update the status of the document
        document.status.pop();
        document.status.push("Rejected");
        // Update the time returned
        document.time_returned.push(new Date());
        // Add the reason for rejection in the document
        document.rejection_reason = body.reason;
        await document.save();
        return {
            error: false,
            message: "Document rejected successfully"
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
};