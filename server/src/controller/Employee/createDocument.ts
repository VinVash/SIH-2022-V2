import { Document } from "../../models/document.model";
import * as Sentry from "@sentry/node";
import { CreateDocumentInput } from "../../types/types";
import { Admin } from "../../models/admin.model";
import axios from "axios";
import { Employee } from "../../models/employee.model";
const Document_Count = 0;

async function getEmployee(employeeId: string) {
    try {
        const employee = await Employee.findOne({ employeeId });
        return employee;
    }
    catch (err) {
        Sentry.captureException(err);
        await Sentry.flush(2000);
        return null;
    }
}

export const createDocument = async (body: CreateDocumentInput) => {
    try {
        if (!body) {
            return {
                error: true,
                message: "No data provided"
            };
        }
        // Check if employee exists
        const employee = await getEmployee(body.employeeId);
        if (!employee) {
            return {
                error: true,
                message: "Employee does not exist"
            };
        }
        // Find admin of the forwarding department
        const admin = await Admin.findOne({ department: body.forwarding_dept });
        if (!admin) {
            return {
                error: true,
                message: "Admin not found"
            };
        }
        const docNo = await getDocumentCount();
        if (docNo.error) {
            return {
                error: true,
                message: docNo.message
            };
        }
        const document = new Document();
        document.documentId = docNo.message;
        document.id = parseInt(docNo.message.split("D")[1]);
        document.employeeId = body.employeeId;
        document.subject = body.subject;
        document.description = body.description;
        document.main_file = body.main_file;
        if (body.reference_file) {
            document.reference_files = body.reference_file;
        }
        document.permissions.push(admin.employeeId);
        document.status.push("Pending");
        document.time_recieved.push(new Date());
        document.category = body.category;
        // TODO:
        // Now we need to create a Room for this document and add the employee and admin to it
        // Send request to chat server :
        // 1. Create a conversation (POST request /createRoom)
        const headers = { "Authorization": "Bearer " + process.env.CHAT_SERVER_TOKEN };
        const createRoomReuqest = {
            conversationName: document.documentId,
            documentId: document.documentId,
        };
        const createRoomResponse = await axios.post(process.env.CHAT_SERVER_URL + "/createRoom", createRoomReuqest, {
            headers: headers
        });
        if (createRoomResponse.status !== 200) {
            return {
                error: true,
                message: "Error creating room"
            };
        }
        // 2. Add the employee and admin to the conversation (POST request /joinrRoom)
        const joinRoomRequest = {
            roomId: createRoomResponse.data.data._id,
            employeeId: document.employeeId,
            name: employee.firstName + " " + employee.lastName,
        };
        const joinRoomResponse = await axios.post(process.env.CHAT_SERVER_URL + "/joinRoom", joinRoomRequest, { headers: headers });
        if (joinRoomResponse.status !== 200) {
            return {
                error: true,
                message: "Error joining room"
            };
        }
        // 3. Add the admin to the conversation (POST request /joinrRoom)
        const joinRoomRequest2 = {
            roomId: createRoomResponse.data.data._id,
            employeeId: admin.employeeId,
            name: admin.firstName + " " + admin.lastName,
        };
        const joinRoomResponse2 = await axios.post(process.env.CHAT_SERVER_URL + "/joinRoom", joinRoomRequest2, { headers: headers });
        if (joinRoomResponse2.status !== 200) {
            return {
                error: true,
                message: "Error joining room"
            };
        }

        await document.save();

        return {
            error: false,
            message: "Document created successfully",
            data: {
                roomId: createRoomResponse.data.data._id,
                assignedEmployeeName: admin.firstName + " " + admin.lastName,
                ...document.toObject()
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

async function getDocumentCount() {
    try {
        let DocumentNo = 0;
        const noOfDocuments = await Document.countDocuments();
        if (noOfDocuments == 0) {
            DocumentNo = 1;
            const docNo = "D" + DocumentNo.toString();
            return {
                error: false,
                message: docNo
            };
        }
        else {
            // get last document from database
            const docuemntList = await Document.find({}).sort({ "id": -1 });
            const lastDocument = docuemntList[0];
            if (!lastDocument) {
                DocumentNo = 1;
                const docNo = "D" + DocumentNo.toString();
                return {
                    error: false,
                    message: docNo
                };
            }
            else {
                const lastDocumentId = lastDocument.documentId;
                const Sno = lastDocumentId.split("D")[1];
                DocumentNo = parseInt(Sno) + 1;
                const docNo = "D" + DocumentNo.toString();
                return {
                    error: false,
                    message: docNo
                };
            }
        }
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