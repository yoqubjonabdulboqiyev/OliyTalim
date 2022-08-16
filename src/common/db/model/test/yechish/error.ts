import { ErrorCode } from "../../../../constant/errorCode";
import { BaseError } from "../../../../reporter/baseError";



export class yechishError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.YECHISH, "yechish not found", data)
    }

    static PendingTest(data : any = null){
        return new BaseError(ErrorCode.YECHISH+1, "pending test", data)
    }

    static Finishtest(data: any = null) {
        return new BaseError(ErrorCode.YECHISH + 2, 'finish test!', data);
      }
}