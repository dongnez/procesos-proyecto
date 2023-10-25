import { TemplateInterface } from "src/interfaces/TemplateInterfaces";
import { useTemplateAtoms } from "src/context/templateAtoms";

export const TemplateListItem = ({
  template,
}: {
  template: TemplateInterface;
}) => {
  const [_, setTemplateAtom] = useTemplateAtoms(template.id);

  return (
    <div
      onClick={() => {
        setTemplateAtom(template);

      }}
      className="hover:bg-secondary p-2 rounded-md flex">
      <p>{template.name}</p>
    </div>
  );
};
