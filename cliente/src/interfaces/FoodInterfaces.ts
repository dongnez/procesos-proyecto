export interface FoodInterface {
	id:string
	name:string,
	image:string,
	macros?:{
		kcal:number,
		protein:number,
		carbs:number,
		fats:number,
	}
}