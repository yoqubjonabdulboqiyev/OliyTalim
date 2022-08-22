


import { Router } from "express";
import { createClassHandler, deleteClassHandler, getByIdClassHandler, getClassPagingHandler, updateClassHandler } from "../../handler/class/class.handler";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get('/', auth, getClassPagingHandler);
router.get('/:_id', auth, getByIdClassHandler)
router.post('/', auth, createClassHandler);
router.put('/', auth, updateClassHandler);
router.delete('/:_id', auth, deleteClassHandler);

export default router;