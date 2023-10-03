import { ReactNode, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/@/components/ui/accordion";
import { PanelBasics } from "src/modules/letterEditor/PanelBasics";

export type LetterPanelEditorsType = {
  category: string;
  component: ReactNode;
};

export const LetterPanel = ({
  setLletterStyle,
}: {
  setLletterStyle: (any: any) => any;
}) => {
	
  //Components in Panel
  const collapse: LetterPanelEditorsType[] = useMemo(
    () => [
      {
        category: "Basics",
        component: <PanelBasics />,
      },
    ],
    []
  );

  return (
    <div className="w-[350px] h-full overflow-hidden bg-yellow-200">
      {collapse.map((item) => (
		<section className="p-2">
			<h3 className="text-2xl">{item.category}</h3>
			<div className="w-full h-[1px] bg-black/20"/>
			{item.component}
		</section>
      ))}
    </div>
  );
};
