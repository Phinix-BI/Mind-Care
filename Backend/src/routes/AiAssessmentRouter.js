import express from "express"
const router = express.Router()

import { getAiResponse } from "../controllers/AiAssessment.controller.js";

router.get('/ai/assessment/:token', getAiResponse);

export default router;