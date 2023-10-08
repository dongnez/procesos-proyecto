import { atom, useAtom, useAtomValue } from "jotai";
import { LetterType } from "src/interfaces/LettersTypes";

export const letterEditorAtom = atom<LetterType>({
	text:""
})

export const useLetterEditorAtom = ()=>{
	return useAtom(letterEditorAtom);
}

export const useGetLetterEditorAtom = ()=>{
	return useAtomValue(letterEditorAtom);
}