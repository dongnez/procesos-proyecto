import { HTMLAttributes, useMemo } from "react";

export const CaloriesStats = ({
  macros,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
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
    <div {...rest} className={`flex gap-3 ${className}`}>
      {result.map(({ key, value }) => {
        return <MacroStat key={key} number={value} type={key as any} />;
      })}
    </div>
  );
};

export const MacroStat = ({
  number,
  type,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  number: number;
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

  return (
    <div {...rest} className="flex gap-2">
		<div className="h-full py-1">
      		<div className={`w-[5px] rounded-full h-full bg-[var(--${type})]`} />
		</div>
      <section>
        <p className="font-semibold text-lg">{number}</p>
        <p className="text-sm">{name}</p>
      </section>
    </div>
  );
};
