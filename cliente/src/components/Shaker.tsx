import { HTMLAttributes, useState, useEffect } from "react";
import { FoodInterface } from "src/interfaces/FoodInterfaces";
import { Button } from "src/@/components/ui/button";
import { Heart, Repeat } from "react-feather";
import { HTMLMotionProps, motion, useAnimation } from "framer-motion";
import { Card } from "src/components/Card";
import { CaloriesStats } from "src/components/CaloriesStats";

const zoomInAndShakeVariants = {
  initial: { scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  animate: { scale: 1.2, transition: { duration: 1, ease: "easeInOut" } },
exit: { scale: 1 },
};

const shakeAndResetVariants = {
  initial: { scale: 1 },
  animate: {
    scale: 1.2,
    x: [
      0, -2, 2, -5, 5, -6, 6, -12, 12, -13, 13, -18, 18, -10, 10, -8, 8, -5, 5,
      -2, 2, 1,
    ],
    y: [
      0, -2, 2, -5, 5, -6, 6, -8, 8, -9, 9, -9, 9, -8, 8, -6, 6, -5, 5, -2, 2,
      1,
    ],
    transition: {
      scale: { duration: 0.4, ease: "easeInOut" }, // Duración más corta para el 'scale'
      default: { duration: 1.5, ease: "easeInOut" },
    },
  },
};

export const Shaker = ({
  food,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  food: FoodInterface[] | null;
}) => {
  const [selectedFood, setSelectedFood] = useState(food?.[0] || null);
  const [shake, setShake] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!shake && showParticles)
      setSelectedFood(food?.[Math.floor(Math.random() * food.length)] || null);
  }, [showParticles]);

  return (
    <div {...rest} className="flex flex-col relative ">
      <div
        className="hover:scale-105 ease-in-out w-fit mx-auto duration-500"
        onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          animate={shake ? "animate" : "initial"}
          variants={shake ? shakeAndResetVariants : zoomInAndShakeVariants}
          onAnimationComplete={() => {
            setShake(false);
          }}
          onUpdate={(latest) => {
            if ((latest.scale as number) >= 1.2) {
              // setSelectedFood(food?.[Math.floor(Math.random() * food.length)] || null);
              setTimeout(() => setShowParticles(true), 1200);
            }
          }}
          className="relative w-[300px] h-[300px] bg-card rounded-xl mx-auto">
          {selectedFood ? (
            <>
                <Card
                  className="w-full h-full rounded-xl cursor-default "
                  front={
                    <>
                      <h3
                        className={`absolute top-1 right-0 left-0 text-center font-bold text-3xl text-white bg-black/20 w-fit mx-auto rounded-full py-1 px-4 z-10 
                        ${
                          shake
                            ? "opacity-0 translate-y-[5px]"
                            : "opacity-100 translate-y-0"
                        } duration-500`}>
                        {selectedFood.name}
                      </h3>
                      <motion.img
                        key={selectedFood._id}
                        src={selectedFood.image}
                        alt={selectedFood.name}
                        className={`w-full h-full object-cover rounded-xl z-20 
                        ${shake ? "blur-[1px]" : ""}`}
                        initial={{ opacity: 0.5 }}
                        animate={{
                          opacity: shake ? 0.5 : 1,
                          transition: { duration: 0.6 },
                        }}
                      />
                    </>
                  }
                  back={
                    <div className="p-2 bg-card/70 h-full text-card-foreground rounded-xl flex flex-col">
                      <p className="text-lg -foreground/80 font-semibold "> Descripcion</p>
                      <p className=" [backface-visibility:hidden]  text-justify flex-1">
                        {selectedFood.description || "No hay descripción"}
                      </p>
                      {selectedFood.macros && (<CaloriesStats isCompact macros={selectedFood.macros}  className="mx-auto w-fit my-3"/>)}
                    </div>
                  }
                />
            </>
          ) : (
            <div className={`w-full h-full flex items-center justify-center`}>
              <p className="text-2xl">No hay comida</p>
            </div>
          )}
        </motion.div>
      </div>
      <div className="absolute top-36 left-0 right-0 mx-auto z-20">
        {showParticles &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_, i) => (
            <PuntoAnimado
              key={i}
              onAnimationComplete={() => {
                setTimeout(() => setShowParticles(false), 500);
              }}
            />
          ))}
      </div>

      <Button
        onClick={() => {
          setShake(true);
        }}
        className=" z-10 rounded-full mx-auto w-fit text-2xl p-6 mt-[-5px] hover:bg-purple-900 duration-300">
        <Repeat className="" size={18} />
        <p className="px-10">Shake It</p>
        <Heart className="" size={18} />
      </Button>
    </div>
  );
};

function PuntoAnimado({ ...rest }: HTMLMotionProps<"div">) {
  const controls = useAnimation();

  useEffect(() => {
    // Generar un ángulo aleatorio en radianes (0 a 2π)
    const randomAngle = Math.random() * 2 * Math.PI;

    // Calcular coordenadas polares a partir del ángulo
    const radius = 200 + Math.random() * 30; // Radio máximo alrededor del punto central
    const randomX = radius * Math.cos(randomAngle);
    const randomY = radius * Math.sin(randomAngle);

    // Realiza la animación para mover el punto al valor aleatorio y luego volver a 0 de forma lineal
    const animatePoint = async () => {
      await controls.start({
        opacity: 1,
        scale: Math.random() * 1.5 + 0.8,
        boxShadow: "0px 0px 10px yellow",
        x: randomX,
        y: randomY,
      });
      await controls.start({
        opacity: 0,
        scale: 0.5,
        boxShadow: "0px 0px 10px yellow",
        x: randomX,
        y: randomY - 10,
        transition: { duration: 0.4, ease: "easeOut" },
      });
    };

    animatePoint();
  }, [controls]);

  return (
    <motion.div
      {...rest}
      initial={{ scale: 1, opacity: 0.4, boxShadow: "0px 0px 0px transparent" }}
      animate={controls}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        width: 5,
        height: 5,
        background: "#f7ff05",
        borderRadius: "100%",
      }}></motion.div>
  );
}
