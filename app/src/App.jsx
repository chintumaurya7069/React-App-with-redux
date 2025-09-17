import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    <Toaster />
    </>
  )
};

export default App;
