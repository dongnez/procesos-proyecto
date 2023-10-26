import { ThemeProvider } from "src/context/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "src/router/router";
import { ErrorPage } from "src/pages/ErrorPage";
import { AuthProvider } from "src/context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="w-full h-[100dvh] bg-background text-foreground">
          <RouterProvider router={router} fallbackElement={<ErrorPage />} />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
