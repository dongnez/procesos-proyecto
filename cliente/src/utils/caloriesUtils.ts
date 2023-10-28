
export const calculateCalories = (macros: { proteins?: number; carbs?: number; fats?: number }) => {
	  const Kcals = (macros?.proteins || 0) * 4 + (macros?.carbs || 0) * 4 + (macros?.fats || 0) * 9;	

	  return parseFloat(Kcals.toFixed(2));
}