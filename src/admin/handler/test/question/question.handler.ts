import { Role } from "../../../../common/constant/role"
import { QuestionError } from "../../../../common/db/model/test/question/question.error"
import { roleService } from "../../../../common/service/admin/role/role.service"
import { questionService } from "../../../../common/service/test/question/question.service"
import { solveTestService } from "../../../../common/service/test/solveTest/solveTest.service"
import { PagingDto } from "../../../../common/validation/dto/pagingDto"
import { QuestionDto } from "../../../../common/validation/dto/test/question/question.dto"
import { DtoGroups } from "../../../../common/validation/dtoGroups"
import { validateIt } from "../../../../common/validation/validate"



export async function getQuestionPagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.QUESTION)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const question = await questionService.getPaging(data)
        return res.send(QuestionError.Success(question))
    } catch (e) {
        return next(e)
    }
}


export async function createQuestionHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.QUESTION)
        const data = await validateIt(req.body, QuestionDto, DtoGroups.CREATE)
        const question = await questionService.createQuestion(data);

        return res.send(QuestionError.Success(question))

    } catch (e) {
        return next(e)
    }
}

export async function updateQuestionHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.QUESTION)

        const data = await validateIt(req.body, QuestionDto, DtoGroups.UPDATE);
        await questionService.QuestionFindById(data._id);
        const updateQuestion = await questionService.updateQuestion(data._id, data);
        return res.send(QuestionError.Success(updateQuestion))

    } catch (e) {
        return next(e)
    }
}

export async function deleteQuestionHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.QUESTION)
        const data = await validateIt(req.params, QuestionDto, DtoGroups.DELETE);
        await questionService.QuestionFindById(data._id);
        const deleteQuestion = await questionService.deleteQuestion(data._id);
        return res.send(QuestionError.Success(deleteQuestion))

    } catch (e) {
        return next(e)
    }
}

export async function getByIdQuestionHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.QUESTION)
        const data = await validateIt(req.params, QuestionDto, DtoGroups.GET_BY_ID);
        await questionService.QuestionFindById(data._id);
        const getQuestion = await questionService.getById(data._id);
        return res.send(QuestionError.Success(getQuestion))

    } catch (e) {
        return next(e)
    }
}

