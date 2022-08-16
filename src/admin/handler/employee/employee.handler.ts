import { EmployeeError } from "../../../common/db/model/admin/employee/error";
import { Role } from "../../../common/constant/role";
import { employeeService } from "../../../common/service/admin/employeeService/employee";
import { roleService } from "../../../common/service/admin/role/role.servise";
import { PagingDto } from "../../../common/validation/dto/pagingDto";
import { BaseDto, DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";
import { EmployeeDto } from "../../../common/validation/dto/admin/employee/employee.dto";
import shrift from "sha256";
import { jwt } from "../../../common/utils/jwt";

export async function getPagingEmployeeHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.EMPLOYEE);
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        console.log(data)
        const employees = await employeeService.getPaging(data);
        const count = await employeeService.getCount();


        const result = {
            data: employees,
            ...count
        }

        return res.send(EmployeeError.Success(result));
    }
    catch (e) {
        return next(e);
    }
}


export async function getEmployeeByIdHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.EMPLOYEE);

        const data = await validateIt(req.params, BaseDto, DtoGroups.GET_BY_ID);
        const employee = await employeeService.getEmployeeById(data._id);
        return res.send(EmployeeError.Success(employee))
    } catch (e) {
        return next(e)
    }
}


export async function createEmployeeHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Role.EMPLOYEE);

        const data = await validateIt(req.body, EmployeeDto, DtoGroups.CREATE);
        data.password = shrift(data.password)
        const employee = await employeeService.create(data)
        return res.send(EmployeeError.Success(employee._id))
    } catch (e) {
        return next(e);
    }
}

export async function updateEmployeeHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.EMPLOYEE);
        req.body.phoneNumber = req.employeePhoneNummber;
        const data = await validateIt(req.body, EmployeeDto, DtoGroups.UPDATE)
        if (data.password) {
            data.password = shrift(data.password)
        }
        const employee = await employeeService.findById(data._id)
        if (!employee) throw EmployeeError.NotFound();


        const updateEmployee = await employeeService.update(data._id, data)
        return res.send(EmployeeError.Success(updateEmployee))
    } catch (e) {
        return next(e)
    }
}

export async function deleteEmployeeHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.EMPLOYEE);
        const data = await validateIt(req.params, EmployeeDto, DtoGroups.DELETE);

        const employee = await employeeService.getEmployeeById(data._id);
        console.log(employee)
        const deleteEmployee = await employeeService.deleteOne(employee._id)

        return res.send(EmployeeError.Success(deleteEmployee))



    } catch (e) {
        return next(e)
    }
}

export async function signInHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, EmployeeDto, DtoGroups.LOGIN);
        const employee = await employeeService.findByPhoneNumber(data.phoneNumber);
        if (shrift(data.password) != employee.password) throw EmployeeError.InvalidPassword();

        const token = await jwt.sign({ phoneNumber: employee.phoneNumber })

        return res.send(EmployeeError.Success({
            token,
            employee: {
                _id: employee._id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                phoneNumber: employee.phoneNumber
            }
        }));
    }
    catch (e) {
        return next(e);
    }
}