import { userError } from "../../common/db/model/user/eror";
import { userService } from "../../common/service/user/user.service";
import { jwt } from "../../common/utils/jwt";





export async function auth(req, res, next) {
    try {
        const { phoneNumber } = jwt.verify(req.headers.token)
        const user = await userService.findPhoneNumber(phoneNumber)
        if (user.phoneNumber != phoneNumber) throw userError.InvalidToken()
        req._id = user._id
        return next();

    } catch (e) {
        throw e;
    }
}