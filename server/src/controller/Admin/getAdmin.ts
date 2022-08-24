import { Admin } from "../../models/admin.model";
import * as Sentry from "@sentry/node";

export const getAdmin = async (employeeId: string, department: string) => {
    try {
        if (!employeeId && !department) {
            return {
                error: true,
                message: "No employee id or department provided"
            }
        }
        if (employeeId) {
            const employee = await Admin.findOne({ employeeId: employeeId });
            // Return only the profiles of the employees
            if (!employee) {
                return {
                    error: true,
                    message: "Employee does not exist"
                }
            }
            return {
                error: false,
                message: "Employee exists",
                employee: employee.profile
            }
        }
        else if (department) {
            const employees = await Admin.find({ department: department });
            if (!employees) {
                return {
                    error: true,
                    message: "No employees in this department"
                }
            }
            // return the profiles of the employees
            const response = employees.map(employee => {
                return employee.profile
            });

            return {
                error: false,
                message: "Employees in this department",
                employees: response
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