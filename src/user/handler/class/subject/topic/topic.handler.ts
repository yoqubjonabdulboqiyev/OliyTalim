import { TopicError } from "../../../../../common/db/model/class/subject/topic/topic.error";
import { topicService } from "../../../../../common/service/class/subject/topic/topic.service";
import { TopicDto } from "../../../../../common/validation/dto/class/subject/topic/topic.dto";
import { PagingDto } from "../../../../../common/validation/dto/pagingDto";
import { DtoGroups } from "../../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../../common/validation/validate";


export async function getTopicPagingHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const topic = await topicService.getPaging(data)
        return res.send(TopicError.Success(topic))
    } catch (e) {
        return next(e)
    }
}



export async function getByIdTopicHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, TopicDto, DtoGroups.GET_BY_ID);
        await topicService.TopicFindById(data._id);
        const getTopic = await topicService.getById(data._id);
        return res.send(TopicError.Success(getTopic))

    } catch (e) {
        return next(e)
    }
}