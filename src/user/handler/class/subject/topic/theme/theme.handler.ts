import { ThemeError } from "../../../../../../common/db/model/class/subject/topic/theme/theme.error";
import { themeService } from "../../../../../../common/service/class/subject/topic/theme/theme.service";
import { ThemeDto } from "../../../../../../common/validation/dto/class/subject/topic/theme/theme.dto";
import { PagingDto } from "../../../../../../common/validation/dto/pagingDto";
import { DtoGroups } from "../../../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../../../common/validation/validate";


export async function getThemePagingHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const theme = await themeService.getPaging(data)
        return res.send(ThemeError.Success(theme))
    } catch (e) {
        return next(e)
    }
}

export async function getByIdThemeHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, ThemeDto, DtoGroups.GET_BY_ID);
        await themeService.ThemeFindById(data._id);
        const getTheme = await themeService.getById(data._id);
        return res.send(ThemeError.Success(getTheme))

    } catch (e) {
        return next(e)
    }
}