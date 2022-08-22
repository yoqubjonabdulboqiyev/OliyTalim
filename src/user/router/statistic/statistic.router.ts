


import { Router } from "express";
import { resultsHandler } from "../../handler/statistic/statistic.handler";

import { auth } from "../../midlleware/authtoken";



const router = Router();

router.get('/:_id', auth, resultsHandler);
export default router;