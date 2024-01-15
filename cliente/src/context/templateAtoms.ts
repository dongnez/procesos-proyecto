import {useAtom} from 'jotai'
import { atomFamily,atomWithStorage } from 'jotai/utils'
import { TemplateInterfaceClient } from 'src/interfaces/TemplateInterfaces'

export const templateAtomsFamily = atomFamily((id: string) => atomWithStorage<Array<TemplateInterfaceClient>>(id,[]))

export const selectedTemplateAtom = atomWithStorage<TemplateInterfaceClient | null>("selectedTemplate",null)

export const useTemplateList = (id:string)=>{
  return useAtom(templateAtomsFamily(id));	
}

export const useSelectedTemplateAtom = ()=>{
  return useAtom(selectedTemplateAtom);	
}
