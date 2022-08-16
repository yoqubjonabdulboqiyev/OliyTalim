import { ErrorCode } from "../../../constant/errorCode";
import { BaseError } from "../../../reporter/baseError";



export class mavzuError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.MAVZU, "mavzu not found", data)
    }

    static AlreadyExsist(data : any = null){
        return new BaseError(ErrorCode.MAVZU+1, "mavzu already exsist", data)
    }

    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.MAVZU + 2, 'Not enough permissions to access!', data);
      }
}