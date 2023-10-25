import { useParams } from "react-router-dom"
import { useTemplateAtoms } from "src/context/templateAtoms"

export const Template = () => {

   const { templateId } = useParams()

   const [template,setTemplate] = useTemplateAtoms(templateId || "")

   console.log("Now",template)

		

  return (
	<div className='w-full h-full bg-background'>
		Template {templateId}
		<p>{template?.name}</p>
		<p>{template?.visibility}</p>

		<button> SET TEMPLATE</button>
	</div>
  )
}
