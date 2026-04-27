import type { ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

/** Same artwork as About / Contact hero pages. */
export const TRIPPY_AUTH_HERO_IMG = encodeURI('/ChatGPT Image Apr 28, 2026, 01_41_28 AM.png')

const TRIPPY_AUTH_CSS = `
  html, body { overflow-x: hidden !important; }

  main.trippy-auth-flow {
    --ta-cyan: #2ef2ff;
    --ta-magenta: #ff2ee6;
    --ta-violet: #a855ff;
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    background-color: #04030a;
    color: #e8e4ff;
  }

  .trippy-auth-flow__base {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 118% 82% at 50% -18%, rgba(168, 85, 255, 0.28), transparent 56%),
      radial-gradient(ellipse 88% 52% at 100% 32%, rgba(46, 242, 255, 0.1), transparent 50%),
      radial-gradient(ellipse 78% 56% at 0% 68%, rgba(255, 46, 230, 0.1), transparent 46%),
      linear-gradient(180deg, #05040d 0%, #0a0620 38%, #07051a 70%, #04030a 100%);
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
    background: rgba(10, 8, 24, 0.78);
    border: 1px solid rgba(46, 242, 255, 0.22);
    border-radius: 1rem;
    overflow: hidden;
    backdrop-filter: blur(12px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  }

  .trippy-auth-flow .auth-image-wrap {
    padding: 1rem 1rem 1rem 1.25rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    border-bottom: 1px solid rgba(46, 242, 255, 0.12);
  }
  @media (min-width: 992px) {
    .trippy-auth-flow .auth-image-wrap {
      border-bottom: none;
      border-right: 1px solid rgba(46, 242, 255, 0.12);
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
    color: rgba(255, 255, 255, 0.92);
  }

  .trippy-auth-flow .auth-panel h1 {
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #fff 0%, var(--ta-cyan) 50%, var(--ta-violet) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .trippy-auth-flow .auth-panel p,
  .trippy-auth-flow .auth-panel .text-body {
    color: rgba(230, 225, 255, 0.88) !important;
  }

  .trippy-auth-flow .auth-panel a:not(.auth-submit) {
    color: var(--ta-cyan) !important;
    font-weight: 600;
  }
  .trippy-auth-flow .auth-panel a:not(.auth-submit):hover {
    color: #fff !important;
  }

  .trippy-auth-flow .form-label {
    color: rgba(46, 242, 255, 0.8) !important;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .trippy-auth-flow .form-control {
    background: rgba(5, 4, 15, 0.92) !important;
    border: 1px solid rgba(46, 242, 255, 0.28) !important;
    color: #fff !important;
    border-radius: 0.5rem;
  }
  .trippy-auth-flow .form-control:focus {
    border-color: rgba(168, 85, 255, 0.55) !important;
    box-shadow: 0 0 0 0.2rem rgba(168, 85, 255, 0.2) !important;
    background: rgba(8, 6, 22, 0.95) !important;
    color: #fff !important;
  }
  .trippy-auth-flow .form-control::placeholder {
    color: rgba(255, 255, 255, 0.35);
  }

  .trippy-auth-flow .auth-submit {
    cursor: pointer;
    font-weight: 700;
    border: none;
    border-radius: 0.65rem;
    padding: 0.65rem 1rem;
    background: linear-gradient(135deg, rgba(46, 242, 255, 0.4), rgba(168, 85, 255, 0.45)) !important;
    color: #fff !important;
    box-shadow: 0 0 22px rgba(46, 242, 255, 0.18);
  }
  .trippy-auth-flow .auth-submit:hover:not(:disabled) {
    filter: brightness(1.08);
    color: #fff !important;
  }
  .trippy-auth-flow .auth-submit:disabled {
    opacity: 0.55;
  }

  .trippy-auth-flow .auth-panel hr {
    border-color: rgba(46, 242, 255, 0.15);
    opacity: 1;
  }

  .trippy-auth-flow .auth-panel .text-muted,
  .trippy-auth-flow .auth-panel .small.text-body {
    color: rgba(200, 195, 230, 0.75) !important;
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
