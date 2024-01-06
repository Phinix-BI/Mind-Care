import express from 'express';  // Import express
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import UserDataRoute from './routes/UserDataRoute.js'; // Import UserDataRoute.js functions
import UserLoginRoute from './routes/UserLoginRoute.js'; // Import UserLoginRoute.js functions
// import TestRoutes from './routes/TestRoutes.js'; // Import TestRoute.js functions

import { get } from 'http';

import 'dotenv/config'// Import dotenv package to load environment variables

import connectDB from './db/index.js';
// import { DB_NAME } from "../src/constants.js";

const Port = 3000; // Port number
const app = express(); // Create express app


app.use(express.static("public"));

app.use(bodyParser.json());

app.use( bodyParser.urlencoded({extended: true}));

app.use('/api', UserDataRoute); // Use UserDataRoute.js for all routes starting with /api
app.use('/api', UserLoginRoute);
// app.use('/api', TestRoutes);

app.use(cors());

connectDB();
// console.log(process.env.TOKEN_SECRET);

app.get('/', (req, res) => { // Default route
    res.send('Hello World!'); // Send response to GET requests to /api
});

// app.get('/test', TestRoutes);
// user profile routes

app.get('/user/profile/:id',UserDataRoute);

app.post('/user/profile',UserDataRoute);

app.patch('/user/profile/:id',UserDataRoute);

app.delete('/user/profile/:id',UserDataRoute);

// user login routes

app.post('/user/login',UserLoginRoute);

app.listen(Port, () => console.log(`Server running on port: http://localhost:${Port}`)); // Start the server