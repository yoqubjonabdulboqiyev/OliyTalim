import { Role } from "../../../common/constant/role";
import { subjectError } from "../../../common/db/model/subject/eror";
import { roleService } from "../../../common/service/admin/role/role.servise";
import { subjectService } from "../../../common/service/subject/subject.service";
import { PagingDto } from "../../../common/validation/dto/pagingDto";
import { subjectDto } from "../../../common/validation/dto/subject/subjectDto";
import { DtoGroups } from "../../../common/validation/dtoGroups";
import { validateIt } from "../../../common/validation/validate";


export async function getSubjectPagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SUBJECT)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const subject = await subjectService.getPaging(data)
        return res.send(subjectError.Success(subject))
    } catch (e) {
        return next(e)
    }
}


export async function createSubjectHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SUBJECT)
        const data = await validateIt(req.body, subjectDto, DtoGroups.CREATE)
        const subject = await subjectService.createSubject(data);

        return res.send(subjectError.Success(subject))

    } catch (e) {
        return next(e)
    }
}

export async function updateSubjectHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SUBJECT)

        const data = await validateIt(req.body, subjectDto, DtoGroups.UPDATE);
        const subject = await subjectService.findByIds(data._id);
        if (!subject) throw subjectError.NotFound(data._id);
        const updatesubject = await subjectService.updateSubject(data._id, data);
        return res.send(subjectError.Success(updatesubject))

    } catch (e) {
        return next(e)
    }
}

export async function deleteSubjectHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SUBJECT)
        const data = await validateIt(req.params, subjectDto, DtoGroups.DELETE);
        const subject = await subjectService.findByIds(data._id);
        if (!subject) throw subjectError.NotFound(data._id);
        const deleteSubject = await subjectService.deleteSubject(data._id);
        return res.send(subjectError.Success(deleteSubject))

    } catch (e) {
        return next(e)
    }
}

export async function getByIdSubjectHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.SUBJECT)
        const data = await validateIt(req.params, subjectDto, DtoGroups.GET_BY_ID);
        const subject = await subjectService.findByIds(data._id);
        if (!subject) throw subjectError.NotFound(data._id);
        const getSubject = await subjectService.getById(data._id);
        return res.send(subjectError.Success(getSubject))

    } catch (e) {
        return next(e)
    }
}