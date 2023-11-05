import { HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { openLeftSideBarAtom } from "src/context/openLayoutsAtoms";
import { useDeviceSm } from "src/hooks/useDevice";
import { cn } from "src/@/lib/utils";
import { NavLink } from "react-router-dom";
import { Home, User2, Settings } from "lucide-react";

export const LeftBar = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  const navLinks = [
    { name: "Home", icon: <Home />, path: "/app/" },
    { name: "Perfil", icon: <User2 />, path: "/app/profile" },
    { name: "Configuración", icon: <Settings />, path: "/app/settings" },
  ];

  const [open, _] = useAtom(openLeftSideBarAtom);

  //Detect is sm
  const isSm = useDeviceSm();

  return (
    <section
      {...rest}
      className={cn(
        "bg-card h-full w-[300px] sm:w-[200px] py-3 pl-4  rounded-r-3xl  duration-300 z-20 left-0 top-0 flex flex-col gap-10 justify-center",
        "absolute sm:relative",
        isSm && (open ? `opacity-100` : `opacity-0`),
        className
      )}
      style={{
        display: isSm ? "absolute" : "flex",
        transform: `translateX(${isSm ? (open ? 0 : -300) : 0}px)`,
      }}>
      {navLinks.map((link, index) => (
        <NavLink
          to={link.path}
          key={index}
          className={({ isActive, isPending }) => {
            return cn(
              "flex items-center space-x-2 py-3 pl-3 rounded-l-lg hover:bg-background/80 duration-200",
              isPending ? "pending" : isActive ? "bg-background" : ""
            );
          }}>
          {link.icon}
          <span>{link.name}</span>
        </NavLink>
      ))}
    </section>
  );
};
