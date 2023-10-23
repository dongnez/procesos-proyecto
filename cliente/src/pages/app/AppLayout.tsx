import { Outlet } from "react-router-dom"
import { NavBar } from "src/modules/header/NavBar"
import Cookies from 'js-cookie';
import { componentMeasures } from "src/constants/compontents";

export const AppLayout = () => {
	const nickValue = Cookies.get('nick');

  return (
	<div
	      style={{
        height:`calc(100vh - ${componentMeasures.navbarHeight}px)`,
        minHeight:`calc(100vh - ${componentMeasures.navbarHeight}px)`,
      }} >
		<NavBar />
		<h1 className='text-4x'>Bienvenido:  {nickValue} </h1>
		<Outlet />
		
	</div>
  )
}

