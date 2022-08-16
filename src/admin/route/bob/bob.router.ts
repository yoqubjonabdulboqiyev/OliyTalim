


import { Router } from "express";
import { getBobPagingHandler, getByIdBobHandler, createBobHandler, updateBobHandler, deleteBobHandler } from "../../handler/bob/bob.handler";
import { auth } from "../../middlewares/auth";


const router = Router();

router.get('/', auth, getBobPagingHandler);
router.get('/:_id', auth, getByIdBobHandler)
router.post('/', auth, createBobHandler)
router.put('/', auth, updateBobHandler);
router.delete('/:_id', auth, deleteBobHandler);

export default router;