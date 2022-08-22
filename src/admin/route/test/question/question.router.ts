import { auth } from "../../../middlewares/auth";


import {Router} from "express"
import {getQuestionPagingHandler, createQuestionHandler, updateQuestionHandler, getByIdQuestionHandler, deleteQuestionHandler } from "../../../handler/test/question/question.handler";



const router = Router();

router.get('/', auth, getQuestionPagingHandler);
router.get('/:_id', auth, getByIdQuestionHandler)
router.post('/', auth, createQuestionHandler)
router.put('/', auth, updateQuestionHandler);
router.delete('/:_id', auth, deleteQuestionHandler);

export default router;