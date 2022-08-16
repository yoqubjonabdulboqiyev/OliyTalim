


import { Router } from "express";
import { createNewsHandler, deleteNewsHandler, getByIdNewsHandler, getNewsPagingHandler, updateNewsHandler } from "../../handler/news/news.handler";
import { auth } from "../../middlewares/auth";


const router = Router();

router.get('/', auth, getNewsPagingHandler);
router.get('/:_id', auth, getByIdNewsHandler)
router.post('/', auth, createNewsHandler)
router.put('/', auth, updateNewsHandler);
router.delete('/:_id', auth, deleteNewsHandler);

export default router;