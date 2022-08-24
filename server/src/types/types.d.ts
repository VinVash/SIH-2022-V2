import { IsArray, IsDateString, IsString } from "class-validator";

export class CreateIronToken {
    @IsString()
    id: string
    @IsString()
    role: string
}

export class LoginInput {
    @IsString()
    employeeId: string
    @IsString()
    password: string
    @IsString()
    role: string
}

export class CreateAdminInput {
    @IsString()
    firstName: string
    @IsString()
    lastName: string
    @IsString()
    personalEmail: string
    @IsString()
    contactNo: string
    @IsString()
    gender: string
    @IsDate()
    dob: Date
    @IsString()
    addr_line1: string;
    @IsString()
    addr_line2: string;
    @IsString()
    city: string;
    @IsString()
    state: string;
    @IsString()
    office_branch: string;
    @IsString()
    department: string;
}

export class CreateEmployeeInput extends CreateAdminInput { };

export class CreateDocumentInput {
    @IsString()
    employeeId: string
    @IsString()
    employee_name: string;
    @IsString()
    subject: string
    @IsString()
    description: string
    @IsArray()
    main_file: string[]
    @IsArray()
    reference_file: string[]
    @IsString()
    forwarding_dept: string
    @IsString()
    category: string
}

export class AssignDocumentInput {
    @IsString()
    adminId: string
    @IsString()
    department: string
    @IsString()
    documentId: string
    @IsString()
    employeeToAssign: string // employeeId of the employee to assign
}

export class ForwardToAdminInput {
    @IsString()
    employeeId: string
    @IsString()
    department: string
    @IsString()
    documentId: string
}

export class RejectDocumentInput {
    @IsString()
    employeeId: string
    @IsString()
    documentId: string
    @IsString()
    reason: string
}

export class UpdateProfileInput {
    @IsString()
    employeeId: string
    @IsString()
    firstName?: string
    @IsString()
    lastName?: string
    @IsString()
    gender?: string
    @IsDate()
    dob?: Date
    @IsString()
    personal_email?: string
    @IsString()
    contactNo?: string
    @IsString()
    addr_line1?: string
    @IsString()
    addr_line2?: string
    @IsString()
    city?: string
    @IsString()
    state?: string
    @IsString()
    picture?: string
    @IsString()
    role: string
}