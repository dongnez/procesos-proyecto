import { Outlet } from "react-router-dom";
import { RightBar } from "src/pages/app/RightBar";
// import { NavBar } from "src/modules/header/NavBar";
// import { componentMeasures } from "src/constants/compontents";
import { LeftBar } from "src/pages/app/LeftBar";

export const AppLayout = () => {

  return (
    <div
      className="h-full bg-background"
      style={{
        // height: `calc(100dvh - ${componentMeasures.navbarHeight}px)`,
        // minHeight: `calc(100dvh - ${componentMeasures.navbarHeight}px)`,
      }}>
      {/* <NavBar className="" /> */}
      <div className="h-full py-4 flex ">

        <LeftBar />

        <section className="h-full bg-accent w-10 flex-1">
      		<Outlet />
        </section>

        <RightBar />
      </div>
    </div>
  );
};
