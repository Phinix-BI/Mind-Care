import express from 'express';  // Import express

import {getUserData,getDoctorsData,PostUserData,UpdateUserData,DeleteUserData, saveDrAppointmentId, deleteDrAppointmentId } from '../controllers/UserDataController.js'; // Import UserDataController.js functions

import { UserAuth } from '../middlewares/Authentication/UserAuth.js';

const router = express.Router();

router.get('/user/profile',getUserData);

router.get('/doctors/profile',getDoctorsData);

router.post('/user/profile',PostUserData);

router.patch('/user/profile/:id',UserAuth,UpdateUserData);

router.put('/user/dr/id/save',saveDrAppointmentId);

router.delete('/user/profile/:id',DeleteUserData);

router.delete('/user/dr/id/delete',deleteDrAppointmentId);



export default router;