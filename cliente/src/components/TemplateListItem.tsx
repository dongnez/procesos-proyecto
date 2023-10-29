import { TemplateInterface } from "src/interfaces/TemplateInterfaces";
import { useTemplateAtoms } from "src/context/templateAtoms";
import { useNavigate } from "src/hooks/useNavigate";
import { useParams } from "react-router-dom";

export const TemplateListItem = ({
  template,
}: {
  template: TemplateInterface;
}) => {
  const [_, setTemplateAtom] = useTemplateAtoms(template._id);
  const navigate = useNavigate();
  const { templateId } = useParams();

  return (
    <div
      onClick={() => {
        setTemplateAtom(template);
        navigate("template/" + template._id);
      }}
      className={`hover:bg-secondary p-2 rounded-md flex cursor-pointer duration-300
      ${templateId === template._id && "bg-secondary/90"}`}>
      <p>{template.name}</p>
    </div>
  );
};
