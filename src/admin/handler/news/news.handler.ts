import { Role } from "../../../common/constant/role"
import { newsError } from "../../../common/db/model/news/error"
import { roleService } from "../../../common/service/admin/role/role.servise"
import { newsService } from "../../../common/service/news/news"
import { newsDto } from "../../../common/validation/dto/news/newsDto"
import { PagingDto } from "../../../common/validation/dto/pagingDto"
import { DtoGroups } from "../../../common/validation/dtoGroups"
import { validateIt } from "../../../common/validation/validate"



export async function getNewsPagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.NEWS)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const news = await newsService.getPaging(data)
        return res.send(newsError.Success(news))
    } catch (e) {
        return next(e)
    }
}


export async function createNewsHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.NEWS)
        const data = await validateIt(req.body, newsDto, DtoGroups.CREATE)
        const news = await newsService.createNews(data);

        return res.send(newsError.Success(news))

    } catch (e) {
        return next(e)
    }
}

export async function updateNewsHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.NEWS)

        const data = await validateIt(req.body, newsDto, DtoGroups.UPDATE);
        const news = await newsService.findByIds(data._id);
        if (!news) throw newsError.NotFound(data._id);
        const updateNews = await newsService.updateNews(data._id, data);
        return res.send(newsError.Success(updateNews))

    } catch (e) {
        return next(e)
    }
}

export async function deleteNewsHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.NEWS)
        const data = await validateIt(req.params, newsDto, DtoGroups.DELETE);
        const news = await newsService.findByIds(data._id);
        if (!news) throw newsError.NotFound(data._id);
        const deleteNews = await newsService.deleteNews(data._id);
        return res.send(newsError.Success(deleteNews))

    } catch (e) {
        return next(e)
    }
}

export async function getByIdNewsHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.NEWS)
        const data = await validateIt(req.params, newsDto, DtoGroups.GET_BY_ID);
        const news = await newsService.findByIds(data._id);
        if (!news) throw newsError.NotFound(data._id);
        const getnews = await newsService.getById(data._id);
        return res.send(newsError.Success(getnews))

    } catch (e) {
        return next(e)
    }
}