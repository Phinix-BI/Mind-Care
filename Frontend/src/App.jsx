import React from "react";

import {createBrowserRouter,RouterProvider} from "react-router-dom";


import ProfilePage from "./components/ProfilePage/ProfilePage"
import SignupPage from "./components/SignupPage/SignupPage"
import LoginPage from "./components/LoginPage/LoginPage"
import HomePage from "./components/HomePage/HomePage";

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
  },
  {
    path: "/Signup_Login_Form",
    element:<Signup_Login_Form/>,
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
