import { ThemeProvider } from "src/context/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "src/router/router";
import { ErrorPage } from "src/pages/ErrorPage";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div 
        className="w-full h-[100dvh] bg-background text-foreground">

        <RouterProvider
          router={router}
          fallbackElement={<ErrorPage />}
        />

      </div>
    </ThemeProvider>
  );
}

export default App;
