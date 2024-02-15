import express from "express"
const router = express.Router()
import {saveRequest, saveAcceptStatus} from "../controllers/DrAppointment.controller.js"

//assessment data sending to DB
router.post('/dr/req/save',saveRequest);

router.put('/dr/req/acceptstatus',saveAcceptStatus);






export default router;










