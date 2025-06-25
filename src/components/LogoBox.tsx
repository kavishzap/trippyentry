import { NavbarBrand } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import logoLightSvg from '@/assets/newImage/heroSection/white logo.png'
import logoSvg from '@/assets/newImage/heroSection/ZEKO_LOGO_BLACK_BG-11-removebg-preview 1.png'

type LogoBoxType = {
  imgClassName?: string
  onlyDark?: boolean
}

const LogoBox = ({ imgClassName, onlyDark }: LogoBoxType) => {
  return (
    <NavbarBrand as={Link} to="/">
      <img className={clsx(!onlyDark && 'light-mode-item', 'navbar-brand-item h-30px', imgClassName)} src={logoSvg} alt="logo" />
      {!onlyDark && <img className={clsx('dark-mode-item navbar-brand-item h-30px', imgClassName)} src={logoLightSvg} alt="logo" />}
    </NavbarBrand>
  )
}

export default LogoBox
