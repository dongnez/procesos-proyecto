import { LetterPropsKeys } from "src/interfaces/LettersTypes";
import { useLetterEditorAtom } from "src/context/editorAtoms";

type BasicComponentType = "slider" | "colorPicker" | "text";

type BasicLetterSetting = {
  item: LetterPropsKeys;
  componentType: BasicComponentType
};


export const PanelBasics = () => {
  const [letterEditor, setLetterEditor] = useLetterEditorAtom();

  const basicSettings: BasicLetterSetting[] = [
	{
		item:"fontSize",
		componentType:"slider"
	}
];

  return (
	<div>
		{basicSettings.map((item)=>{

			return(
				<>
					<p className="">{item.item}</p>

				</>
			)
		})}
	</div>
  ) 
};


const ComponentSelector = ({component}:{
	component:BasicComponentType
})=>{
	
	return(<></>)
}