import * as Sentry from "@sentry/node";
import { Admin } from "../../models/admin.model";
import { Employee } from "../../models/employee.model";
import { UpdateProfileInput } from "../../types/types";

export const updateProfile = async (body: UpdateProfileInput) => {
    try {
        if (!body || !body.role || !body.employeeId) {
            return {
                error: true,
                message: "Role and Employee Id is required!"
            };
        }
        if (body.role == "admin") {
            const admin = await Admin.findOne({ employeeId: body.employeeId });
            if (!admin) {
                return {
                    error: true,
                    message: "Admin not found!"
                };
            }
            if (body.firstName) {
                admin.firstName = body.firstName;
                admin.profile.firstName = body.firstName;
            }
            if (body.lastName) {
                admin.lastName = body.lastName;
                admin.profile.lastName = body.lastName;
            }
            if (body.gender) {
                admin.gender = body.gender;
                admin.profile.gender = body.gender;
            }
            if (body.dob) {
                admin.dob = body.dob;
                admin.profile.dob = body.dob;
            }
            if (body.personal_email) {
                admin.personal_email = body.personal_email;
            }
            if (body.contactNo) {
                admin.contactNo = body.contactNo;
                admin.profile.contactNo = body.contactNo;
            }
            if (body.addr_line1) {
                admin.addr_line1 = body.addr_line1;
                admin.profile.addr_line1 = body.addr_line1;
            }
            if (body.addr_line2) {
                admin.addr_line2 = body.addr_line2;
                admin.profile.addr_line2 = body.addr_line2;
            }
            if (body.city) {
                admin.city = body.city;
                admin.profile.city = body.city;
            }
            if (body.state) {
                admin.state = body.state;
                admin.profile.state = body.state;
            }
            if (body.picture) {
                admin.profile.picture = body.picture;
            }
            await admin.save();
            return {
                error: false,
                message: "Profile updated successfully!",
                data: admin.profile
            };
        }
        else if (body.role == "employee" || body.role == "hod") {
            const employee = await Employee.findOne({ employeeId: body.employeeId });
            if (!employee) {
                return {
                    error: true,
                    message: "Employee not found!"
                };
            }
            if (body.firstName) {
                employee.firstName = body.firstName;
                employee.profile.firstName = body.firstName;
            }
            if (body.lastName) {
                employee.lastName = body.lastName;
                employee.profile.lastName = body.lastName;
            }
            if (body.gender) {
                employee.gender = body.gender;
                employee.profile.gender = body.gender;
            }
            if (body.dob) {
                employee.dob = body.dob;
                employee.profile.dob = body.dob;
            }
            if (body.personal_email) {
                employee.personal_email = body.personal_email;
            }
            if (body.contactNo) {
                employee.contactNo = body.contactNo;
                employee.profile.contactNo = body.contactNo;
            }
            if (body.addr_line1) {
                employee.addr_line1 = body.addr_line1;
                employee.profile.addr_line1 = body.addr_line1;
            }
            if (body.addr_line2) {
                employee.addr_line2 = body.addr_line2;
                employee.profile.addr_line2 = body.addr_line2;
            }
            if (body.city) {
                employee.city = body.city;
                employee.profile.city = body.city;
            }
            if (body.state) {
                employee.state = body.state;
                employee.profile.state = body.state;
            }
            if (body.picture) {
                employee.profile.picture = body.picture;
            }
            await employee.save();
            return {
                error: false,
                message: "Profile updated successfully!",
                data: employee.profile
            };
        }
        else {
            return {
                error: true,
                message: "Invalid role!"
            };
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