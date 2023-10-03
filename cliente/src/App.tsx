import { NavBar } from "src/modules/header/NavBar";
import { LetterEditor } from "src/modules/letterEditor/LetterEditor";
import { ThemeProvider } from "src/context/ThemeProvider";
import { componentMeasures } from "src/constants/compontents";
// import { Button } from "./@/components/ui/button";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div 
      style={{
        height:`calc(100vh - ${componentMeasures.navbarHeight}px)`,
        minHeight:`calc(100vh - ${componentMeasures.navbarHeight}px)`,
      }} 
      className="w-full">

        <NavBar/> 
        <LetterEditor />

      </div>
    </ThemeProvider>
  );
}

export default App;
