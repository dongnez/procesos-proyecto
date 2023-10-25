import { useParams } from "react-router-dom"
import { useTemplateAtoms } from "src/context/templateAtoms"

export const Template = () => {

   const { templateId } = useParams()

   const [template,_] = useTemplateAtoms(templateId || "")


  return (
	<div className='w-full h-full bg-background'>
		Template {templateId}

		<p>Name {template?.name}</p>
		<p>Visibility {template?.visibility}</p>

		
	</div>
  )
}
