import { Copy } from 'lucide-react'
import { Button } from 'src/@/components/ui/button'
import { Dialog, DialogContent } from 'src/@/components/ui/dialog'
import { useToast } from 'src/@/components/ui/use-toast'
import { DialogProps } from 'src/components/dialogs/DialogStack'

export type ShareLinkDialogParams = {
	link:string
	title:string
}

export const ShareLinkDialog = ({title,link,...rest}:DialogProps & ShareLinkDialogParams) => {

	const {toast} = useToast();

  return (
	<Dialog {...rest} defaultOpen>
		<DialogContent>
			<div className="flex flex-col gap-2">
				<h2 className='text-lg font-medium'>{title}</h2>
				<div className="flex gap-2">
					<p className='rounded-md bg-muted flex-1 flex items-center justify-center overflow-auto'>{link}</p>
					<Button variant={'ghost'} size={'icon'} onClick={()=>{
						navigator.clipboard.writeText(link);
						toast({title:'Link copiado al portapapeles',variant:'success',duration:1500});
					}}>
						<Copy size={16} />	
					</Button>
				</div>
			</div>
		</DialogContent>

	</Dialog>
  )
}
