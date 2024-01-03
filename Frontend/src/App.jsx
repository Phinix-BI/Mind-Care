import React from "react";

import {createBrowserRouter,RouterProvider} from "react-router-dom";



import ProfilePage from "./components/ProfilePage/ProfilePage"
import SignupPage from "./components/SignupPage/SignupPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home Page</h1>,
  },
  {
    path: "/ProfilePage",
    element: <ProfilePage />,
  },
  {
    path: "/SignupPage",
    element: <SignupPage />,
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
