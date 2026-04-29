import type { ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { TRIPPY_MARKETING_POSTER_URL } from '@/lib/marketingPosterUrl'

/** Same artwork as About / Contact hero pages. */
export const TRIPPY_AUTH_HERO_IMG = TRIPPY_MARKETING_POSTER_URL

const TRIPPY_AUTH_CSS = `
  html, body { overflow-x: hidden !important; }

  main.trippy-auth-flow {
    --ta-gold: #d4af37;
    --ta-gold-bright: #f0e6b8;
    --ta-gold-deep: #8a7028;
    --ta-bronze: #6b5418;
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    background-color: #000000;
    color: #c9b896;
  }

  .trippy-auth-flow__base {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 118% 82% at 50% -18%, rgba(212, 175, 55, 0.2), transparent 54%),
      radial-gradient(ellipse 88% 52% at 100% 32%, rgba(212, 175, 55, 0.12), transparent 52%),
      radial-gradient(ellipse 78% 56% at 0% 68%, rgba(212, 175, 55, 0.08), transparent 46%),
      radial-gradient(1px 1px at 12% 20%, rgba(212, 175, 55, 0.5), transparent),
      radial-gradient(1px 1px at 78% 40%, rgba(255, 255, 255, 0.25), transparent),
      radial-gradient(1px 1px at 44% 88%, rgba(212, 175, 55, 0.4), transparent),
      linear-gradient(180deg, #000000 0%, #050302 45%, #000000 100%);
  }

  .trippy-auth-flow__scanlines {
    position: fixed;
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

  .trippy-auth-flow .trippy-auth-section {
    position: relative;
    z-index: 1;
  }

  .trippy-auth-flow .trippy-auth-shell {
    background: linear-gradient(180deg, rgba(8, 7, 5, 0.96) 0%, rgba(0, 0, 0, 0.98) 100%);
    border: 1px solid rgba(212, 175, 55, 0.45);
    border-radius: 1rem;
    overflow: hidden;
    backdrop-filter: blur(12px);
    box-shadow:
      inset 0 0 0 1px rgba(0, 0, 0, 0.85),
      inset 0 0 0 2px rgba(212, 175, 55, 0.2),
      0 20px 56px rgba(0, 0, 0, 0.65);
  }

  .trippy-auth-flow .auth-image-wrap {
    padding: 1rem 1rem 1rem 1.25rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    border-bottom: 1px dotted rgba(212, 175, 55, 0.35);
  }
  @media (min-width: 992px) {
    .trippy-auth-flow .auth-image-wrap {
      border-bottom: none;
      border-right: 1px dotted rgba(212, 175, 55, 0.35);
    }
  }

  .trippy-auth-flow .auth-img {
    width: 100%;
    max-width: min(100%, 440px);
    height: auto;
    max-height: min(52vh, 480px);
    object-fit: contain;
    object-position: center;
    display: block;
  }
  @media (min-width: 992px) {
    .trippy-auth-flow .auth-img {
      max-height: min(72vh, 620px);
    }
  }

  .trippy-auth-flow .auth-panel {
    color: rgba(201, 184, 150, 0.95);
  }

  .trippy-auth-flow .auth-panel h1 {
    font-family: "Cinzel Decorative", "Cinzel", serif;
    font-weight: 700;
    letter-spacing: 0.06em;
    background: linear-gradient(180deg, var(--ta-gold-bright) 0%, var(--ta-gold) 48%, var(--ta-gold-deep) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .trippy-auth-flow .auth-panel p,
  .trippy-auth-flow .auth-panel .text-body {
    color: rgba(222, 205, 168, 0.9) !important;
  }

  .trippy-auth-flow .auth-panel a:not(.auth-submit) {
    color: var(--ta-gold-bright) !important;
    font-weight: 600;
  }
  .trippy-auth-flow .auth-panel a:not(.auth-submit):hover {
    color: #fff0cb !important;
  }

  .trippy-auth-flow .form-label {
    color: rgba(232, 203, 142, 0.9) !important;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .trippy-auth-flow .form-control {
    background: rgba(0, 0, 0, 0.9) !important;
    border: 1px solid rgba(212, 175, 55, 0.38) !important;
    color: #e8d5a3 !important;
    border-radius: 0.5rem;
  }
  .trippy-auth-flow .form-control:focus {
    border-color: rgba(212, 175, 55, 0.75) !important;
    box-shadow: 0 0 0 0.2rem rgba(212, 175, 55, 0.28) !important;
    background: rgba(0, 0, 0, 0.95) !important;
    color: #f6e4ba !important;
  }
  .trippy-auth-flow .form-control::placeholder {
    color: rgba(244, 228, 186, 0.35);
  }

  .trippy-auth-flow .auth-submit {
    cursor: pointer;
    font-weight: 700;
    border: 1px solid #f0e6b8;
    border-radius: 999px;
    padding: 0.65rem 1rem;
    background: linear-gradient(180deg, #e8c76a 0%, #d4af37 45%, #8a7028 100%) !important;
    color: #0a0804 !important;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      0 0 0 1px rgba(0, 0, 0, 0.55),
      0 4px 22px rgba(212, 175, 55, 0.28);
  }
  .trippy-auth-flow .auth-submit:hover:not(:disabled) {
    filter: brightness(1.08);
    color: #0a0804 !important;
  }
  .trippy-auth-flow .auth-submit:disabled {
    opacity: 0.55;
  }

  .trippy-auth-flow .auth-panel hr {
    border: 0;
    border-top: 1px dotted rgba(212, 175, 55, 0.45);
    opacity: 1;
  }

  .trippy-auth-flow .auth-panel .text-muted,
  .trippy-auth-flow .auth-panel .small.text-body {
    color: rgba(184, 160, 113, 0.82) !important;
  }

  .trippy-auth-flow .spinner-border-sm {
    border-color: rgba(255, 255, 255, 0.35);
    border-right-color: transparent;
  }

  @media (max-width: 575.98px) {
    .trippy-auth-flow .auth-panel { padding: 1.25rem !important; }
  }
`

export function TrippyAuthStyles() {
  return <style dangerouslySetInnerHTML={{ __html: TRIPPY_AUTH_CSS }} />
}

/** Full-page backdrop + scanlines + global auth form styles. */
export function TrippyAuthFlow({ children }: { children: ReactNode }) {
  return (
    <main className="trippy-auth-flow">
      <div className="trippy-auth-flow__base" aria-hidden />
      <div className="trippy-auth-flow__scanlines" aria-hidden />
      <TrippyAuthStyles />
      {children}
    </main>
  )
}

type TrippyAuthHeroColProps = {
  className?: string
}

/** Left column: shared hero image (matches About / Contact). */
export function TrippyAuthHeroCol({ className = '' }: TrippyAuthHeroColProps) {
  return (
    <Col lg={6} className={`order-2 order-lg-1 d-flex align-items-stretch ${className}`.trim()}>
      <div className="auth-image-wrap w-100">
        <img
          src={TRIPPY_AUTH_HERO_IMG}
          alt=""
          className="auth-img"
          loading="lazy"
          decoding="async"
        />
      </div>
    </Col>
  )
}

type TrippyAuthFormColumnProps = {
  children: ReactNode
  className?: string
}

export function TrippyAuthFormCol({ children, className = '' }: TrippyAuthFormColumnProps) {
  return (
    <Col lg={6} className={`order-1 d-flex align-items-center justify-content-center ${className}`.trim()}>
      {children}
    </Col>
  )
}

/** Standard inner grid: shell card + two columns (hero + form slot as children). */
export function TrippyAuthSplitGrid({ children }: { children: ReactNode }) {
  return (
    <section className="trippy-auth-section py-4 py-lg-5 min-vh-100 d-flex align-items-center">
      <Container className="px-3 px-sm-4">
        <Row className="justify-content-center">
          <Col xs={12} lg={11} xl={10}>
            <div className="trippy-auth-shell">
              <Row className="g-0 align-items-stretch">{children}</Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
