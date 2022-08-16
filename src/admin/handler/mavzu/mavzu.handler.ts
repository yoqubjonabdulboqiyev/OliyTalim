import { Role } from "../../../common/constant/role";
import { mavzuError } from "../../../common/db/model/mavzu/error";
import { roleService } from "../../../common/service/admin/role/role.servise";
import { mavzuService } from "../../../common/service/mavzu/mavzu.service";
import { mavzuDto } from "../../../common/validation/dto/mavzu/mavzu.dto";
import { PagingDto } from "../../../common/validation/dto/pagingDto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";


export async function getMavzuPagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.MAVZU)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const mavzu = await mavzuService.getPaging(data)
        return res.send(mavzuError.Success(mavzu))
    } catch (e) {
        return next(e)
    }
}


export async function createMavzuHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.MAVZU)
        const data = await validateIt(req.body, mavzuDto, DtoGroups.CREATE)
        const mavzu = await mavzuService.createMavzu(data);

        return res.send(mavzuError.Success(mavzu))

    } catch (e) {
        return next(e)
    }
}

export async function updateMavzuHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.MAVZU)

        const data = await validateIt(req.body, mavzuDto, DtoGroups.UPDATE);
        const mavzu = await mavzuService.findByIds(data._id);
        if (!mavzu) throw mavzuError.NotFound(data._id);
        const updatemavzu = await mavzuService.updateMavzu(data._id, data);
        return res.send(mavzuError.Success(updatemavzu))

    } catch (e) {
        return next(e)
    }
}

export async function deleteMavzuHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.MAVZU)
        const data = await validateIt(req.params, mavzuDto, DtoGroups.DELETE);
        const mavzu = await mavzuService.findByIds(data._id);
        if (!mavzu) throw mavzuError.NotFound(data._id);
        const deleteMavzu = await mavzuService.deleteMavzu(data._id);
        return res.send(mavzuError.Success(deleteMavzu))

    } catch (e) {
        return next(e)
    }
}

export async function getByIdMavzuHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.MAVZU)
        const data = await validateIt(req.params, mavzuDto, DtoGroups.GET_BY_ID);
        const mavzu = await mavzuService.findByIds(data._id);
        if (!mavzu) throw mavzuError.NotFound(data._id);
        const getmavzu = await mavzuService.getById(data._id);
        return res.send(mavzuError.Success(getmavzu))

    } catch (e) {
        return next(e)
    }
}