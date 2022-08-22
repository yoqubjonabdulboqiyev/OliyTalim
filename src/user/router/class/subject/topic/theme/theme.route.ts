


import { Router } from "express";
import { getByIdThemeHandler, getThemePagingHandler } from "../../../../../handler/class/subject/topic/theme/theme.handler";
import { auth } from "../../../../../midlleware/authtoken";



const router = Router();

router.get('/', auth, getThemePagingHandler);
router.get('/:_id', auth, getByIdThemeHandler);

export default router;