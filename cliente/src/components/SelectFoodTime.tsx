import { FoodTimeType } from "src/interfaces/FoodInterfaces";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  //   SelectLabel,
  SelectTrigger,
  SelectValue,
} from "src/@/components/ui/select";
import { Asterisk, EggFried, Moon, Sandwich, Sun } from "lucide-react";
import { HTMLAttributes } from "react";
import { cn } from "src/@/lib/utils";

type FoodTimeSelect = {
  type: FoodTimeType;
  icon: React.ReactNode;
  name: string;
};

export function SelectFoodTime({
  onSelect,
  primaryColor = false,
  className,
  ...res
}: HTMLAttributes<HTMLButtonElement> &{
  onSelect: (foodTime: FoodTimeType) => void;
  primaryColor?: boolean;
}) {
  const foodTimeOptions: Array<FoodTimeSelect> = [
    {
      type: "all",
      icon: <Asterisk className="w-4 h-4" />,
      name: "Todos",
    },
    {
      type: "breakfast",
      icon: <EggFried className="w-4 h-4" />,
      name: "Desayuno",
    },
    {
      type: "lunch",
      icon: <Sun className="w-4 h-4" />,
      name: "Comida",
    },
    {
      type: "dinner",
      icon: <Moon className="w-4 h-4" />,
      name: "Cena",
    },
    {
      type: "snack",
      icon: <Sandwich className="w-4 h-4" />,
      name: "Snack",
    },
  ];
  return (
    <Select
      onValueChange={(value:FoodTimeType) => onSelect(value)}
      defaultValue="all">
      <SelectTrigger 
      {...res}
	      className={cn(`outline-none focus:ring-[-1px]  w-fit  ${ primaryColor && 'bg-primary text-primary-foreground'}`,
        className)}>
        <SelectValue placeholder="Select a fruit"/>
      </SelectTrigger>
      <SelectContent className={`${ primaryColor && 'bg-primary text-primary-foreground'}`}>
        <SelectGroup>
          {/* <SelectLabel >Fruits</SelectLabel> */}
          {foodTimeOptions.map((item, index) => {
            return (
              <SelectItem className="border-nonw" key={index} value={item.type}>
                <span className=" flex gap-2 items-center mr-1">{item.icon} {item.name}</span>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
