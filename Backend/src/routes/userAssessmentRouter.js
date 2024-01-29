import express from "express"
const router = express.Router()
import {getuserResponse, saveUserResponse, updateUserResponse} from "../controllers/UserAssessment.controller.js"

router.get('/user/userAssessment/question',getuserResponse)

//assessment data sending to DB
router.post('/user/userAssessment/save',saveUserResponse);

//assessment data updating by user
router.patch('/user/userAssessment', updateUserResponse);

export default router;