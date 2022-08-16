import { ErrorCode } from "../../../../constant/errorCode";
import { BaseError } from "../../../../reporter/baseError";



export class savolError extends BaseError{
      static TestNotStarted(data: any = null) {
        return new BaseError(ErrorCode.SAVOL, 'Test not satrted!', data);
      }
}