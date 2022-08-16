import { ErrorCode } from "../../../constant/errorCode";
import { BaseError } from "../../../reporter/baseError";


export class sinfError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.SINF, "sinf not found", data)
    }

    static AlreadyExsist(data : any = null){
        return new BaseError(ErrorCode.SINF+1, "sinf already exsist", data)
    }

    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.SINF + 2, 'Not enough permissions to access!', data);
      }
}