import { Role } from "../../../common/constant/role";
import { ClassError } from "../../../common/db/model/class/class.error";
import { roleService } from "../../../common/service/admin/role/role.service";
import { classService } from "../../../common/service/class/class.service";
import { PagingDto } from "../../../common/validation/dto/pagingDto";
import { classDto } from "../../../common/validation/dto/class/class.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";


export async function getClassPagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.CLASS)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const Class = await classService.getPaging(data)
        return res.send(ClassError.Success(Class))
    } catch (e) {
        return next(e)
    }
}


export async function createClassHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.CLASS)
        const data = await validateIt(req.body, classDto, DtoGroups.CREATE)
        const Class = await classService.createClass(data);

        return res.send(ClassError.Success(Class))

    } catch (e) {
        return next(e)
    }
}

export async function updateClassHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.CLASS)

        const data = await validateIt(req.body, classDto, DtoGroups.UPDATE);
        await classService.ClassFindById(data._id);
        const updateClass = await classService.updateClass(data._id, data);
        return res.send(ClassError.Success(updateClass))

    } catch (e) {
        return next(e)
    }
}

export async function deleteClassHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.CLASS)
        const data = await validateIt(req.params, classDto, DtoGroups.DELETE);
        await classService.ClassFindById(data._id);
        const deleteClass = await classService.deleteClass(data._id);
        return res.send(ClassError.Success(deleteClass))

    } catch (e) {
        return next(e)
    }
}

export async function getByIdClassHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.CLASS)
        const data = await validateIt(req.params, classDto, DtoGroups.GET_BY_ID);
        await classService.ClassFindById(data._id);
        const getClass = await classService.getById(data._id);
        return res.send(ClassError.Success(getClass))

    } catch (e) {
        return next(e)
    }
}