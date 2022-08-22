import { userError } from "../../../common/db/model/user/eror";
import { userService } from "../../../common/service/user/user.service";
import { jwt } from "../../../common/utils/jwt";
import { UserDto } from "../../../common/validation/dto/user/user.dto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";




export async function userRegisterHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, UserDto, DtoGroups.REGISTER)
        const user = await userService.createUser(data);
        return res.send(userError.Success(user))
    } catch (e) {
        return next(e);
    }
}

export async function userUpdateHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, UserDto, DtoGroups.UPDATE);
        const user = await userService.updateUser(req._id, data);
        return res.send(userError.Success(user))
    } catch (e) {
        return next(e)
    }
}

export async function getUserByIdHandler(req, res, next) {
    try {

        const data = await validateIt((req._id).toString(), UserDto, DtoGroups.GET_BY_ID)
        const user = await userService.UserFindById(data);
        return res.send(userError.Success(user))
    } catch (e) {
        return next(e);
    }
}

export async function getUserPhoneNumberHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, UserDto, DtoGroups.GET)
        const user = await userService.findPhoneNumber(data.phoneNumber);
        return res.send(userError.Success(user))
    } catch (e) {
        return next(e);
    }
}

export async function UserDeleteHandler(req, res, next) {
    try {
        const data = await validateIt((req._id).toString(), UserDto, DtoGroups.DELETE)
        const user = await userService.deleteUser(data);
        return res.send(userError.Success(user))
    } catch (e) {
        return next(e);
    }
}


export async function userSignInHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, UserDto, DtoGroups.LOGIN)
        const user = await userService.findPhoneNumber(data.phoneNumber);
        if (data.password != user.password) throw userError.InvalidPassword(data)
        const token = await jwt.sign({ phoneNumber: user.phoneNumber })
        const result = {
            data: user,
            token: token
        }
        return res.send(userError.Success(result))
    } catch (e) {
        return next(e);
    }
}
