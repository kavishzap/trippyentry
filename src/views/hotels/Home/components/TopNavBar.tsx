import { useEffect, useState } from 'react';
import { bookingHomeMenuItems } from '@/assets/data';
import { LogoBox } from '@/components';
import { useScrollEvent, useToggle } from '@/hooks';
import clsx from 'clsx';
import { Collapse, Container, Navbar } from 'react-bootstrap';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaHotel, FaRightToBracket, FaUser } from 'react-icons/fa6';
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
      className={clsx('trippy-header header-sticky', {
        'header-sticky-on': scrollY >= 400,
      })}
    >
      <Navbar expand="xl" variant="dark" className="trippy-header__navbar py-1 py-xl-1">
        <Container className="position-relative">
          <div className="trippy-header__glow" aria-hidden />
          <div className="trippy-header__grid" aria-hidden />

          <LogoBox />

          <button
            onClick={categoryToggle}
            className="trippy-header__toggler btn ms-sm-auto mx-3 me-md-0 d-xl-none"
            type="button"
            aria-controls="navbarCategoryCollapse"
            aria-expanded={categoryIsOpen}
            aria-label="Toggle navigation"
          >
            <BsFillGrid3X3GapFill className="me-1" />
            <span className="d-none d-sm-inline-block small">Category</span>
          </button>

          <Collapse in={categoryIsOpen}>
            <div className="navbar-collapse trippy-header__collapse">
              <div className="trippy-header__nav-cluster d-flex flex-column align-items-center flex-xl-row align-items-xl-center justify-content-xl-end gap-1 gap-xl-2 w-100 ms-xl-auto p-1 pb-2 p-xl-0 pb-xl-0">
                <ul className="navbar-nav navbar-nav-scroll nav-pills-primary-soft text-center mb-0 p-xl-0 overflow-y-hidden">
                  {(bookingHomeMenuItems ?? []).map((item, idx) => {
                    const Icon = item.icon ?? FaHotel;
                    const activeItem = item.url === pathname;
                    return (
                      <li className="nav-item" key={item.key + idx}>
                        <Link
                          to={item.url ?? ''}
                          className={clsx(
                            'nav-link trippy-header__nav-link flex-centered',
                            activeItem && 'active',
                          )}
                        >
                          <Icon className="me-2" size={16} />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="nav-item">
                    {isLoggedIn ? (
                      <Link
                        to="/userDashboard"
                        className={clsx(
                          'nav-link trippy-header__nav-link flex-centered',
                          pathname.startsWith('/userDashboard') && 'active',
                        )}
                      >
                        <FaUser className="me-2" size={16} />
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/auth/sign-in"
                        className={clsx(
                          'nav-link trippy-header__nav-link flex-centered',
                          pathname.startsWith('/auth/sign-in') && 'active',
                        )}
                      >
                        <FaRightToBracket className="me-2" size={16} />
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </Collapse>
        </Container>
      </Navbar>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .trippy-header {
            --th-cyan: #d4af37;
            --th-magenta: #e8d5a3;
            --th-bronze: #6b5418;
            --th-bg: #000000;
            --th-bg-mid: #0a0805;
            position: relative;
            z-index: 1030;
            background:
              radial-gradient(ellipse 100% 180% at 50% -60%, rgba(212, 175, 55, 0.35), transparent 55%),
              radial-gradient(ellipse 80% 120% at 100% 0%, rgba(212, 175, 55, 0.1), transparent 45%),
              radial-gradient(ellipse 70% 100% at 0% 100%, rgba(232, 213, 163, 0.12), transparent 42%),
              linear-gradient(180deg, var(--th-bg) 0%, var(--th-bg-mid) 100%);
            border-bottom: 1px solid rgba(212, 175, 55, 0.22);
            box-shadow:
              0 0 48px rgba(212, 175, 55, 0.08),
              0 4px 24px rgba(0, 0, 0, 0.45);
          }

          .trippy-header .trippy-header__navbar {
            position: relative;
            z-index: 2;
            --bs-navbar-padding-y: 0.35rem;
          }
          .trippy-header .navbar-brand {
            padding-top: 0.4rem !important;
            padding-bottom: 0.4rem !important;
          }
          .trippy-header .navbar-brand .navbar-brand-item.trippy-logo-mark {
            height: 36px !important;
            width: auto;
            max-height: none;
            object-fit: contain;
          }
          @media (min-width: 1200px) {
            .trippy-header .navbar-brand .navbar-brand-item.trippy-logo-mark {
              height: 54px !important;
            }
          }
          .trippy-header .navbar-nav .nav-link {
            padding-top: 0.4rem !important;
            padding-bottom: 0.4rem !important;
            line-height: 1.25 !important;
          }
          .trippy-header.header-sticky-on .navbar-brand {
            padding-top: 0.35rem !important;
            padding-bottom: 0.35rem !important;
          }
          .trippy-header.header-sticky-on .navbar-brand .navbar-brand-item.trippy-logo-mark {
            height: 32px !important;
          }
          @media (min-width: 1200px) {
            .trippy-header.header-sticky-on .navbar-brand .navbar-brand-item.trippy-logo-mark {
              height: 48px !important;
            }
          }

          .trippy-header__glow {
            position: absolute;
            inset: 0;
            z-index: 0;
            background: conic-gradient(
              from 200deg at 80% 20%,
              rgba(212, 175, 55, 0.08),
              rgba(232, 213, 163, 0.06),
              rgba(212, 175, 55, 0.1),
              rgba(212, 175, 55, 0.08)
            );
            opacity: 0.7;
            pointer-events: none;
            animation: trippy-header-aurora 18s linear infinite;
          }

          @keyframes trippy-header-aurora {
            to { transform: rotate(360deg); }
          }

          .trippy-header__grid {
            position: absolute;
            inset: 0;
            z-index: 1;
            background-image:
              linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232, 213, 163, 0.04) 1px, transparent 1px);
            background-size: 28px 28px;
            mask-image: linear-gradient(180deg, black 0%, transparent 100%);
            opacity: 0.5;
            pointer-events: none;
          }

          /* Logo: always use light mark on neon bar */
          .trippy-header .dark-mode-item {
            display: inline-block !important;
          }
          .trippy-header .light-mode-item {
            display: none !important;
          }

          .trippy-header__nav-link {
            color: rgba(232, 213, 163, 0.88) !important;
            letter-spacing: 0.02em;
            border-radius: 0.5rem;
            transition: color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          }
          .trippy-header__nav-link:hover,
          .trippy-header__nav-link:focus {
            color: #fff !important;
            background: rgba(212, 175, 55, 0.08) !important;
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
          }
          .trippy-header__nav-link.active {
            color: #fff !important;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.18), rgba(232, 213, 163, 0.12)) !important;
            box-shadow:
              inset 0 0 0 1px rgba(212, 175, 55, 0.35),
              0 0 24px rgba(232, 213, 163, 0.12);
          }

          .trippy-header__toggler {
            color: rgba(232, 213, 163, 0.92) !important;
            border: 1px solid rgba(212, 175, 55, 0.35) !important;
            background: rgba(12, 10, 6, 0.72) !important;
            box-shadow: 0 0 16px rgba(212, 175, 55, 0.1);
            padding: 0.4rem 0.65rem !important;
          }
          .trippy-header__toggler:hover {
            border-color: rgba(232, 213, 163, 0.45) !important;
            box-shadow: 0 0 20px rgba(232, 213, 163, 0.15);
          }

          .trippy-header__collapse {
            border-radius: 0.75rem;
            margin-top: 0.5rem;
          }
          @media (min-width: 1200px) {
            .trippy-header__collapse {
              margin-top: 0;
            }
            .trippy-header__nav-cluster .navbar-nav {
              align-items: center;
            }
          }
          @media (max-width: 1199.98px) {
            .trippy-header__collapse {
              background: rgba(12, 10, 6, 0.94) !important;
              border: 1px solid rgba(212, 175, 55, 0.2);
              box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 32px rgba(212, 175, 55, 0.12);
              backdrop-filter: blur(12px);
            }
          }

          /* Sticky / scrolled: stronger glass + neon bar (matches hero depth) */
          .trippy-header.header-sticky-on {
            background:
              radial-gradient(ellipse 90% 160% at 50% -40%, rgba(212, 175, 55, 0.4), transparent 50%),
              radial-gradient(ellipse 70% 100% at 100% 0%, rgba(212, 175, 55, 0.12), transparent 40%),
              linear-gradient(180deg, rgba(8, 6, 4, 0.97) 0%, rgba(14, 11, 6, 0.98) 100%) !important;
            border-bottom-color: rgba(212, 175, 55, 0.28) !important;
            backdrop-filter: blur(14px) saturate(1.2);
            -webkit-backdrop-filter: blur(14px) saturate(1.2);
            box-shadow:
              0 0 60px rgba(212, 175, 55, 0.1),
              0 8px 32px rgba(0, 0, 0, 0.55);
          }

          @media (prefers-reduced-motion: reduce) {
            .trippy-header__glow {
              animation: none !important;
            }
          }
        `,
        }}
      />
    </header>
  );
};

export default TopNavBar;
