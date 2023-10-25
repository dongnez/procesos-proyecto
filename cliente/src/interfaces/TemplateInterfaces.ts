import { FoodInterface } from "src/interfaces/FoodInterfaces"

export interface TemplateInterface {
	id:string
	visibility: "public" | "private" 
	name: string
	users: [{
		userId: string
		role: string
	}]
	food: Array<FoodInterface>
}