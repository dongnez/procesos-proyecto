import { LetterEditor } from "src/components/LetterEditor";

import { ThemeProvider } from "src/context/ThemeProvider";
// import { Button } from "./@/components/ui/button";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen h-screen w-full ">
        
        <LetterEditor />

      </div>
    </ThemeProvider>
  );
}

export default App;
