import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";
import { AddContact } from "./pages/AddContact";
import { Chat } from "./pages/Chat";

export const authRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }
]);

export const appRoutes = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/add-contact",
    element: <AddContact />,
  },
  {
    path: "/chat/:contactId",
    element: <Chat />,
  },
]);
