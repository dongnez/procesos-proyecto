import { ThemeProvider } from "src/context/ThemeProvider";
import { Button } from "./@/components/ui/button";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="bg-background min-h-screen h-full w-full ">
        <p className="animate-bounce text-5xl">Proyecto Procesos</p>
        
      </div>
    </ThemeProvider>
  );
}

export default App;
