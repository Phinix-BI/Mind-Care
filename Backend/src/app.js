import express from 'express';  // Import express
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import stringSimilarity from 'string-similarity';
import 'dotenv/config'// Import dotenv package to load environment variables


import UserDataRoute from './routes/UserDataRoute.js'; // Import UserDataRoute.js functions
import UserLoginRoute from './routes/UserLoginRoute.js'; // Import UserLoginRoute.js functions
import  userLocationRouter  from "./routes/userLocationRouter.js";
import userAssessmentRouter from './routes/userAssessmentRouter.js'
import AdminAssessmentRouter from "./routes/AdminAssessmentRouter.js"
import initializeSocket from './Socket.js';
import DrAppointmentRouter from "./routes/DrAppointmentRouter.js";

import connectDB from './db/index.js';

const Port = 3000; // Port number
const app = express(); // Create express app


app.use(express.static("public"));

app.use(bodyParser.json());

app.use( bodyParser.urlencoded({extended: true}));

app.use('/api', UserDataRoute); // Use UserDataRoute.js for all routes starting with /api
app.use('/api', UserLoginRoute);
app.use('/api', userAssessmentRouter);
app.use('/api', AdminAssessmentRouter);
app.use('/api', DrAppointmentRouter);



app.use(cors());


const server = http.createServer(app); // Create a server using express app

const io = initializeSocket(server);

connectDB();


app.get('/', (req, res) => { 
    res.send('Hello World!'); 
});


// user profile routes

app.get('/user/profile',UserDataRoute);

app.get('/doctors/profile',UserDataRoute);

app.post('/user/profile',UserDataRoute);

app.patch('/user/profile/:id',UserDataRoute);

app.delete('/user/profile/:id',UserDataRoute);

app.put('/user/dr/id/save',UserDataRoute);

app.delete('/user/dr/id/delete',UserDataRoute);

// user login routes

app.post('/user/login',UserLoginRoute);

// user forgot password routes

app.post('/user/forgot-password',UserLoginRoute);


// user reset password routes
app.post('/user/reset-password',UserLoginRoute);

// user verify otp routes
app.post('/user/verify-otp',UserLoginRoute);

// user location 
app.post("/location", userLocationRouter );

//user assessment  
app.post('/user/userAssessment/save',userAssessmentRouter);

app.get("/user/userAssessment/question",userAssessmentRouter );

app.post('/user/userAssessment/submit',userAssessmentRouter);



//Admin CRUD
// app.post('/admin/assessment/save', AdminAssessmentRouter)

app.get('/admin/assessment/get', AdminAssessmentRouter);

app.patch('/admin/assessment/update', AdminAssessmentRouter);

app.delete('/admin/assessment/delete', AdminAssessmentRouter);

app.put('/admin/assessment/putdata', AdminAssessmentRouter);


//DR appointment
app.get('/dr/appointment/details', DrAppointmentRouter);

app.post('/dr/req/save',DrAppointmentRouter)

app.put('/dr/req/acceptstatus',DrAppointmentRouter);

app.delete('/dr/appointment/delete',DrAppointmentRouter);


const httpServer = server.listen(Port, () => console.log(`Server running on port: http://localhost:${Port}`)); // Start the server