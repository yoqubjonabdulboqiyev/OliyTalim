import { ErrorCode } from "../../../constant/errorCode";
import { BaseError } from "../../../reporter/baseError";




export class newsError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.NEWS, "news not found", data)
    }

    static AlreadyExsist(data : any = null){
        return new BaseError(ErrorCode.NEWS+1, "news already exsist", data)
    }

    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.NEWS + 2, 'Not enough permissions to access!', data);
      }
}