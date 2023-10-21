import { Outlet } from "react-router-dom"
import { NavBar } from "src/modules/header/NavBar"
import Cookies from 'js-cookie';

export const AppLayout = () => {
	const nickValue = Cookies.get('nick');

  return (
	<div>
		<NavBar />
		<h1 className='text-4x'>Bienvenido:  {nickValue} </h1>
		<Outlet />
		
	</div>
  )
}

