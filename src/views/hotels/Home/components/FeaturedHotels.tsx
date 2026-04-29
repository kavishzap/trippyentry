import { useEffect, useMemo, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsArrowRight, BsCalendarEvent, BsGeoAlt } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'

type Concert = {
  id: number
  concert_name: string
  concert_date: string
  concert_location_name: string
  concert_image: string
  front_image: string
  concert_description?: string | null
  price: number
}

function formatEventDate(iso: string) {
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleDateString('en-MU', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

const FeaturedHotels = () => {
  const [concert, setConcert] = useState<Concert | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const detailHref = useMemo(
    () => (concert ? `/events/detail?id=${concert.id}` : '#'),
    [concert],
  )

  useEffect(() => {
    const fetchLatestConcert = async () => {
      setFetchError(null)
      try {
        const { data: concertsData, error: concertError } = await supabase
          .from('concerts')
          .select('*')
          .order('id', { ascending: false })
          .limit(1)

        if (concertError || !concertsData?.length) {
          setFetchError(concertError?.message ?? 'No events available right now.')
          setConcert(null)
          return
        }

        const row = concertsData[0]
        const { data: ticketsData, error: ticketError } = await supabase
          .from('tickets')
          .select('concert_id, price')
          .eq('concert_id', row.id)

        let minPrice = 0
        if (!ticketError && ticketsData?.length) {
          minPrice = Math.min(...ticketsData.map((t) => Number(t.price) || 0))
        }

        setConcert({
          ...row,
          price: minPrice,
        } as Concert)
      } catch {
        setFetchError('Unable to fetch events right now.')
        setConcert(null)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestConcert()
  }, [])

  const eventDescription = concert ? String(concert.concert_description ?? '').trim() : ''
  const descriptionShown = useMemo(() => {
    if (!eventDescription) return ''
    if (eventDescription.length <= 48) return eventDescription
    const half = Math.floor(eventDescription.length / 2)
    return `${eventDescription.slice(0, half)}...`
  }, [eventDescription])

  return (
    <section className="trippy-featured position-relative overflow-hidden">
      <div className="trippy-featured__aurora" aria-hidden />
      <div className="trippy-featured__grid" aria-hidden />
      <div className="trippy-featured__scanlines" aria-hidden />

      <Container className="trippy-featured__inner position-relative z-1 py-3 py-lg-4">
        <Row className="mb-2 mb-lg-3">
          <Col xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05, margin: '0px 0px 120px 0px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-center text-lg-start"
            >
              <div className="trippy-featured__eyebrow d-inline-flex align-items-center gap-2 mb-1">
                <span className="trippy-featured__pulse" aria-hidden />
                <span>Just dropped</span>
              </div>
              <h2 className="trippy-featured__heading mb-0">
                <span className="trippy-featured__heading-line trippy-featured__heading-line--main">Featured</span>
                <span className="trippy-featured__heading-line trippy-featured__heading-line--accent">Event</span>
              </h2>
            </motion.div>
          </Col>
        </Row>

        {loading ? (
          <div className="trippy-featured__shell trippy-featured__shell--skeleton" aria-busy="true">
            <div className="trippy-featured__shell-grid">
              <div className="trippy-featured__visual-skel" />
              <div className="trippy-featured__copy-skel">
                <div className="trippy-featured__skel-line trippy-featured__skel-line--lg" />
                <div className="trippy-featured__skel-line trippy-featured__skel-line--md" />
                <div className="trippy-featured__skel-line trippy-featured__skel-line--sm" />
                <div className="trippy-featured__skel-cta" />
              </div>
            </div>
          </div>
        ) : concert ? (
          <motion.div
            className="trippy-featured__shell"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: '0px 0px 160px 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="trippy-featured__shell-grid">
              <Link to={detailHref} className="trippy-featured__visual-link text-decoration-none">
                <div className="trippy-featured__visual">
                  <div className="trippy-featured__visual-glow" aria-hidden />
                  <img
                    src={concert.front_image}
                    alt={concert.concert_name}
                    className="trippy-featured__img"
                    width={960}
                    height={640}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <div className="trippy-featured__frame" aria-hidden />
                </div>
              </Link>

              <div className="trippy-featured__copy">
              <Link to={detailHref} className="trippy-featured__title-link text-decoration-none">
                <h3 className="trippy-featured__title">{concert.concert_name}</h3>
              </Link>

              <ul className="trippy-featured__meta list-unstyled mb-0">
                <li className="trippy-featured__meta-item">
                  <BsCalendarEvent className="trippy-featured__meta-icon" aria-hidden />
                  <span>{formatEventDate(concert.concert_date)}</span>
                </li>
                <li className="trippy-featured__meta-item">
                  <BsGeoAlt className="trippy-featured__meta-icon" aria-hidden />
                  <span>{concert.concert_location_name}</span>
                </li>
              </ul>

              {eventDescription ? (
                <div className="trippy-featured__desc-block">
                  <h4 className="trippy-featured__desc-heading">About This Event</h4>
                  <p className="trippy-featured__desc mb-0">{descriptionShown}</p>
                </div>
              ) : null}

              <div className="trippy-featured__price-row">
                {concert.price > 0 ? (
                  <p className="trippy-featured__price mb-0">
                    <span className="trippy-featured__price-label">From</span>
                    <span className="trippy-featured__price-value">Rs {concert.price}</span>
                  </p>
                ) : (
                  <p className="trippy-featured__price mb-0">
                    <span className="trippy-featured__price-value">Tickets on sale</span>
                  </p>
                )}
              </div>

              <Link to={detailHref} className="trippy-featured__cta">
                <span>View event</span>
                <BsArrowRight className="trippy-featured__cta-icon" aria-hidden />
              </Link>
            </div>
            </div>
          </motion.div>
        ) : (
          <p className="trippy-featured__empty text-center text-secondary mb-0">
            {fetchError ?? 'New events are on the way — check back soon.'}
          </p>
        )}
      </Container>

      <style>{`
        .trippy-featured {
          --neon-cyan: #d4af37;
          --neon-magenta: #e8d5a3;
          --neon-bronze: #6b5418;
          --neon-lime: #c9a227;
          color: #c9b896;
          background: transparent;
        }

        .trippy-featured__aurora {
          position: absolute;
          inset: -35% -15%;
          background: conic-gradient(from 200deg at 50% 50%,
            rgba(212, 175, 55, 0.1),
            rgba(232, 213, 163, 0.08),
            rgba(212, 175, 55, 0.12),
            rgba(212, 175, 55, 0.06),
            rgba(212, 175, 55, 0.1));
          animation: tfeat-aurora 24s linear infinite;
          opacity: 0.45;
          filter: blur(52px);
          pointer-events: none;
        }

        @keyframes tfeat-aurora {
          to { transform: rotate(360deg); }
        }

        .trippy-featured__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212, 175, 55, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232, 213, 163, 0.035) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(180deg, black 0%, transparent 92%);
          pointer-events: none;
        }

        .trippy-featured__scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          );
          opacity: 0.18;
          pointer-events: none;
        }

        .trippy-featured__inner { z-index: 2; }

        .trippy-featured__eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.85);
        }

        .trippy-featured__pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--neon-cyan);
          box-shadow: 0 0 12px var(--neon-cyan);
          animation: tfeat-pulse 1.8s ease-in-out infinite;
        }

        @keyframes tfeat-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(0.92); }
        }

        .trippy-featured__heading {
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.08;
        }

        .trippy-featured__heading-line {
          display: block;
        }

        .trippy-featured__heading-line--main {
          font-size: clamp(1.75rem, 4.5vw, 2.5rem);
          background: linear-gradient(135deg, #fff 0%, var(--neon-cyan) 50%, var(--neon-bronze) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .trippy-featured__heading-line--accent {
          font-size: clamp(2rem, 5vw, 2.85rem);
          background: linear-gradient(90deg, var(--neon-magenta), var(--neon-lime));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .trippy-featured__shell {
          position: relative;
          isolation: isolate;
          overflow: visible;
        }

        /* Two columns live here so background art can sit behind this grid only */
        .trippy-featured__shell-grid {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 1rem;
          align-items: start;
          /* Avoid min-content blowout from large intrinsic image widths on narrow viewports */
          grid-template-columns: minmax(0, 1fr);
        }

        @media (min-width: 992px) {
          .trippy-featured__shell-grid {
            grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr);
            gap: 1.25rem 1.75rem;
            align-items: center;
          }
        }

        .trippy-featured__visual-link {
          position: relative;
          z-index: 1;
          display: block;
          min-width: 0;
        }

        @media (max-width: 991.98px) {
          .trippy-featured__visual-link {
            max-width: min(100%, 380px);
            margin-inline: auto;
            width: 100%;
          }
        }

        .trippy-featured__visual {
          position: relative;
          overflow: hidden;
          width: 100%;
          max-width: 380px;
          margin-inline: auto;
          min-width: 0;
          aspect-ratio: 16 / 10;
          /* Fallback when aspect-ratio + abs children resolve late on mobile */
          min-height: clamp(11rem, 58vw, 15rem);
          border-radius: 1rem;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
        }

        @media (min-width: 576px) {
          .trippy-featured__visual {
            max-width: min(100%, 440px);
          }
        }

        @media (min-width: 992px) {
          .trippy-featured__visual {
            max-width: none;
            margin-inline: 0;
            aspect-ratio: 5 / 4;
            max-height: min(420px, 52vh);
            min-height: 0;
            border-radius: 1rem;
          }
        }

        .trippy-featured__visual-glow {
          position: absolute;
          inset: -8%;
          z-index: 0;
          background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.18), transparent 55%),
            radial-gradient(circle at 70% 30%, rgba(232, 213, 163, 0.14), transparent 50%);
          opacity: 0.7;
          pointer-events: none;
        }

        .trippy-featured__frame {
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: 1rem;
          pointer-events: none;
          box-shadow:
            inset 0 0 0 1px rgba(212, 175, 55, 0.4),
            inset 0 0 40px rgba(212, 175, 55, 0.1),
            0 0 0 1px rgba(232, 213, 163, 0.18);
        }

        .trippy-featured__img {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          max-width: none;
          min-width: 0;
          min-height: 0;
          object-fit: cover;
          object-position: center;
          transform: scale(1.14);
          transition: transform 0.5s ease;
        }

        .trippy-featured__visual-link:hover .trippy-featured__img,
        .trippy-featured__visual-link:focus-visible .trippy-featured__img {
          transform: scale(1.22);
        }

        @media (prefers-reduced-motion: reduce) {
          .trippy-featured__img {
            transition: none;
          }
          .trippy-featured__visual-link:hover .trippy-featured__img,
          .trippy-featured__visual-link:focus-visible .trippy-featured__img {
            transform: scale(1.14);
          }
        }

        .trippy-featured__copy {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          text-align: center;
          align-items: center;
        }

        @media (min-width: 992px) {
          .trippy-featured__copy {
            text-align: start;
            align-items: flex-start;
          }
        }

        .trippy-featured__title-link {
          color: inherit;
        }

        .trippy-featured__title-link:hover .trippy-featured__title,
        .trippy-featured__title-link:focus-visible .trippy-featured__title {
          color: #fff;
          text-shadow: 0 0 24px rgba(212, 175, 55, 0.35);
        }

        .trippy-featured__title {
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          font-weight: 800;
          font-size: clamp(1.35rem, 3.5vw, 1.85rem);
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #f4f2ff;
          margin: 0;
          transition: color 0.2s ease, text-shadow 0.2s ease;
        }

        .trippy-featured__desc-block {
          text-align: center;
          width: 100%;
          max-width: 40rem;
          margin-inline: auto;
        }

        @media (min-width: 992px) {
          .trippy-featured__desc-block {
            text-align: left;
            margin-inline: 0;
          }
        }

        .trippy-featured__desc-heading {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.88);
          margin: 0.15rem 0 0.25rem;
          text-align: inherit;
        }

        .trippy-featured__desc {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: rgba(232, 213, 163, 0.82);
          white-space: pre-line;
        }

        .trippy-featured__meta {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          align-items: center;
        }

        @media (min-width: 992px) {
          .trippy-featured__meta {
            align-items: flex-start;
          }
        }

        .trippy-featured__meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8125rem;
          color: rgba(232, 213, 163, 0.78);
        }

        .trippy-featured__meta-icon {
          color: var(--neon-cyan);
          flex-shrink: 0;
          opacity: 0.9;
        }

        .trippy-featured__price-row {
          padding-top: 0.1rem;
          width: 100%;
          text-align: center;
        }

        @media (min-width: 992px) {
          .trippy-featured__price-row {
            text-align: left;
          }
        }

        .trippy-featured__price-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.75);
          margin-bottom: 0.15rem;
          text-align: inherit;
        }

        .trippy-featured__price-value {
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, #fff, var(--neon-cyan));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .trippy-featured__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.15rem;
          padding: 0.5rem 1rem;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--neon-cyan);
          border: 1px solid rgba(212, 175, 55, 0.55);
          border-radius: 0.5rem;
          background: rgba(212, 175, 55, 0.06);
          box-shadow: 0 0 24px rgba(212, 175, 55, 0.12);
          transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
          align-self: center;
        }

        @media (min-width: 992px) {
          .trippy-featured__cta {
            align-self: flex-start;
          }
        }

        .trippy-featured__cta:hover {
          color: #0a0804;
          background: var(--neon-cyan);
          border-color: var(--neon-cyan);
          box-shadow: 0 0 32px rgba(212, 175, 55, 0.45);
        }

        .trippy-featured__cta-icon {
          font-size: 1.1rem;
        }

        .trippy-featured__empty {
          opacity: 0.85;
        }

        /* Skeleton */
        .trippy-featured__shell--skeleton {
          pointer-events: none;
        }

        @media (max-width: 991.98px) {
          .trippy-featured__visual-skel {
            max-width: min(100%, 420px);
            margin-inline: auto;
          }
        }

        .trippy-featured__visual-skel {
          position: relative;
          z-index: 1;
          border-radius: 0.85rem;
          aspect-ratio: 16 / 10;
          max-height: min(220px, 48vw);
          background: linear-gradient(110deg,
            rgba(42, 38, 72, 0.9) 0%,
            rgba(62, 58, 98, 0.6) 45%,
            rgba(42, 38, 72, 0.9) 90%);
          background-size: 200% 100%;
          animation: tfeat-shimmer 1.4s ease-in-out infinite;
        }

        @media (min-width: 576px) {
          .trippy-featured__visual-skel {
            max-height: min(280px, 44vw);
          }
        }

        @media (min-width: 992px) {
          .trippy-featured__visual-skel {
            max-height: 320px;
            border-radius: 1rem;
          }
        }

        @keyframes tfeat-shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }

        .trippy-featured__copy-skel {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          width: 100%;
          max-width: 360px;
          margin-inline: auto;
        }

        @media (min-width: 992px) {
          .trippy-featured__copy-skel {
            margin-inline: 0;
          }
        }

        .trippy-featured__skel-line {
          height: 14px;
          border-radius: 6px;
          background: rgba(100, 96, 140, 0.35);
        }

        .trippy-featured__skel-line--lg { width: 92%; height: 22px; }
        .trippy-featured__skel-line--md { width: 70%; }
        .trippy-featured__skel-line--sm { width: 55%; }

        .trippy-featured__skel-cta {
          margin-top: 0.5rem;
          width: 160px;
          height: 42px;
          border-radius: 0.5rem;
          border: 1px solid rgba(212, 175, 55, 0.2);
          background: rgba(212, 175, 55, 0.05);
        }
      `}</style>
    </section>
  )
}

export default FeaturedHotels
