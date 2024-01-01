import express from 'express';  // Import express

import {getUserData,PostUserData,UpdateUserData,DeleteUserData} from '../controllers/UserDataController.js'; // Import UserDataController.js functions


const router = express.Router();

router.get('/user/profile/:id',getUserData);

router.post('/user/profile',PostUserData);

router.patch('/user/profile/:id',UpdateUserData);

router.delete('/user/profile/:id',DeleteUserData);

export default router;