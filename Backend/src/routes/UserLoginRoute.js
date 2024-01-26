import express from 'express'; 
import {PostUserLogin,forgotPassword,resetPassword, verifyOtp} from '../controllers/UserLoginController.js';




const router = express.Router();

router.post('/user/login',PostUserLogin);
router.post('/user/forgot-password',forgotPassword);
router.post('/user/reset-password',resetPassword);
router.post('/user/verify-otp',verifyOtp);

export default router;