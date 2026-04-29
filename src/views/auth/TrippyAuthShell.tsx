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
    /* Match hero “Buy ticket” glass pill */
    --hero-glass-surface: rgba(8, 6, 5, 0.42);
    --hero-glass-surface-hover: rgba(12, 10, 8, 0.55);
    --hero-glass-border: rgba(255, 255, 255, 0.22);
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
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
      radial-gradient(ellipse 118% 82% at 50% -18%, rgba(212, 175, 55, 0.3), transparent 56%),
      radial-gradient(ellipse 88% 52% at 100% 38%, rgba(212, 175, 55, 0.1), transparent 50%),
      radial-gradient(ellipse 78% 56% at 0% 72%, rgba(232, 213, 163, 0.11), transparent 46%),
      linear-gradient(180deg, #000000 0%, #080602 42%, #030201 72%, #000000 100%);
  }

  .trippy-auth-flow__grid {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    /* Same grid treatment as home hero */
    background-image:
      linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(232, 213, 163, 0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(180deg, black 0%, transparent 88%);
    opacity: 0.35;
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
      rgba(0, 0, 0, 0.12) 2px,
      rgba(0, 0, 0, 0.12) 4px
    );
    opacity: 0.08;
  }

  .trippy-auth-flow .trippy-auth-section {
    position: relative;
    z-index: 1;
  }

  .trippy-auth-flow .trippy-auth-shell {
    position: relative;
    z-index: 1;
    background: rgba(6, 5, 3, 0.6);
    border: 1px solid rgba(212, 175, 55, 0.22);
    border-radius: 1.125rem;
    overflow: hidden;
    backdrop-filter: blur(14px) saturate(1.1);
    -webkit-backdrop-filter: blur(14px) saturate(1.1);
    box-shadow:
      0 4px 0 rgba(0, 0, 0, 0.35) inset,
      0 24px 64px rgba(0, 0, 0, 0.55);
  }
  .trippy-auth-flow .trippy-auth-shell::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(232, 213, 163, 0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(180deg, black 0%, transparent 88%);
    opacity: 0.45;
  }
  .trippy-auth-flow .trippy-auth-shell > .row {
    position: relative;
    z-index: 1;
  }

  .trippy-auth-flow .auth-image-wrap {
    padding: 1.5rem 1.25rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    border-bottom: 1px solid rgba(212, 175, 55, 0.12);
    background: rgba(0, 0, 0, 0.2);
  }
  @media (min-width: 992px) {
    .trippy-auth-flow .auth-image-wrap {
      border-bottom: none;
      border-right: 1px solid rgba(212, 175, 55, 0.12);
    }
  }

  .trippy-auth-flow .auth-img {
    width: 100%;
    max-width: min(100%, 400px);
    height: auto;
    max-height: min(50vh, 420px);
    object-fit: contain;
    object-position: center;
    display: block;
  }
  @media (min-width: 992px) {
    .trippy-auth-flow .auth-img {
      max-height: min(70vh, 580px);
    }
  }

  .trippy-auth-flow .auth-panel {
    color: rgba(220, 205, 170, 0.95);
  }

  .trippy-auth-flow .auth-panel h1 {
    font-family: "DM Sans", system-ui, -apple-system, sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    letter-spacing: -0.02em;
    color: #f5f0e6 !important;
    background: none;
    -webkit-text-fill-color: #f5f0e6;
  }

  .trippy-auth-flow .auth-panel p,
  .trippy-auth-flow .auth-panel .text-body {
    color: rgba(200, 185, 150, 0.9) !important;
    font-size: 0.9375rem;
  }

  .trippy-auth-flow .auth-panel a:not(.auth-submit):not(.trippy-auth-back) {
    color: #e8d5a3 !important;
    font-weight: 500;
  }
  .trippy-auth-flow .auth-panel a:not(.auth-submit):not(.trippy-auth-back):hover {
    color: #fff4d0 !important;
  }

  .trippy-auth-flow .auth-panel .trippy-auth-back {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: rgba(200, 185, 150, 0.92) !important;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    font-family: "DM Sans", system-ui, sans-serif;
  }
  .trippy-auth-flow .auth-panel .trippy-auth-back:hover,
  .trippy-auth-flow .auth-panel .trippy-auth-back:focus-visible {
    color: #fff6dd !important;
  }
  .trippy-auth-flow .auth-panel .trippy-auth-back .trippy-auth-back__icon {
    flex-shrink: 0;
    font-size: 1rem;
  }

  .trippy-auth-flow .form-label {
    color: rgba(220, 205, 160, 0.88) !important;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    text-transform: none;
    margin-bottom: 0.35rem;
  }

  .trippy-auth-flow .form-control {
    background: rgba(0, 0, 0, 0.4) !important;
    border: 1px solid rgba(212, 175, 55, 0.28) !important;
    color: #f2ebd8 !important;
    border-radius: 0.5rem;
    padding: 0.55rem 0.85rem;
  }
  .trippy-auth-flow .form-control:focus {
    border-color: rgba(212, 175, 55, 0.6) !important;
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.18) !important;
    background: rgba(0, 0, 0, 0.55) !important;
    color: #fffcf0 !important;
  }
  .trippy-auth-flow .form-control::placeholder {
    color: rgba(200, 180, 130, 0.4);
  }

  .trippy-auth-flow .auth-submit {
    cursor: pointer;
    font-weight: 600;
    font-size: 0.875rem;
    border: 1px solid rgba(212, 175, 55, 0.5);
    border-radius: 999px;
    padding: 0.6rem 1.25rem;
    background: linear-gradient(180deg, #e4c15c 0%, #c9a227 100%) !important;
    color: #0f0c06 !important;
    letter-spacing: 0.04em;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 2px 12px rgba(0, 0, 0, 0.35);
    transition: filter 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  }
  .trippy-auth-flow .auth-submit:hover:not(:disabled):not(.auth-submit--hero-frost) {
    filter: brightness(1.05);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.25),
      0 4px 20px rgba(212, 175, 55, 0.25);
    color: #0a0804 !important;
  }
  .trippy-auth-flow .auth-submit:active:not(:disabled):not(.auth-submit--hero-frost) {
    transform: translateY(1px);
  }
  .trippy-auth-flow .auth-submit:disabled {
    opacity: 0.55;
  }

  /* Sign in — same glass pill CTA as home “Buy ticket” (Hero) */
  .trippy-auth-flow .auth-panel .auth-submit.auth-submit--hero-frost {
    position: relative;
    isolation: isolate;
    filter: none !important;
    min-height: 2.75rem;
    padding: 0.7rem 1.85rem;
    font-family: "DM Sans", system-ui, sans-serif;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    background: var(--hero-glass-surface) !important;
    border: 1px solid var(--hero-glass-border) !important;
    color: rgba(255, 255, 255, 0.95) !important;
    box-shadow:
      0 4px 28px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(14px) saturate(1.12);
    -webkit-backdrop-filter: blur(14px) saturate(1.12);
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }
  @supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
    .trippy-auth-flow .auth-panel .auth-submit.auth-submit--hero-frost {
      background: rgba(12, 10, 8, 0.75) !important;
    }
  }
  .trippy-auth-flow .auth-panel .auth-submit.auth-submit--hero-frost:hover:not(:disabled),
  .trippy-auth-flow .auth-panel .auth-submit.auth-submit--hero-frost:focus-visible {
    color: #ffffff !important;
    background: var(--hero-glass-surface-hover) !important;
    border-color: rgba(240, 215, 150, 0.55) !important;
    box-shadow:
      0 0 0 1px rgba(240, 220, 160, 0.35),
      0 0 24px rgba(212, 175, 55, 0.38),
      0 0 44px rgba(255, 224, 160, 0.14),
      0 6px 32px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.16);
    transform: translateY(-2px);
  }
  .trippy-auth-flow .auth-panel .auth-submit.auth-submit--hero-frost:focus-visible {
    outline: 2px solid rgba(240, 200, 120, 0.45);
    outline-offset: 3px;
  }
  .trippy-auth-flow .auth-panel .auth-submit.auth-submit--hero-frost:active:not(:disabled) {
    transform: translateY(0);
    background: rgba(6, 5, 4, 0.5) !important;
    border-color: rgba(212, 175, 55, 0.28) !important;
    box-shadow:
      0 0 12px rgba(212, 175, 55, 0.15),
      0 4px 24px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  .trippy-auth-flow .auth-panel .auth-submit.auth-submit--hero-frost .spinner-border-sm {
    border-color: rgba(255, 255, 255, 0.2);
    border-right-color: rgba(255, 255, 255, 0.9);
  }
  @media (prefers-reduced-motion: reduce) {
    .trippy-auth-flow .auth-panel .auth-submit.auth-submit--hero-frost:hover,
    .trippy-auth-flow .auth-panel .auth-submit.auth-submit--hero-frost:focus-visible {
      transform: none;
    }
  }

  .trippy-auth-flow .auth-panel hr {
    border: 0;
    border-top: 1px solid rgba(212, 175, 55, 0.15);
    opacity: 1;
  }

  .trippy-auth-flow .auth-panel .text-muted,
  .trippy-auth-flow .auth-panel .small.text-body {
    color: rgba(160, 140, 100, 0.9) !important;
  }

  .trippy-auth-flow .spinner-border-sm {
    border-color: rgba(20, 18, 10, 0.35);
    border-right-color: #0a0804;
  }

  .trippy-auth-flow .auth-panel .trippy-auth-form-login__footer {
    color: rgba(130, 115, 88, 0.95) !important;
  }
  .trippy-auth-flow .auth-panel .trippy-auth-form-login__subtle-link {
    color: rgba(200, 185, 145, 0.9) !important;
  }
  .trippy-auth-flow .auth-panel .trippy-auth-form-login__inline-link {
    border-bottom: 1px solid rgba(212, 175, 55, 0.25);
    padding-bottom: 1px;
  }
  .trippy-auth-flow .auth-panel .trippy-auth-form-login__inline-link:hover {
    border-bottom-color: rgba(212, 175, 55, 0.5);
  }

  @media (max-width: 575.98px) {
    .trippy-auth-flow .auth-panel { padding: 1.5rem !important; }
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
      <div className="trippy-auth-flow__grid" aria-hidden />
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
