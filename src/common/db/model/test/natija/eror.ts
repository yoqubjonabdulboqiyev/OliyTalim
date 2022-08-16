import { ErrorCode } from "../../../../constant/errorCode";
import { BaseError } from "../../../../reporter/baseError";



export class natijaError extends BaseError {
   static NotStart(data: any = null) {
      return new BaseError(ErrorCode.NATIJA + 1, "test boshlanmagan!", data)
   }

   static NotPermission(data: any = null) {
      return new BaseError(ErrorCode.NATIJA + 2, "Testni tugatmay turib boshqa test ishlay olmaysiz!", data)
   }

   static NotFinished(data: any = null) {
      return new BaseError(ErrorCode.NATIJA + 3, "test tugatilmagan, testni tugatmay qaytadan ishlay olmaysiz!", data)
   }
   static finish(data: any = null) {
      return new BaseError(ErrorCode.NATIJA + 4, "sizga berilgan vaqt tugadi!", data)
   }

}