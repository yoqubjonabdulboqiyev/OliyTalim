import { natijaError } from "../../../common/db/model/test/natija/eror";
import { natijaService } from "../../../common/service/test/natija/natija.service";
import { natijaDto } from "../../../common/validation/dto/test/natija/natijaDto";
import { BaseDto, DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";


export async function natijalarHandler(req, res, next) {

    try {
        const data = await validateIt(req.params, BaseDto, DtoGroups.GET_BY_ID)
        console.log(data)
        const natijalar = await natijaService.natijalarim(data._id)
        return res.send(natijaError.Success(natijalar))
    } catch (e) {
        return next(e)
    }
}