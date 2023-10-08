import { LetterPanel } from "src/modules/letterEditor/LetterPanel";
import { Letter } from "src/components/Letter";
import { useGetLetterEditorAtom } from "src/context/editorAtoms";

export const LetterEditor = () => {
	const letterEditor = useGetLetterEditorAtom();

  return (
	<div className="flex h-full w-full ">
		<div
		 className="flex-1 flex  h-full w-full justify-center items-center">
			<Letter text={letterEditor.text} letterStyle={letterEditor.letterStyle}/>
		</div>
		<LetterPanel />
	</div>
  )
}
