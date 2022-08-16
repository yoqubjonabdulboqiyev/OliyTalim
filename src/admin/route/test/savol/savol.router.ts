import { auth } from "../../../middlewares/auth";


import {Router} from "express"
import { getSavolPagingHandler, createSavolHandler, updateSavolHandler, getByIdSavolHandler, deleteSavolHandler } from "../../../handler/test/savol/savol.handler";



const router = Router();

router.get('/', auth, getSavolPagingHandler);
router.get('/:_id', auth, getByIdSavolHandler)
router.post('/', auth, createSavolHandler)
router.put('/', auth, updateSavolHandler);
router.delete('/:_id', auth, deleteSavolHandler);

export default router;