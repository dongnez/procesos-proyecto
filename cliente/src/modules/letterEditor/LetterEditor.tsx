import { useState } from "react";
import { LetterPanel } from "src/modules/letterEditor/LetterPanel";
import { Letter } from "src/components/Letter";

export const LetterEditor = () => {
	const [letterStyle,setLetterStyle] = useState({
	fontSize:40,
	color: "black",
	})

  return (
	<div className="flex h-full w-full ">
		<div
		 className="flex-1 flex  h-full w-full justify-center items-center">
			<Letter text="BABY ARE U LOST ?" letterStyle={letterStyle}/>
		</div>
		<LetterPanel setLletterStyle={setLetterStyle}/>
	</div>
  )
}
