


import { Router } from "express";
import { signInHandler } from "../../handler/employee/employee.handler";
import { createRoleHandler, deleteRoleHandler, getPagingRoleHandler, getRoleByIdHandler, updateRoleHandler } from "../../handler/role/role.hamdler";
import { auth } from "../../middlewares/auth";


const router = Router();

router.get('/', auth, getPagingRoleHandler)
router.get('/:_id', auth, getRoleByIdHandler)
router.post('/',  createRoleHandler)
router.put('/', auth, updateRoleHandler)
router.delete('/:_id', auth, deleteRoleHandler)


export default router;