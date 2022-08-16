import { ErrorCode } from "../constant/errorCode";



export class BaseError{
    constructor(
        public code : number,
        public message : string,
        public data : any,
        public success : boolean =false,
        public statusCode : number = 400,
        public time = new Date()  
    ){ }
    public static UnknownError(data?: any) {
        return new BaseError(ErrorCode.BASE, 'Uncnown error!', data)
    }

    public static ValidationError(data? : any){
        return new BaseError(ErrorCode.BASE+1, "Validator Error!", data);
    }

    public static Success(data : any = null){
        return new BaseError(0, 'Ok', data, true, 200)
    }

    public static UnAuthorizationError(data : any = null){
        return new BaseError(401, 'Session expired!', data, false, 401)
    }

    public static NotFound(data: any = null) {
        return new BaseError(404, 'Not found!', data, false, 404)
      }
    
      public static PositionError(data: any = null) {
        return new BaseError(400, 'Position error!', data);
      } 
}