

import { Router } from 'express';
import { createEmployeeHandler, deleteEmployeeHandler, getEmployeeByIdHandler, getPagingEmployeeHandler, signInHandler, updateEmployeeHandler } from '../../handler/employee/employee.handler';
import { auth } from '../../middlewares/auth';


const router = Router();


router.get('/', auth, getPagingEmployeeHandler)
router.get('/:_id', auth, getEmployeeByIdHandler)
router.post('/',  createEmployeeHandler)
router.put('/', auth, updateEmployeeHandler)
router.delete('/:_id', auth, deleteEmployeeHandler)

router.post('/signIn', signInHandler)
export default router;