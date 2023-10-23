import { ThemeProvider } from "src/context/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "src/router/router";
// import { Button } from "./@/components/ui/button";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div 

      className="w-full h-full">

        <RouterProvider
          router={router}
          fallbackElement={<p>404</p>}
        />

      </div>
    </ThemeProvider>
  );
}

export default App;
