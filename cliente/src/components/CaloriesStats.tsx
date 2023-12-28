import { HTMLAttributes, useMemo } from "react";

export const CaloriesStats = ({
  macros,
  className,
  isCompact,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  isCompact?: boolean;
  macros: {
    kcal: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
}) => {
  const result = useMemo(
    () =>
      Object.entries(macros).map(([key, value]) => {
        return { key, value };
      }),
    [macros]
  );
  return (
    <div {...rest} className={`flex ${isCompact ?"gap-2":"gap-5"} ${className}`}>
      {result.map(({ key, value }) => {
        return <MacroStat isCompact={isCompact} key={key} number={value} type={key as any} />;
      })}
    </div>
  );
};

export const MacroStat = ({
  number,
  isCompact,
  type,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  number: number;
  isCompact?: boolean;
  type: "carbs" | "proteins" | "fats" | "kcal";
}) => {
  const name =
    type === "carbs"
      ? "Carbohidratos"
      : type === "proteins"
      ? "Proteinas"
      : type === "fats"
      ? "Grasas"
      : "Calorias";
    

  function selectBarColor() {
    if(type === "carbs") return "bg-carbs"
    if(type === "proteins") return "bg-proteins"
    if(type === "fats") return "bg-fats"
    if(type === "kcal") return "bg-kcal"
  }

  return (
    <div {...rest} className={`flex  ${isCompact ? 'flex-col gap-1':'gap-2'}`}>
		<div className={`h-full ${!isCompact && "py-1"}`}>
      		<div className={` rounded-full mx-auto
          ${isCompact ?" w-[40px] h-[5px]" : "w-[5px] h-full"}
          ${selectBarColor()}`} />
		</div>
      <section>
        <p className={`font-semibold ${isCompact ? 'text-sm text-center':'text-lg'}`}>{number}</p>
        <p className={`text-xs ${isCompact && "text-center"}`}>{name}</p>
      </section>
    </div>
  );
};
