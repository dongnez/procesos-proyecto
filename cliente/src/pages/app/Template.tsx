import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TemplateInterface } from "src/interfaces/TemplateInterfaces"
import { useTemplateAtoms } from "src/context/templateAtoms"

export const Template = () => {

   const { templateId } = useParams()
   const [template, setTemplate] = useState<TemplateInterface | null>(null)
   const [templateAtom,_] = useTemplateAtoms(templateId || "")


   useEffect(() => {
	//Si no esta en cache, lo pido al servidor
	if(templateAtom){
		setTemplate(templateAtom)
		return 
	} 

	//Fetch from server
				

   }, [templateAtom])


   if(!template) return <div>Loading...</div>

  return (
	<div className='w-full h-full bg-background'>
		<section className='w-full h-1/2 '>
			Template {templateId}

			<p>Name {template?.name}</p>
			<p>Visibility {template?.visibility}</p>

		</section>

		
	</div>
  )
}
