import { Role } from "../../../common/constant/role";
import { RoleError } from "../../../common/db/model/admin/role/role.error";
import { roleService } from "../../../common/service/admin/role/role.servise";
import { RoleDto } from "../../../common/validation/dto/admin/role/role.dto";
import { PagingDto } from "../../../common/validation/dto/pagingDto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";



export async function getPagingRoleHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.ROLE);

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const role = await roleService.getPaging(data)
        const count = await roleService.getCount();

        const result = {
            data: role,
            ...count
        }

        return res.send(RoleError.Success(result))
    } catch (e) {
        return next(e)
    }
}

export async function createRoleHandler(req: any, res: any, next: Function) {
    try {
        // await roleService.hasAccess(req.roleId, Role.ROLE)
        console.log(req.body)
        const data = await validateIt(req.body, RoleDto, DtoGroups.CREATE);
        console.log("data : ", data)
        const role = await roleService.create(data);

        return res.send(RoleError.Success(role._id))
    } catch (e) {
        return next(e);
    }
}

export async function updateRoleHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.ROLE)
        const data = await validateIt(req.body, RoleDto, DtoGroups.UPDATE)
        console.log(req.roleId.toString())
        console.log(data._id)
        if (req.roleId.toString() != data._id) throw RoleError.NotEnoughPermission()
        const changeRole = await roleService.update(data._id, data)

        return res.send(RoleError.Success(changeRole))
    } catch (e) {
        return next(e)
    }
}

export async function deleteRoleHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.ROLE)
        const data = await validateIt(req.params, RoleDto, DtoGroups.DELETE)
        const role = await roleService.findByIdError(data._id)
        const deleteRole = await roleService.deleteOne(role._id)
        return res.send(RoleError.Success(deleteRole._id))
    } catch (e) {
        return next(e);
    }
}

export async function getRoleByIdHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, RoleDto, DtoGroups.GET_BY_ID)

        const role = await roleService.findByIdError(data._id)

        return res.send(RoleError.Success(role))
    } catch (e) {
        return next(e)
    }
}