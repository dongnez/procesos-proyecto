import { Navigate, createBrowserRouter } from "react-router-dom";
import { Template } from "src/pages/app/Template";
import { AppLayout } from "src/pages/app/AppLayout";
import { Login } from "src/pages/auth/Login";
import { Register } from "src/pages/auth/Register";
import { ErrorPage } from "src/pages/ErrorPage";
import { ProtectedRoute } from "src/context/AuthProvider";
import { Home } from "src/pages/home/Home";
import {Home as HomeApp} from 'src/pages/app/home/Home'
import { TemplateSettings } from "src/pages/app/TemplateSettings";
import { Calendar } from "src/pages/calendar/Calendar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/app",
    element: 
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <HomeApp />,
        index: true,
      },
      {
        path: "template/:templateId",
        element: <Template />,
      },
      {
        path: "template/:templateId/food/:foodId",
        element: <Template />,
      },
      {
        path: "template/:templateId/food/",
        element: <Template />,
      },
      {
        path: "template/:templateId/settings",
        element: <TemplateSettings />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "settings",
        element: <p>Configuracion</p>,
      },
      
    ],
  },
]);
