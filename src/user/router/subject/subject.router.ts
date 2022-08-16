


import { Router } from "express";
import { getByIdSubjectHandler, getSubjectPagingHandler } from "../../handler/subject/subject.handler";

import { auth } from "../../midlleware/authtoken";



const router = Router();

router.get('/', auth, getSubjectPagingHandler);
router.get('/:_id', auth, getByIdSubjectHandler);

export default router;