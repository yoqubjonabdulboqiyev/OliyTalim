


import { Router } from "express";
import { natijalarHandler } from "../../handler/statistic/statistic.handler";

import { auth } from "../../midlleware/authtoken";



const router = Router();

router.get('/:_id', auth, natijalarHandler);
export default router;