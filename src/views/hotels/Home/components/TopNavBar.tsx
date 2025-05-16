import { bookingHomeMenuItems } from '@/assets/data'
import { AppMenu, LogoBox } from '@/components'
import { useScrollEvent, useToggle } from '@/hooks'
import { useAuthContext, useLayoutContext, type LayoutState } from '@/states'
import { toSentenceCase } from '@/utils/change-casing'
import clsx from 'clsx'
import {
  Collapse,
  Container,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { type IconType } from 'react-icons'
import {
  BsBookmarkCheck,
  BsCircleHalf,
  BsFillGrid3X3GapFill,
  BsGear,
  BsHeart,
  BsInfoCircle,
  BsMoonStars,
  BsPower,
  BsSun,
} from 'react-icons/bs'
import { FaHotel } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'

import avatar1 from '@/assets/images/avatar/01.jpg'

type ThemeModeType = {
  theme: LayoutState['theme']
  icon: IconType
}

const themeModes: ThemeModeType[] = [
  {
    icon: BsSun,
    theme: 'light',
  },
  {
    icon: BsMoonStars,
    theme: 'dark',
  },
  {
    icon: BsCircleHalf,
    theme: 'auto',
  },
]

const TopNavBar = () => {
  const { theme, updateTheme } = useLayoutContext()
  const { pathname } = useLocation()
  const { removeSession } = useAuthContext()
  const { scrollY } = useScrollEvent()
  const { isOpen: menuIsOpen, toggle: menuToggle } = useToggle(window.innerWidth >= 1200)
  const { isOpen: categoryIsOpen, toggle: categoryToggle } = useToggle()

  return (
    <header className={clsx('navbar-light header-sticky', { 'header-sticky-on': scrollY >= 400 })}>
      <Navbar expand="xl">
        <Container>
          <LogoBox />

          <button
            onClick={menuToggle}
            className="navbar-toggler ms-auto ms-sm-0 p-0 p-sm-2"
            type="button"
            data-bs-toggle="collapse"
            aria-controls="navbarCollapse"
            aria-expanded={menuIsOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-animation">
              <span />
              <span />
              <span />
            </span>
            <span className="d-none ms-1 d-sm-inline-block small">Menu</span>
          </button>

          <button
            onClick={categoryToggle}
            className="navbar-toggler ms-sm-auto mx-3 me-md-0 p-0 p-sm-2"
            type="button"
            aria-controls="navbarCategoryCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <BsFillGrid3X3GapFill className=" me-1" />
            <span className="d-none d-sm-inline-block small">Category</span>
          </button>

          <AppMenu showExtraPages mobileMenuOpen={menuIsOpen} />

          <Collapse in={categoryIsOpen}>
            <div className="navbar-collapse">
              <ul className="navbar-nav navbar-nav-scroll nav-pills-primary-soft text-center ms-auto p-2 p-xl-0 overflow-y-hidden">
                {(bookingHomeMenuItems ?? []).map((item, idx) => {
                  const Icon = item.icon ?? FaHotel
                  const activeItem = item.url == pathname
                  return (
                    <li className="nav-item" key={item.key + idx}>
                      <Link to={item.url ?? ''} className={clsx('nav-link flex-centered', activeItem && 'active')}>
                        <Icon className="me-2" size={16} />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Collapse>

          <Nav className="flex-row align-items-center list-unstyled ms-xl-auto nav">
            <Dropdown className="nav-item ms-3 dropdown" autoClose="outside">
              <DropdownToggle className="avatar avatar-sm p-0 arrow-none mb-0 border-0" id="profileDropdown" role="button">
                <img className="avatar-img rounded-2" src={avatar1} alt="avatar" />
              </DropdownToggle>
              <DropdownMenu
                align={'end'}
                className="dropdown-animation dropdown-menu-end shadow pt-3"
                aria-labelledby="profileDropdown"
                renderOnMount
              >
                <li className="px-3 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-3">
                      <img className="avatar-img rounded-circle shadow" src={avatar1} alt="avatar" />
                    </div>
                    <div>
                      <h6 className="h6 mt-2 mt-sm-0">Lori Ferguson</h6>
                      <p className="small m-0">example@gmail.com</p>
                    </div>
                  </div>
                </li>
             
                  <DropdownDivider />
       
                  <DropdownItem>
                    <BsBookmarkCheck className=" me-2" />
                    My Bookings
                  </DropdownItem>
               
                  <DropdownItem>
                    <BsHeart className=" me-2" />
                    My Wishlist
                  </DropdownItem>
             
                  <DropdownItem>
                    <BsGear className=" me-2" />
                    Settings
                  </DropdownItem>
            
                  <DropdownItem>
                    <BsInfoCircle className=" me-2" />
                    Help Center
                  </DropdownItem>
            
                  <DropdownItem className="bg-danger-soft-hover" onClick={removeSession}>
                    <BsPower className=" me-2" />
                    Sign Out
                  </DropdownItem>
              
                  <DropdownDivider />
             
                <li>
                  <div className="nav-pills-primary-soft theme-icon-active d-flex justify-content-between align-items-center p-2 pb-0">
                    <span>Mode:</span>
                    {(themeModes ?? []).map((mode, idx) => {
                      const Icon = mode.icon
                      return (
                        <OverlayTrigger key={mode.theme + idx} overlay={<Tooltip>{toSentenceCase(mode.theme)}</Tooltip>}>
                          <button
                            onClick={() => updateTheme(mode.theme)}
                            type="button"
                            className={clsx('btn btn-link nav-link text-primary-hover mb-0 p-0', { active: theme === mode.theme })}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Light"
                          >
                            <Icon />
                          </button>
                        </OverlayTrigger>
                      )
                    })}
                  </div>
                </li>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default TopNavBar
