# MindCare 🧠💻

MindCare is a comprehensive mental health platform designed to provide support, assessment, and guidance to individuals seeking mental health assistance. Whether you're looking to assess your mental well-being, seek advice, or book appointments with qualified professionals, MindCare has got you covered. 🌟

## Features 🚀

- **User Authentication**: Users can easily sign up, log in, and log out to access MindCare's features securely. 🔐
- **Mental Health Assessment**: Take a simple MCQ questionnaire to assess your mental health status. 📝
- **Personalized Recommendations**: Receive personalized recommendations based on your assessment results. 💡
- **AI Therapist**: Engage in conversations with our trained AI model to discuss your concerns and receive guidance. 🤖
- **Appointment Booking**: Book appointments with mental health professionals across India directly through our platform. 📅

## Technologies Used 💻

- **MongoDB**: Database for storing user information, assessment results, and appointment details. 📊
- **Express**: Node.js framework for building the backend server. 🛠️
- **React**: Frontend library for building the user interface. ⚛️
- **Tailwind CSS**: Utility-first CSS framework for styling the frontend. 🎨
- **PALM LLM**: AI model for providing conversational therapy and guidance.Here we use tune model of text-bision-001.

## Setup Instructions 🛠️

1. Clone the repository: `git clone https://github.com/yourusername/mindcare.git`
2. Navigate to the project directory: `cd mindcare`
3. Install dependencies:
   - Main-Folder : `npm install`
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
4. Set up environment variables:
   - Create a `.env` file in the `backend` then `src` directory.
   - Define environment variables such as `MONGODB_URI`, `TOKEN_SECRET`,`EMAIL`,`PASSWORD`,`GOOGLE_AI_KEY`,`GOOGLE_APPLICATION_CREDENTIALS`.
   - `MONGODB_URI` is the connection string for your MongoDB database.
   - `TOKEN_SECRET` is a secret key used to sign and verify JSON Web Tokens.
   - `EMAIL` and `PASSWORD` are the credentials for the email account used to send otp for reset password.
   - `GOOGLE_AI_KEY` is the key for the google api used for the analyze patient data through assessment.IYou can get it from the google makersuite or google cloud platform.
   - `GOOGLE_APPLICATION_CREDENTIALS` is the path to the json file of the google api key.It is crucial to set this environment variable to use the google api key.It's for ai therapist.Because it's a tune model of text-bision-001 using our data.
   -To get the google api key and json file you can visit the google cloud platform and create a project and enable the api and make service account and go to credentials and create a new credentials and download the json file and set the path of the json file in the environment variable.

## How To Train The AI Model 🤖
   - You can easily tune the model from google makersuite.Go to the google makersuite then enable pam legacy model and create a new model and select the text-bision-001.Then you can simply tune this model using your data through google sheets or csv file and then you can use this model in the project by setting the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to the path of the json file of the google api key.

   
## Running the Application 🚀

1. Start the backend server: `cd backend,cd src && nodemon app.js`
2. Start the frontend server: `cd frontend && npm run dev`
3. Access the application at `http://localhost:5173` in your browser.
4. Access the backend server at `http://localhost:3000` in your browser.
5. You're all set! 🎉


## Contributing 🤝

We welcome contributions from the community to improve MindCare and make it more effective in supporting mental health. If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/NewFeature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/NewFeature`
5. Submit a pull request detailing the changes you've made.

## Support 🤗

If you encounter any issues or have any questions, feel free to reach out to us at mindcareofficial@gmail.com.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
