import { subjectError } from "../../../../common/db/model/class/subject/subject.eror";
import { subjectService } from "../../../../common/service/class/subject/subject.service";
import { PagingDto } from "../../../../common/validation/dto/pagingDto";
import { subjectDto } from "../../../../common/validation/dto/class/subject/subject.dto";
import { DtoGroups } from "../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../common/validation/validate";


export async function getSubjectPagingHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const subject = await subjectService.getPaging(data)
        return res.send(subjectError.Success(subject))
    } catch (e) {
        return next(e)
    }
}

export async function getByIdSubjectHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, subjectDto, DtoGroups.GET_BY_ID);
        await subjectService.SubjectFindById(data._id);
        const getSubject = await subjectService.getById(data._id);
        return res.send(subjectError.Success(getSubject))

    } catch (e) {
        return next(e)
    }
}