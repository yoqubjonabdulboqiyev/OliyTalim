import { testError } from "../../../common/db/model/test/eror"
import { testService } from "../../../common/service/test/test.service"
import { PagingDto } from "../../../common/validation/dto/pagingDto"
import { testDto } from "../../../common/validation/dto/test/testDto"
import { DtoGroups } from "../../../common/validation/dtoGroups"
import { validateIt } from "../../../common/validation/validate"



export async function getTestPagingHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const test = await testService.getPaging(data)
        return res.send(testError.Success(test))
    } catch (e) {
        return next(e)
    }
}