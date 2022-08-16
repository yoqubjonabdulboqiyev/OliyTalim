


import { Router } from "express";
import { getByIdSinfHandler, getSinfPagingHandler } from "../../handler/sinf/sinf.handler";

import { auth } from "../../midlleware/authtoken";



const router = Router();

router.get('/', auth, getSinfPagingHandler);
router.get('/:_id', auth, getByIdSinfHandler);

export default router;