



import { Router } from "express";
import { getTopicPagingHandler, getByIdTopicHandler } from "../../../../handler/class/subject/topic/topic.handler";
import { auth } from "../../../../midlleware/authtoken";



const router = Router();

router.get('/', auth, getTopicPagingHandler);
router.get('/:_id', auth, getByIdTopicHandler);

export default router;