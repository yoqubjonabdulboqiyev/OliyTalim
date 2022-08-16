import { ErrorCode } from "../../../constant/errorCode";
import { BaseError } from "../../../reporter/baseError";



export class bobError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.BOB, "Bob not found", data)
    }

    static AlreadyExsist(data : any = null){
        return new BaseError(ErrorCode.BOB+1, "Bob already exsist", data)
    }

    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.BOB + 2, 'Not enough permissions to access!', data);
      }
}