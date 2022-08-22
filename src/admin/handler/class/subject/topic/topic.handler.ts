import { Role } from "../../../../../common/constant/role";
import { TopicError } from "../../../../../common/db/model/class/subject/topic/topic.error";
import { roleService } from "../../../../../common/service/admin/role/role.service";
import { topicService } from "../../../../../common/service/class/subject/topic/topic.service";
import { TopicDto } from "../../../../../common/validation/dto/class/subject/topic/topic.dto";
import { PagingDto } from "../../../../../common/validation/dto/pagingDto";
import { DtoGroups } from "../../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../../common/validation/validate";


export async function getTopicPagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.TOPIC)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const topic = await topicService.getPaging(data)
        return res.send(TopicError.Success(topic))
    } catch (e) {
        return next(e)
    }
}


export async function createTopicHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.TOPIC)
        const data = await validateIt(req.body, TopicDto, DtoGroups.CREATE)
        const topic = await topicService.createTopic(data);

        return res.send(TopicError.Success(topic))

    } catch (e) {
        return next(e)
    }
}

export async function updateTopicHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.TOPIC)

        const data = await validateIt(req.body, TopicDto, DtoGroups.UPDATE);
        await topicService.TopicFindById(data._id);
        const updateTopic = await topicService.updateTopic(data._id, data);
        return res.send(TopicError.Success(updateTopic))

    } catch (e) {
        return next(e)
    }
}

export async function deleteTopicHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.TOPIC)
        const data = await validateIt(req.params, TopicDto, DtoGroups.DELETE);
        await topicService.TopicFindById(data._id);
        const deleteTopic = await topicService.deleteTopic(data._id);
        return res.send(TopicError.Success(deleteTopic))

    } catch (e) {
        return next(e)
    }
}

export async function getByIdTopicHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.TOPIC)
        const data = await validateIt(req.params, TopicDto, DtoGroups.GET_BY_ID);
        await topicService.TopicFindById(data._id);
        const getTopic = await topicService.getById(data._id);
        return res.send(TopicError.Success(getTopic))

    } catch (e) {
        return next(e)
    }
}