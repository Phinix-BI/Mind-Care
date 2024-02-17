import { Server } from "socket.io";
import {chatWithAiController} from './controllers/AiChat.controller.js';

function initializeSocket(server) {

    const io = new Server(server, {
        cors: {
        origin: 'http://localhost:5173', // Replace with your React app's origin
        methods: ['GET', 'POST'],
      },
    });

  
    io.on('connection', (socket) => {


      console.log('User connected');
  
      // You can handle socket events here
      socket.on('userMessage', async(message) => {

        // Process the message or delegate to  controller
        const response = await chatWithAiController(message,socket);
       
      });
  
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });

      // Handle errors
      socket.on('error', (error) => { 
        console.error('Socket.IO error:', error);
      }
      );
    });
  
    return io;
  }

  export default initializeSocket;
  