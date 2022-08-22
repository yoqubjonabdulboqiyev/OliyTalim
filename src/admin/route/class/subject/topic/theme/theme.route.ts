


import { Router } from "express";
import { getByIdThemeHandler, createThemeHandler, updateThemeHandler, deleteThemeHandler, getThemePagingHandler } from "../../../../../handler/class/subject/topic/theme/theme.handler";
import { auth } from "../../../../../middlewares/auth";


const router = Router();

router.get('/', auth, getThemePagingHandler);
router.get('/:_id', auth, getByIdThemeHandler)
router.post('/', auth, createThemeHandler)
router.put('/', auth, updateThemeHandler);
router.delete('/:_id', auth, deleteThemeHandler);

export default router;