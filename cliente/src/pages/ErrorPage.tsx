import { useAuth } from "src/context/AuthProvider"

export const ErrorPage = () => {
	 const {user} = useAuth()

  return (
	<div className='w-full h-full flex flex-col items-center justify-center gap-3'>
		<h1 className='text-4xl'>ERROR 404 Pagina no Encontrada</h1>
		<a className='text-xl text-blue-500 hover:underline' href={ user ? '/app':'/' }>Volver al inicio</a>
	</div>
  )
}
