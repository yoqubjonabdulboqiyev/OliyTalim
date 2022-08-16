


import { Router } from "express";
import { getUserByIdHandler, getUserPhoneNumberHandler, UserDeleteHandler, userRegisterHandler, userSignInHandler, userUpdateHandler } from "../../handler/user/user.handler";
import { auth } from "../../midlleware/authtoken";


const router = Router();

router.get('/mySelf',auth, getUserByIdHandler);
router.get('/',  auth,getUserPhoneNumberHandler)
router.post('/',  userRegisterHandler)
router.put('/',  auth, userUpdateHandler);
router.delete('/mySelf',auth,  UserDeleteHandler);
router.post("/sign", userSignInHandler)

export default router;