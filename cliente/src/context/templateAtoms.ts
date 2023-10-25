import {atom, useAtom,} from 'jotai'
import {atomFamily} from 'jotai/utils'
import { TemplateInterface } from 'src/interfaces/TemplateInterfaces'

export const templateAtomsFamily = atomFamily((id: string) => atom<TemplateInterface | null>(null))

export const useTemplateAtoms = (id:string)=>{
  return useAtom(templateAtomsFamily(id));	
}
