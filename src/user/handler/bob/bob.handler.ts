import { bobError } from "../../../common/db/model/bob/error";
import { bobService } from "../../../common/service/bob/bob.service";
import { bobDto } from "../../../common/validation/dto/bob/bobDto";
import { PagingDto } from "../../../common/validation/dto/pagingDto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";


export async function getBobPagingHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const bob = await bobService.getPaging(data)
        return res.send(bobError.Success(bob))
    } catch (e) {
        return next(e)
    }
}



export async function getByIdBobHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, bobDto, DtoGroups.GET_BY_ID);
        const bob = await bobService.findByIds(data._id);
        if (!bob) throw bobError.NotFound(data._id);
        const getBob = await bobService.getById(data._id);
        return res.send(bobError.Success(getBob))

    } catch (e) {
        return next(e)
    }
}