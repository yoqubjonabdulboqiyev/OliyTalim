


import { Router } from "express";
import { getTopicPagingHandler, getByIdTopicHandler, createTopicHandler, updateTopicHandler, deleteTopicHandler } from "../../../../handler/class/subject/topic/topic.handler";
import { auth } from "../../../../middlewares/auth";


const router = Router();

router.get('/', auth, getTopicPagingHandler);
router.get('/:_id', auth, getByIdTopicHandler)
router.post('/', auth, createTopicHandler)
router.put('/', auth, updateTopicHandler);
router.delete('/:_id', auth, deleteTopicHandler);

export default router;