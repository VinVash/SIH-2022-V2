import { Document } from "../../models/document.model";
import { Employee } from "../../models/employee.model";
import * as Sentry from "@sentry/node";
import { Admin } from "../../models/admin.model";

interface TrackStatusInterface {
    employeeName: string,
    employeeId: string,
    employeeDepartment: string,
    time_received: Date,
    time_returned?: Date | string,
    status: string,
    time_elapsed: number,
    rejection_reason?: string
}

export const trackStatus = async (documentId: string, employeeId: string) => {
    try {
        if (!documentId) {
            return {
                error: true,
                message: "No document id provided"
            };
        }
        console.log(documentId);
        const document = await Document.findOne({ documentId: documentId });
        if (!document) {
            return {
                error: true,
                message: "Document does not exist"
            };
        }
        // Check if employee exists
        const employee = await Employee.findOne({ employeeId: employeeId });
        const creator = await Employee.findOne({ employeeId: document.employeeId });
        if (!employee) {
            return {
                error: true,
                message: "Employee does not exist"
            };
        }
        // Check if employee is the creator of the document or if he is a HOD of the department
        if ((document.employeeId !== employeeId) && (employee.role !== "hod" || creator.department !== employee.department)) {
            return {
                error: true,
                message: "Employee is not the creator of the document or is not a HOD of the department"
            };
        }

        // Response of Track Status -> Timeline 
        // 1. Employee Name, Code and Department
        // 2. Status of docuement (Pending, Approved, Rejected)
        // 3. Time of document recived
        // 4. Time of document approved/rejected
        // 5. Time elapsed since recived to approved/rejected or till now(if pending)
        // 6. Reason for rejection
        let response: TrackStatusInterface[] = [];
        for (let i = 0; i < document.permissions.length; i++) {
            const employeeId = document.permissions[i];
            let assignedEmployee;
            if (employeeId[0] === "E") {
                assignedEmployee = await Employee.findOne({ employeeId: employeeId });
            }
            else {
                assignedEmployee = await Admin.findOne({ employeeId: employeeId });
            }
            const employeeName = assignedEmployee.firstName + " " + assignedEmployee.lastName;
            const employeeDepartment = assignedEmployee.department;
            const time_received = document.time_recieved[i];
            const status = document.status[i];
            let time_elapsed: number = 0;
            let time_returned: Date | string = "";
            if (status === "Pending") {
                const today = new Date();
                time_elapsed = today.getTime() - time_received.getTime();
            }
            else {
                const timeReturned = document.time_returned[i];
                time_elapsed = timeReturned.getTime() - time_received.getTime();
                time_returned = timeReturned;
            }
            const rejection_reason = status === "Rejected" ? document.rejection_reason : "";
            response.push({
                employeeName,
                employeeId,
                employeeDepartment,
                time_received,
                time_returned,
                time_elapsed,
                status,
                rejection_reason
            });
        }
        return {
            error: false,
            data: response
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