import * as Sentry from "@sentry/node";
import { Admin } from "../../models/admin.model";
import { Employee } from "../../models/employee.model";
import { Document } from "../../models/document.model";
import axios from "axios";
import { ForwardToAdminInput } from "../../types/types";

export const forwardToAdmin = async (body: ForwardToAdminInput) => {
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
        // Get the admin for the given department
        const admin = await Admin.findOne({ department: body.department });
        if (!admin) {
            return {
                error: true,
                message: "Admin not found"
            };
        }
        // Check if admin is already assigned to the document
        if (document.permissions.includes(admin.employeeId)) {
            return {
                error: true,
                message: "Admin is already assigned to the document"
            };
        }
        // Mark the status as Approved from the employee
        document.status.pop();
        document.status.push("Approved");
        // Update the time retuned
        document.time_returned.push(new Date());

        // Assign the admin to the document
        document.permissions.push(admin.employeeId);
        document.time_recieved.push(new Date());
        document.status.push("Pending");

        // Get the roomId associated with this document
        const getConversationResponse = await axios.get(process.env.CHAT_SERVER_URL + "/conversation?documentId=" + document.documentId);

        const conversation = getConversationResponse.data.data;

        // Add the admin to the room
        const headers = { "Authorization": "Bearer " + process.env.CHAT_SERVER_TOKEN };
        const joinRoomRequest = {
            roomId: conversation._id,
            employeeId: admin.employeeId,
            name: admin.firstName + " " + admin.lastName,
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
            message: "Document forwarded successfully",
            data: {
                employeeAssignedId: admin.employeeId,
                employeeAssignedName: admin.firstName + " " + admin.lastName,
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