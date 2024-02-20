import express from "express"
const router = express.Router()
import {getuserResponse, saveUserResponse, updateCompleteStatus} from "../controllers/UserAssessment.controller.js"

router.get('/user/userAssessment/question',getuserResponse)

//assessment data sending to DB
router.post('/user/userAssessment/save',saveUserResponse);

router.post('/user/userAssessment/submit',updateCompleteStatus);



export default router;