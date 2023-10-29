import { Link } from "react-router-dom";
import { useAuth } from "src/context/AuthProvider";
import { Button } from "src/@/components/ui/button";

export const Home = () => {
  const { user } = useAuth();

  const startButton = (
    <>
      {user ? (
        <Link to="/app/">
          <Button>Entrar a la app</Button>
        </Link>
      ) : (
        <Link to="/login">Iniciar Sesion</Link>
      )}
    </>
  );

  return (
    <div className="bg-background flex flex-col h-full">
      <nav className="bg-card p-2 flex items-center mb-20">
        <h1 className="text-lg font-medium flex-1 text-primary uppercase">
          ShakeIt
        </h1>
        {startButton}
      </nav>
	<div className="flex flex-col flex-1 ">
		<h1 className="text-2xl sm:text-6xl font-bold text-center">
			¡Atrévete a Descubrir <br /> el Sabor de la Sorpresa!
		</h1>
		<p className="text-center text-lg sm:text-xl text-foreground/70 my-4">
			Descubre, Elige y Saborea con ShakeFood, la app de comida aleatoria
			número uno
		</p>
		<div className="w-fit mx-auto mt-3">{startButton}</div>
		<div className="flex-1 "/>

	</div>
    </div>
  );
};
