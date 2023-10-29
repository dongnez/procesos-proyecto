import { Outlet } from "react-router-dom";
import { RightBar } from "src/pages/app/RightBar";
// import { NavBar } from "src/modules/header/NavBar";
// import { componentMeasures } from "src/constants/compontents";

import { LeftBar } from "src/pages/app/LeftBar";
import { BottomNavBar } from "src/pages/app/BottomNavBar";
import { Toaster } from "src/@/components/ui/toaster";

export const AppLayout = () => {
  return (
    <div
      className="h-full bg-background"
      style={
        {
          // height: `calc(100dvh - ${componentMeasures.navbarHeight}px)`,
          // minHeight: `calc(100dvh - ${componentMeasures.navbarHeight}px)`,
        }
      }>
      {/* <NavBar className="" /> */}

      <div className="relative h-full w-full sm:py-4 flex flex-col  sm:flex-row overflow-hidden">
        <LeftBar />

        <section className="h-full flex-1 px-5">
          <Outlet />
        </section>

        <RightBar />

        <BottomNavBar />
      </div>
      <Toaster />
    </div>
  );
};
