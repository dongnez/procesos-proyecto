import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/@/components/ui/dialog'
import { DialogProps } from 'src/components/dialogs/DialogStack'

export type CalendarDialogProps = {
	day: number;
	month:number
	year: number;
}

export const CalendarDialog = ({day,month,year,...rest}:DialogProps & CalendarDialogProps) => {


  return (
	<Dialog defaultOpen {...rest}>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>{day} {month} {year}</DialogTitle>
		</DialogHeader>
	  </DialogContent>

	</Dialog>
  )
}

