import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "src/@/components/ui/button";
import { BigCarrousel } from "src/components/BigCarrousel";
import { PageWraper } from "src/pages/app/PageWraper";

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
  return (
    <PageWraper>

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
        <path fill="none" stroke="rgb(148, 28, 228)" stroke-width="3" d="M 0 50 Q 300 100 600 50 T 1200 50" />
      </svg>
    </div>


      <div className="h-[350px] w-full bg-primary rounded-sm p-2">
        <div className="flex items-center">
          <p className="text-xl text-primary-foreground font-medium uppercase flex-1">
            Recomendación Diaria
          </p>
          <Button size={"icon"} variant={"secondary"}>
            <ArrowLeft size={24} />
          </Button>
          <Button size={"icon"} variant={"secondary"}>
            <ArrowRight size={24} />
          </Button>
        </div>
        <div className="bg-secondary rounded-sm p-2 w-fit h-[100px]">
          <p className="text-secondary-foreground">Nombre template</p>
        </div>
      </div>
    </PageWraper>
  );
};
