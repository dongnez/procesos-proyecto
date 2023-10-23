import { HTMLAttributes } from 'react'
import { componentMeasures } from 'src/constants/compontents'


export const NavBar = ({className,...rest}:HTMLAttributes<HTMLElement>) => {
  return (
	<nav
	{...rest}
	style={{
		height:componentMeasures.navbarHeight
	}}
	 className={`flex items-center px-5 bg-card ${className}`}>
		<h1 className='text-3xl font-semibold text-secondary-foreground'>Proyecto Base</h1>
	</nav>
  )
}
