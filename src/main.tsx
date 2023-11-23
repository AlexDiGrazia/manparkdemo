import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./default.css";
import "./responsive.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./Routes/Root";
import { SignUp } from "./SignUp";
import { ErrorPage } from "./ErrorPage";
import { Profile } from "./Routes/Profile";
import { Toaster } from "react-hot-toast";
import { Home } from "./Routes/Home";
import { UserProvider } from "./Providers/UserProvider";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/user-login",
        element: <SignUp />,
      },
      {
        path: "user/:userId",
        element: <Profile />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
