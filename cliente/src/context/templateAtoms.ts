import {useAtom} from 'jotai'
import { atomFamily,atomWithStorage } from 'jotai/utils'
import { TemplateInterfaceClient } from 'src/interfaces/TemplateInterfaces'

export const templateAtomsFamily = atomFamily((id: string) => atomWithStorage<TemplateInterfaceClient | null>(id,null))

export const useTemplateAtoms = (id:string)=>{
  return useAtom(templateAtomsFamily(id));	
}
