import { Role } from "../../../../common/constant/role"
import { savolError } from "../../../../common/db/model/test/savollar/error"
import { roleService } from "../../../../common/service/admin/role/role.servise"
import { savolService } from "../../../../common/service/test/savol/savol.service"
import { PagingDto } from "../../../../common/validation/dto/pagingDto"
import { savolDto } from "../../../../common/validation/dto/test/savol/savol.Dto"
import { DtoGroups } from "../../../../common/validation/dtoGroups"
import { validateIt } from "../../../../common/validation/validate"



export async function getSavolPagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SAVOL)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const savol = await savolService.getPaging(data)
        return res.send(savolError.Success(savol))
    } catch (e) {
        return next(e)
    }
}


export async function createSavolHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SAVOL)
        const data = await validateIt(req.body, savolDto, DtoGroups.CREATE)
        const savol = await savolService.createSavol(data);

        return res.send(savolError.Success(savol))

    } catch (e) {
        return next(e)
    }
}

export async function updateSavolHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SAVOL)

        const data = await validateIt(req.body, savolDto, DtoGroups.UPDATE);
        const savol = await savolService.findByIds(data._id);
        if (!savol) throw savolError.NotFound(data._id);
        const updatesavol = await savolService.updateSavol(data._id, data);
        return res.send(savolError.Success(updatesavol))

    } catch (e) {
        return next(e)
    }
}

export async function deleteSavolHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SAVOL)
        const data = await validateIt(req.params, savolDto, DtoGroups.DELETE);
        const savol = await savolService.findByIds(data._id);
        if (!savol) throw savolError.NotFound(data._id);
        const deletesavol = await savolService.deleteSavol(data._id);
        return res.send(savolError.Success(deletesavol))

    } catch (e) {
        return next(e)
    }
}

export async function getByIdSavolHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SAVOL)
        const data = await validateIt(req.params, savolDto, DtoGroups.GET_BY_ID);
        const savol = await savolService.findByIds(data._id);
        if (!savol) throw savolError.NotFound(data._id);
        const getsavol = await savolService.getById(data._id);
        return res.send(savolError.Success(getsavol))

    } catch (e) {
        return next(e)
    }
}