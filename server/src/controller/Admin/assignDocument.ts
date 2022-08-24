import * as Sentry from "@sentry/node";
import { Admin } from "../../models/admin.model";
import { Document } from "../../models/document.model";
import { Employee } from "../../models/employee.model";
import axios from "axios";
import { AssignDocumentInput } from "../../types/types";

export const assignDocument = async (body: AssignDocumentInput) => {
    try {
        if (!body) {
            return {
                error: true,
                message: "No data provided"
            };
        }
        // Get the document
        const document = await Document.findOne({ documentId: body.documentId });
        if (!document) {
            return {
                error: true,
                message: "Document does not exist"
            };
        }
        // Check if employee exists
        const employee = await Employee.findOne({ employeeId: body.employeeToAssign, department: body.department });
        if (!employee) {
            return {
                error: true,
                message: "Employee to assign does not exist"
            };
        }
        // Check if employee is already assigned to the document
        if (document.permissions.includes(employee.employeeId)) {
            return {
                error: true,
                message: "Employee is already assigned to the document"
            };
        }
        // Mark the status as Approved for admin
        document.status.pop();
        document.status.push("Approved");

        //  Update the time retuned
        document.time_returned.push(new Date());

        // Assign the employee to the document
        document.permissions.push(employee.employeeId);
        document.time_recieved.push(new Date());
        document.status.push("Pending");

        // Get the roomId associated with this document
        const getConversationResponse = await axios.get(process.env.CHAT_SERVER_URL + "/conversation?documentId=" + document.documentId);
        if (getConversationResponse.status !== 200) {
            return {
                error: true,
                message: "Error getting conversation"
            };
        }
        const conversation = getConversationResponse.data.data;

        // Add the employee to the room
        const headers = { "Authorization": "Bearer " + process.env.CHAT_SERVER_TOKEN };
        const joinRoomRequest = {
            roomId: conversation._id,
            employeeId: employee.employeeId,
            name: employee.firstName + " " + employee.lastName,
        };
        const joinRoomResponse = await axios.post(process.env.CHAT_SERVER_URL + "/joinRoom", joinRoomRequest, {
            headers: headers
        });
        if (joinRoomResponse.status !== 200) {
            return {
                error: true,
                message: "Error adding employee to room"
            };
        }
        // Save the document
        await document.save();
        return {
            error: false,
            message: "Document assigned successfully",
            data: {
                employeeAssignedId: employee.employeeId,
                employeeAssignedName: employee.firstName + " " + employee.lastName,
            }
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