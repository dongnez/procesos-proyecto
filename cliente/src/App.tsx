import { ThemeProvider } from "src/context/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "src/router/router";
import { ErrorPage } from "src/pages/ErrorPage";
import { AuthProvider } from "src/context/AuthProvider";
import { Toaster } from "src/@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <div className="w-full h-[100dvh] bg-background text-foreground">
            <RouterProvider router={router} fallbackElement={<ErrorPage />} />
          </div>
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
