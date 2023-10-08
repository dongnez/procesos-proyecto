import { LetterPropsKeys } from "src/interfaces/LettersTypes";
import { useLetterEditorAtom } from "src/context/editorAtoms";
import { Slider } from "src/@/components/ui/slider";

type BasicComponentType = "slider" | "colorPicker" | "text";

type BasicLetterSetting = {
  item: LetterPropsKeys;
  componentType: BasicComponentType;
};

export const PanelBasics = () => {
  const [letterEditor, setLetterEditor] = useLetterEditorAtom();

  const basicSettings: BasicLetterSetting[] = [
    {
      item: "fontSize",
      componentType: "slider",
    },
  ];

  return (
    <div>

      <input
	  	value={letterEditor.text}
        onChange={(e) => {
          const value = e.target.value;
          setLetterEditor((change) => {
            return {
              ...change,
              text: value,
            };
          });
        }}
      />

      {basicSettings.map((item) => {
        return (
          <>
            <p className="">{item.item}</p>
            <ComponentSelector
              component={item.componentType}
              callbackValue={(value) => {
                setLetterEditor((letterEditorChange) => {
                  return {
                    ...letterEditorChange,
                    letterStyle: {
                      ...letterEditorChange.letterStyle,
                      [item.item]: value,
                    },
                  };
                });
              }}
            />
          </>
        );
      })}
    </div>
  );
};

const ComponentSelector = ({
  component,
  callbackValue,
}: {
  component: BasicComponentType;
  callbackValue: (value: string | number | boolean) => void;
}) => {
  if (component === "slider") {
    return (
      <Slider
        defaultValue={[20]}
        min={12}
        max={200}
        onValueChange={(valueChange) => {
          const value = valueChange[0];
          callbackValue(value);
        }}
      />
    );
  }

  return <></>;
};
