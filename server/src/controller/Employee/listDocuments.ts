import { Document } from "../../models/document.model";
import { Employee } from "../../models/employee.model";
import * as Sentry from "@sentry/node";

export const listDocuments = async (employeeId: string) => {
    try {
        if (!employeeId) {
            return {
                error: true,
                message: "Employee ID is required!"
            }
        }
        // Check if Employee exists
        const employee = await Employee.findOne({ employeeId: employeeId });
        if (!employee) {
            return {
                error: true,
                message: "Employee does not exist!"
            }
        }
        // Get all Documents for Employee
        const documents = await Document.find({ employeeId: employeeId });
        if (!documents) {
            return {
                error: true,
                message: "No Documents found!"
            }
        }
        return {
            error: false,
            message: "Documents found!",
            data: documents
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