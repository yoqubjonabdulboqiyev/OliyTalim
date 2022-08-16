


import { Router } from "express";
import { createSinfHandler, deleteSinfHandler, getByIdSinfHandler, getSinfPagingHandler, updateSinfHandler } from "../../handler/sinf/sinf.handler";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get('/', auth, getSinfPagingHandler);
router.get('/:_id', auth, getByIdSinfHandler)
router.post('/', auth, createSinfHandler)
router.put('/', auth, updateSinfHandler);
router.delete('/:_id', auth, deleteSinfHandler);

export default router;