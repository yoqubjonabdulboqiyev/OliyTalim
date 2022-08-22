import { Role } from "../../../../../../common/constant/role";
import { ThemeError } from "../../../../../../common/db/model/class/subject/topic/theme/theme.error";
import { roleService } from "../../../../../../common/service/admin/role/role.service";
import { themeService } from "../../../../../../common/service/class/subject/topic/theme/theme.service";
import { ThemeDto } from "../../../../../../common/validation/dto/class/subject/topic/theme/theme.dto";
import { PagingDto } from "../../../../../../common/validation/dto/pagingDto";
import { DtoGroups } from "../../../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../../../common/validation/validate";


export async function getThemePagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.THEME)

        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)
        const theme = await themeService.getPaging(data)
        return res.send(ThemeError.Success(theme))
    } catch (e) {
        return next(e)
    }
}


export async function createThemeHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.THEME)
        const data = await validateIt(req.body, ThemeDto, DtoGroups.CREATE)
        const theme = await themeService.createTheme(data);

        return res.send(ThemeError.Success(theme))

    } catch (e) {
        return next(e)
    }
}

export async function updateThemeHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.THEME)

        const data = await validateIt(req.body, ThemeDto, DtoGroups.UPDATE);
        await themeService.ThemeFindById(data._id);
        const updateTheme = await themeService.updateTheme(data._id, data);
        return res.send(ThemeError.Success(updateTheme))

    } catch (e) {
        return next(e)
    }
}

export async function deleteThemeHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.THEME)
        const data = await validateIt(req.params, ThemeDto, DtoGroups.DELETE);
        await themeService.ThemeFindById(data._id);
        const deleteTheme = await themeService.deleteTheme(data._id);
        return res.send(ThemeError.Success(deleteTheme))

    } catch (e) {
        return next(e)
    }
}

export async function getByIdThemeHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Role.THEME)
        const data = await validateIt(req.params, ThemeDto, DtoGroups.GET_BY_ID);
        await themeService.ThemeFindById(data._id);
        const getTheme = await themeService.getById(data._id);
        return res.send(ThemeError.Success(getTheme))

    } catch (e) {
        return next(e)
    }
}