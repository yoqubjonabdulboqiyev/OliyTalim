import { ErrorCode } from "../../../../constant/errorCode";
import { BaseError } from "../../../../reporter/base.error";



export class SolveTestError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.SOLVETEST, "solveTest not found", data)
    }

    static PendingTest(data : any = null){
        return new BaseError(ErrorCode.SOLVETEST+1, "pending test", data)
    }

    static Finishtest(data: any = null) {
        return new BaseError(ErrorCode.SOLVETEST + 2, 'finish test!', data);
      }
}