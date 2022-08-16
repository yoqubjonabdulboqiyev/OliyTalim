import { ErrorCode } from "../../../constant/errorCode";
import { BaseError } from "../../../reporter/baseError";


export class subjectError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.SUBJECT, "subject not found", data)
    }

    static AlreadyExsist(data : any = null){
        return new BaseError(ErrorCode.SUBJECT+1, "subject already exsist", data)
    }

    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.SUBJECT + 2, 'Not enough permissions to access!', data);
      }
}