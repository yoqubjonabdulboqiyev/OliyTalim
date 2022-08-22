


import { Router } from "express";
import { getTestPagingHandler } from "../../handler/test/test.handler";

import { createYechishHandler, FinishTestHandler, StartTestHandler } from "../../handler/test/solveTest/solveTest.handler";
import { auth } from "../../midlleware/authtoken";



const router = Router();
router.get('/', getTestPagingHandler);
router.post('/', auth, createYechishHandler);
router.post('/start', auth, StartTestHandler);
router.put('/', auth, FinishTestHandler);

export default router;