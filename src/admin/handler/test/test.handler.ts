import { Role } from "../../../common/constant/role"
import { TestError } from "../../../common/db/model/test/test.eror"
import { roleService } from "../../../common/service/admin/role/role.service"
import { testService } from "../../../common/service/test/test.service"
import { PagingDto } from "../../../common/validation/dto/pagingDto"
import { testDto } from "../../../common/validation/dto/test/test.dto"
import { DtoGroups } from "../../../common/validation/dtoGroups"
import { validateIt } from "../../../common/validation/validate"


export async function getTestPagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.TEST)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const test = await testService.getPaging(data)
        return res.send(TestError.Success(test))
    } catch (e) {
        return next(e)
    }
}


export async function createTestHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.TEST)
        const data = await validateIt(req.body, testDto, DtoGroups.CREATE)
        const test = await testService.createTest(data);

        return res.send(TestError.Success(test))

    } catch (e) {
        return next(e)
    }
}

export async function updateTestHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.TEST)

        const data = await validateIt(req.body, testDto, DtoGroups.UPDATE);
        await testService.TestfindById(data._id);
        const updatetest = await testService.updateTest(data._id, data);
        return res.send(TestError.Success(updatetest))

    } catch (e) {
        return next(e)
    }
}

export async function deleteTestHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.TEST)
        const data = await validateIt(req.params, testDto, DtoGroups.DELETE);
        await testService.TestfindById(data._id);
        const deletetest = await testService.deleteTest(data._id);
        return res.send(TestError.Success(deletetest))

    } catch (e) {
        return next(e)
    }
}

export async function getByIdTestHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.TEST)
        const data = await validateIt(req.params, testDto, DtoGroups.GET_BY_ID);
        await testService.TestfindById(data._id);
        const gettest = await testService.getById(data._id);
        return res.send(TestError.Success(gettest))

    } catch (e) {
        return next(e)
    }
}