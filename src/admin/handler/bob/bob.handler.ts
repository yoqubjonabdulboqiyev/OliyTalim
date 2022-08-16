import { Role } from "../../../common/constant/role";
import { bobError } from "../../../common/db/model/bob/error";
import { roleService } from "../../../common/service/admin/role/role.servise";
import { bobService } from "../../../common/service/bob/bob.service";
import { bobDto } from "../../../common/validation/dto/bob/bobDto";
import { PagingDto } from "../../../common/validation/dto/pagingDto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";


export async function getBobPagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.BOB)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const bob = await bobService.getPaging(data)
        return res.send(bobError.Success(bob))
    } catch (e) {
        return next(e)
    }
}


export async function createBobHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.BOB)
        const data = await validateIt(req.body, bobDto, DtoGroups.CREATE)
        const bob = await bobService.createBob(data);

        return res.send(bobError.Success(bob))

    } catch (e) {
        return next(e)
    }
}

export async function updateBobHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.BOB)

        const data = await validateIt(req.body, bobDto, DtoGroups.UPDATE);
        const bob = await bobService.findByIds(data._id);
        if (!bob) throw bobError.NotFound(data._id);
        const updatebob = await bobService.updateBob(data._id, data);
        return res.send(bobError.Success(updatebob))

    } catch (e) {
        return next(e)
    }
}

export async function deleteBobHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.BOB)
        const data = await validateIt(req.params, bobDto, DtoGroups.DELETE);
        const bob = await bobService.findByIds(data._id);
        if (!bob) throw bobError.NotFound(data._id);
        const deleteBob = await bobService.deleteBob(data._id);
        return res.send(bobError.Success(deleteBob))

    } catch (e) {
        return next(e)
    }
}

export async function getByIdBobHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.BOB)
        const data = await validateIt(req.params, bobDto, DtoGroups.GET_BY_ID);
        const bob = await bobService.findByIds(data._id);
        if (!bob) throw bobError.NotFound(data._id);
        const getBob = await bobService.getById(data._id);
        return res.send(bobError.Success(getBob))

    } catch (e) {
        return next(e)
    }
}