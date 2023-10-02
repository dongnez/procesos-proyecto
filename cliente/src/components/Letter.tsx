import { HTMLAttributes } from "react";
import { LetterType } from "src/interfaces/LettersTypes";

export const Letter = ({
  text,
  animation,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & LetterType) => {

  return (
	<div className="relative w-[200px] h-10	 bg-red-400 overflow-hidden group">
		<span {...rest} className="absolute translate-x-[400px] group-hover:translate-x-[0px] group-hover:delay-0 delay-500 duration-700 ease-in-out" >
			{text}
		</span>
	</div>
  );
};
