/**
 * Event detail (/events/detail) + SweetAlert2 — Trippy dark / gold glass theme.
 */
export const EVENT_DETAIL_STYLES = `
  main.trippy-event-page {
    --hero-glass-surface: rgba(8, 6, 5, 0.42);
    --hero-glass-surface-hover: rgba(12, 10, 8, 0.55);
    --hero-glass-border: rgba(255, 255, 255, 0.22);
    --neon-cyan: #d4af37;
    --neon-magenta: #e8d5a3;
    --neon-bronze: #6b5418;
    --neon-lime: #c9a227;
    position: relative;
    width: 100%;
    min-height: 100%;
    background: #000000;
    color: #c9b896;
    padding-top: max(5.5rem, calc(env(safe-area-inset-top, 0px) + 4.5rem));
    padding-bottom: 2.5rem;
    overflow-x: hidden;
  }
  .trippy-event-page__base {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 118% 82% at 50% -18%, rgba(212, 175, 55, 0.28), transparent 56%),
      radial-gradient(ellipse 88% 52% at 100% 38%, rgba(212, 175, 55, 0.09), transparent 50%),
      radial-gradient(ellipse 78% 56% at 0% 72%, rgba(232, 213, 163, 0.1), transparent 46%),
      linear-gradient(180deg, #000000 0%, #080602 42%, #030201 72%, #000000 100%);
  }
  .trippy-event-page__grid {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(232, 213, 163, 0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(180deg, black 0%, transparent 88%);
    opacity: 0.32;
  }
  .trippy-event-page--state { min-height: 70vh; }
  .trippy-event-page__state { position: relative; z-index: 1; padding-top: 0.5rem; }
  .trippy-event-page__spinner {
    color: #d4af37 !important;
    border-color: rgba(212, 175, 55, 0.22) !important;
    border-right-color: #d4af37 !important;
  }
  .trippy-event-page__error { color: #f0b8a8 !important; font-size: 1.05rem; }
  .trippy-event-page .container, .trippy-event-page [class*=container-] { position: relative; z-index: 1; }

  main.trippy-event-page.trippy-event-detail { min-width: 0; min-height: 100dvh; display: flex; flex-direction: column; }
  .trippy-event-page.trippy-event-detail .position-relative.z-1 { flex: 1 0 auto; display: flex; flex-direction: column; }
  .trippy-event-detail__page {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  }
  .trippy-event-detail__view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: min(100%, 60rem);
    margin-left: auto;
    margin-right: auto;
    min-height: min(78dvh, calc(100dvh - max(5.5rem, env(safe-area-inset-top, 0px) + 4.5rem) - 3rem));
    padding: 0.75rem 0 1.5rem;
    box-sizing: border-box;
  }
  @media (min-width: 992px) {
    .trippy-event-detail__view { min-height: min(80dvh, calc(100dvh - 8rem)); padding: 1rem 0 2rem; }
  }
  .trippy-event-detail__head-row {
    width: 100%;
    max-width: 100%;
  }
  .trippy-event-detail__event-tickets-row {
    min-width: 0;
    width: 100%;
    max-width: 100%;
  }
  @media (min-width: 992px) {
    .trippy-event-detail__head-row { margin-bottom: 0.25rem !important; }
    .trippy-event-detail__head-row + .trippy-event-detail__event-tickets-row {
      margin-top: 0.5rem;
    }
    .trippy-event-detail__event-tickets-row { --bs-gutter-x: 2.5rem; --bs-gutter-y: 1.5rem; }
    .trippy-event-detail__tickets-col .trippy-event-detail__tickets-card--aside {
      position: sticky;
      top: max(1rem, calc(env(safe-area-inset-top, 0px) + 0.5rem));
      align-self: flex-start;
    }
  }
  .trippy-event-detail__about-wrap {
    width: 100%;
    max-width: min(100%, 60rem);
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 992px) {
    .trippy-event-detail__about-wrap { padding-top: 0.25rem; padding-bottom: 2rem; }
  }
  .trippy-event-detail__datetime-strip {
    width: 100%;
    max-width: 100%;
    padding: 0.7rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(212, 175, 55, 0.2);
    background: rgba(6, 5, 3, 0.5);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  @media (max-width: 575.98px) {
    .trippy-event-detail__datetime-strip { justify-content: center; text-align: center; }
    .trippy-event-detail__datetime-strip .trippy-event-detail__meta { font-size: 0.9rem; white-space: normal; }
  }
  .trippy-event-detail__about-block { min-width: 0; }
  .trippy-event-detail__about-text { max-width: 100%; }
  .trippy-event-detail__title {
    font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(1.4rem, 3.5vw, 2.1rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: #f0e6b8;
  }
  .trippy-event-detail__main-row { min-width: 0; }
  .trippy-event-detail__media-col, .trippy-event-detail__about-col { min-width: 0; }
  @media (max-width: 991.98px) {
    .trippy-event-detail__about-col { padding-top: 0.5rem; }
  }

  .trippy-event-detail__hero-image-wrap { line-height: 0; width: 100%; }
  .trippy-event-detail__about-title {
    font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
    font-weight: 800;
    line-height: 1.1;
  }
  .trippy-event-detail__about-line { display: block; }
  .trippy-event-detail__about-line--main {
    font-size: clamp(1.1rem, 2.2vw, 1.35rem);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #fff8ec 0%, var(--neon-cyan) 50%, #6b5418 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .trippy-event-detail__about-line--accent {
    font-size: clamp(1.75rem, 4.5vw, 2.5rem);
    background: linear-gradient(90deg, var(--neon-magenta) 0%, var(--neon-lime) 50%, var(--neon-cyan) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  @keyframes trippy-event-about-pulse {
    0%, 100% { filter: brightness(1) drop-shadow(0 0 4px rgba(212, 175, 55, 0.12)); }
    50% { filter: brightness(1.1) drop-shadow(0 0 16px rgba(255, 220, 170, 0.25)); }
  }
  .trippy-event-detail__about-line--main,
  .trippy-event-detail__about-line--accent {
    animation: trippy-event-about-pulse 3.2s ease-in-out infinite;
  }
  .trippy-event-detail__about-line--accent { animation-delay: 0.4s; }
  @media (prefers-reduced-motion: reduce) {
    .trippy-event-detail__about-line--main,
    .trippy-event-detail__about-line--accent { animation: none !important; filter: none; }
  }

  .trippy-event-detail__ticket-row {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(212, 175, 55, 0.12);
  }
  .trippy-event-detail__ticket-row:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .trippy-event-detail__stock-ok {
    color: #dcc896 !important;
    text-shadow: 0 0 12px rgba(212, 175, 55, 0.2);
  }
  .trippy-event-detail__stock-out { color: #f0b8c2 !important; }
  .trippy-event-detail__qty-pill {
    min-width: 8.5rem;
    max-width: 12rem;
    margin-left: 0;
  }
  @media (min-width: 576px) {
    .trippy-event-detail__qty-pill { min-width: 7.5rem; }
  }

  .trippy-event-detail { color: #c9b896; }
  .trippy-event-detail__subtitle {
    color: #dcc083;
    text-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
  }
  .trippy-event-detail__meta { color: rgba(201, 184, 150, 0.9) !important; }
  .trippy-event-detail__description {
    color: rgba(232, 213, 163, 0.92) !important;
    line-height: 1.65;
  }
  .trippy-event-detail__read-more {
    color: #e8d5a3 !important;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  }
  .trippy-event-detail__read-more:hover { color: #fff6dd !important; border-bottom-color: rgba(212, 175, 55, 0.5); }
  .trippy-event-detail__total-line {
    color: #f0e6b8 !important;
    font-size: 1.05rem;
    letter-spacing: 0.02em;
  }

  .trippy-event-detail__share-btn {
    background: var(--hero-glass-surface) !important;
    border: 1px solid var(--hero-glass-border) !important;
    color: rgba(255, 255, 255, 0.95) !important;
    font-family: "DM Sans", system-ui, sans-serif;
    font-size: 0.75rem !important;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border-radius: 999px;
    padding: 0.45rem 1.1rem !important;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
    backdrop-filter: blur(12px) saturate(1.1);
    -webkit-backdrop-filter: blur(12px) saturate(1.1);
  }
  .trippy-event-detail__share-btn:hover,
  .trippy-event-detail__share-btn:focus { background: var(--hero-glass-surface-hover) !important; color: #fff !important; border-color: rgba(240, 215, 150, 0.45) !important; }
  .trippy-event-detail__share-menu {
    background: rgba(8, 6, 4, 0.96) !important;
    border: 1px solid rgba(212, 175, 55, 0.3) !important;
    border-radius: 0.6rem !important;
    box-shadow: 0 12px 40px rgba(0,0,0,0.55) !important;
    padding: 0.35rem !important;
  }
  .trippy-event-detail__share-menu .dropdown-item { color: rgba(232, 220, 190, 0.95) !important; border-radius: 0.4rem; }
  .trippy-event-detail__share-menu .dropdown-item:hover { background: rgba(212, 175, 55, 0.12) !important; color: #fff !important; }

  .trippy-event-detail__panel {
    background: rgba(0, 0, 0, 0.72) !important;
    border: 1px solid rgba(212, 175, 55, 0.24) !important;
    border-radius: 1rem;
    box-shadow: 0 0 0 1px rgba(232, 213, 163, 0.06), 0 16px 48px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(8px) saturate(1.05);
    -webkit-backdrop-filter: blur(8px) saturate(1.05);
  }
  .trippy-event-detail__panel-header {
    background: linear-gradient(180deg, rgba(212, 175, 55, 0.14), rgba(14, 11, 6, 0.4)) !important;
    border-bottom: 1px solid rgba(212, 175, 55, 0.25) !important;
    border-radius: 1rem 1rem 0 0;
    color: #e8d5a3;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .trippy-event-detail__panel-header-title {
    color: #f0e6b8 !important;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: 0.9rem;
  }
  .trippy-event-detail__tickets-body { color: rgba(232, 213, 163, 0.92); }
  .trippy-event-detail__tickets-body h6 { color: #fffcf0; font-weight: 700; }
  .trippy-event-detail__tickets-body .text-body { color: rgba(201, 184, 150, 0.95) !important; }
  .trippy-event-detail__tickets-body .text-success { color: #8be8c0 !important; }
  .trippy-event-detail__tickets-body .text-danger { color: #f5a8b5 !important; }
  .trippy-event-detail__tickets-body .btn-outline-secondary,
  .trippy-event-detail__tickets-body .btn-outline-secondary:focus {
    border-color: rgba(212, 175, 55, 0.4);
    color: #e8d5a3;
    background: rgba(0,0,0,0.2);
  }
  .trippy-event-detail__tickets-body .btn-outline-secondary:hover:not(:disabled) {
    background: rgba(212, 175, 55, 0.12);
    border-color: #d4af37;
    color: #fff;
  }

  .trippy-event-detail__book-cta {
    min-width: 0;
    max-width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    isolation: isolate;
    border-radius: 999px;
    font-family: "DM Sans", system-ui, sans-serif;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.95) !important;
    background: var(--hero-glass-surface) !important;
    border: 1px solid var(--hero-glass-border) !important;
    box-shadow: 0 4px 28px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(14px) saturate(1.12);
    -webkit-backdrop-filter: blur(14px) saturate(1.12);
    padding: 0.6rem 1.25rem;
    border-width: 1px;
    transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }
  .trippy-event-detail__book-cta--compact {
    min-width: 0 !important;
    max-width: 10.25rem;
    width: auto;
  }
  .trippy-event-detail__book-cta-wrap { width: 100%; }
  @media (min-width: 768px) {
    .trippy-event-detail__book-cta--compact { max-width: 10.75rem; }
  }
  @supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
    .trippy-event-detail__book-cta { background: rgba(12, 10, 8, 0.8) !important; }
  }
  .trippy-event-detail__book-cta:hover:not(:disabled) {
    color: #fff !important;
    background: var(--hero-glass-surface-hover) !important;
    border-color: rgba(240, 215, 150, 0.55) !important;
    box-shadow: 0 0 0 1px rgba(240, 220, 160, 0.35), 0 0 24px rgba(212, 175, 55, 0.35), 0 0 40px rgba(255, 224, 160, 0.1), 0 6px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.16);
    transform: translateY(-2px);
  }
  .trippy-event-detail__book-cta:focus-visible {
    color: #fff !important;
    outline: 2px solid rgba(240, 200, 120, 0.45);
    outline-offset: 3px;
  }
  .trippy-event-detail__book-cta:active:not(:disabled) {
    transform: translateY(0);
    background: rgba(6, 5, 4, 0.55) !important;
    border-color: rgba(212, 175, 55, 0.28) !important;
  }
  .trippy-event-detail__book-cta:disabled { opacity: 0.5; }
  @media (prefers-reduced-motion: reduce) {
    .trippy-event-detail__book-cta:hover:not(:disabled) { transform: none; }
  }
  .trippy-event-detail__hero-image { border-radius: 0.75rem; border: 1px solid rgba(212, 175, 55, 0.28); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
  @media (max-width: 767.98px) {
    .trippy-event-detail__book-cta--compact { max-width: 10rem; }
    .trippy-event-detail__book-cta-wrap { justify-content: center; }
  }

  /* Map modal (Bootstrap) */
  .modal.trippy-event-modal { z-index: 1060; }
  .trippy-event-modal .modal-content.trippy-event-modal__content,
  .trippy-event-modal__content {
    background: linear-gradient(180deg, rgba(14, 10, 6, 0.98), rgba(4, 3, 2, 0.99)) !important;
    border: 1px solid rgba(212, 175, 55, 0.32) !important;
    border-radius: 1rem !important;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 220, 160, 0.05) !important;
    color: #e8d5a3;
  }
  .trippy-event-modal__header { border-bottom: 1px solid rgba(212, 175, 55, 0.22) !important; }
  .trippy-event-modal__header .modal-title { color: #f0e6b8; font-weight: 700; letter-spacing: 0.02em; }
  .trippy-event-modal__map-frame { display: block; line-height: 0; }
  .trippy-event-modal__map-frame iframe { display: block; }
  .trippy-event-modal .btn-close { opacity: 0.85; filter: invert(1) brightness(1.15) sepia(0.2); }
  .trippy-event-modal .btn-close:hover { opacity: 1; }

  /* SweetAlert2 — booking / confirm (portal to body) */
  .swal2-container { z-index: 20000 !important; }
  .swal2-popup.trippy-swal2-popup { background: linear-gradient(180deg, rgba(16, 12, 8, 0.99), rgba(5, 4, 2, 0.99)) !important; border: 1px solid rgba(212, 175, 55, 0.32) !important; border-radius: 1rem !important; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65) !important; }
  h2#swal2-title.trippy-swal2-title, .swal2-title.trippy-swal2-title { color: #f0e6b8 !important; font-size: 1.25rem !important; }
  .swal2-html-container.trippy-swal2-html, .swal2-html-container { color: rgba(201, 184, 150, 0.95) !important; }
  .swal2-html-container hr { border-color: rgba(212, 175, 55, 0.2) !important; opacity: 1; }
  .swal2-timer-progress-bar { background: rgba(212, 175, 55, 0.4) !important; }
  .swal2-icon { border-color: rgba(212, 175, 55, 0.3) !important; }
  .swal2-icon.swal2-success { border-color: #7dffc4 !important; }
  .swal2-icon.swal2-error { border-color: #f5a8b5 !important; }
  .swal2-icon.swal2-warning { border-color: #e8c76a !important; color: #e8c76a !important; }
`
