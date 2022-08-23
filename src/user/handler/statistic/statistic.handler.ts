import { ResultError } from "../../../common/db/model/test/result/result.error";
import { resultService } from "../../../common/service/test/result/result.service";
import { BaseDto, DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";


export async function resultsHandler(req, res, next) {

    try {
        const data = await validateIt(req.params, BaseDto, DtoGroups.GET_BY_ID)
        const results = await resultService.results(data._id)
        return res.send(ResultError.Success(results))
    } catch (e) {
        return next(e)
    }
}