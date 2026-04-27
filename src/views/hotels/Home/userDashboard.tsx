import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Col, Container, Row } from 'react-bootstrap'
import { FaUser, FaCalendarCheck, FaSignOutAlt } from 'react-icons/fa'

import { PageMetaData } from '@/components'
import TopNavBar from './components/TopNavBar'
import FooterWithLinks from './components/FooterWithLinks'
import MyProfile from './userProfile'
import MyBookings from './myBookings'

const UserDashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState<'profile' | 'booking'>('profile')
  const navigate = useNavigate()

  useEffect(() => {
    const username = localStorage.getItem('zeko_username')
    if (!username) {
      navigate('/auth/sign-in')
      return
    }

    const query = new URLSearchParams(location.search)
    const tabParam = query.get('tab')
    if (tabParam === 'booking' || tabParam === 'profile') {
      setTab(tabParam)
    }
  }, [location.search, navigate])

  const goTab = (next: 'profile' | 'booking') => {
    setTab(next)
    navigate({ pathname: '/userDashboard', search: `?tab=${next}` }, { replace: true })
  }

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: 'Are you sure you want to sign out?',
      text: 'You will need to log in again to access your dashboard.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'Cancel',
    })

    if (result.isConfirmed) {
      localStorage.removeItem('zeko_username')
      Swal.fire('Signed out!', 'You have been successfully signed out.', 'success')
      navigate('/')
    }
  }

  return (
    <>
      <PageMetaData title="My account — Trippy Entry" />
      <TopNavBar />

      <main className="trippy-user-dash-flow">
        <div className="trippy-user-dash-flow__base" aria-hidden />
        <div className="trippy-user-dash-flow__scanlines" aria-hidden />

        <Container className="position-relative z-1 py-4 py-lg-5">
          <header className="trippy-dash-page-head mb-4 mb-lg-5">
            <p className="trippy-dash-page-head__eyebrow mb-2">Account</p>
            <h1 className="trippy-dash-page-head__title mb-0">Your portal</h1>
            <p className="trippy-dash-page-head__lead mb-0 mt-2">
              Profile and tickets — same energy as the rest of TrippyEntry.
            </p>
          </header>

          <Row className="g-4 g-lg-5">
            <Col md={4} lg={3}>
              <nav className="trippy-dash-nav" aria-label="Account sections">
                <button
                  type="button"
                  className={`trippy-dash-nav__btn ${tab === 'profile' ? 'is-active' : ''}`}
                  onClick={() => goTab('profile')}
                >
                  <span className="trippy-dash-nav__glyph" aria-hidden>
                    <FaUser />
                  </span>
                  <span>My Profile</span>
                </button>
                <button
                  type="button"
                  className={`trippy-dash-nav__btn ${tab === 'booking' ? 'is-active' : ''}`}
                  onClick={() => goTab('booking')}
                >
                  <span className="trippy-dash-nav__glyph" aria-hidden>
                    <FaCalendarCheck />
                  </span>
                  <span>My Tickets</span>
                </button>
                <button type="button" className="trippy-dash-nav__btn trippy-dash-nav__btn--signout" onClick={handleSignOut}>
                  <span className="trippy-dash-nav__glyph" aria-hidden>
                    <FaSignOutAlt />
                  </span>
                  <span>Sign Out</span>
                </button>
              </nav>
            </Col>

            <Col md={8} lg={9}>
              {tab === 'profile' && <MyProfile />}
              {tab === 'booking' && <MyBookings />}
            </Col>
          </Row>
        </Container>
      </main>

      <FooterWithLinks />

      <style
        dangerouslySetInnerHTML={{
          __html: `
      html, body {
        overflow-x: hidden !important;
      }

      main.trippy-user-dash-flow {
        --td-cyan: #2ef2ff;
        --td-magenta: #ff2ee6;
        --td-violet: #a855ff;
        overflow-x: hidden;
        width: 100%;
        min-height: 56vh;
        position: relative;
        background-color: #04030a;
        color: #e8e4ff;
      }

      .trippy-user-dash-flow__base {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          radial-gradient(ellipse 118% 82% at 50% -18%, rgba(168, 85, 255, 0.28), transparent 56%),
          radial-gradient(ellipse 88% 52% at 100% 32%, rgba(46, 242, 255, 0.1), transparent 50%),
          radial-gradient(ellipse 78% 56% at 0% 68%, rgba(255, 46, 230, 0.1), transparent 46%),
          linear-gradient(180deg, #05040d 0%, #0a0620 38%, #07051a 70%, #04030a 100%);
      }

      .trippy-user-dash-flow__scanlines {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.1) 2px,
          rgba(0, 0, 0, 0.1) 4px
        );
        opacity: 0.12;
      }

      main.trippy-user-dash-flow > *:not(.trippy-user-dash-flow__base):not(.trippy-user-dash-flow__scanlines) {
        position: relative;
        z-index: 1;
      }

      .trippy-dash-page-head__eyebrow {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(46, 242, 255, 0.88);
      }
      .trippy-dash-page-head__title {
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        font-weight: 800;
        letter-spacing: -0.03em;
        font-size: clamp(1.75rem, 4vw, 2.35rem);
        background: linear-gradient(135deg, #fff 0%, var(--td-cyan) 48%, var(--td-violet) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .trippy-dash-page-head__lead {
        max-width: 36rem;
        font-size: clamp(0.9rem, 1.6vw, 1.05rem);
        color: rgba(255, 255, 255, 0.82);
        line-height: 1.55;
      }

      .trippy-dash-nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .trippy-dash-nav__btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        text-align: left;
        padding: 0.85rem 1rem;
        border-radius: 0.75rem;
        border: 1px solid rgba(46, 242, 255, 0.2);
        background: rgba(8, 6, 22, 0.55);
        color: rgba(255, 255, 255, 0.92);
        font-weight: 600;
        font-size: 0.95rem;
        transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
      }
      .trippy-dash-nav__btn:hover {
        border-color: rgba(46, 242, 255, 0.45);
        background: rgba(46, 242, 255, 0.08);
        color: #fff;
      }
      .trippy-dash-nav__btn.is-active {
        border-color: rgba(168, 85, 255, 0.55);
        background: linear-gradient(135deg, rgba(46, 242, 255, 0.12), rgba(255, 46, 230, 0.08));
        box-shadow: 0 0 24px rgba(168, 85, 255, 0.15);
        color: #fff;
      }
      .trippy-dash-nav__btn--signout {
        border-color: rgba(255, 80, 120, 0.35);
        color: rgba(255, 160, 180, 0.95);
        margin-top: 0.25rem;
      }
      .trippy-dash-nav__btn--signout:hover {
        border-color: rgba(255, 100, 140, 0.55);
        background: rgba(255, 46, 100, 0.1);
        color: #fff;
      }
      .trippy-dash-nav__glyph {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        font-size: 1rem;
        flex-shrink: 0;
        border: 1px solid rgba(46, 242, 255, 0.35);
        background: rgba(46, 242, 255, 0.06);
        color: var(--td-cyan);
      }
      .trippy-dash-nav__btn.is-active .trippy-dash-nav__glyph {
        border-color: rgba(168, 85, 255, 0.5);
        color: #fff;
        background: rgba(168, 85, 255, 0.15);
      }
      .trippy-dash-nav__btn--signout .trippy-dash-nav__glyph {
        border-color: rgba(255, 120, 140, 0.4);
        background: rgba(255, 60, 100, 0.08);
        color: rgba(255, 180, 190, 1);
      }

      /* Shared panels & forms (profile + tickets live inside this main) */
      .trippy-user-dash-flow .trippy-dash-panel {
        background: rgba(10, 8, 24, 0.72);
        border: 1px solid rgba(46, 242, 255, 0.22);
        border-radius: 1rem;
        padding: 1.35rem 1.5rem;
        backdrop-filter: blur(10px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
      }
      .trippy-user-dash-flow .trippy-dash-title {
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        font-weight: 800;
        font-size: 1.25rem;
        letter-spacing: -0.02em;
        background: linear-gradient(90deg, #fff, var(--td-cyan));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .trippy-user-dash-flow .trippy-dash-label {
        color: rgba(46, 242, 255, 0.75) !important;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .trippy-user-dash-flow .trippy-dash-value {
        color: rgba(255, 255, 255, 0.92);
      }
      .trippy-user-dash-flow .form-control {
        background: rgba(5, 4, 15, 0.9);
        border: 1px solid rgba(46, 242, 255, 0.28);
        color: #fff;
        border-radius: 0.5rem;
      }
      .trippy-user-dash-flow .form-control:focus {
        border-color: rgba(168, 85, 255, 0.55);
        box-shadow: 0 0 0 0.2rem rgba(168, 85, 255, 0.2);
        background: rgba(8, 6, 22, 0.95);
        color: #fff;
      }
      .trippy-user-dash-flow .form-control::placeholder {
        color: rgba(255, 255, 255, 0.35);
      }

      .trippy-user-dash-flow .trippy-dash-btn {
        cursor: pointer;
        border-radius: 0.5rem;
        font-weight: 700;
        padding: 0.5rem 1.25rem;
        border: 1px solid rgba(46, 242, 255, 0.45);
        background: transparent;
        color: var(--td-cyan);
        transition: all 0.2s ease;
      }
      .trippy-user-dash-flow .trippy-dash-btn:hover {
        background: rgba(46, 242, 255, 0.12);
        color: #fff;
        border-color: var(--td-cyan);
      }
      .trippy-user-dash-flow .trippy-dash-btn--accent {
        border: none;
        background: linear-gradient(135deg, rgba(46, 242, 255, 0.35), rgba(168, 85, 255, 0.45));
        color: #fff;
        box-shadow: 0 0 20px rgba(46, 242, 255, 0.2);
      }
      .trippy-user-dash-flow .trippy-dash-btn--accent:hover {
        filter: brightness(1.08);
        color: #fff;
      }
      .trippy-user-dash-flow .trippy-dash-btn:disabled {
        opacity: 0.55;
      }

      .trippy-user-dash-flow .trippy-dash-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .trippy-user-dash-flow .trippy-dash-pill {
        cursor: pointer;
        border-radius: 999px;
        padding: 0.4rem 1rem;
        font-weight: 700;
        font-size: 0.82rem;
        border: 1px solid rgba(46, 242, 255, 0.25);
        background: rgba(5, 4, 15, 0.6);
        color: rgba(255, 255, 255, 0.85);
        transition: all 0.2s ease;
      }
      .trippy-user-dash-flow .trippy-dash-pill:hover {
        border-color: rgba(46, 242, 255, 0.45);
        color: #fff;
      }
      .trippy-user-dash-flow .trippy-dash-pill.is-active {
        border-color: rgba(168, 85, 255, 0.6);
        background: linear-gradient(135deg, rgba(46, 242, 255, 0.2), rgba(255, 46, 230, 0.12));
        color: #fff;
        box-shadow: 0 0 16px rgba(168, 85, 255, 0.2);
      }
      .trippy-user-dash-flow .trippy-dash-pill--success.is-active {
        border-color: rgba(46, 220, 140, 0.55);
        background: rgba(46, 220, 140, 0.15);
      }
      .trippy-user-dash-flow .trippy-dash-pill--danger.is-active {
        border-color: rgba(255, 100, 130, 0.55);
        background: rgba(255, 80, 100, 0.12);
      }

      .trippy-user-dash-flow .trippy-dash-ticket {
        background: rgba(10, 8, 24, 0.72);
        border: 1px solid rgba(46, 242, 255, 0.18);
        border-radius: 1rem;
        padding: 1.15rem 1.25rem;
        backdrop-filter: blur(8px);
      }
      .trippy-user-dash-flow .trippy-dash-ticket h5,
      .trippy-user-dash-flow .trippy-dash-ticket .trippy-dash-event-title {
        font-weight: 800;
        font-size: 1.05rem;
        color: #fff;
        margin-bottom: 0.5rem;
      }
      .trippy-user-dash-flow .trippy-dash-ticket .trippy-dash-event-title svg {
        color: var(--td-cyan);
      }
      .trippy-user-dash-flow .trippy-dash-ticket img {
        border-radius: 0.65rem;
        border: 1px solid rgba(46, 242, 255, 0.2);
      }
      .trippy-user-dash-flow .trippy-dash-ticket .text-muted {
        color: rgba(200, 195, 230, 0.75) !important;
      }
      .trippy-user-dash-flow .trippy-dash-badge-paid {
        background: rgba(46, 200, 130, 0.25) !important;
        color: #8fffc4 !important;
        border: 1px solid rgba(46, 200, 130, 0.45);
        font-weight: 700;
      }
      .trippy-user-dash-flow .trippy-dash-badge-unpaid {
        background: rgba(255, 100, 120, 0.2) !important;
        color: #ffb4c0 !important;
        border: 1px solid rgba(255, 100, 120, 0.4);
        font-weight: 700;
      }

      .trippy-user-dash-flow .trippy-dash-pagination .page-link {
        background: rgba(5, 4, 15, 0.85);
        border-color: rgba(46, 242, 255, 0.25);
        color: rgba(255, 255, 255, 0.9);
      }
      .trippy-user-dash-flow .trippy-dash-pagination .page-link:hover {
        background: rgba(46, 242, 255, 0.12);
        border-color: rgba(46, 242, 255, 0.45);
        color: #fff;
      }
      .trippy-user-dash-flow .trippy-dash-pagination .page-item.active .page-link {
        background: linear-gradient(135deg, rgba(46, 242, 255, 0.35), rgba(168, 85, 255, 0.4));
        border-color: rgba(168, 85, 255, 0.5);
        color: #fff;
      }
      .trippy-user-dash-flow .trippy-dash-pagination .page-item.disabled .page-link {
        opacity: 0.45;
      }

      .trippy-user-dash-flow .spinner-border {
        color: var(--td-cyan) !important;
        border-right-color: transparent;
      }

      .trippy-user-dash-flow .trippy-dash-empty {
        color: rgba(200, 195, 230, 0.85);
        font-size: 1.1rem;
      }
    `,
        }}
      />
    </>
  )
}

export default UserDashboard
