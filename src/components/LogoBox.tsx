import { NavbarBrand } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

type LogoBoxType = {
  imgClassName?: string
  onlyDark?: boolean
}

/** App mark from `public/new_logo.png` */
const LOGO_SRC = '/new_logo.png'

const LogoBox = ({ imgClassName, onlyDark: _onlyDark }: LogoBoxType) => {
  return (
    <NavbarBrand as={Link} to="/">
      <img
        className={clsx('navbar-brand-item trippy-logo-mark', imgClassName)}
        src={LOGO_SRC}
        alt="logo"
      />
    </NavbarBrand>
  )
}

export default LogoBox
