import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { PageMetaData } from '@/components'
import FooterWithLinks from '../Home/components/FooterWithLinks'
import TopNavBar from '../Home/components/TopNavBar'

const PaymentPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const accountNumber = '000454489137'
  const amount = Number(searchParams.get('amount')) || 0
  const invoiceParam = searchParams.get('invoiceId')
  const invoiceId = invoiceParam ? `INV-${invoiceParam}` : 'INV-UNKNOWN'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.search])

  return (
    <>
      <PageMetaData title="Complete payment — Trippy Entry" />
      <TopNavBar />

      <main className="trippy-pay-page">
        <div className="trippy-pay-page__base" aria-hidden />
        <div className="trippy-pay-page__grid" aria-hidden />
        <div className="trippy-pay-page__scanlines" aria-hidden />

        <div className="trippy-pay-page__view">
          <Container fluid="xxl" className="px-3 px-sm-4 px-lg-5 trippy-pay-page__inner">
            <div className="trippy-pay-page__card">
              <header className="trippy-pay-page__head text-center">
                <h1 className="trippy-pay-page__title mb-2 mb-md-3">Complete payment to confirm booking</h1>
                <p className="trippy-pay-page__subtitle mb-0">
                  And go to My Bookings in your account to download your ticket
                </p>
              </header>

              <section className="trippy-pay-page__section text-center" aria-label="MCB bank transfer">
                <h2 className="trippy-pay-page__section-title h5 mb-3 mb-md-4">Pay directly to MCB account</h2>
                <ul className="trippy-pay-page__list list-unstyled mb-0 text-start d-inline-block">
                  <li className="trippy-pay-page__row">
                    <span className="trippy-pay-page__k">Bank</span>
                    <span className="trippy-pay-page__v">MCB (Mauritius Commercial Bank)</span>
                  </li>
                  <li className="trippy-pay-page__row">
                    <span className="trippy-pay-page__k">Account number</span>
                    <span className="trippy-pay-page__v trippy-pay-page__v--mono">{accountNumber}</span>
                  </li>
                  <li className="trippy-pay-page__row">
                    <span className="trippy-pay-page__k">Amount</span>
                    <span className="trippy-pay-page__v">Rs {amount.toLocaleString()}</span>
                  </li>
                  <li className="trippy-pay-page__row">
                    <span className="trippy-pay-page__k">Description</span>
                    <span className="trippy-pay-page__v trippy-pay-page__v--mono">{invoiceId}</span>
                  </li>
                </ul>
              </section>

              <div className="trippy-pay-page__note" role="note">
                <p className="mb-0">
                  <strong>Note</strong> — After payment, take a screenshot of your confirmation. Your booking will
                  be confirmed within a few hours by email, or call{' '}
                  <a href="tel:+23055063356" className="trippy-pay-page__link">
                    +230 5506 3356
                  </a>{' '}
                  to speed things up. <strong>More payment options will be available soon.</strong>
                </p>
              </div>

              <div className="trippy-pay-page__actions d-flex flex-wrap justify-content-center gap-3">
                <Link to="/" className="trippy-cta-frost trippy-cta-frost--fit">
                  Go to homepage
                </Link>
                <Link to="/userDashboard?tab=booking" className="trippy-cta-frost trippy-cta-frost--fit">
                  View my bookings
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </main>

      <FooterWithLinks />

      <style
        dangerouslySetInnerHTML={{
          __html: `
      html, body { overflow-x: hidden !important; }
      .trippy-pay-page {
        --tp-gold: #d4af37;
        --tp-parch: #c9b896;
        position: relative;
        min-height: 100dvh;
        min-height: 100svh;
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow-x: hidden;
        background: #000000;
        color: #c9b896;
        padding-top: max(5.5rem, calc(env(safe-area-inset-top, 0px) + 4.5rem));
        padding-bottom: 2.5rem;
        box-sizing: border-box;
      }
      .trippy-pay-page__base {
        position: absolute; inset: 0; z-index: 0; pointer-events: none;
        background:
          radial-gradient(ellipse 118% 82% at 50% -18%, rgba(107, 84, 24, 0.28), transparent 56%),
          radial-gradient(ellipse 88% 52% at 100% 32%, rgba(212, 175, 55, 0.1), transparent 50%),
          linear-gradient(180deg, #000000 0%, #080602 40%, #030201 100%);
      }
      .trippy-pay-page__grid {
        position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.35;
        background-image:
          linear-gradient(rgba(212, 175, 55, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232, 213, 163, 0.04) 1px, transparent 1px);
        background-size: 48px 48px;
        mask-image: linear-gradient(180deg, black 0%, rgba(0,0,0,0.5) 70%, transparent 95%);
      }
      .trippy-pay-page__scanlines {
        position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.1;
        background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px);
      }
      .trippy-pay-page__view {
        position: relative; z-index: 1; flex: 1 0 auto; display: flex; flex-direction: column;
        justify-content: center; align-items: stretch; width: 100%; min-height: min(78dvh, calc(100dvh - 8.5rem));
        padding: 0.5rem 0 1.5rem;
        box-sizing: border-box;
      }
      .trippy-pay-page__inner {
        width: 100%; max-width: 44rem; margin-left: auto; margin-right: auto;
      }
      .trippy-pay-page__card {
        background: rgba(10, 8, 5, 0.82);
        border: 1px solid rgba(212, 175, 55, 0.28);
        border-radius: 1rem;
        padding: 1.75rem 1.5rem 2rem;
        backdrop-filter: blur(4px) saturate(1.05);
        -webkit-backdrop-filter: blur(4px) saturate(1.05);
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 220, 180, 0.04) inset;
      }
      @media (min-width: 768px) {
        .trippy-pay-page__card { padding: 2.25rem 2rem 2.5rem; }
      }
      .trippy-pay-page__title {
        font-family: ui-serif, "Cinzel", "Times New Roman", Times, serif;
        font-weight: 800;
        letter-spacing: 0.06em;
        line-height: 1.2;
        text-transform: uppercase;
        font-size: clamp(1.1rem, 2.4vw, 1.4rem);
        color: #f0e6b8;
        text-shadow: 0 2px 20px rgba(0,0,0,0.4);
        margin: 0;
        padding: 0 0.25rem;
      }
      .trippy-pay-page__subtitle {
        color: rgba(201, 184, 150, 0.92);
        font-size: clamp(0.88rem, 1.6vw, 0.98rem);
        line-height: 1.5;
        max-width: 36rem; margin-left: auto; margin-right: auto;
      }
      .trippy-pay-page__section { margin-top: 1.75rem; }
      @media (min-width: 768px) { .trippy-pay-page__section { margin-top: 2.25rem; } }
      .trippy-pay-page__section-title {
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #e8d5a3;
        margin: 0 0 1rem 0;
      }
      .trippy-pay-page__list { min-width: min(100%, 20rem); }
      .trippy-pay-page__row {
        display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 0.5rem 1.5rem;
        padding: 0.5rem 0; border-bottom: 1px solid rgba(212, 175, 55, 0.12);
      }
      .trippy-pay-page__row:last-of-type { border-bottom: 0; padding-bottom: 0; }
      .trippy-pay-page__k {
        font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;
        color: rgba(212, 175, 55, 0.7); flex-shrink: 0;
      }
      .trippy-pay-page__v {
        color: rgba(255, 250, 235, 0.95); font-weight: 600; text-align: right; flex: 1 1 auto; min-width: 0; word-break: break-word;
      }
      @media (max-width: 575.98px) {
        .trippy-pay-page__v { text-align: left; width: 100%; }
      }
      .trippy-pay-page__v--mono {
        font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace; font-size: 1.02em;
        color: #f4e4a8; font-weight: 700;
      }
      .trippy-pay-page__note {
        margin-top: 1.5rem; padding: 1rem 1.1rem;
        background: rgba(3, 18, 20, 0.55);
        border: 1px solid rgba(100, 200, 200, 0.22);
        border-radius: 0.6rem; color: rgba(190, 230, 220, 0.92);
        font-size: 0.9rem; line-height: 1.55; text-align: left;
      }
      @media (min-width: 768px) { .trippy-pay-page__note { margin-top: 1.75rem; padding: 1.1rem 1.25rem; } }
      .trippy-pay-page__note strong { color: #c8f0e8; }
      .trippy-pay-page__link { color: #8fe8d8; font-weight: 700; text-decoration: underline; text-underline-offset: 2px; }
      .trippy-pay-page__link:hover { color: #b8fff0; }
      .trippy-pay-page__actions { margin-top: 1.75rem; }
      @media (min-width: 768px) { .trippy-pay-page__actions { margin-top: 2rem; } }
    `,
        }}
      />
    </>
  )
}

export default PaymentPage
