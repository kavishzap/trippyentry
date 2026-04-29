import { useEffect, useState } from 'react';
import { bookingHomeMenuItems } from '@/assets/data';
import { LogoBox } from '@/components';
import { useScrollEvent, useToggle } from '@/hooks';
import clsx from 'clsx';
import { Collapse, Container, Navbar } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { FaRightToBracket, FaUser } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

const TopNavBar = () => {
  const { pathname } = useLocation();
  const { scrollY } = useScrollEvent();
  const { isOpen: mobileMenuOpen, toggle: mobileMenuToggle, hide: mobileMenuClose } = useToggle();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('zeko_username');
    setIsLoggedIn(!!username);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1200px)');
    const onChange = () => {
      if (mq.matches) mobileMenuClose();
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mobileMenuClose]);

  return (
    <header
      className={clsx('trippy-header', {
        'trippy-header--scrolled': scrollY >= 24,
      })}
    >
      <Navbar
        expand={false}
        variant="dark"
        className="trippy-header__navbar py-2 py-lg-3 w-100 m-0 border-0"
      >
        <Container fluid="xxl" className="trippy-header__shell position-relative px-3 px-sm-4 px-lg-4 px-xl-5">
          <div className="trippy-header__grid" aria-hidden />

          <div className="trippy-header__bar d-flex align-items-center justify-content-between w-100 position-relative">
            <div className="trippy-header__brand flex-shrink-0 pe-2">
              <LogoBox />
            </div>

            <nav
              className="trippy-header__center d-none d-xl-flex align-items-center justify-content-center gap-4 gap-xxl-5"
              aria-label="Primary"
            >
              {(bookingHomeMenuItems ?? []).map((item, idx) => {
                const activeItem = item.url === pathname;
                return (
                  <Link
                    key={item.key + String(idx)}
                    to={item.url ?? ''}
                    className={clsx('trippy-header__text-link', activeItem && 'active')}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="trippy-header__end d-none d-xl-flex align-items-center flex-shrink-0">
              {isLoggedIn ? (
                <Link
                  to="/userDashboard"
                  className={clsx(
                    'trippy-header__text-link trippy-header__cta',
                    pathname.startsWith('/userDashboard') && 'active',
                  )}
                >
                  <FaUser className="trippy-header__cta-icon" size={16} aria-hidden />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/auth/sign-in"
                  className={clsx(
                    'trippy-header__text-link trippy-header__cta',
                    pathname.startsWith('/auth/sign-in') && 'active',
                  )}
                >
                  <FaRightToBracket className="trippy-header__cta-icon" size={16} aria-hidden />
                  <span>Login</span>
                </Link>
              )}
            </div>

            <button
              onClick={mobileMenuToggle}
              className="trippy-header__toggler btn d-xl-none flex-shrink-0"
              type="button"
              aria-controls="trippyNavCollapse"
              aria-expanded={mobileMenuOpen}
              aria-label="Open menu"
            >
              <BsList size={22} />
            </button>
          </div>

          <Collapse in={mobileMenuOpen}>
            <div
              id="trippyNavCollapse"
              className="trippy-header__mobile d-xl-none w-100 border-0"
            >
              <ul className="nav flex-column text-center gap-1 py-3 mb-0 list-unstyled">
                {(bookingHomeMenuItems ?? []).map((item, idx) => {
                  const activeItem = item.url === pathname;
                  return (
                    <li className="nav-item" key={item.key + String(idx) + 'm'}>
                      <Link
                        to={item.url ?? ''}
                        className={clsx('trippy-header__text-link d-block py-2', activeItem && 'active')}
                        onClick={mobileMenuClose}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="nav-item pt-1">
                  {isLoggedIn ? (
                    <Link
                      to="/userDashboard"
                      className={clsx(
                        'trippy-header__text-link trippy-header__cta d-inline-flex align-items-center justify-content-center gap-2 py-2',
                        pathname.startsWith('/userDashboard') && 'active',
                      )}
                      onClick={mobileMenuClose}
                    >
                      <FaUser className="trippy-header__cta-icon" size={17} aria-hidden />
                      <span>Dashboard</span>
                    </Link>
                  ) : (
                    <Link
                      to="/auth/sign-in"
                      className={clsx(
                        'trippy-header__text-link trippy-header__cta d-inline-flex align-items-center justify-content-center gap-2 py-2',
                        pathname.startsWith('/auth/sign-in') && 'active',
                      )}
                      onClick={mobileMenuClose}
                    >
                      <FaRightToBracket className="trippy-header__cta-icon" size={17} aria-hidden />
                      <span>Login</span>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </Collapse>
        </Container>
      </Navbar>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .trippy-header {
            --th-gold: #d4af37;
            --th-ink: rgba(5, 4, 2, 0.72);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1050;
            width: 100%;
            max-width: 100vw;
            background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(8,6,4,0.82) 100%);
            border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            backdrop-filter: blur(10px) saturate(1.15);
            -webkit-backdrop-filter: blur(10px) saturate(1.15);
            box-shadow: 0 1px 0 rgba(255, 240, 200, 0.04);
            transition: background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          }
          .trippy-header--scrolled {
            background: linear-gradient(180deg, rgba(0,0,0,0.94) 0%, rgba(6,5,3,0.9) 100%);
            border-bottom-color: rgba(212, 175, 55, 0.28);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.55);
          }
          .trippy-header__navbar { min-height: 3.5rem; }
          @media (min-width: 1200px) {
            .trippy-header__navbar { min-height: 4.25rem; }
          }
          .trippy-header__shell { z-index: 1; }
          .trippy-header__bar { min-height: 3.25rem; }
          @media (min-width: 1200px) {
            .trippy-header__bar { min-height: 3.5rem; }
            .trippy-header__center {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              z-index: 2;
            }
            .trippy-header__end { z-index: 2; }
            .trippy-header__brand { z-index: 2; }
          }
          .trippy-header__grid {
            position: absolute;
            inset: 0;
            z-index: 0;
            background-image:
              linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232, 213, 163, 0.02) 1px, transparent 1px);
            background-size: 32px 32px;
            opacity: 0.4;
            pointer-events: none;
            mask-image: linear-gradient(180deg, black 0%, rgba(0,0,0,0.2) 100%);
          }
          .trippy-header .dark-mode-item { display: inline-block !important; }
          .trippy-header .light-mode-item { display: none !important; }
          .trippy-header .navbar-brand { margin-right: 0; padding: 0 !important; }
          .trippy-header .navbar-brand .navbar-brand-item.trippy-logo-mark {
            height: 40px !important;
            object-fit: contain;
            filter: drop-shadow(0 2px 16px rgba(212, 175, 55, 0.2));
            opacity: 1;
          }
          @media (min-width: 1200px) {
            .trippy-header .navbar-brand .navbar-brand-item.trippy-logo-mark { height: 50px !important; }
          }
          .trippy-header__text-link {
            color: rgba(240, 232, 210, 0.85) !important;
            text-decoration: none;
            font-family: "DM Sans", system-ui, sans-serif;
            font-size: 0.8125rem;
            font-weight: 500;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            padding: 0.5rem 0.15rem;
            border: none;
            background: none !important;
            box-shadow: none;
            position: relative;
            transition: color 0.2s ease, text-shadow 0.2s ease;
          }
          .trippy-header__text-link::after {
            content: "";
            position: absolute;
            left: 0.15rem;
            right: 0.15rem;
            bottom: 0.15rem;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--th-gold), transparent);
            opacity: 0;
            transform: scaleX(0.3);
            transition: opacity 0.2s ease, transform 0.2s ease;
          }
          .trippy-header__text-link:hover,
          .trippy-header__text-link:focus-visible {
            color: #fffaf0 !important;
            text-shadow: 0 0 20px rgba(212, 175, 55, 0.35);
          }
          .trippy-header__text-link:hover::after,
          .trippy-header__text-link:focus-visible::after {
            opacity: 0.9;
            transform: scaleX(1);
          }
          .trippy-header__text-link.active {
            color: #fffcf0 !important;
            text-shadow: 0 0 18px rgba(212, 175, 55, 0.3);
          }
          .trippy-header__text-link.active::after {
            opacity: 0.8;
            transform: scaleX(0.9);
            bottom: 0.1rem;
          }
          .trippy-header__text-link.trippy-header__cta::after {
            display: none;
          }
          @media (min-width: 1200px) {
            .trippy-header__text-link.trippy-header__cta {
              display: inline-flex !important;
              align-items: center;
              justify-content: center;
              gap: 0.45rem;
              margin-left: 0.5rem;
              padding: 0.5rem 1.15rem !important;
              letter-spacing: 0.12em;
              border: 1px solid rgba(212, 175, 55, 0.5) !important;
              border-radius: 999px;
              background: linear-gradient(180deg, rgba(18, 14, 8, 0.9) 0%, rgba(6, 5, 3, 0.85) 100%) !important;
              box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.05),
                0 1px 0 rgba(0, 0, 0, 0.5),
                0 2px 12px rgba(0, 0, 0, 0.4);
              transition:
                color 0.2s ease,
                border-color 0.2s ease,
                background 0.2s ease,
                box-shadow 0.2s ease,
                transform 0.2s ease;
            }
            .trippy-header__text-link.trippy-header__cta .trippy-header__cta-icon {
              flex-shrink: 0;
              opacity: 0.95;
              transition: transform 0.2s ease, filter 0.2s ease, opacity 0.2s ease;
            }
            .trippy-header__text-link.trippy-header__cta:hover,
            .trippy-header__text-link.trippy-header__cta:focus-visible {
              color: #fffef8 !important;
              text-shadow: 0 0 20px rgba(212, 175, 55, 0.35);
              border-color: rgba(240, 220, 150, 0.75) !important;
              background: linear-gradient(180deg, rgba(212, 175, 55, 0.2) 0%, rgba(12, 9, 5, 0.9) 100%) !important;
              box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 0 0 1px rgba(212, 175, 55, 0.15),
                0 4px 20px rgba(0, 0, 0, 0.45),
                0 0 28px rgba(212, 175, 55, 0.2);
              transform: translateY(-1px);
            }
            .trippy-header__text-link.trippy-header__cta:hover .trippy-header__cta-icon,
            .trippy-header__text-link.trippy-header__cta:focus-visible .trippy-header__cta-icon {
              transform: translateX(1px) scale(1.06);
              filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.45));
            }
            .trippy-header__text-link.trippy-header__cta.active {
              border-color: rgba(212, 175, 55, 0.75) !important;
              box-shadow:
                inset 0 0 0 1px rgba(212, 175, 55, 0.2),
                0 0 24px rgba(212, 175, 55, 0.25);
            }
            .trippy-header__text-link.trippy-header__cta:active {
              transform: translateY(0);
            }
          }
          @media (max-width: 1199.98px) {
            .trippy-header__text-link.trippy-header__cta {
              color: #f2e6c4 !important;
              max-width: 12rem;
              margin-left: auto;
              margin-right: auto;
              border: 1px solid rgba(212, 175, 55, 0.4) !important;
              border-radius: 9rem;
              padding: 0.55rem 1.25rem !important;
              background: linear-gradient(180deg, rgba(20, 16, 9, 0.95) 0%, rgba(5, 4, 2, 0.9) 100%) !important;
              box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
              transition:
                color 0.2s ease,
                border-color 0.2s ease,
                background 0.2s ease,
                box-shadow 0.2s ease,
                transform 0.2s ease;
            }
            .trippy-header__text-link.trippy-header__cta:hover,
            .trippy-header__text-link.trippy-header__cta:focus-visible {
              border-color: rgba(240, 210, 130, 0.7) !important;
              color: #fffef8 !important;
              background: linear-gradient(180deg, rgba(212, 175, 55, 0.18) 0%, rgba(6, 5, 3, 0.92) 100%) !important;
              box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
              transform: translateY(-1px);
            }
            .trippy-header__text-link.trippy-header__cta:hover .trippy-header__cta-icon {
              transform: scale(1.08);
              filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.4));
            }
          }
          .trippy-header__toggler {
            color: rgba(240, 232, 210, 0.95) !important;
            border: 1px solid rgba(212, 175, 55, 0.3) !important;
            background: var(--th-ink) !important;
            box-shadow: 0 0 16px rgba(212, 175, 55, 0.1);
            padding: 0.4rem 0.55rem !important;
            border-radius: 0.5rem;
          }
          .trippy-header__toggler:hover {
            border-color: rgba(212, 175, 55, 0.45) !important;
          }
          .trippy-header__mobile {
            background: rgba(0, 0, 0, 0.55) !important;
            border: 1px solid rgba(212, 175, 55, 0.12) !important;
            border-radius: 0.6rem;
            margin-top: 0.4rem;
            margin-bottom: 0.3rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        `,
        }}
      />
    </header>
  );
};

export default TopNavBar;
