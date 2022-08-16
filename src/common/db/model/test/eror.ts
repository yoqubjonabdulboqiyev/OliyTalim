import { ErrorCode } from "../../../constant/errorCode";
import { BaseError } from "../../../reporter/baseError";


export class testError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.TEST, "test not found", data)
    }

    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.TEST+ 2, 'Not enough permissions to access!', data);
      }
}