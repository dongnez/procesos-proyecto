import { SelectFoodTime } from "src/components/SelectFoodTime"

export const ShakerFilters = () => {
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
	<div className="border border-primary p-1 flex items-center">

			
		<SelectFoodTime primaryColor onSelect={(value) => console.log(value)} />	

	</div>
  )
}
