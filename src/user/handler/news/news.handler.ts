import { newsError } from "../../../common/db/model/news/error"
import { newsService } from "../../../common/service/news/news"
import { newsDto } from "../../../common/validation/dto/news/newsDto"
import { PagingDto } from "../../../common/validation/dto/pagingDto"
import { DtoGroups } from "../../../common/validation/dtoGroups"
import { validateIt } from "../../../common/validation/validate"



export async function getNewsPagingHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const news = await newsService.getPaging(data)
        return res.send(newsError.Success(news))
    } catch (e) {
        return next(e)
    }
}

export async function getByIdNewsHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, newsDto, DtoGroups.GET_BY_ID);
        const news = await newsService.findByIds(data._id);
        if (!news) throw newsError.NotFound(data._id);
        const getnews = await newsService.getById(data._id);
        getnews[0].view +=1;
        const update = await newsService.updateNews(getnews[0]._id, getnews[0])
        return res.send(newsError.Success(update))

    } catch (e) {
        return next(e)
    }
}