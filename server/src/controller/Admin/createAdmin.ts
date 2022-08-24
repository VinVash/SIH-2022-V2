import { Admin } from "../../models/admin.model";
import * as Sentry from "@sentry/node";
import { CreateAdminInput } from "../../types/types";
import { genPassword } from "../../utils/genPassword";
import { sendCredentialEmail } from "../../utils/mailer";

export const createAdmin = async (body: CreateAdminInput) => {
    try {
        if (!body) {
            return {
                error: true,
                message: "Body cannot be empty"
            };
        }
        let employeeSNo: number;
        // get last employee docuement from the database
        const noOfDocuments = await Admin.countDocuments();
        if (noOfDocuments == 0) {
            employeeSNo = 1;
        }
        else {
            const lastEmployee = await Admin.findOne({}).sort({ "id": -1 });
            if (!lastEmployee) {
                employeeSNo = 1;
            }
            else {
                const lastEmployeeId = lastEmployee.employeeId;
                const Sno = lastEmployeeId.split("A")[1];
                employeeSNo = parseInt(Sno) + 1;
            }
        }
        const admin = new Admin();
        admin.id = employeeSNo
        admin.firstName = body.firstName;
        admin.lastName = body.lastName;
        admin.employeeId = "A" + employeeSNo.toString();
        admin.personal_email = body.personalEmail;
        admin.contactNo = body.contactNo;
        admin.gender = body.gender;
        admin.dob = body.dob;
        admin.addr_line1 = body.addr_line1;
        admin.addr_line2 = body.addr_line2;
        admin.city = body.city;
        admin.state = body.state;
        admin.office_branch = body.office_branch;
        admin.email = "admin." + body.department.toLowerCase() + "@gmail.com";
        admin.department = body.department.toLowerCase();
        admin.password = genPassword();
        admin.profile.firstName = body.firstName;
        admin.profile.lastName = body.lastName;
        admin.profile.employeeId = admin.employeeId;
        admin.profile.contactNo = body.contactNo;
        admin.profile.gender = body.gender;
        admin.profile.dob = body.dob;
        admin.profile.addr_line1 = body.addr_line1;
        admin.profile.addr_line2 = body.addr_line2;
        admin.profile.city = body.city;
        admin.profile.state = body.state;
        admin.profile.office_branch = body.office_branch;
        admin.profile.email = "admin." + body.department.toLowerCase() + "@gmail.com";
        admin.profile.department = body.department.toLowerCase();
        admin.profile.role = "admin";

        // Send email to user about his Login Credentials
        const credentailMail = await sendCredentialEmail(body.personalEmail, admin.employeeId, admin.password);
        if (credentailMail.error) {
            return {
                error: true,
                message: credentailMail.message
            };
        }

        await admin.save();
        return {
            error: false,
            message: "Admin created successfully"
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
