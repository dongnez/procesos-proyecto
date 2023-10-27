import {Loader2, LucideProps} from 'lucide-react'

export const Loader = ({size=40,...rest}:LucideProps) => {
  return (
	<Loader2 {...rest} className='text-primary animate-spin' size={size}/>
  )
}
