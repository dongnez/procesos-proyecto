import { HTMLAttributes } from "react"
import { FoodTimeType } from "src/interfaces/FoodInterfaces"
import { SelectFoodTime } from "src/components/SelectFoodTime"

export const ShakerFilters = ({onFilterSelect,...res}:HTMLAttributes<HTMLDivElement> & {
	onFilterSelect: (filter: FoodTimeType) => void
}) => {

	 //Filtrar comidas por 
	 // - Calorías
	 // - Proteínas
	 // - Carbohidratos
	 // - Grasas

	 // - Desayuno
	 // - Comida
	 // - Cena
	 // - Snack

	 // - Vegetariano
	 // - Vegano
	 // - Sin gluten
	 // - Sin lactosa
	 // - Sin azúcar
	 // - Sin frutos secos
	 // - Sin huevo


  return (
	<div {...res} className="border-2 border-primary p-1 flex items-center max-w-[400px] mx-auto mt-4 rounded-sm">

		<section className="flex-1">
			
		</section>

		<div className="w-[1px] h-[50px] bg-primary/20 mx-2"/>	

		<SelectFoodTime className="w-[130px]" primaryColor onSelect={(value) => onFilterSelect(value)} />	

	</div>
  )
}
