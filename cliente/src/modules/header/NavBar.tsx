import { componentMeasures } from 'src/constants/compontents'


export const NavBar = () => {
  return (
	<nav
	style={{
		height:componentMeasures.navbarHeight
	}}
	 className={`flex items-center px-1 border bg-secondary`}>
		<h1 className='text-3xl font-semibold'>Proyecto Base</h1>
	</nav>
  )
}
