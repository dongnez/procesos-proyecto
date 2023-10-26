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

export const FoodDialog = ({
  ...rest
}: React.ComponentPropsWithoutRef<typeof Dialog>) => {
  const location = useLocation();
  const { templateId, foodId } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<boolean | null>(null);
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

    setSelectedFood(true);
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
      <DialogContent>
        {!selectedFood && (
          <AnimatePresence>
            <motion.div
              initial={{ x: 50, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              // transition={{ duration: 0.2 }}
              exit={{ x: -50, opacity: 0 }}>
              <FoodSearch />
            </motion.div>
          </AnimatePresence>
        )}
        {selectedFood && (
          <AnimatePresence>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}>
              <FoodSelected />
            </motion.div>
          </AnimatePresence>
        )}
      </DialogContent>
    </Dialog>
  );
};

const FoodSearch = ({}) => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  return (
    <DialogHeader>
      <DialogClose asChild></DialogClose>
      <DialogTitle>
        <Input
          placeholder="Search food"
          className="w-[80%]"
          onChange={(e) => setFilter(e.currentTarget.value)}
        />
        <p onClick={() => navigate("food1")}>Food</p>
      </DialogTitle>
      <DialogDescription></DialogDescription>
    </DialogHeader>
  );
};

const FoodSelected = ({}) => {
  const navigate = useNavigate();
  const { templateId, foodId } = useParams();

  return (
    <DialogHeader>
      <DialogClose asChild></DialogClose>
      <DialogTitle>
        FOOD SELECTED
        <p onClick={() => navigate(`/app/template/${templateId}/food`)}>Food</p>
      </DialogTitle>
      <DialogDescription></DialogDescription>
    </DialogHeader>
  );
};
