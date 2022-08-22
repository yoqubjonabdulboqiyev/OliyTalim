import { ErrorCode } from "../../../../constant/errorCode";
import { BaseError } from "../../../../reporter/base.error";



export class QuestionError extends BaseError{
      static TestNotStarted(data: any = null) {
        return new BaseError(ErrorCode.QUESTION, 'Test not satrted!', data);
      }
}