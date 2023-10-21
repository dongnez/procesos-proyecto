import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "src/pages/app/AppLayout";
import { BaseInicial } from "src/pages/BaseInicial";
import { ErrorPage } from "src/pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseInicial />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <AppLayout/>,
    children: [
      {
        path: "",
        element: <h1>Home</h1>,
      },
      {
        path: "test",
        element: <h1>TEST</h1>,
      },

    ]
  }
]);