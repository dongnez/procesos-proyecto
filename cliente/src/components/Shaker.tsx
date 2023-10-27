import { HTMLAttributes } from "react";
import { FoodInterface } from "src/interfaces/FoodInterfaces";
import { Button } from "src/@/components/ui/button";
import { Heart, Repeat, } from "react-feather";

export const Shaker = ({
  food,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  food: FoodInterface[] | null;
}) => {

  const selectedFood = food?.[0] || null;

  return (
    <div {...rest} className="flex flex-col">
      
      {selectedFood ? 
      (
      <div className="relative w-[300px] h-[300px] mx-auto sm:hover:scale-110 sm:hover:translate-y-[-10px] duration-150">
        <h3 className="absolute top-1 right-0 left-0 text-center font-bold text-3xl text-white bg-black/20 w-fit mx-auto rounded-full py-1 px-4">
          {selectedFood.name}
        </h3>
        <img
          src={selectedFood.image}
          alt={selectedFood.name}
          className="w-full h-full object-cover rounded-xl "
        />
      </div>
      ):(
        <div className="w-[300px] h-[300px] mx-auto bg-card rounded-xl rounded-">
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-2xl">No hay comida</p>
          </div>
        </div>
      )}

      <Button className=" z-10 rounded-full mx-auto w-fit text-2xl p-6 mt-[-5px]">
        <Repeat className="" size={18} />
        <p className="px-10">Shake It</p>
        <Heart className="" size={18} />
      </Button>
    </div>
  );
};
