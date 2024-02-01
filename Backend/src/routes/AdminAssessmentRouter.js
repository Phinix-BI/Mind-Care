import express from "express"
const router = express.Router()
import { GetUserAssessment, UpdateUserAssessment, 
    PutUserAssessment, DeleteUserAssessment } from "../controllers/AdminAssessment.controller.js"


// router.post('/admin/assessment/save', PostUserAssessment);

router.get('/admin/assessment/get', GetUserAssessment);

router.patch('/admin/assessment/update', UpdateUserAssessment);

router.delete('/admin/assessment/delete', DeleteUserAssessment);

router.put('/admin/assessment/putdata', PutUserAssessment)


export default router;










