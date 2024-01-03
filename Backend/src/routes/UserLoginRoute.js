import express from 'express'; 
import {PostUserLogin}from '../controllers/UserLoginController.js';


const router = express.Router();

router.post('/user/login',PostUserLogin);

export default router;