import { Link } from "react-router-dom";
import { useAuth } from "src/context/AuthProvider";
import { Button } from "src/@/components/ui/button";
import cookFood from "src/assets/cooking-food.jpg";

export const Home = () => {
  const { user } = useAuth();

  const startButton = (
    <>
      {user ? (
        <Link to="/app/">
          <Button>Entrar a la app</Button>
        </Link>
      ) : (
        <Link to="/login">
          <Button>Iniciar Sesion</Button>
        </Link>
      )}
    </>
  );

  return (
    <div className="bg-background flex flex-col h-full">
      <nav className="bg-card p-2 flex items-center ">
        <h1 className="text-lg font-medium flex-1 text-primary uppercase">
          ShakeIt
        </h1>
        {startButton}
      </nav>
      <div className={`relative flex flex-col flex-1 pt-20`}>
        <img
          src={cookFood}
          alt="cookFood"
          className="w-full h-full  object-cover absolute bottom-0 z-0 opacity-25"
        />

        <div className="z-10">
          <h1 className="text-2xl sm:text-6xl font-bold text-center z-10">
            ¡Atrévete a Descubrir <br /> el Sabor de la Sorpresa!
          </h1>
          <p className="text-center text-lg sm:text-xl text-foreground/70 my-4">
            Descubre, Elige y Saborea con ShakeFood, la app de comida aleatoria
            número uno
          </p>
          <div className="w-fit mx-auto mt-3">{startButton}</div>
        </div>
      </div>
    </div>
  );
};
