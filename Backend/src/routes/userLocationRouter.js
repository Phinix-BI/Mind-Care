import  express from "express";
const router = express.Router()
import {doctorLocation} from "../controllers/location.controller.js"



router.route('/location').post(doctorLocation)


export default router