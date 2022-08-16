import { ErrorCode } from "../../../../constant/errorCode";
import { BaseError } from "../../../../reporter/baseError";

export class RoleError extends BaseError {
    static NotFound(data: any = null) {
      return new BaseError(ErrorCode.ROLE, 'Role not found', data);
    }
    static AlreadyExists(data: any = null) {
      return new BaseError(ErrorCode.ROLE + 1, 'The role already exists!', data);
    }
    static RoleOfAdmins(data: any = null) {
      return new BaseError(ErrorCode.ROLE + 2, 'There are appropriate admins for this role!!!', data);
    }
  
    static NotEnoughPermission(data: any = null) {
      return new BaseError(ErrorCode.ROLE + 3, 'Not enough permissions to access!', data);
    }
  
  }