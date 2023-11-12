import React, { HTMLAttributes, useState } from "react";
import { cn } from "src/@/lib/utils";

export const Card = ({
  front,
  back,
  color="bg-black/80",
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  front: React.ReactNode;
  back: React.ReactNode;
  color?: string;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      {...rest}
      onClick={() => setIsFlipped(!isFlipped)}
      className={cn("relative", className)}>
      <div
        className={`
		w-full
		h-full
		absolute top-0 right-0	
		${isFlipped && "[transform:rotateY(180deg)]"} [backface-visibility:hidden]  duration-500
		`}>
        {front}
      </div>

      <div className={` w-full h-full absolute top-0 right-0
	   rounded-xl
     ${color}
    [backface-visibility:hidden] 
    [transform:rotateY(180deg)] duration-500
	  `}
    style={{
      transform: !isFlipped ? "rotateY(180deg)": "rotateY(0deg)",
    }}
    >{back}</div>

    </div>
  );
};
