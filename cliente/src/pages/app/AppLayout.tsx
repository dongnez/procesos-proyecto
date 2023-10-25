import { Outlet } from "react-router-dom";
import { NavBar } from "src/modules/header/NavBar";
import { componentMeasures } from "src/constants/compontents";
import { Sidebar } from "src/pages/app/Sidebar";

export const AppLayout = () => {

  return (
    <div
      className="h-full bg-background"
      style={{
        height: `calc(100dvh - ${componentMeasures.navbarHeight}px)`,
        minHeight: `calc(100dvh - ${componentMeasures.navbarHeight}px)`,
      }}>
      <NavBar className="" />
      <div className="h-full flex ">

        <Sidebar />

        <section className="h-full bg-accent w-10 flex-1">
      		<Outlet />
        </section>
      </div>
    </div>
  );
};
