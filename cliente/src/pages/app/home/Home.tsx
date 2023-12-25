import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "src/@/components/ui/button"
import { Input } from "src/@/components/ui/input"

export const Home = () => {
  return (
	<div>
        <Input
          placeholder="Buscar un Template"
          className="max-w-sm w-full"
          // onChange={(e) => setFilter(e.currentTarget.value)}
        /> 

        <div className="h-[250px] w-full bg-red-500 rounded-sm">

        </div>

      
        <div className="h-[350px] w-full bg-primary rounded-sm p-2">
          <div className="flex items-center">
            <p className="text-xl text-primary-foreground font-medium uppercase flex-1">Recomendación Diaria</p>
            <Button size={'icon'} variant={'secondary'}>
              <ArrowLeft size={24} />
            </Button>
            <Button size={'icon'} variant={'secondary'}>
              <ArrowRight size={24} />
            </Button>
          </div>
          <div className="bg-secondary rounded-sm p-2 w-fit h-[100px]">
           <p className="text-secondary-foreground">Nombre template</p> 
          </div>

        </div>
  </div>
  )
}
