


import { Router } from "express";
import { getByIdNewsHandler, getNewsPagingHandler } from "../../handler/news/news.handler";

import { auth } from "../../midlleware/authtoken";



const router = Router();

router.get('/', auth, getNewsPagingHandler);
router.get('/:_id', auth, getByIdNewsHandler);

export default router;