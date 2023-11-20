import { Drumstick } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Shaker } from "src/components/Shaker";
import { Settings } from "react-feather";
import { Button } from "src/@/components/ui/button";
import { FoodDialog } from "src/components/dialogs/FoodDialog";
import { useNavigate } from "src/hooks/useNavigate";
import { Loader } from "src/components/Loader";
import { ShakerFilters } from "src/components/ShakerFilters";
import { FoodTimeType } from "src/interfaces/FoodInterfaces";
import { useTemplate } from "src/hooks/useTemplate";
import { socket } from "src/utils/socket";

const useRealtimeTemplate = (setTemplate:(template:any)=>void) => {
  useEffect(() => {
    
    socket.on("foodAdded", (template) => {
      const {food} = template

      setTemplate((t)=>{
        return {...t,foods:[...t.foods,food]}
      }); 
    });

  }, []);
}

export const Template = () => {

  const {template,setTemplate} = useTemplate()
  useRealtimeTemplate(setTemplate)

  const [filter, setFilter] = useState<FoodTimeType>("all");
  const filteredFoods = useMemo(() => (
    template?.foods.filter((food) => {
      if (filter === "all") return true;
      return food.timeType === filter || food.timeType === "all";
    }) || []
  ), [template, filter]);

  const navigate = useNavigate();


  if (!template)
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="w-full h-full bg-background">
      <section className="w-full h-full">
        <section className="flex flex-col gap-2 md:flex-row items-center mb-10">
          <h2 className="text-3xl font-semibold flex-1">{template?.name}</h2>

          <div className="flex gap-1">
            <Button 
              variant={'outline'}
              onClick={() => navigate("food")}
              className="px-4 py-2 border-2 border-card rounded-full mr-2 flex gap-2">
              <Drumstick className="" /> Comida
            </Button>

            <Button variant={"outline"} size={"icon"} className="rounded-full border-2 border-card"
            onClick={()=>{navigate("settings")}}>
              <Settings className="" size={24} />
            </Button>
          </div>
        </section>

        <Shaker food={filteredFoods} />
        <ShakerFilters
          onFilterSelect={(filterTime) => {
            setFilter(filterTime);
          }}
        />
      </section>

      <FoodDialog food={template.foods} />
    </div>
  );
};
