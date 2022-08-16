import { EmployeeError } from "../../common/db/model/admin/employee/error";
import { employeeService } from "../../common/service/admin/employeeService/employee";
import { jwt } from "../../common/utils/jwt";




export async function auth(req, res, next){
    try{
        const {phoneNumber} = jwt.verify(req.headers.token)
        const user = await employeeService.findByPhoneNumber(phoneNumber)
        if(user.phoneNumber!=phoneNumber) throw  EmployeeError.InvalidToken()
        req.roleId = user.roleId;
        req.employeePhoneNumber = phoneNumber;
        return next(); 
        
    } catch(e){
        throw e;
    }
}