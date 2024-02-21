import React from "react";

import {createBrowserRouter,RouterProvider} from "react-router-dom";


import "./index.css";

//import ProfilePage from "./components/ProfilePage/ProfilePage"
// import ProfilePage from "./components/ProfilePage/ProfilePage"

// import SignupPage from "./components/SignupPage/SignupPage"
// import LoginPage from "./components/LoginPage/LoginPage"
// import HomePage from "./components/HomePage/HomePage";

// import SignupPage from "./components/SignupPage/SignupPage"
// import LoginPage from "./components/LoginPage/LoginPage"

import HomePage from "./components/HomePage/HomePage"
import Signup_Login_Form from "./components/Signup_Login_Form/Signup_Login_Form"
import Diagnostic from "./components/Diagnostic/Diagnostic";
import MCQ from "./components/MCQ/MCQ"
import DoctorsPage from "./components/DoctorsPage/DoctorsPage";
import AccountSettings from "./components/AccountSettings/AccountSettings"
import Chat from "./components/Chat/Chat"
import CheckAppoinment from "./components/CheckAppoinment/CheckAppoinment";
import AI_Response from "./components/AI_Response/AI_Response";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/ProfilePage",
    element: <AccountSettings />,
  },
  {
    path: "/login",
    element:<Signup_Login_Form/>,
  },
  {
    path: "/Diagnos",
    element:<Diagnostic/>,
  },
  {
    path: "/DiagnosTest",
    element:<MCQ/>,
  },
  {
    path: "/FindDoctors",
    element:<DoctorsPage/>,
  },
  {
    path: "/chat",
    element:<Chat/>,
  },
  {
    path: "/appoinment",
    element: <CheckAppoinment />
  }, 
  {
    path: "/response",
    element: <AI_Response />
  },
  
 
]);
function App() {

  return (
   <main> 
   <RouterProvider router={router}>
    </RouterProvider>
    </main>
  )
}

export default App
