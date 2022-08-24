import { Employee } from "../../models/employee.model";
import * as Sentry from "@sentry/node";
import { CreateEmployeeInput } from "../../types/types";
import { genPassword } from "../../utils/genPassword";
import { sendCredentialEmail } from "../../utils/mailer";

export const createEmployee = async (body: CreateEmployeeInput) => {
    try {
        if (!body) {
            return {
                error: true,
                message: "Body cannot be empty"
            };
        }
        // Check if any employee exists with this personal email
        const checkIfExists = await Employee.findOne({ personal_email: body.personalEmail });
        if (checkIfExists) {
            return {
                error: true,
                message: "Employee with that email already exists"
            };
        }
        let employeeSNo;
        const noOfDocuments = await Employee.countDocuments();
        if (noOfDocuments == 0) {
            employeeSNo = 1;
        }
        else {
            // get last document from employee database
            const employeeList = await Employee.find({}).sort({ "id": -1 });
            const lastEmployee = employeeList[0];
            if (!lastEmployee) {
                employeeSNo = 1;
            }
            else {
                const lastEmployeeId = lastEmployee.employeeId;
                const Sno = lastEmployeeId.split("E")[1];
                employeeSNo = parseInt(Sno) + 1;
            }
        }

        // generate password
        const password = genPassword();

        const employee = new Employee();
        employee.id = employeeSNo;
        employee.firstName = body.firstName;
        employee.lastName = body.lastName;
        employee.employeeId = "E" + employeeSNo.toString();
        employee.personal_email = body.personalEmail;
        employee.contactNo = body.contactNo;
        employee.gender = body.gender;
        employee.dob = body.dob;
        employee.addr_line1 = body.addr_line1;
        employee.addr_line2 = body.addr_line2;
        employee.city = body.city;
        employee.state = body.state;
        employee.office_branch = body.office_branch;
        employee.department = body.department.toLowerCase();
        employee.email = employee.employeeId + "." + body.department.toLowerCase() + "@gmail.com";
        employee.password = password;
        employee.profile.firstName = body.firstName;
        employee.profile.lastName = body.lastName;
        employee.profile.employeeId = employee.employeeId;
        employee.profile.contactNo = body.contactNo;
        employee.profile.email = employee.email;
        employee.profile.gender = body.gender;
        employee.profile.dob = body.dob;
        employee.profile.addr_line1 = body.addr_line1;
        employee.profile.addr_line2 = body.addr_line2;
        employee.profile.city = body.city;
        employee.profile.state = body.state;
        employee.profile.office_branch = body.office_branch;
        employee.profile.department = body.department.toLowerCase();
        employee.profile.role = "employee";
        // Send email to user about his Login Credentials
        const credentailMail = await sendCredentialEmail(body.personalEmail, employee.employeeId, password);
        if (credentailMail.error) {
            return {
                error: true,
                message: credentailMail.message
            };
        }

        await employee.save();
        return {
            error: false,
            message: "Employee created successfully"
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