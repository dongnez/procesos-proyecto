import { HTMLAttributes } from "react";
import { LetterType } from "src/interfaces/LettersTypes";

export const Letter = ({
  text,
  animation,
  letterStyle,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & LetterType) => {
	
  return (
	<div className="relative overflow-hidden group px-0">
		<span
			{...rest}
			style={{...letterStyle}}>
			{text}
		</span>
	</div>
  );
};
