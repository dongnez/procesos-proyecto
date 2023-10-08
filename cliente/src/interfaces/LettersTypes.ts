export type LetterType = {
	text:string
	animation?: string
	letterStyle?:LetterPropsStyle
}

export type LetterPropsStyle = {
	fontSize?: number
	color?:string
}

export type LetterPropsKeys = keyof LetterPropsStyle;