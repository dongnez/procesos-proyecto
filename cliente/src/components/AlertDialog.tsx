import { ReactNode } from "react";
import {
  AlertDialog as AlertDialogUI,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "src/@/components/ui/alert-dialog";

export function AlertDialog({
  triggerComponent,
  title,
  description,
  cancelComponent,
  continueComponent,
  onResult,
}: {
  triggerComponent: ReactNode;
  title: string;
  description?: string;
  cancelComponent?: ReactNode;
  continueComponent?: ReactNode;
  onResult: (result: boolean) => void;
}) {
  return (
    <AlertDialogUI>
      <AlertDialogTrigger asChild>{triggerComponent}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>onResult(false)}>{cancelComponent ? cancelComponent:"Cancel"}</AlertDialogCancel>
          <AlertDialogAction onClick={()=>onResult(true)}>{continueComponent ? continueComponent:"Continue"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogUI>
  );
}
