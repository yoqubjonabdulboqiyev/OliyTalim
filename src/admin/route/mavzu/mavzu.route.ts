


import { Router } from "express";
import { getByIdMavzuHandler, createMavzuHandler, updateMavzuHandler, deleteMavzuHandler, getMavzuPagingHandler } from "../../handler/mavzu/mavzu.handler";
import { auth } from "../../middlewares/auth";


const router = Router();

router.get('/', auth, getMavzuPagingHandler);
router.get('/:_id', auth, getByIdMavzuHandler)
router.post('/', auth, createMavzuHandler)
router.put('/', auth, updateMavzuHandler);
router.delete('/:_id', auth, deleteMavzuHandler);

export default router;