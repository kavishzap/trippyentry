import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Col, Container, Row } from 'react-bootstrap'
import { FaUser, FaCalendarCheck, FaSignOutAlt } from 'react-icons/fa'

import { PageMetaData } from '@/components'
import TopNavBar from './components/TopNavBar'
import FooterWithLinks from './components/FooterWithLinks'
import MyProfile from './userProfile'
import MyBookings from './myBookings'

const MOBILE_NAV_MAX_PX = 767.98

const UserDashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState<'profile' | 'booking'>('profile')
  const [mobilePanelScrollToken, setMobilePanelScrollToken] = useState(0)
  const contentPanelRef = useRef<HTMLDivElement>(null)
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

  /** After tab switch on stacked (mobile) layout, scroll the main panel into view and focus it for keyboard / SR users */
  useEffect(() => {
    if (mobilePanelScrollToken === 0) return
    const node = contentPanelRef.current
    if (!node) return
    const t = window.setTimeout(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      node.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      node.focus({ preventScroll: true })
    }, 0)
    return () => window.clearTimeout(t)
  }, [mobilePanelScrollToken])

  const goTab = (next: 'profile' | 'booking') => {
    setTab(next)
    navigate({ pathname: '/userDashboard', search: `?tab=${next}` }, { replace: true })
    if (typeof window !== 'undefined' && window.matchMedia(`(max-width: ${MOBILE_NAV_MAX_PX}px)`).matches) {
      setMobilePanelScrollToken((n) => n + 1)
    }
  }

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: 'Are you sure you want to sign out?',
      text: 'You will need to log in again to access your dashboard.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'trippy-swal2-popup',
        title: 'trippy-swal2-title',
        htmlContainer: 'trippy-swal2-html',
        confirmButton: 'trippy-swal2-confirm',
        cancelButton: 'trippy-swal2-cancel',
        actions: 'trippy-swal2-actions',
      },
      color: '#c9b896',
    })

    if (result.isConfirmed) {
      localStorage.removeItem('zeko_username')
      await Swal.fire({
        title: 'Signed out',
        text: 'You have been successfully signed out.',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'trippy-swal2-popup',
          title: 'trippy-swal2-title',
          htmlContainer: 'trippy-swal2-html',
          confirmButton: 'trippy-swal2-confirm',
          actions: 'trippy-swal2-actions',
        },
        color: '#c9b896',
      })
      navigate('/')
    }
  }

  return (
    <>
      <PageMetaData title="My account — Trippy Entry" />
      <TopNavBar />

      <main className="trippy-user-dash-flow">
        <div className="trippy-user-dash-flow__base" aria-hidden />
        <div className="trippy-user-dash-flow__grid" aria-hidden />
        <div className="trippy-user-dash-flow__scanlines" aria-hidden />

        <div className="trippy-user-dash-flow__view">
        <Container fluid="xxl" className="position-relative z-1 trippy-user-dash-flow__inner px-3 px-sm-4 px-lg-5">
          <header className="trippy-dash-page-head text-center text-md-start mb-4 mb-lg-5">
            <p className="trippy-dash-page-head__eyebrow mb-2">Account</p>
            <h1 className="trippy-dash-page-head__title mb-0">Your portal</h1>
            <p className="trippy-dash-page-head__lead mb-0 mt-2 mx-auto mx-md-0">
              Profile and tickets — same energy as the rest of TrippyEntry.
            </p>
          </header>

          <Row className="trippy-user-dash-flow__row g-4 gy-4 gx-md-3 gx-lg-4 gx-xl-5 align-items-stretch">
            <Col md={4} lg={3} className="trippy-user-dash-flow__nav-col d-flex flex-column">
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

            <Col md={8} lg={9} className="trippy-user-dash-flow__panel-col d-flex flex-column">
              <div
                ref={contentPanelRef}
                id="trippy-dash-main-panel"
                tabIndex={-1}
                role="region"
                aria-label={tab === 'profile' ? 'My profile' : 'My tickets'}
                className="trippy-dash-main-panel h-100 flex-grow-1 w-100 d-flex flex-column"
              >
                {tab === 'profile' && <MyProfile />}
                {tab === 'booking' && <MyBookings />}
              </div>
            </Col>
          </Row>
        </Container>
        </div>
      </main>

      <FooterWithLinks />

      <style
        dangerouslySetInnerHTML={{
          __html: `
      html, body {
        overflow-x: hidden !important;
      }

      main.trippy-user-dash-flow {
        --td-cyan: #d4af37;
        --td-magenta: #e8d5a3;
        --td-bronze: #6b5418;
        --td-header-offset: max(5.5rem, calc(env(safe-area-inset-top, 0px) + 4.5rem));
        overflow-x: hidden;
        width: 100%;
        min-height: 100dvh;
        min-height: 100svh;
        position: relative;
        background-color: #000000;
        color: #c9b896;
        display: flex;
        flex-direction: column;
        padding-top: var(--td-header-offset);
        padding-bottom: 2.5rem;
        box-sizing: border-box;
      }
      .trippy-user-dash-flow__view {
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        min-height: 0;
      }
      .trippy-user-dash-flow__inner {
        width: 100%;
        max-width: 72rem;
        margin-left: auto;
        margin-right: auto;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      @media (min-width: 992px) {
        .trippy-user-dash-flow__inner { padding-top: 1rem; padding-bottom: 1.5rem; }
      }
      .trippy-user-dash-flow__row {
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
      }
      @media (min-width: 768px) {
        .trippy-user-dash-flow__row { --bs-gutter-x: 1.75rem; }
      }
      @media (min-width: 1200px) {
        .trippy-user-dash-flow__row { --bs-gutter-x: 2.5rem; }
      }
      .trippy-user-dash-flow__nav-col .trippy-dash-nav { height: 100%; }

      .trippy-user-dash-flow__base {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          radial-gradient(ellipse 118% 82% at 50% -18%, rgba(107, 84, 24, 0.28), transparent 56%),
          radial-gradient(ellipse 88% 52% at 100% 32%, rgba(212, 175, 55, 0.1), transparent 50%),
          radial-gradient(ellipse 78% 56% at 0% 68%, rgba(232, 213, 163, 0.1), transparent 46%),
          linear-gradient(180deg, #000000 0%, #080602 38%, #030201 70%, #000000 100%);
      }

      .trippy-user-dash-flow__grid {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background-image:
          linear-gradient(rgba(212, 175, 55, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232, 213, 163, 0.04) 1px, transparent 1px);
        background-size: 48px 48px;
        background-position: center top;
        mask-image: linear-gradient(180deg, black 0%, rgba(0, 0, 0, 0.65) 55%, transparent 92%);
        opacity: 0.38;
      }
      @media (max-width: 767.98px) {
        .trippy-user-dash-flow__grid { opacity: 0.3; }
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

      main.trippy-user-dash-flow > *:not(.trippy-user-dash-flow__base):not(.trippy-user-dash-flow__grid):not(.trippy-user-dash-flow__scanlines) {
        position: relative;
        z-index: 1;
      }

      /* Global theme applies header { background: var(--bs-body-bg) } — skip it here so intro is not a solid bar */
      main.trippy-user-dash-flow header.trippy-dash-page-head {
        background: transparent !important;
        box-shadow: none !important;
      }

      .trippy-dash-page-head__eyebrow {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(212, 175, 55, 0.88);
      }
      .trippy-dash-page-head__title {
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.1;
        padding-top: 0.15em;
        font-size: clamp(1.75rem, 4vw, 2.35rem);
        background: linear-gradient(135deg, #fff 0%, var(--td-cyan) 48%, var(--td-bronze) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .trippy-dash-page-head__lead {
        max-width: 36rem;
        font-size: clamp(0.9rem, 1.6vw, 1.05rem);
        color: rgba(201, 184, 150, 0.9);
        line-height: 1.55;
      }

      .trippy-dash-nav {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      @media (min-width: 768px) {
        .trippy-dash-nav { gap: 0.85rem; }
      }
      .trippy-dash-nav__btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.9rem;
        width: 100%;
        text-align: left;
        min-height: 3.4rem;
        padding: 1rem 1.15rem;
        border-radius: 0.85rem;
        border: 1px solid rgba(212, 175, 55, 0.2);
        background: rgba(12, 10, 6, 0.72);
        color: rgba(255, 255, 255, 0.92);
        font-weight: 600;
        font-size: 0.95rem;
        transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
      }
      .trippy-dash-nav__btn:hover {
        border-color: rgba(212, 175, 55, 0.45);
        background: rgba(212, 175, 55, 0.08);
        color: #fff;
      }
      .trippy-dash-nav__btn.is-active {
        border-color: rgba(107, 84, 24, 0.55);
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(232, 213, 163, 0.08));
        box-shadow: 0 0 24px rgba(107, 84, 24, 0.15);
        color: #fff;
      }
      .trippy-dash-nav__btn--signout {
        border-color: rgba(255, 80, 120, 0.35);
        color: rgba(255, 160, 180, 0.95);
        margin-top: 0.5rem;
        padding-top: 1.05rem;
        padding-bottom: 1.05rem;
      }
      .trippy-dash-nav__btn--signout:hover {
        border-color: rgba(255, 100, 140, 0.55);
        background: rgba(255, 46, 100, 0.1);
        color: #fff;
      }
      .trippy-dash-nav__glyph {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        font-size: 1.05rem;
        flex-shrink: 0;
        border: 1px solid rgba(212, 175, 55, 0.35);
        background: rgba(212, 175, 55, 0.06);
        color: var(--td-cyan);
      }
      .trippy-dash-nav__btn.is-active .trippy-dash-nav__glyph {
        border-color: rgba(107, 84, 24, 0.5);
        color: #fff;
        background: rgba(107, 84, 24, 0.15);
      }
      .trippy-dash-nav__btn--signout .trippy-dash-nav__glyph {
        border-color: rgba(255, 120, 140, 0.4);
        background: rgba(255, 60, 100, 0.08);
        color: rgba(255, 180, 190, 1);
      }

      /* Shared panels & forms (profile + tickets live inside this main) */
      .trippy-user-dash-flow .trippy-dash-panel {
        background: rgba(14, 11, 6, 0.88);
        border: 1px solid rgba(212, 175, 55, 0.22);
        border-radius: 1rem;
        padding: 1.5rem 1.65rem;
        backdrop-filter: blur(4px) saturate(1.05);
        -webkit-backdrop-filter: blur(4px) saturate(1.05);
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
        color: rgba(212, 175, 55, 0.75) !important;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .trippy-user-dash-flow .trippy-dash-value {
        color: rgba(255, 255, 255, 0.92);
      }
      .trippy-user-dash-flow .form-control {
        background: rgba(8, 7, 4, 0.95);
        border: 1px solid rgba(212, 175, 55, 0.28);
        color: #fff;
        border-radius: 0.5rem;
      }
      .trippy-user-dash-flow .form-control:focus {
        border-color: rgba(107, 84, 24, 0.55);
        box-shadow: 0 0 0 0.2rem rgba(107, 84, 24, 0.2);
        background: rgba(12, 10, 6, 0.98);
        color: #fff;
      }
      .trippy-user-dash-flow .form-control::placeholder {
        color: rgba(255, 255, 255, 0.35);
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
        border: 1px solid rgba(212, 175, 55, 0.25);
        background: rgba(10, 8, 5, 0.75);
        color: rgba(255, 255, 255, 0.85);
        transition: all 0.2s ease;
      }
      .trippy-user-dash-flow .trippy-dash-pill:hover {
        border-color: rgba(212, 175, 55, 0.45);
        color: #fff;
      }
      .trippy-user-dash-flow .trippy-dash-pill.is-active {
        border-color: rgba(107, 84, 24, 0.6);
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(232, 213, 163, 0.12));
        color: #fff;
        box-shadow: 0 0 16px rgba(107, 84, 24, 0.2);
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
        background: rgba(14, 11, 6, 0.88);
        border: 1px solid rgba(212, 175, 55, 0.18);
        border-radius: 1rem;
        padding: 1.15rem 1.25rem;
        backdrop-filter: blur(3px) saturate(1.04);
        -webkit-backdrop-filter: blur(3px) saturate(1.04);
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
        border: 1px solid rgba(212, 175, 55, 0.2);
      }
      .trippy-user-dash-flow .trippy-dash-ticket .text-muted {
        color: rgba(201, 184, 150, 0.82) !important;
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
        background: rgba(10, 8, 5, 0.9);
        border-color: rgba(212, 175, 55, 0.25);
        color: rgba(255, 255, 255, 0.9);
      }
      .trippy-user-dash-flow .trippy-dash-pagination .page-link:hover {
        background: rgba(212, 175, 55, 0.12);
        border-color: rgba(212, 175, 55, 0.45);
        color: #fff;
      }
      .trippy-user-dash-flow .trippy-dash-pagination .page-item.active .page-link {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.35), rgba(107, 84, 24, 0.4));
        border-color: rgba(107, 84, 24, 0.5);
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
        color: rgba(201, 184, 150, 0.9);
        font-size: 1.1rem;
      }

      .trippy-user-dash-flow .text-muted {
        color: rgba(201, 184, 150, 0.78) !important;
      }

      .trippy-user-dash-flow .form-label,
      .trippy-user-dash-flow label.col-form-label {
        color: rgba(212, 175, 55, 0.82) !important;
      }

      .trippy-user-dash-flow .form-check-input:checked {
        background-color: #b8922a !important;
        border-color: #d4af37 !important;
      }

      .trippy-user-dash-flow .form-check-input:focus {
        border-color: rgba(212, 175, 55, 0.65);
        box-shadow: 0 0 0 0.2rem rgba(212, 175, 55, 0.2);
      }

      /* Mobile: scrollIntoView clears sticky header overlap */
      .trippy-dash-main-panel {
        scroll-margin-top: calc(5.5rem + 0.75rem);
        min-height: 12rem;
      }
      @media (min-width: 768px) {
        .trippy-dash-main-panel { min-height: 18rem; }
      }
      .trippy-dash-main-panel:focus {
        outline: none;
      }
      .trippy-dash-main-panel:focus-visible {
        box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.45);
        border-radius: 0.75rem;
      }

      /* SweetAlert2 (popup) — CTA look lives in _trippy-cta-frost.scss */
      .swal2-container { z-index: 20000 !important; }
      .swal2-popup.trippy-swal2-popup {
        background: linear-gradient(180deg, rgba(16, 12, 8, 0.99), rgba(5, 4, 2, 0.99)) !important;
        border: 1px solid rgba(212, 175, 55, 0.32) !important;
        border-radius: 1rem !important;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65) !important;
        padding: 1.5rem 1.35rem 1.6rem !important;
      }
      h2#swal2-title.trippy-swal2-title,
      .swal2-title.trippy-swal2-title {
        color: #f0e6b8 !important;
        font-size: 1.05rem !important;
        font-weight: 800 !important;
        line-height: 1.35 !important;
        letter-spacing: 0.06em !important;
        text-transform: uppercase !important;
        padding: 0 0.25rem 0.5rem !important;
      }
      .swal2-html-container.trippy-swal2-html,
      .swal2-html-container { color: rgba(201, 184, 150, 0.95) !important; font-size: 0.95rem !important; }
      .swal2-icon { border-color: rgba(212, 175, 55, 0.35) !important; }
      .swal2-icon.swal2-success { border-color: rgba(120, 220, 180, 0.5) !important; color: #8be8c0 !important; }
      .swal2-icon.swal2-warning { border-color: #e8c76a !important; color: #e8c76a !important; }
    `,
        }}
      />
    </>
  )
}

export default UserDashboard
