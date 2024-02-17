import express from "express"
const router = express.Router()
import {getAppointmentDetails, saveRequest, saveAcceptStatus, deleteAppointmentDetails} from "../controllers/DrAppointment.controller.js"

//assessment data sending to DB
router.get('/dr/appointment/details', getAppointmentDetails);

router.post('/dr/req/save',saveRequest);

router.put('/dr/req/acceptstatus',saveAcceptStatus);

router.delete('/dr/appointment/delete',deleteAppointmentDetails);


export default router;




