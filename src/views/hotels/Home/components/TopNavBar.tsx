import { useEffect, useState } from 'react';
import { bookingHomeMenuItems } from '@/assets/data';
import { LogoBox } from '@/components';
import { useScrollEvent, useToggle } from '@/hooks';
import clsx from 'clsx';
import {
  Collapse,
  Container,
  Dropdown,
  DropdownToggle,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { FaHotel } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

const TopNavBar = () => {
  const { pathname } = useLocation();
  const { scrollY } = useScrollEvent();
  const { isOpen: categoryIsOpen, toggle: categoryToggle } = useToggle();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('zeko_username');
    setIsLoggedIn(!!username);
  }, []);

  return (
    <header
      className={clsx('navbar-light header-sticky', {
        'header-sticky-on': scrollY >= 400,
      })}
    >
      <Navbar expand="xl">
        <Container>
          <LogoBox />

          <button
            onClick={categoryToggle}
            className="navbar-toggler ms-sm-auto mx-3 me-md-0 p-0 p-sm-2"
            type="button"
            aria-controls="navbarCategoryCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <BsFillGrid3X3GapFill className="me-1" />
            <span className="d-none d-sm-inline-block small">Category</span>
          </button>

          <Collapse in={categoryIsOpen}>
            <div className="navbar-collapse">
              <ul className="navbar-nav navbar-nav-scroll nav-pills-primary-soft text-center ms-auto p-2 p-xl-0 overflow-y-hidden">
                {(bookingHomeMenuItems ?? []).map((item, idx) => {
                  const Icon = item.icon ?? FaHotel;
                  const activeItem = item.url === pathname;
                  return (
                    <li className="nav-item" key={item.key + idx}>
                      <Link
                        to={item.url ?? ''}
                        className={clsx('nav-link flex-centered', activeItem && 'active')}
                      >
                        <Icon className="me-2" size={16} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Collapse>

          <Nav className="flex-row align-items-center list-unstyled ms-xl-auto nav">
            {isLoggedIn ? (
              <Dropdown className="nav-item ms-3 dropdown" autoClose="outside">
                <DropdownToggle
                  className="avatar avatar-sm p-0 arrow-none mb-0 border-0 d-flex align-items-center justify-content-center bg-light rounded-2"
                  id="profileDropdown"
                  role="button"
                  style={{ width: '36px', height: '36px' }}
                >
                  <FaUser className="text-dark" />
                </DropdownToggle>
              </Dropdown>
            ) : (
              <Link to="/auth/sign-in" className="btn btn-primary ms-3">
                Login
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default TopNavBar;
