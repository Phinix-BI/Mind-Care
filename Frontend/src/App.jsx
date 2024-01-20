import React from "react";

import {createBrowserRouter,RouterProvider} from "react-router-dom";


import ProfilePage from "./components/ProfilePage/ProfilePage"
import SignupPage from "./components/SignupPage/SignupPage"
import LoginPage from "./components/LoginPage/LoginPage"
import HomePage from "./components/HomePage/HomePage";
// import Signup_Login_Form from "./components/Signup_Login_Form/Signup_Login_Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/ProfilePage",
    element: <ProfilePage />,
  },
  {
    path: "/SignupPage",
    element: <SignupPage />,
  },
  {
    path: "/Login",
    element:<LoginPage/>,
  }
 
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
