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
import { FoodInterface } from "src/interfaces/FoodInterfaces";
import { HighlightedText } from "src/components/HighlightedText";
import { AvatarIcon } from "src/components/AvatarIcon";
import { ArrowLeft } from "react-feather";
import { Button } from "src/@/components/ui/button";
import { Plus } from "lucide-react";

export const FoodDialog = ({
  ...rest
}: React.ComponentPropsWithoutRef<typeof Dialog>) => {
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

  // SHOW FOOD
  useEffect(() => {
    if (!foodId) {
      setSelectedFood(null);
      return;
    }

    // setSelectedFood();
  }, [foodId]);

  const food: FoodInterface[] = [
    {
      id: "1",
      name: "food 1",
      image:
        "https://images.pexels.com/photos/18444579/pexels-photo-18444579/free-photo-of-slices-of-apple-and-golden-rings-lying-on-a-plate.jpeg",
    },
  ];

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
      <DialogContent showClose={!foodId && !createShow}>
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
                  navigate(food.id);
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
        {createShow &&(
          <AnimatePresence>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}>
              <AddFood close={()=>setCreateShow(false)}/>
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
  onFoodCreate: ( ) => void;
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
        <Button size={'icon'} variant={'outline'} onClick={onFoodCreate} className="rounded-full bg-transparent"  >
          <Plus size={24}/> 
        </Button>
      </DialogTitle>
      {food
        .filter((f) => f.name.includes(filter))
        .map((food) => (
          <div
            className="bg-secondary hover:bg-secondary/50 duration-200 rounded-md p-2 flex gap-2"
            onClick={() => onFoodPick(food)}>
            <AvatarIcon image={food.image} fallback={food.name} size={22} />
            <HighlightedText
              text={food.name}
              highlight={filter}
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
  const { templateId } = useParams();
  const [food, setFood] = useState<FoodInterface | null | undefined>(
    foodSelected
  );

  useEffect(() => {
    if (!foodSelected) {
      //API GET FOOD
      setTimeout(() => {
        setFood({
          id: "1",
          name: "Pissa",
          image:
            "https://images.pexels.com/photos/18444579/pexels-photo-18444579/free-photo-of-slices-of-apple-and-golden-rings-lying-on-a-plate.jpeg",
        });
      }, 1000);
    }
  }, [foodSelected]);

  if (!food) return <p>...Loading</p>;

  return (
    <DialogHeader>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="w-6 h-6 "
        onClick={() => navigate(`/app/template/${templateId}/food`)}>
        <ArrowLeft className="w-5" />
      </Button>
      <DialogTitle className="flex flex-col items-center">
        <AvatarIcon image={food.image} fallback={food.name} size={205} />
        <p className="text-2xl">{food.name}</p>
      </DialogTitle>
      <DialogDescription></DialogDescription>
    </DialogHeader>
  );
};

const AddFood = ({close}:{
  close: ()=>void
}) => {
  const [food,setFood] = useState<FoodInterface | null>(null)

  return (
    <DialogHeader>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="w-6 h-6"
        onClick={close}>
        <ArrowLeft  className="w-5"/>
      </Button>
      <DialogTitle className="flex flex-col items-center">
        {/* <AvatarIcon image={food.image} fallback={food.name} size={205} /> */}
        <p className="text-2xl">Crea una nueva Comida</p>
      </DialogTitle>
      <DialogDescription></DialogDescription>

    </DialogHeader>
  );
};
