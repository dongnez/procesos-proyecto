import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "src/hooks/useNavigate";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "src/@/components/ui/dialog";
import { Input } from "src/@/components/ui/input";
import { FoodInterface, FoodTimeType } from "src/interfaces/FoodInterfaces";
import { HighlightedText } from "src/components/HighlightedText";
import { AvatarIcon } from "src/components/AvatarIcon";
import { ArrowLeft } from "react-feather";
import { Button } from "src/@/components/ui/button";
import { CalendarPlus, Plus } from "lucide-react";
import { Loader } from "src/components/Loader";
import {
  databaseAddFoodToTemplate,
  databaseGetFoodById,
} from "src/database/databaseTemplates";
import { useToast } from "src/@/components/ui/use-toast";
import { useUploadThing } from "src/hooks/useFileUpload";
import { ToastAction } from "src/@/components/ui/toast";
import { Textarea } from "src/@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/@/components/ui/accordion";
import { calculateCalories } from "src/utils/caloriesUtils";
import { CaloriesStats } from "src/components/CaloriesStats";
import {
  SelectFoodTime,
  getFoodTimeOption,
} from "src/components/SelectFoodTime";
import { databaseAddFood } from "src/database/databaseCalendar";
import { useAuthenticatedUser } from "src/hooks/useAuthenticatedUser";

export const FoodDialog = ({
  food,
  ...rest
}: React.ComponentPropsWithoutRef<typeof Dialog> & {
  food: FoodInterface[];
}) => {
  const location = useLocation();
  const { templateId, foodId } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodInterface | null>(null);
  const [createShow, setCreateShow] = useState(false);

  const navigate = useNavigate();
  // OPEN DIALOG
  const openDialog = location.pathname.includes("food");

  useEffect(() => {
    if (openDialog) {
      setOpen(true);
      return;
    }

    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!foodId) {
      setSelectedFood(null);
      return;
    }
  }, [foodId]);

  return (
    <Dialog
      {...rest}
      defaultOpen={openDialog}
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          navigate(`/app/template/${templateId}`);
        }
      }}>
      <DialogContent
        showClose={!foodId && !createShow}
        className="min-h-[450px]">
        {!foodId && !createShow && (
          <AnimatePresence>
            <motion.div
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 1 }}>
              <FoodSearch
                food={food}
                onFoodPick={(food) => {
                  setSelectedFood(food);
                  navigate(food._id);
                }}
                onFoodCreate={() => setCreateShow(true)}
              />
            </motion.div>
          </AnimatePresence>
        )}
        {foodId && (
          <AnimatePresence>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}>
              <FoodSelected foodSelected={selectedFood} />
            </motion.div>
          </AnimatePresence>
        )}
        {createShow && (
          <AnimatePresence>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}>
              <AddFood close={() => setCreateShow(false)} />
            </motion.div>
          </AnimatePresence>
        )}
      </DialogContent>
    </Dialog>
  );
};

const FoodSearch = ({
  food = [],
  onFoodPick,
  onFoodCreate,
}: {
  food: FoodInterface[];
  onFoodPick: (food: FoodInterface) => void;
  onFoodCreate: () => void;
}) => {
  const [filter, setFilter] = useState("");

  return (
    <DialogHeader>
      <DialogClose asChild></DialogClose>
      <DialogTitle className="flex gap-3 mt-3 mb-2">
        <Input
          placeholder="Search food"
          className="w-[80%]"
          onChange={(e) => setFilter(e.currentTarget.value)}
        />
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={onFoodCreate}
          className="rounded-full bg-transparent">
          <Plus size={24} />
        </Button>
      </DialogTitle>
      {food
        .filter((f) => f?.name.includes(filter))
        .map((food, index) => (
          <div
            key={index}
            className="bg-secondary hover:bg-secondary/50 duration-200 rounded-md p-2 flex gap-2 cursor-pointer"
            onClick={() => onFoodPick(food)}>
            <AvatarIcon image={food.image} fallback={food.name} size={22} />
            <HighlightedText
              text={food.name}
              highlight={filter || ""}
              className="flex-1"
              color="bg-yellow-500"
            />
          </div>
        ))}
    </DialogHeader>
  );
};

const FoodSelected = ({
  foodSelected,
}: {
  foodSelected?: FoodInterface | null;
}) => {
  const navigate = useNavigate();
  const { user } = useAuthenticatedUser();
  const { templateId, foodId } = useParams();
  const [food, setFood] = useState<FoodInterface | null | undefined>(
    foodSelected
  );

  const { toast } = useToast();

  useEffect(() => {
    if (!foodSelected) {
      databaseGetFoodById(templateId || "", foodId || "").then(
        ({ data, error }) => {
          if (data) {
            setFood(data);
            return;
          }

          if (!data) {
            toast({
              title: "Error",
              description: "No se ha encontrado esa comida",
              variant: "destructive",
              duration: 2500,
            });
          }

          if (error) {
            // console.log("",error);
          }
        }
      );
    }
  }, [foodSelected]);

  return (
    <>
      <DialogHeader className="flex flex-row items-center ">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-6 h-6 "
          onClick={() => navigate(`/app/template/${templateId}/food`)}>
          <ArrowLeft className="w-5" />
        </Button>
        <div className="flex-1" />
        <Button
          variant={"ghost"}
          size={"icon"}
          className={"rounded-full h-[30px] w-[30px] mr-2"}
          onClick={async (e) => {
            e.stopPropagation();
            if (!food) return;

            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth();
            const year = today.getFullYear();

            await databaseAddFood({
              date: {
                day,
                month,
                year,
              },
              foodId: food._id,
              userId: user!._id,
            })
              .then(() => {
                toast({
                  title: "Comida añadida al calendario",
                  duration: 3000,
                  action: (
                    <ToastAction
                      className="group"
                      altText="Ver en Calendario"
                      onClick={() => {
                        navigate(`/app/calendar/${day}-${month}-${year}`);
                      }}>
                      <p className="group-hover:text-black">
                        Ver en Calendario
                      </p>
                    </ToastAction>
                  ),
                });
              })
              .catch(() => {
                toast({
                  title: "Error al añadir comida al calendario",
                  description: `No se ha podido añadir ${food.name} al calendario`,
                  variant: "destructive",
                  duration: 2500,
                });
              });
          }}>
          <CalendarPlus size={15} />
        </Button>
        <>{food ? getFoodTimeOption(food.timeType)?.icon : <></>}</>
      </DialogHeader>
      {food ? (
        <>
          <DialogTitle className="flex flex-col items-center">
            <AvatarIcon image={food.image} fallback={food.name} size={205} />

            <p className="text-2xl">{food.name}</p>
          </DialogTitle>
          <DialogDescription>
            <Textarea
              defaultValue={"No hay descripcion"}
              value={food.description}
              className="resize-none mt-2"
              disabled
              style={{ cursor: "default" }}
            />
            {food.macros && (
              <CaloriesStats
                className="w-fit mx-auto mt-4"
                macros={food.macros}
              />
            )}
          </DialogDescription>
        </>
      ) : (
        <div className="h-full pb-10 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

const AddFood = ({ close }: { close: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeType, setTimeType] = useState<FoodTimeType>("all");
  const [macros, setMacros] = useState({
    proteins: 0,
    carbs: 0,
    fats: 0,
  });

  const [imageURL, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { templateId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { startUpload } = useUploadThing("foodImage", {
    onClientUploadComplete: async (res) => {
      // Add food to template

      if (res && res.length > 0) {
        const kcal = calculateCalories(macros);

        const { data } = await databaseAddFoodToTemplate({
          templateId: templateId || "",
          food: {
            _id: "",
            templateId: templateId || "",
            name: name,
            description: description === "" ? undefined : description,
            macros:
              kcal === 0
                ? undefined
                : {
                    kcal: kcal,
                    ...macros,
                  },
            image: res[0].url,
            timeType: timeType,
          },
        });

        setLoading(false);

        if (!data) {
          toast({
            title: "Error",
            description: "No se ha podido crear la comida",
            variant: "destructive",
            duration: 2500,
          });
          return;
        }

        toast({
          title: "Comida creada",
          description: "Se ha creado la comida correctamente",
          className: "bg-green-500 text-white",
          action: (
            <ToastAction
              className="group"
              altText="Ver Comida"
              onClick={() => {
                close();
                navigate("food/" + data._id);
              }}>
              <p className="group-hover:text-black">Ver Comida</p>
            </ToastAction>
          ),
        });
      }
    },
    onUploadError: (error: Error) => {
      console.log("ERROR: ", error);
      setLoading(false);
      toast({
        title: "Error",
        description:
          "Se ha producido un error al subir la imagen, intentelo de nuevo o mas tarde",
        variant: "destructive",
        duration: 2500,
      });
    },
  });

  return (
    <DialogHeader>
      <DialogTitle className="flex flex-col items-center">
        <div className="w-full flex justify-start">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="w-6 h-6"
            onClick={close}>
            <ArrowLeft className="w-5" />
          </Button>
        </div>
        <p className="text-2xl">Crea una nueva Comida</p>
        <p className="text-xs text-foreground/40 font-normal mb-1">
          Los campos marcados con (*) son obligatorios
        </p>
      </DialogTitle>
      <section className="flex gap-2 items-center pb-1">
        <Input
          placeholder="Nombre de la comida (*)"
          maxLength={50}
          value={name}
          className="flex-1"
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <SelectFoodTime onSelect={(foodTime) => setTimeType(foodTime)} />
      </section>
      <Textarea
        placeholder="Descripcion"
        className="resize-none"
        maxLength={185}
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />

      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full bg-muted p-1 rounded-lg py-0">
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-default hover:no-underline py-2">
            <p className="pt-1 font-medium text-foreground/60">Macros</p>
          </AccordionTrigger>
          <AccordionContent className="">
            <div className="flex gap-2 p-1">
              <Input
                placeholder="Proteinas"
                className="border-proteins dark:border-proteins"
                type="number"
                min={0}
                max={999}
                onChange={(e) => {
                  let value = parseFloat(e.currentTarget.value);
                  if (value >= 999) value = 999;
                  setMacros({
                    ...macros,
                    proteins: value,
                  });
                }}
              />
              <Input
                placeholder="Carbohidratos"
                className="border-carbs dark:border-carbs"
                type="number"
                min={0}
                max={999}
                onChange={(e) => {
                  let value = parseFloat(e.currentTarget.value);
                  if (value >= 999) value = 999;
                  setMacros({
                    ...macros,
                    carbs: value,
                  });
                }}
              />
              <Input
                placeholder="Grasas"
                className="border-fats dark:border-fats"
                type="number"
                min={0}
                max={999}
                onChange={(e) => {
                  let value = parseFloat(e.currentTarget.value);
                  if (value >= 999) value = 999;
                  setMacros({
                    ...macros,
                    fats: value,
                  });
                }}
              />
            </div>
            <p className="text-end text-primary">
              {calculateCalories(macros)} Kcal
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="font-medium text-foreground/60">
        Subir imagen de comida (*)
      </p>

      <div className="pb-5 mx-auto flex flex-col items-center">
        <label
          htmlFor="image-upload"
          className="block w-32 h-32 bg-muted hover:bg-secondary duration-300 rounded-lg cursor-pointer ">
          {imageURL ? (
            <img
              src={imageURL}
              alt="food"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <Plus size={28} />
            </div>
          )}
        </label>
        <input
          type="file"
          id="image-upload"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
              setImage(URL.createObjectURL(file));
            }
          }}
        />
      </div>

      <DialogClose asChild>
        <Button
          disabled={!name || !imageFile}
          onClick={() => {
            if (!imageFile) return;
            startUpload([imageFile]);
            setLoading(true);
            toast({
              title: "Cargando comida",
              open: loading,
              action: <Loader />,
              duration: 5500,
            });
          }}>
          Crear
        </Button>
      </DialogClose>
    </DialogHeader>
  );
};
