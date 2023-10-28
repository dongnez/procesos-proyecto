import { HTMLAttributes, useState } from "react";
import { FoodInterface } from "src/interfaces/FoodInterfaces";
import { Button } from "src/@/components/ui/button";
import { Heart, Repeat } from "react-feather";
import { motion } from "framer-motion";

const zoomInAndShakeVariants = {
  initial: { scale: 1, transition: { duration: 0.4 ,ease: "easeInOut"} },
  animate: { scale: 1.2, transition: { duration: 1, ease: "easeInOut" } },
  exit: { scale: 1 },
};

const shakeAndResetVariants = {
  initial: { scale: 1 },
  animate: {
    scale: 1.2,
    x: [0,-2, 2, -5, 5, -6, 6,-12, 12,-13,13, -18,18, -10, 10, -8, 8, -5, 5, -2, 2, 1],
    y: [0,-2, 2, -5, 5, -6, 6,-8, 8,-9,9, -9,9, -8, 8, -6, 6, -5, 5, -2, 2, 1],
    transition: { duration: 2, ease: "easeInOut",  },
  },
};

export const Shaker = ({
  food,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  food: FoodInterface[] | null;
}) => {
  const selectedFood = food?.[0] || null;

  const [shake, setShake] = useState(false);


  return (
    <div {...rest} className="flex flex-col">
      <motion.div
        animate={shake ? "animate" : "initial"}
        variants={shake ? shakeAndResetVariants : zoomInAndShakeVariants}
        onAnimationComplete={() => {
          setShake(false)
        }}
        className="relative w-[300px] h-[300px] bg-card rounded-xl mx-auto">
        {selectedFood ? (
          <>
            <h3 className="absolute top-1 right-0 left-0 text-center font-bold text-3xl text-white bg-black/20 w-fit mx-auto rounded-full py-1 px-4">
              {selectedFood.name}
            </h3>
            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              className="w-full h-full object-cover rounded-xl "
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-2xl">No hay comida</p>
          </div>
        )}
      </motion.div>

      <Button
        onClick={() => {
          setShake(!shake);
        }}
        className=" z-10 rounded-full mx-auto w-fit text-2xl p-6 mt-[-5px]">
        <Repeat className="" size={18} />
        <p className="px-10">Shake It</p>
        <Heart className="" size={18} />
      </Button>
    </div>
  );
};
