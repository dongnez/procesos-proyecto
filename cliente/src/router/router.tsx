import { createBrowserRouter } from "react-router-dom";
import { Template } from "src/pages/app/Template";
import { AppLayout } from "src/pages/app/AppLayout";
import { Login } from "src/pages/auth/Login";
import { Register } from "src/pages/auth/Register";
import { ErrorPage } from "src/pages/ErrorPage";
import { ProtectedRoute } from "src/context/AuthProvider";
import { Home } from "src/pages/home/Home";

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
        element: <p>Template Settings</p>,
      },
      {
        path: "test",
        element: <h1>TEST</h1>,
      },
    ],
  },
]);
