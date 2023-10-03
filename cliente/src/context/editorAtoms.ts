import { atom, useAtom } from "jotai";
import { LetterPropsStyle } from "src/interfaces/LettersTypes";

export const letterEditorAtom = atom<LetterPropsStyle>({})

export const useLetterEditorAtom = ()=>{
	return useAtom(letterEditorAtom)
}