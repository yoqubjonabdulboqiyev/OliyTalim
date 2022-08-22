import { ErrorCode } from "../../../../constant/errorCode";
import { BaseError } from "../../../../reporter/base.error";



export class ResultError extends BaseError {
   static NotStart(data: any = null) {
      return new BaseError(ErrorCode.RESULT + 1, "test not started!", data)
   }

   static NotPermission(data: any = null) {
      return new BaseError(ErrorCode.RESULT + 2, "Your previous Test is not finished yet", data)
   }

   static NotFinished(data: any = null) {
      return new BaseError(ErrorCode.RESULT + 3, "test not finished!", data)
   }
   static finish(data: any = null) {
      return new BaseError(ErrorCode.RESULT + 4, "Time is out. Your test is finished!", data)
   }

}