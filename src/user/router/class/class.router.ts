


import { Router } from "express";
import { getByIdClassHandler, getClassPagingHandler } from "../../handler/class/class.handler";

import { auth } from "../../midlleware/authtoken";



const router = Router();

router.get('/', auth, getClassPagingHandler);
router.get('/:_id', auth, getByIdClassHandler);

export default router;