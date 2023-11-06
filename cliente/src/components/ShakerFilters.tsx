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
	<div className="border-2 border-primary p-1 flex items-center max-w-[400px] mx-auto mt-4 rounded-sm">

		<section className="flex-1">
			
		</section>

		<div className="w-[1px] h-[50px] bg-primary/20 mx-2"/>	

		<SelectFoodTime primaryColor onSelect={(value) => console.log(value)} />	

	</div>
  )
}
