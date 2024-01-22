import { Outlet } from "react-router-dom";
import { RightBar } from "src/pages/app/RightBar";
// import { NavBar } from "src/modules/header/NavBar";
// import { componentMeasures } from "src/constants/compontents";

import { LeftBar } from "src/pages/app/LeftBar";
import { BottomNavBar } from "src/pages/app/BottomNavBar";
import { useCloseAll } from "src/hooks/useCloseAll";
import { useDeviceSm } from "src/hooks/useDevice";
import { DialogStack } from "src/components/dialogs/DialogStack";

export const AppLayout = () => {
  const { close } = useCloseAll();
  const isSm = useDeviceSm();
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

      <div className="relative h-full w-full sm:py-4 flex flex-col  overflow-hidden">
        <div className="relative flex-1 flex flex-row">
          <LeftBar />

          <section
            onClick={() => {
              if (isSm) close();
            }}
            style={{
              height: `calc(100dvh - ${55}px)`,
            }}
            className="h-full flex-1 px-1 sm:px-5 overflow-y-auto overflow-x-hidden py-2 sm:pt-0 ">
            <Outlet />
          </section>

          <RightBar />
        </div>

        <BottomNavBar />
      </div>
      
      <DialogStack />
    </div>
  );
};
