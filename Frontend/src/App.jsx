import React from "react";

import {createBrowserRouter,RouterProvider} from "react-router-dom";


import ProfilePage from "./components/ProfilePage/ProfilePage"

const router = createBrowserRouter([
  {
    path: "/ProfilePage",
    element: <ProfilePage />,
  },
  {
    path: "/",
    element: <h1>Home Page</h1>,
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
