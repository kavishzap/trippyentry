import { Container } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

type HeroProps = {
  /** Featured event image (front_image / concert image); if missing, solid hero background only. */
  backgroundImageUrl?: string | null
  /** Primary CTA — defaults to events list. */
  buyTicketHref?: string
}

const Hero = ({ backgroundImageUrl, buyTicketHref = '/events' }: HeroProps) => {
  const bgUrl = (backgroundImageUrl && backgroundImageUrl.trim()) || null

  return (
    <section className="trippy-hero position-relative overflow-hidden">
      <div
        className="trippy-hero__bg"
        aria-hidden
        style={bgUrl ? { backgroundImage: `url(${JSON.stringify(bgUrl)})` } : undefined}
      />
      <div className="trippy-hero__overlay" aria-hidden />
      <div className="trippy-hero__grid" aria-hidden />
      <div className="trippy-hero__vignette" aria-hidden />
      <div className="trippy-hero__bottom-fade" aria-hidden />

      <Container
        fluid="xxl"
        className="trippy-hero__inner position-relative z-1 px-3 px-sm-4 px-lg-5"
      >
        <div className="trippy-hero__content mx-auto text-center">
          <motion.div
            className="trippy-hero__stack"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="trippy-hero__eyebrow trippy-hero__frost d-inline-flex align-items-center justify-content-center gap-2 mb-3 mb-lg-3">
              <span className="trippy-hero__pulse" aria-hidden />
              <span>Live across Mauritius</span>
            </div>

            <h1 className="trippy-hero__title mb-3 mb-lg-3">
              <span className="trippy-hero__title-line trippy-hero__title-line--main">Trippy</span>
              <span className="trippy-hero__title-line trippy-hero__title-line--accent">Events</span>
            </h1>

            <p className="trippy-hero__lead mx-auto mb-3 mb-lg-4">
              Step into the glow — the hottest concerts, raves, and live shows on the island, curated for your energy
              and your budget. One portal. Infinite nights.
            </p>

            <ul className="trippy-hero__bullets list-unstyled mb-4 mb-lg-4" role="list">
              <li>Feel the Bass</li>
              <li>Chase the Lights</li>
              <li>Live the Night</li>
            </ul>

            <div className="d-flex justify-content-center">
              <Link to={buyTicketHref} className="trippy-cta-frost">
                Buy ticket
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .trippy-hero {
            --neon-cyan: #d4af37;
            --neon-magenta: #e8d5a3;
            --neon-bronze: #6b5418;
            --neon-lime: #c9a227;
            --hero-glass-surface: rgba(8, 6, 5, 0.42);
            --hero-glass-surface-hover: rgba(12, 10, 8, 0.55);
            --hero-glass-border: rgba(255, 255, 255, 0.22);
            --hero-glass-border-hover: rgba(255, 255, 255, 0.32);
            --hero-pad-top: max(5.5rem, calc(env(safe-area-inset-top, 0px) + 4.5rem));
            min-height: 100dvh;
            min-height: 100svh;
            min-height: -webkit-fill-available;
            width: 100%;
            max-width: 100vw;
            margin: 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: stretch;
            padding-top: var(--hero-pad-top);
            padding-bottom: clamp(2rem, 5vh, 3.5rem);
            color: #c9b896;
            background: #000000;
          }
          @supports (height: 100dvh) {
            .trippy-hero { min-height: 100dvh; }
          }

          .trippy-hero__bg {
            position: absolute;
            inset: 0;
            z-index: 0;
            background-color: #050301;
            background-size: cover;
            background-position: center 28%;
            background-repeat: no-repeat;
            transform: scale(1.02);
          }
          @media (max-width: 767.98px) {
            .trippy-hero__bg {
              background-position: center top;
            }
          }

          .trippy-hero__overlay {
            position: absolute;
            inset: 0;
            z-index: 0;
            background:
              linear-gradient(180deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.5) 28%, rgba(0,0,0,0.72) 70%, rgba(0,0,0,0.95) 100%),
              radial-gradient(ellipse 90% 70% at 50% 20%, rgba(20, 14, 4, 0.62), transparent 55%);
            pointer-events: none;
          }

          .trippy-hero__vignette {
            position: absolute;
            inset: 0;
            z-index: 0;
            box-shadow: inset 0 0 140px 50px rgba(0,0,0,0.65);
            pointer-events: none;
          }

          .trippy-hero__grid {
            position: absolute;
            inset: 0;
            z-index: 0;
            background-image:
              linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232, 213, 163, 0.04) 1px, transparent 1px);
            background-size: 48px 48px;
            mask-image: linear-gradient(180deg, black 0%, transparent 88%);
            pointer-events: none;
            opacity: 0.35;
          }

          .trippy-hero__scanlines { display: none; }

          .trippy-hero__bottom-fade {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: min(32vh, 220px);
            z-index: 0;
            pointer-events: none;
            background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.62) 45%, #000000 100%);
          }

          .trippy-hero__inner {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 100%;
          }
          .trippy-hero__content {
            width: 100%;
            max-width: 56rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }

          .trippy-hero__stack {
            /* No light box — copy sits on the darkened hero. */
            max-width: 100%;
            text-align: center;
          }

          /* Frosted “glass” pill — shared by eyebrow + CTA */
          .trippy-hero__frost {
            position: relative;
            isolation: isolate;
            border-radius: 999px;
            background: var(--hero-glass-surface) !important;
            border: 1px solid var(--hero-glass-border) !important;
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
            .trippy-hero__frost {
              background: rgba(12, 10, 8, 0.75) !important;
            }
          }

          .trippy-hero__eyebrow.trippy-hero__frost {
            font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.24em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.96) !important;
            font-weight: 600;
            text-shadow: none;
            padding: 0.48rem 1.1rem 0.48rem 0.85rem;
            gap: 0.6rem;
            border-color: rgba(212, 175, 55, 0.3) !important;
            box-shadow:
              0 4px 28px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
            animation: trippy-eyebrow-bg-pulse 2.4s ease-in-out infinite;
          }
          @keyframes trippy-eyebrow-bg-pulse {
            0%, 100% {
              background: var(--hero-glass-surface) !important;
            }
            50% {
              background: rgba(255, 232, 190, 0.4) !important;
            }
          }
          .trippy-hero__eyebrow .trippy-hero__pulse {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #f0a030;
            box-shadow: 0 0 10px rgba(240, 160, 48, 0.7), 0 0 18px rgba(212, 175, 55, 0.4);
            animation: trippy-pulse 2s ease-in-out infinite;
          }
          @keyframes trippy-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.65; transform: scale(0.85); }
          }

          .trippy-hero__title-line { display: block; }

          .trippy-hero__title {
            font-family: "Cinzel", "Times New Roman", Times, serif;
            font-weight: 700;
            line-height: 0.9;
            letter-spacing: 0.03em;
            text-shadow: 0 4px 40px rgba(0,0,0,0.55);
          }
          .trippy-hero__title-line--main {
            font-size: clamp(2.5rem, 9vw, 4.2rem);
            line-height: 0.95;
            margin-bottom: 0.04em;
            background: linear-gradient(140deg, #fff8ec 0%, var(--neon-cyan) 42%, #6b5420 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .trippy-hero__title-line--accent {
            font-size: clamp(2.7rem, 9.4vw, 4.5rem);
            line-height: 0.9;
            margin-top: -0.02em;
            background: linear-gradient(92deg, var(--neon-magenta) 0%, #fff4d0 50%, var(--neon-lime) 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: trippy-title-shimmer 6s ease-in-out infinite alternate;
          }
          @keyframes trippy-title-shimmer {
            0% { filter: brightness(1); }
            100% { filter: brightness(1.08); }
          }

          .trippy-hero__lead {
            font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
            font-size: clamp(0.95rem, 2.1vw, 1.2rem);
            line-height: 1.7;
            font-weight: 500;
            color: rgba(255, 252, 245, 0.95) !important;
            -webkit-text-fill-color: rgba(255, 252, 245, 0.95);
            max-width: 38rem;
            letter-spacing: 0.01em;
            text-shadow: 0 2px 24px rgba(0,0,0,0.75);
          }

          .trippy-hero__bullets {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            row-gap: 0.5rem;
            column-gap: clamp(0.65rem, 2.5vw, 1.35rem);
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
            font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
            font-size: clamp(0.7rem, 1.4vw, 0.8rem);
            font-weight: 600;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(255, 248, 230, 0.88);
            text-shadow: 0 1px 12px rgba(0,0,0,0.65);
          }
          .trippy-hero__bullets li {
            position: relative;
            display: inline-flex;
            align-items: center;
            padding-left: 0.65rem;
            text-align: center;
            width: auto;
            max-width: none;
            margin: 0;
          }
          .trippy-hero__bullets li::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #d4af37;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.7);
          }
          @media (max-width: 575.98px) {
            .trippy-hero__bullets {
              column-gap: 0.5rem;
              font-size: 0.65rem;
              letter-spacing: 0.1em;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .trippy-hero__title-line--accent { animation: none !important; }
            .trippy-hero__eyebrow.trippy-hero__frost { animation: none; }
            .trippy-hero__eyebrow .trippy-hero__pulse { animation: none; }
            .trippy-hero .trippy-cta-frost:hover,
            .trippy-hero .trippy-cta-frost:focus-visible { transform: none; }
          }
        `,
        }}
      />
    </section>
  )
}

export default Hero
