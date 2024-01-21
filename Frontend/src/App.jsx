import React from "react";

import {createBrowserRouter,RouterProvider} from "react-router-dom";


import ProfilePage from "./components/ProfilePage/ProfilePage"
import HomePage from "./components/HomePage/HomePage"
import Signup_Login_Form from "./components/Signup_Login_Form/Signup_Login_Form"

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
