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

export const FoodDialog = ({
  ...rest
}: React.ComponentPropsWithoutRef<typeof Dialog>) => {
  const location = useLocation();
  const { templateId,foodId } = useParams();
  const [open, setOpen] = useState(false);
  const [_, setShowFood] = useState(false);
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
      setShowFood(false);
      return;
    }

    setShowFood(true);
  }, [foodId]);

  return (
    <Dialog {...rest} defaultOpen={openDialog} open={open} onOpenChange={(open)=>{
      if(!open){
        navigate(`/app/template/${templateId}`)        
      } 
    }} >
      
      <FoodSearch />
    </Dialog>
  );
};

const FoodSearch = () => {
  return (
    <DialogContent>
      <DialogHeader>
          <DialogClose asChild>
            <button className="Button green">Save changes</button>
        </DialogClose>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
        <DialogClose >Close</DialogClose>
      </DialogHeader>
    </DialogContent>
  );
};
