import express from 'express';  // Import express
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import UserDataRoute from './routes/UserDataRoute.js'; // Import UserDataRoute.js functions
import { get } from 'http';

const Port = 3000; // Port number
const app = express(); // Create express app


app.use(express.static("public"));

app.use(bodyParser.json());

app.use( bodyParser.urlencoded({extended: true}));

app.use('/api', UserDataRoute); // Use UserDataRoute.js for all routes starting with /api


mongoose.connect("mongodb://127.0.0.1:27017/MindCare", {
  useNewUrlParser: true
})
.then(() => {
  console.log("Connected to the Database successfully");
})

app.get('/', (req, res) => { // Default route
    res.send('Hello World!'); // Send response to GET requests to /api
});

app.get('/user/profile/:id',UserDataRoute);

app.post('/user/profile',UserDataRoute);

app.patch('/user/profile/:id',UserDataRoute);

app.delete('/user/profile/:id',UserDataRoute);



app.listen(Port, () => console.log(`Server running on port: http://localhost:${Port}`)); // Start the server