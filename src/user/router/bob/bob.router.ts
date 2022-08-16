



import { Router } from "express";
import { getBobPagingHandler, getByIdBobHandler } from "../../handler/bob/bob.handler";
import { auth } from "../../midlleware/authtoken";



const router = Router();

router.get('/', auth, getBobPagingHandler);
router.get('/:_id', auth, getByIdBobHandler);

export default router;