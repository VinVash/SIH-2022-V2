import mongoose from "mongoose";

export type Document = mongoose.Document & {
    documentId: string;
    id: number;
    subject: string;
    description: string;
    employeeId: string;
    main_file: string[];
    reference_files: string[];
    permissions: string[];
    status: string[];
    time_recieved: Date[];
    time_returned: Date[];
    rejection_reason: string;
    category: string;
}

const DocumentSchema = new mongoose.Schema<Document>(
    {
        documentId: { type: String, required: true },
        id: { type: Number, required: true },
        subject: { type: String, required: true },
        description: String,
        employeeId: { type: String, required: true },
        main_file: { type: [String], required: true },
        reference_files: [String],
        permissions: [String],
        status: [String],
        time_recieved: [Date],
        time_returned: [Date],
        rejection_reason: String,
        category: { type: String, required: true }
    }
);

export const Document = mongoose.model<Document>("Document", DocumentSchema);