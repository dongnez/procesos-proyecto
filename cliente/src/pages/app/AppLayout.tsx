import { Outlet } from "react-router-dom";
import { NavBar } from "src/modules/header/NavBar";
import Cookies from "js-cookie";
import { componentMeasures } from "src/constants/compontents";

export const AppLayout = () => {
  const nickValue = Cookies.get("nick");

  return (
    <div
      className="h-full bg-background"
      style={{
        height: `calc(100vh - ${componentMeasures.navbarHeight}px)`,
        minHeight: `calc(100vh - ${componentMeasures.navbarHeight}px)`,
      }}>
      <NavBar className="" />
      <div className="h-full flex ">
        <section className="bg-card h-full w-[200px]">
          <p>List</p>
        </section>

        <section className="h-full bg-accent w-10 flex-1">
          <h1 className="text-foreground text-4x">
            Bienvenido: {nickValue}{" "}
      		<Outlet />
          </h1>
        </section>
      </div>
    </div>
  );
};
