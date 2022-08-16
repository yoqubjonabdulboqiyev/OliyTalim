import { mavzuError } from "../../../common/db/model/mavzu/error";
import { mavzuService } from "../../../common/service/mavzu/mavzu.service";
import { mavzuDto } from "../../../common/validation/dto/mavzu/mavzu.dto";
import { PagingDto } from "../../../common/validation/dto/pagingDto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";


export async function getMavzuPagingHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const mavzu = await mavzuService.getPaging(data)
        return res.send(mavzuError.Success(mavzu))
    } catch (e) {
        return next(e)
    }
}

export async function getByIdMavzuHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, mavzuDto, DtoGroups.GET_BY_ID);
        const mavzu = await mavzuService.findByIds(data._id);
        if (!mavzu) throw mavzuError.NotFound(data._id);
        const getmavzu = await mavzuService.getById(data._id);
        return res.send(mavzuError.Success(getmavzu))

    } catch (e) {
        return next(e)
    }
}