import { HTMLAttributes, } from "react";
import { useAtom } from "jotai";
import { openLeftSideBarAtom } from "src/context/openLayoutsAtoms";
import { useDeviceSm } from "src/hooks/useDevice";
import { cn } from "src/@/lib/utils";

export const LeftBar = ({className,...rest}:HTMLAttributes<HTMLDivElement>) => {

/*   const navLinks = [
    {name:"Home",icon:"home",path:"/app/home"},
    {name:"Perfil",icon:"user",path:"/app/profile"},
    {name:"Configuración",icon:"cog",path:"/app/settings"},
  ] */

    const [open,_] = useAtom(openLeftSideBarAtom)

    //Get windows height
    // const width = window.innerWidth > 375 ? window.innerWidth : 375;
    //Detect is sm
    const isSm = useDeviceSm()


  return (
    <section {...rest}
     className={cn("bg-card h-full w-[300px] sm:w-[200px] py-3 px-4  rounded-r-3xl  duration-300 z-20 left-0 top-0",
    "absolute sm:relative",
    isSm && (open ? `opacity-100`:`opacity-0`),
    className)}
    style={{
      display: isSm ? "absolute" : "block",
      transform: `translateX(${isSm ? (open ? 0 : -300) : 0}px)`,
    }}>

    </section>
  );
};
