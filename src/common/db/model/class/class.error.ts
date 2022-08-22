import { ErrorCode } from "../../../constant/errorCode";
import { BaseError } from "../../../reporter/base.error";


export class ClassError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.CLASS, "class not found", data)
    }

    static AlreadyExsist(data : any = null){
        return new BaseError(ErrorCode.CLASS+1, "class already exsist", data)
    }

    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.CLASS + 2, 'Not enough permissions to access!', data);
      }
}