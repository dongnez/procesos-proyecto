import { createBrowserRouter } from "react-router-dom";
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
    element: <></>,
  }
]);