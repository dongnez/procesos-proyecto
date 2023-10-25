import { createBrowserRouter } from "react-router-dom";
import { Template } from "src/pages/app/Template";
import { AppLayout } from "src/pages/app/AppLayout";
import { Login } from "src/pages/auth/Login";
import { Register } from "src/pages/auth/Register";
import { ErrorPage } from "src/pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <p>Hey :)</p>,
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
    element: <AppLayout/>,
    children: [
      {
        path: "template/:templateId",
        element: <Template />,
      },
      {
        path: "test",
        element: <h1>TEST</h1>,
      },

    ]
  }
]);