import { ErrorCode } from "../../../../constant/errorCode";
import { BaseError } from "../../../../reporter/baseError";




export class EmployeeError extends BaseError {
    static AllreadyExsist(data: any = null) {
        return new EmployeeError(ErrorCode.EMPLOYEE, 'Employee exsist!', data);
    }

    static NotFound(data: any = null) {
        return new EmployeeError(ErrorCode.EMPLOYEE + 1, 'Employee not found', data);
    }

    static NotEnoughPermission(data: any = null) {
        return new EmployeeError(ErrorCode.EMPLOYEE + 2, 'Not enough permissions to access!', data);
    }

    static InvalidPassword(data: any = null) {
        return new EmployeeError(ErrorCode.EMPLOYEE + 3, 'Invalid password!', data);
    }

    static InvalidToken(data: any = null) {
        return new EmployeeError(ErrorCode.EMPLOYEE + 4, "Invalid Token!", data);
    }
}