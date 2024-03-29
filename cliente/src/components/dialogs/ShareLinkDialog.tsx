import { Copy } from 'lucide-react'
import { Button } from 'src/@/components/ui/button'
import { Dialog, DialogContent } from 'src/@/components/ui/dialog'
import { useToast } from 'src/@/components/ui/use-toast'
import { DialogProps } from 'src/components/dialogs/DialogStack'

export type ShareLinkDialogParams = {
	link:string
	title:string
	topChildren?:React.ReactNode
}

export const ShareLinkDialog = ({title,topChildren,link,...rest}:DialogProps & ShareLinkDialogParams) => {

	const {toast} = useToast();

  return (
	<Dialog {...rest} defaultOpen>
		<DialogContent>
			<div className="flex flex-col gap-2 mx-2 pt-2">
				<h2 className='text-lg font-medium'>{title}</h2>
				{topChildren}
				<div className="flex gap-2 flex-row items-center justify-between">
					<p className='rounded-md bg-muted max-w-[300px] sm:max-w-[390px] overflow-auto text-xs px-1 py-2'>{link}</p>
					<Button variant={'default'} size={'icon'} onClick={()=>{
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
