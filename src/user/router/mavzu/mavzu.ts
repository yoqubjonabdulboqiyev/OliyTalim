


import { Router } from "express";
import { getByIdMavzuHandler, getMavzuPagingHandler } from "../../handler/mavzu/mavzu.handler";
import { auth } from "../../midlleware/authtoken";



const router = Router();

router.get('/', auth, getMavzuPagingHandler);
router.get('/:_id', auth, getByIdMavzuHandler);

export default router;