


import { Router } from "express";
import { createTestHandler, deleteTestHandler, getByIdTestHandler, getTestPagingHandler, updateTestHandler } from "../../handler/test/test.handler";

import { auth } from "../../middlewares/auth";


const router = Router();

router.get('/', auth, getTestPagingHandler);
router.get('/:_id', auth, getByIdTestHandler)
router.post('/', auth, createTestHandler)
router.put('/', auth, updateTestHandler);
router.delete('/:_id', auth, deleteTestHandler);

export default router;