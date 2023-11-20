import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/@/components/ui/dialog'
import { DialogProps } from 'src/components/dialogs/DialogStack'

export type ProfileDialogParams = {}

export const ProfileDialog = ({...rest}:DialogProps) => {
  return (
	<Dialog defaultOpen {...rest}>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>Perfil</DialogTitle>
		</DialogHeader>
	  </DialogContent>

	</Dialog>
  )
}
