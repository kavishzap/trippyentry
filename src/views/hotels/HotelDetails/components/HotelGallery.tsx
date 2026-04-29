import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Spinner,
  Button,
} from 'react-bootstrap'
import {
  BsCalendarEvent,
  BsClock,
  BsGeoAlt,
} from 'react-icons/bs'
import { FaShareAlt } from 'react-icons/fa'
import { FaCopy, FaMinus, FaPlus } from 'react-icons/fa6'
import { supabase } from '@/lib/supabaseClient'
import Swal from 'sweetalert2'
import { createBooking } from './bookingService'
import { EVENT_DETAIL_STYLES } from './eventDetailStyles'

interface Concert {
  concert_google_map_link: string | undefined
  id: string
  concert_name: string
  concert_location_name: string
  concert_image: string
  /** Hero / listing image URL (preferred on detail page) */
  front_image?: string | null
  concert_description: string
  concert_date: string
  concert_start_time: string
  concert_end_time: string
}

interface Ticket {
  ticket_id: number
  ticket_type: string
  price: number
  ticket_name: string
}

/** Long copy preview length when user collapses via “Show less” (default is full text expanded) */
const ABOUT_DESC_PREVIEW_MAX = 240

/** Dark gold theme for SweetAlert2 (buy ticket / confirm / errors) */
const trippySwal = {
  customClass: {
    popup: 'trippy-swal2-popup',
    title: 'trippy-swal2-title',
    htmlContainer: 'trippy-swal2-html',
    confirmButton: 'trippy-swal2-confirm',
    cancelButton: 'trippy-swal2-cancel',
  },
  color: '#c9b896',
} as const

const ConcertDetailPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id')
  const [concert, setConcert] = useState<Concert | null>(null)
  const [tickets, setTickets] = useState<(Ticket & { quantity: number; stock: number })[]>([])
  const [loading, setLoading] = useState(true)
  const [showFullDescription, setShowFullDescription] = useState(true)

  useEffect(() => {
    setShowFullDescription(true)
    if (id) {
      fetchConcertDetails()
      fetchTickets()
    }
  }, [id])

  const fetchConcertDetails = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('concerts').select('*').eq('id', id).single()

    if (error) {
      console.error('Failed to fetch concert:', error.message)
    } else {
      setConcert(data)
    }
    setLoading(false)
  }

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('concert_id', id)

    if (error) {
      console.error('Failed to fetch tickets:', error.message)
    } else {
      setTickets(
        (data || []).map((ticket) => ({
          ticket_id: ticket.id,
          ticket_type: ticket.ticket_type || '',
          ticket_name: ticket.ticket_name,
          price: Number(ticket.price),
          quantity: 0,
          stock: Number(ticket.quantity),
        })),
      )
    }
  }

  const handleIncrement = (ticketId: number, index: number) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket, i) =>
        ticket.ticket_id === ticketId && i === index
          ? { ...ticket, quantity: ticket.quantity + 1 }
          : ticket,
      ),
    )
  }

  const handleDecrement = (ticketId: number, index: number) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket, i) =>
        ticket.ticket_id === ticketId && i === index && ticket.quantity > 0
          ? { ...ticket, quantity: ticket.quantity - 1 }
          : ticket,
      ),
    )
  }

  if (loading) {
    return (
      <main className="trippy-event-page trippy-event-page--state">
        <div className="trippy-event-page__base" aria-hidden />
        <div className="trippy-event-page__grid" aria-hidden />
        <div className="trippy-event-page__state text-center py-5">
          <Spinner
            animation="border"
            role="status"
            className="trippy-event-page__spinner"
            aria-label="Loading"
          />
        </div>
        <style>{EVENT_DETAIL_STYLES}</style>
      </main>
    )
  }

  if (!concert) {
    return (
      <main className="trippy-event-page trippy-event-page--state">
        <div className="trippy-event-page__base" aria-hidden />
        <div className="trippy-event-page__grid" aria-hidden />
        <div className="trippy-event-page__state text-center py-5">
          <p className="trippy-event-page__error mb-0">Concert not found.</p>
        </div>
        <style>{EVENT_DETAIL_STYLES}</style>
      </main>
    )
  }

  const heroImageUrl =
    (concert.front_image && String(concert.front_image).trim()) || concert.concert_image || ''

  const renderTicketsCard = (extraClass = '') => (
    <Card className={`${extraClass} trippy-event-detail__panel border-0 trippy-event-detail__tickets-card`}>
      <CardHeader className="trippy-event-detail__panel-header border-0">
        <h2 className="mb-0 trippy-event-detail__panel-header-title h6">Tickets available</h2>
      </CardHeader>
      <CardBody className="trippy-event-detail__tickets-body">
        {tickets.map((ticket, index) => (
          <div
            key={ticket.ticket_id}
            className="trippy-event-detail__ticket-row d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center justify-content-sm-between gap-2 gap-sm-3"
          >
            <div className="flex-grow-1 min-w-0 pe-sm-2">
              <h6 className="mb-1 text-break">{ticket.ticket_type}</h6>
              <small className="fw-semibold d-block text-body small">
                Price: Rs {ticket.price} <span className="opacity-50">|</span> {ticket.ticket_name}
              </small>
              {ticket.stock > 0 ? (
                <div className="trippy-event-detail__stock-ok small mt-1">
                  <strong>{ticket.stock} tickets left</strong>
                </div>
              ) : (
                <div className="trippy-event-detail__stock-out small mt-1 fw-bold">Sold out</div>
              )}
            </div>

            <div className="d-flex align-items-center justify-content-between justify-content-sm-end flex-shrink-0 trippy-event-detail__qty-pill">
              <Button
                type="button"
                size="sm"
                variant="outline-secondary"
                onClick={() => handleDecrement(ticket.ticket_id, index)}
                disabled={ticket.stock === 0 || ticket.quantity === 0}
                aria-label="Decrease"
              >
                <FaMinus />
              </Button>
              <span className="px-2 trippy-event-detail__qty font-monospace user-select-none">
                {ticket.quantity}
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline-secondary"
                onClick={() => handleIncrement(ticket.ticket_id, index)}
                disabled={ticket.stock === 0 || ticket.quantity >= ticket.stock}
                aria-label="Increase"
              >
                <FaPlus />
              </Button>
            </div>
          </div>
        ))}
        <div className="trippy-event-detail__total-line text-end fw-bold mb-3 pt-2">
          Total: Rs{' '}
          {tickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0)}
        </div>

        <div className="d-flex justify-content-end trippy-event-detail__book-cta-wrap">
          <button
            type="button"
            className="trippy-event-detail__book-cta trippy-event-detail__book-cta--compact"
            onClick={() => {
              const username = localStorage.getItem('zeko_username')
              if (!username) {
                Swal.fire({
                  ...trippySwal,
                  icon: 'warning',
                  title: 'Please sign in',
                  text: 'You need to sign in to book tickets.',
                  confirmButtonText: 'Go to login',
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = '/auth/sign-in'
                  }
                })
                return
              }
              const selected = tickets.filter((t) => t.quantity > 0)
              if (selected.length === 0) {
                Swal.fire({
                  ...trippySwal,
                  title: 'No tickets selected',
                  text: 'Select at least one ticket to book.',
                  icon: 'warning',
                })
                return
              }

              const ticketList = selected
                .map((t) => `(${t.ticket_name}) × ${t.quantity} = Rs ${t.price * t.quantity}`)
                .join('<br/>')
              const total = selected.reduce((sum, t) => sum + t.price * t.quantity, 0)

              Swal.fire({
                ...trippySwal,
                title: 'Confirm booking',
                html: `<div class="text-start small"><strong>Tickets selected</strong><br/>${ticketList}<br/><hr/><strong>Total: Rs ${total}</strong></div>`,
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    createBooking({
                      concertId: concert.id,
                      tickets: selected.map(({ ticket_id, quantity }) => ({
                        ticket_id,
                        quantity,
                      })),
                      total,
                    })
                      .then((bookingId) => {
                        Swal.fire({
                          ...trippySwal,
                          icon: 'success',
                          title: 'Booking confirmed',
                          text: 'Redirecting you to payment…',
                          timer: 1500,
                          showConfirmButton: false,
                        }).then(() => {
                          window.location.href = `/pay?invoiceId=${bookingId}&amount=${total}`
                        })
                      })
                      .catch((err: { message: string }) => {
                        Swal.fire({ ...trippySwal, title: 'Error', text: err.message, icon: 'error' })
                      })
                  } catch (err: unknown) {
                    Swal.fire({
                      ...trippySwal,
                      icon: 'error',
                      title: 'Error',
                      text:
                        typeof err === 'object' && err !== null && 'message' in err
                          ? String((err as { message?: string }).message)
                          : 'Please try again later.',
                    })
                  }
                }
              })
            }}
          >
            Book tickets
          </button>
        </div>
      </CardBody>
    </Card>
  )

  return (
    <main className="trippy-event-page trippy-event-detail">
      <div className="trippy-event-page__base" aria-hidden />
      <div className="trippy-event-page__grid" aria-hidden />
      <div className="position-relative z-1 w-100 min-w-0">
        <Container fluid="xxl" className="px-3 px-sm-4 px-lg-5 trippy-event-detail__page">
          <div className="trippy-event-detail__view">
            <Row className="trippy-event-detail__head-row align-items-start align-items-lg-center gy-3 mb-0 mb-md-2">
              <Col xs={12} lg className="text-center text-lg-start">
                <h1 className="mb-0 trippy-event-detail__title">{concert.concert_name}</h1>
                <p className="fw-semibold d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start trippy-event-detail__meta mt-2 mb-0">
                  <BsGeoAlt className="me-2 flex-shrink-0" aria-hidden />
                  {concert.concert_location_name}
                </p>
              </Col>

              <Col xs={12} lg="auto" className="d-flex justify-content-center justify-content-lg-end align-items-center">
                <Dropdown>
                  <DropdownToggle as={Button} variant="link" className="m-0 trippy-event-detail__share-btn">
                    <FaShareAlt className="me-2" aria-hidden />
                    Share
                  </DropdownToggle>
                  <DropdownMenu align="end" className="trippy-event-detail__share-menu">
                    <DropdownItem
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${window.location.origin}/events/detail?id=${concert.id}`,
                        )
                      }
                    >
                      <FaCopy className="me-2" /> Copy link
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>

            <Row className="trippy-event-detail__event-tickets-row g-4 gy-4 g-lg-5 align-items-stretch">
              <Col
                xs={12}
                lg={tickets.length > 0 ? 7 : 12}
                className="trippy-event-detail__event-col order-1 order-lg-1 min-w-0"
              >
                <div className="trippy-event-detail__hero-image-wrap w-100 rounded-4 overflow-hidden trippy-event-detail__panel p-0">
                  {heroImageUrl ? (
                    <img
                      src={heroImageUrl}
                      alt=""
                      className="trippy-event-detail__hero-image w-100 d-block"
                    />
                  ) : null}
                </div>

                <div
                  className="trippy-event-detail__datetime-strip d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start gap-3 gap-sm-4 mt-3 mt-md-4"
                  role="group"
                  aria-label="Event date and time"
                >
                  <span className="d-flex align-items-center trippy-event-detail__meta">
                    <BsCalendarEvent className="me-2 flex-shrink-0" aria-hidden />
                    <strong className="me-1">Date</strong> {concert.concert_date}
                  </span>
                  <span className="d-flex align-items-center trippy-event-detail__meta">
                    <BsClock className="me-2 flex-shrink-0" aria-hidden />
                    <strong className="me-1">Time</strong> {concert.concert_start_time} – {concert.concert_end_time}
                  </span>
                </div>
              </Col>

              {tickets.length > 0 && (
                <Col
                  xs={12}
                  lg={5}
                  className="trippy-event-detail__tickets-col order-3 order-lg-2 min-w-0 d-flex align-items-start"
                >
                  {renderTicketsCard('w-100 mt-3 mt-lg-0 trippy-event-detail__tickets-card--aside')}
                </Col>
              )}
            </Row>
          </div>

          <Row className="trippy-event-detail__about-wrap mt-0 mt-md-1 mt-lg-0">
            <Col xs={12} className="trippy-event-detail__about-col min-w-0">
              <section className="trippy-event-detail__about-block mt-4 mt-md-5 pt-lg-1" aria-labelledby="event-about-heading">
                <h2 id="event-about-heading" className="trippy-event-detail__about-title mb-3 text-center text-sm-start">
                  <span className="trippy-event-detail__about-line trippy-event-detail__about-line--main d-block">
                    About this
                  </span>
                  <span className="trippy-event-detail__about-line trippy-event-detail__about-line--accent d-block">
                    event
                  </span>
                </h2>
                <p
                  className="trippy-event-detail__description mb-0 trippy-event-detail__about-text"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {(() => {
                    const raw = concert.concert_description ?? ''
                    if (showFullDescription) return raw
                    const d = raw.trim()
                    if (d.length <= ABOUT_DESC_PREVIEW_MAX) return raw
                    return `${d.slice(0, ABOUT_DESC_PREVIEW_MAX).trimEnd()}…`
                  })()}
                </p>

                {concert.concert_description.trim().length > ABOUT_DESC_PREVIEW_MAX && (
                  <button
                    type="button"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="btn trippy-event-detail__read-more border-0 bg-transparent p-0 mt-2"
                  >
                    {showFullDescription ? 'Show less' : 'See more'}
                  </button>
                )}
              </section>
            </Col>
          </Row>
        </Container>
      </div>

      <style>{EVENT_DETAIL_STYLES}</style>
    </main>
  )
}

export default ConcertDetailPage
