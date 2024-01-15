import { Button } from "src/@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "src/@/components/ui/dialog";
import { DialogProps } from 'src/components/dialogs/DialogStack';

export type ConfirmDialogProps = {
	title: string;
	onConfirm: () => void;
} 

export const ConfirmDialog = ({title,onConfirm,onClose,...rest}:DialogProps  & ConfirmDialogProps) => {
	return (
	<Dialog defaultOpen {...rest}>
      <DialogContent>
		<DialogTitle>{title}</DialogTitle>
		<p className="mt-[-10px] text-sm text-foreground/70">Esta acción es irreversible.</p>
		
		<div className="flex gap-2 justify-around w-full">
			<DialogClose>
				<Button variant={"outline"} onClick={()=>onClose()}>Cancelar</Button>
			</DialogClose>
			<DialogClose>
				<Button onClick={onConfirm}>Confirmar</Button>
			</DialogClose>
		</div>
      
      </DialogContent>
    </Dialog>
	);
};
