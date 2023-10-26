import { FoodInterface } from "src/interfaces/FoodInterfaces"

export interface TemplateInterface {
	_id:string
	visibility: "public" | "private" 
	name: string
	users: Array<{
		userId: string
		role: string
	}>
	food: Array<FoodInterface>
}