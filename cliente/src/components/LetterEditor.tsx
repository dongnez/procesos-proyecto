import { Letter } from "src/components/Letter";

export const LetterEditor = () => {
  return (
	<div className="flex h-full w-full ">
		<div className="flex-1 flex  h-full w-full justify-center items-center">
			<Letter text="s"/>
		</div>
		<LetterPanel/>
	</div>
  )
}

export const LetterPanel = () =>{
	return (
		<div className="w-[350px]  h-full bg-yellow-200">



		</div>
	)
}