import { NavbarBrand } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

type LogoBoxType = {
  imgClassName?: string
  onlyDark?: boolean
}

/** App mark from `public/logo.png` */
const LOGO_SRC = '/logo.png'

const LogoBox = ({ imgClassName, onlyDark: _onlyDark }: LogoBoxType) => {
  return (
    <NavbarBrand as={Link} to="/">
      <img
        className={clsx('navbar-brand-item h-30px h-xl-40px', imgClassName)}
        src={LOGO_SRC}
        alt="logo"
      />
    </NavbarBrand>
  )
}

export default LogoBox
