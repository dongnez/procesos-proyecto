
import { HTMLAttributes } from "react";
import { cn } from "src/@/lib/utils";

export const LeftBar = ({className,...rest}:HTMLAttributes<HTMLDivElement>) => {



  return (
    <section {...rest} className={cn("bg-card h-full w-[200px] py-3 px-4  rounded-r-3xl hidden sm:block",className)}>

    </section>
  );
};
