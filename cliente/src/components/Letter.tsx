import { HTMLAttributes, useMemo, useRef } from "react";
import { LetterType } from "src/interfaces/LettersTypes";

export const Letter = ({
  text,
  animation,
  letterStyle,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & LetterType) => {
	
  return (
	<div className="relative bg-red-400 overflow-hidden group px-0">
		<span
			{...rest}
			style={{...letterStyle}}
		  	
			>
			{text}
		</span>
	</div>
  );
};
