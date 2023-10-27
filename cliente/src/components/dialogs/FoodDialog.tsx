import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "src/hooks/useNavigate";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/@/components/ui/dialog";
import { Input } from "src/@/components/ui/input";
import { FoodInterface } from "src/interfaces/FoodInterfaces";
import { HighlightedText } from "src/components/HighlightedText";
import { AvatarIcon } from "src/components/AvatarIcon";
import { ArrowLeft } from "react-feather";
import { Button } from "src/@/components/ui/button";
import { Plus } from "lucide-react";
import { Loader } from "src/components/Loader";
import {
  databaseAddFoodToTemplate,
  databaseGetFoodById,
} from "src/database/databaseTemplates";
import { useToast } from "src/@/components/ui/use-toast";
import { useUploadThing } from "src/hooks/useFileUpload";
import { ToastAction } from "src/@/components/ui/toast";

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
  food,
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
      <DialogTitle className="flex gap-3 mt-3">
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
        .filter((f) => f.name.includes(filter))
        .map((food, index) => (
          <div
            key={index}
            className="bg-secondary hover:bg-secondary/50 duration-200 rounded-md p-2 flex gap-2"
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
      <DialogHeader>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-6 h-6 "
          onClick={() => navigate(`/app/template/${templateId}/food`)}>
          <ArrowLeft className="w-5" />
        </Button>
      </DialogHeader>
      {food ? (
        <DialogTitle className="flex flex-col items-center">
          <AvatarIcon image={food.image} fallback={food.name} size={205} />
          <p className="text-2xl">{food.name}</p>
        </DialogTitle>
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
  const [imageURL, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { templateId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { startUpload } = useUploadThing("foodImage", {
    onClientUploadComplete: async (res) => {
      // Do something with the response

      if (res && res.length > 0) {
        const { data } = await databaseAddFoodToTemplate({
          templateId: templateId || "",
          food: {
            _id: "",
            name: name,
            image: res[0].url,
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
        <div className="w-full">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="w-6 h-6"
            onClick={close}>
            <ArrowLeft className="w-5" />
          </Button>
        </div>
        <p className="text-2xl">Crea una nueva Comida</p>
      </DialogTitle>
      <Input
        placeholder="Nombre de la comida"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <div className="py-5 mx-auto">
        <label
          htmlFor="image-upload"
          className="block w-60 h-60 bg-gray-200 hover:bg-gray-200/60 duration-300 rounded-lg cursor-pointer ">
          {imageURL ? (
            <img
              src={imageURL}
              alt="food"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <Plus size={48} />
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
