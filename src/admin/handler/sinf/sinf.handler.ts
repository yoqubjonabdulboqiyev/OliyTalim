import { Role } from "../../../common/constant/role";
import { sinfError } from "../../../common/db/model/sinf/error";
import { roleService } from "../../../common/service/admin/role/role.servise";
import { sinfService } from "../../../common/service/sinf/sinf.service";
import { PagingDto } from "../../../common/validation/dto/pagingDto";
import { sinfDto } from "../../../common/validation/dto/sinf/sinfDto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";


export async function getSinfPagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SINF)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const sinf = await sinfService.getPaging(data)
        return res.send(sinfError.Success(sinf))
    } catch (e) {
        return next(e)
    }
}


export async function createSinfHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SINF)
        const data = await validateIt(req.body, sinfDto, DtoGroups.CREATE)
        const sinf = await sinfService.createSinf(data);

        return res.send(sinfError.Success(sinf))

    } catch (e) {
        return next(e)
    }
}

export async function updateSinfHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SINF)

        const data = await validateIt(req.body, sinfDto, DtoGroups.UPDATE);
        const sinf = await sinfService.findByIds(data._id);
        if (!sinf) throw sinfError.NotFound(data._id);
        const updateSinf = await sinfService.updateSinf(data._id, data);
        return res.send(sinfError.Success(updateSinf))

    } catch (e) {
        return next(e)
    }
}

export async function deleteSinfHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SINF)
        const data = await validateIt(req.params, sinfDto, DtoGroups.DELETE);
        console.log(data)
        const sinf = await sinfService.findByIds(data._id);
        if (!sinf) throw sinfError.NotFound(data._id);
        const deleteSinf = await sinfService.deleteSinf(data._id);
        console.log(deleteSinf)
        return res.send(sinfError.Success(deleteSinf))

    } catch (e) {
        return next(e)
    }
}

export async function getByIdSinfHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SINF)
        const data = await validateIt(req.params, sinfDto, DtoGroups.GET_BY_ID);
        const sinf = await sinfService.findByIds(data._id);
        if (!sinf) throw sinfError.NotFound(data._id);
        const getSinf = await sinfService.getById(data._id);
        return res.send(sinfError.Success(getSinf))

    } catch (e) {
        return next(e)
    }
}