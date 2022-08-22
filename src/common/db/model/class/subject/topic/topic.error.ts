import { ErrorCode } from "../../../../../constant/errorCode";
import { BaseError } from "../../../../../reporter/base.error";



export class TopicError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.TOPIC, "topic not found", data)
    }

    static AlreadyExsist(data : any = null){
        return new BaseError(ErrorCode.TOPIC+1, "topic already exsist", data)
    }

    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.TOPIC + 2, 'topic enough permissions to access!', data);
      }
}