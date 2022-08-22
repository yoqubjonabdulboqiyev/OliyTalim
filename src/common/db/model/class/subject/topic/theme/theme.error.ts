import { ErrorCode } from "../../../../../../constant/errorCode";
import { BaseError } from "../../../../../../reporter/base.error";



export class ThemeError extends BaseError{
    static NotFound(data : any = null){
       return new BaseError(ErrorCode.THEME, "theme not found", data)
    }

    static AlreadyExsist(data : any = null){
        return new BaseError(ErrorCode.THEME+1, "theme already exsist", data)
    }

    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCode.THEME + 2, 'Not enough permissions to access!', data);
      }
}