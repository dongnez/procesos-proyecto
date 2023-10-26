import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/@/components/ui/dialog";
import { Input } from "src/@/components/ui/input";
import { PlusCircle } from "react-feather";
import { Button } from "src/@/components/ui/button";
import { databaseCreateTemplate } from "src/database/databaseTemplates";
import { useAuth } from "src/context/AuthProvider";
import { useState } from "react";

export const CreateTemplate = ({
  ...rest
}: React.ComponentPropsWithoutRef<typeof Dialog>) => {
	const {user} = useAuth()!
	const [name, setName] = useState('')

  return (
    <Dialog {...rest}>
      <DialogTrigger  className="w-fit">
        <PlusCircle />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Template</DialogTitle>

          <DialogDescription>
            <Input placeholder="Nombre" className="mb-2" onChange={(e)=>setName(e.currentTarget.value)}/>
            {/* TODO CHANGE SELECT */}
            <Input placeholder="Visibility" value={'public'}/>
          </DialogDescription>

		 <section className="w-full flex justify-end">
			<DialogClose className="w-fit">
				<Button onClick={()=>{
					if(!name) return
					databaseCreateTemplate({
						template:{
							_id: '',
							name: name,
							food: [],
							users: [{
								userId: user!._id,
								role: 'owner'
							}],
							visibility: 'public',
						},
						userId: user!._id,
					})
				}}>Crear</Button>
			</DialogClose>
		</section> 
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
