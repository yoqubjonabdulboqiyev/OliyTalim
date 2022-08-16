import { ErrorCode } from "../../../constant/errorCode";
import { BaseError } from "../../../reporter/baseError";


export class userError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.USER, "user not found", data)
    }

    static AlreadyExsist(data : any = null){
        return new BaseError(ErrorCode.USER+1, "user already exsist", data)
    }

    static InvalidPassword(data: any = null) {
        return new BaseError(ErrorCode.USER + 2, 'Invalid password', data);
      }

      static InvalidToken(data: any = null) {
        return new BaseError(ErrorCode.EMPLOYEE + 4, "Invalid Token!", data);
    }

}