import { BigCarrousel } from "src/components/BigCarrousel";
import { useAuthenticatedUser } from "src/hooks/useAuthenticatedUser";
import { PageWraper } from "src/pages/app/PageWraper";
import hamburguer from "src/assets/hamburguer-pana.svg";
import { ButtonAddCalendar } from "src/components/ButtonAddCalendar";

const news = [
  {
    title: "Los mejores templates para tu negocio",
    description:
      "Conoce los mejores templates para tu negocio de comida, que te ayudarán a mejorar tu negocio",
    image:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Beneficios de una alimentación saludable",
    description:
      "Descubre cómo una alimentación saludable puede mejorar tu bienestar general y proporcionar energía duradera.",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Recetas nutritivas y deliciosas para toda la familia",
    description:
      "Explora recetas llenas de nutrientes que encantarán a toda la familia y promoverán un estilo de vida saludable.",
    image:
      "https://images.pexels.com/photos/1408745/pexels-photo-1408745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Cómo diseñar un menú equilibrado y atractivo",
    description:
      "Consejos para crear un menú que sea tanto visualmente atractivo como equilibrado en términos de nutrición.",
    image:
      "https://images.pexels.com/photos/3758851/pexels-photo-3758851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Secretos de la cocina saludable: Tips y trucos",
    description:
      "Descubre secretos y trucos para mantener la salud en tu cocina, preparando platos deliciosos y nutritivos.",
    image:
      "https://images.pexels.com/photos/1399734/pexels-photo-1399734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const Home = () => {
  const { user } = useAuthenticatedUser();

  return (
    <PageWraper>
      <h2 className="ml-1 sm:ml-0 text-2xl sm:text-3xl text-primary mb-2 font-medium uppercase">
        Noticias y Actividades
      </h2>
      <div className="h-[350px] w-full flex justify-center  rounded-sm">
        <BigCarrousel
          items={news.map((item) => (
            <div className="h-full w-[250px] sm:w-[300px] border-muted bg-muted border-[4px] rounded-sm ">
              <div className="h-[180px] w-full  rounded-sm p-2">
                <img
                  src={item.image}
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              <div className="h-fit w-full  rounded-sm p-2">
                <p className="text-xl text-foreground/70 font-medium uppercase">
                  {item.title}
                </p>
                <p className="text-foreground">{item.description}</p>
              </div>
            </div>
          ))}
          className="max-w-[70%] sm:max-w-[80%]"
        />
      </div>

      {/* Create a beautiful spacer with espiral lines */}
      <div className="mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100">
          <path
            fill="none"
            stroke="rgb(148, 28, 228)"
            stroke-width="3"
            d="M 0 50 Q 300 100 600 50 T 1200 50"
          />
        </svg>
      </div>

      <div className="max-w-[1100px] mx-auto sm:h-[280px] flex flex-col w-full bg-primary rounded-sm p-2 pb-3 relative">
        <div className="flex items-center">
          <p className="text-xl text-primary-foreground font-medium uppercase flex-1">
            Comidas Recientes
          </p>
        </div>

        {!user.recentFoods ||
          (user.recentFoods.length === 0 && (
            <div className="flex flex-col  sm:flex-row items-center sm:items-start">
              <img src={hamburguer} className="w-[240px]" />
              <div className="flex-1 text-end pt-10 pr-5">
                <h3 className="text-xl font-medium   text-background">
                  No hay comidas recientes
                </h3>
                <p className="text-base text-background/60">
                  Añade una comida a tu calendario para ver tus comidas
                  recientes.
                </p>
              </div>
            </div>
          ))}

        {user.recentFoods && user.recentFoods.length !== 0 && (
          <div className="flex  flex-1 items-center justify-start">
            <BigCarrousel
              className="max-w-[75%] sm:max-w-[80%] mx-auto "
              carrouselClassName="basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/6  "
              items={user
                .recentFoods!.map((food, index) => (
                  <div
                    key={index}
                    className="bg-secondary/30  rounded-sm p-2 w-fit h-fit relative">
                    <img
                      src={food.image}
                      className="w-32 h-32 rounded-sm object-cover"
                    />
                    <p className="text-center text-secondary-foreground">
                      {food.name}
                    </p>
                    <ButtonAddCalendar selectedFood={food}  className="absolute top-1 right-1 w-5 h-5 rounded-full" variant={"outline"} iconSize={14} />
                  </div>
                ))
                .reverse()}
            />
          </div>
        )}
      </div>
    </PageWraper>
  );
};
