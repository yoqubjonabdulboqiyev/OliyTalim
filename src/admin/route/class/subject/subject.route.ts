


import { Router } from "express";
import { getSubjectPagingHandler, getByIdSubjectHandler, createSubjectHandler, updateSubjectHandler, deleteSubjectHandler } from "../../../handler/class/subject/subject.handler";
import { auth } from "../../../middlewares/auth";


const router = Router();

router.get('/', auth, getSubjectPagingHandler);
router.get('/:_id', auth, getByIdSubjectHandler)
router.post('/', auth, createSubjectHandler)
router.put('/', auth, updateSubjectHandler);
router.delete('/:_id', auth, deleteSubjectHandler);

export default router;