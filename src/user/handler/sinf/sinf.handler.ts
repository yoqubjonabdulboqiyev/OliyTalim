import { sinfError } from "../../../common/db/model/sinf/error";
import { sinfService } from "../../../common/service/sinf/sinf.service";
import { PagingDto } from "../../../common/validation/dto/pagingDto";
import { sinfDto } from "../../../common/validation/dto/sinf/sinfDto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";


export async function getSinfPagingHandler(req, res, next) {
    try {

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const sinf = await sinfService.getPaging(data)
        return res.send(sinfError.Success(sinf))
    } catch (e) {
        return next(e)
    }
}


export async function getByIdSinfHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, sinfDto, DtoGroups.GET_BY_ID);
        const sinf = await sinfService.findByIds(data._id);
        if (!sinf) throw sinfError.NotFound(data._id);
        const getSinf = await sinfService.getById(data._id);
        return res.send(sinfError.Success(getSinf))

    } catch (e) {
        return next(e)
    }
}