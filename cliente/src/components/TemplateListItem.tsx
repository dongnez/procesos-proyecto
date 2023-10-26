import { TemplateInterface } from "src/interfaces/TemplateInterfaces";
import { useTemplateAtoms } from "src/context/templateAtoms";
import { useNavigate } from "src/hooks/useNavigate";

export const TemplateListItem = ({
  template,
}: {
  template: TemplateInterface;
}) => {
  const [_, setTemplateAtom] = useTemplateAtoms(template._id);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        setTemplateAtom(template);
        navigate("template/" + template._id);
      }}
      className="hover:bg-secondary p-2 rounded-md flex cursor-pointer">
      <p>{template.name}</p>
    </div>
  );
};
