import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useToggle } from '@/hooks'
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
  Modal,
  ModalHeader,
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

const ConcertDetailPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id')
  const { isOpen, toggle } = useToggle()
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
      console.log('concert_google_map_link:', data.concert_google_map_link) // ✅ Add this line
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
      setTickets((data || []).map(ticket => ({
        ticket_id: ticket.id,
        ticket_type: ticket.ticket_type || '',
        ticket_name: ticket.ticket_name,
        price: Number(ticket.price),
        quantity: 0,
        stock: Number(ticket.quantity), // from DB
      })))
    }
  }


  const handleIncrement = (ticketId: number, index: number) => {
    setTickets(prevTickets =>
      prevTickets.map((ticket, i) =>
        ticket.ticket_id === ticketId && i === index
          ? { ...ticket, quantity: ticket.quantity + 1 }
          : ticket
      )
    )
  }

  const handleDecrement = (ticketId: number, index: number) => {
    setTickets(prevTickets =>
      prevTickets.map((ticket, i) =>
        ticket.ticket_id === ticketId && i === index && ticket.quantity > 0
          ? { ...ticket, quantity: ticket.quantity - 1 }
          : ticket
      )
    )
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  if (!concert) {
    return (
      <div className="text-center py-5">
        <p className="text-danger">Concert not found.</p>
      </div>
    )
  }

  const heroImageUrl =
    (concert.front_image && String(concert.front_image).trim()) || concert.concert_image || ''

  return (
    <main className="py-4 trippy-event-detail">
      <Container>
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="fs-3 fs-lg-2 fw-bold trippy-event-detail__title">{concert.concert_name}</h1>

            <p className="fw-semibold d-flex flex-wrap align-items-center text-body mb-2 trippy-event-detail__meta">
              <BsGeoAlt className="me-2" />
              {concert.concert_location_name}
              {/* <Link
                to="#"
                onClick={toggle}
                className="ms-3 text-decoration-underline d-flex align-items-center text-primary"
              >
                <BsEyeFill className="me-1" /> View On Map
              </Link> */}
            </p>

            <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-4 flex-wrap">
              <span className="d-flex align-items-center text-body trippy-event-detail__meta">
                <BsCalendarEvent className="me-2" />
                <strong className="me-1">Date:</strong> {concert.concert_date}
              </span>
              <span className="d-flex align-items-center text-body trippy-event-detail__meta">
                <BsClock className="me-2" />
                <strong className="me-1">Time:</strong> {concert.concert_start_time} – {concert.concert_end_time}
              </span>
            </div>
          </Col>


          <Col lg={4} className="text-lg-end mt-3 mt-lg-0">
            <Dropdown>
              <DropdownToggle className="btn btn-light btn-sm">
                <FaShareAlt className="me-2" /> Share
              </DropdownToggle>
              <DropdownMenu align="end">
                <DropdownItem
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.origin}/events/detail?id=${concert.id}`
                    )
                  }
                >
                  <FaCopy className="me-2" /> Copy link
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>

        <Row className="g-4 align-items-start">
          <Col md={6}>
            <Card className="trippy-event-detail__panel bg-transparent border-0 overflow-auto p-0">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflowX: 'auto',
                  overflowY: 'auto',
                  maxWidth: '100%',
                }}
              >
                <img
                  src={heroImageUrl}
                  alt=""
                  className="trippy-event-detail__hero-image"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '0.5rem',
                  }}
                />
              </div>
            </Card>

            {/* TICKETS SECTION */}
            {tickets.length > 0 && (
              <Card className="mt-4 trippy-event-detail__panel">
                <CardHeader className="trippy-event-detail__panel-header border-0">
                  <h5 className="mb-0 trippy-event-detail__panel-header-title">Tickets Available</h5>
                </CardHeader>
                <CardBody className="trippy-event-detail__tickets-body">
                  {tickets.map((ticket, index) => (
                    <div
                      key={ticket.ticket_id}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div>
                        <h6 className="mb-1">{ticket.ticket_type}</h6>
                        <small className="fw-semibold text-body">
                          Price: Rs {ticket.price} | {ticket.ticket_name}
                        </small>
                        {/* Show available stock */}
                        {ticket.stock > 0 ? (
                          <div className="text-success small">
                            <strong>{ticket.stock} tickets left</strong>
                          </div>
                        ) : (
                          <div className="text-danger fw-bold small mt-1">Sold Out</div>
                        )}
                      </div>

                      <div className="d-flex align-items-center">
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          className="me-2"
                          onClick={() => handleDecrement(ticket.ticket_id, index)}
                          disabled={ticket.stock === 0 || ticket.quantity === 0}
                        >
                          <FaMinus />
                        </Button>

                        <span className="px-2">{ticket.quantity}</span>

                        <Button
                          size="sm"
                          variant="outline-secondary"
                          className="ms-2"
                          onClick={() => handleIncrement(ticket.ticket_id, index)}
                          disabled={ticket.stock === 0 || ticket.quantity >= ticket.stock}
                        >
                          <FaPlus />
                        </Button>


                      </div>
                    </div>
                  ))}
                  <div className="text-end fw-bold mb-3">
                    Total: Rs{' '}
                    {tickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0)}
                  </div>

                  <Button
                    variant="primary"
                    style={{ minWidth: '200px' }}
                    onClick={() => {
                      const username = localStorage.getItem('zeko_username');
                      if (!username) {
                        Swal.fire({
                          icon: 'warning',
                          title: 'Please Sign In',
                          text: 'You need to sign in to book tickets.',
                          confirmButtonText: 'Go to Login',
                        }).then(result => {
                          if (result.isConfirmed) {
                            window.location.href = '/auth/sign-in';
                          }
                        });
                        return;
                      }
                      const selected = tickets.filter(t => t.quantity > 0);
                      if (selected.length === 0) {
                        Swal.fire('No tickets selected', 'Please select at least one ticket to book.', 'warning');
                        return;
                      }

                      const ticketList = selected
                        .map(t => ` (${t.ticket_name}) x ${t.quantity} = Rs ${t.price * t.quantity}`)
                        .join('<br/>');

                      const total = selected.reduce((sum, t) => sum + t.price * t.quantity, 0);

                      Swal.fire({
                        title: 'Confirm Booking',
                        html: `
          <div class="text-start">
            <strong>Tickets Selected:</strong><br/>
            ${ticketList}
            <hr/>
            <strong>Total: Rs ${total}</strong>
          </div>
        `,
                        icon: 'info',
                        showCancelButton: true,
                        confirmButtonText: 'Confirm',
                        cancelButtonText: 'Cancel',
                      }).then(async result => {
                        if (result.isConfirmed) {
                          try {
                            createBooking({
                              concertId: concert.id,
                              tickets: selected.map(({ ticket_id, quantity }) => ({
                                ticket_id,
                                quantity
                              })),
                              total
                            }).then((bookingId) => {
                              Swal.fire({
                                icon: 'success',
                                title: 'Booking Confirmed',
                                text: 'Redirecting you to payment...',
                                timer: 1500,
                                showConfirmButton: false
                              }).then(() => {
                                window.location.href = `/pay?invoiceId=${bookingId}&amount=${total}`;
                              });
                            }).catch(err => {
                              Swal.fire('Error', err.message, 'error')
                            })
                          } catch (err: unknown) {
                            Swal.fire({
                              icon: 'error',
                              title: 'Error',
                              text: `${typeof err === 'object' && err !== null && 'message' in err ? (err as { message?: string }).message : 'Please try again later.'}`,
                            });
                          }
                        }
                      });
                    }}
                  >
                    Book Tickets
                  </Button>


                </CardBody>

              </Card>
            )}
          </Col>

          <Col md={6}>
            <h4 className="mb-3 trippy-event-detail__subtitle">About This Event</h4>
            <p className="text-body trippy-event-detail__description" style={{ whiteSpace: 'pre-line' }}>
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
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="btn btn-link p-0 text-primary"
              >
                {showFullDescription ? 'Show Less' : 'See More'}
              </button>
            )}
          </Col>
        </Row>
      </Container>
      <style>{`
        .trippy-event-detail {
          --neon-cyan: #d4af37;
          --neon-magenta: #e8d5a3;
          color: #c9b896;
        }
        .trippy-event-detail__title {
          color: #f0e6b8;
          letter-spacing: -0.02em;
        }
        .trippy-event-detail__subtitle {
          color: #dcc083;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        }
        .trippy-event-detail__meta {
          color: rgba(201, 184, 150, 0.9) !important;
        }
        .trippy-event-detail__description {
          color: rgba(232, 213, 163, 0.92) !important;
          line-height: 1.65;
        }
        .trippy-event-detail__panel {
          background: rgba(0, 0, 0, 0.88) !important;
          border: 1px solid rgba(212, 175, 55, 0.24) !important;
          border-radius: 1rem;
          box-shadow: 0 0 0 1px rgba(232, 213, 163, 0.08), 0 14px 40px rgba(0, 0, 0, 0.35);
        }
        .trippy-event-detail__panel-header {
          background: linear-gradient(180deg, rgba(212, 175, 55, 0.12), rgba(14, 11, 6, 0.5)) !important;
          border-bottom: 1px solid rgba(212, 175, 55, 0.28) !important;
          border-radius: 1rem 1rem 0 0;
          color: #e8d5a3;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
        .trippy-event-detail__panel-header-title {
          color: #f0e6b8 !important;
          font-weight: 800;
          letter-spacing: 0.02em;
        }
        .trippy-event-detail__tickets-body {
          color: rgba(232, 213, 163, 0.92);
        }
        .trippy-event-detail__tickets-body h6 {
          color: #fff;
          font-weight: 700;
        }
        .trippy-event-detail__tickets-body .text-body {
          color: rgba(201, 184, 150, 0.95) !important;
        }
        .trippy-event-detail__tickets-body .text-success {
          color: #7dffc4 !important;
        }
        .trippy-event-detail__tickets-body .text-danger {
          color: #ffb0bc !important;
        }
        .trippy-event-detail__tickets-body .btn-outline-secondary {
          border-color: rgba(212, 175, 55, 0.45);
          color: #e8d5a3;
        }
        .trippy-event-detail__tickets-body .btn-outline-secondary:hover:not(:disabled) {
          background: rgba(212, 175, 55, 0.12);
          border-color: #d4af37;
          color: #fff;
        }
        .trippy-event-detail__hero-image {
          border-radius: 0.75rem;
          border: 1px solid rgba(212, 175, 55, 0.25);
        }
      `}</style>

      <Modal size="lg" centered show={isOpen} onHide={toggle} className="fade">
        <ModalHeader>
          <h5 className="modal-title" id="mapmodalLabel">
            View Concert Location
          </h5>
          <button type="button" onClick={toggle} className="btn-close" />
        </ModalHeader>
        <div className="modal-body p-0">
          <iframe
            className="w-100"
            height={400}
            src={concert.concert_google_map_link}
            style={{ border: 0 }}
            title="map"
            aria-hidden="false"
            tabIndex={0}
          />
        </div>
        {/* <div className="modal-footer">
          <a
            href={concert.concert_google_map_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary mb-0 items-center"
          >
            <BsPinMapFill className="me-2" /> View In Google Map
          </a>

        </div> */}
      </Modal>
    </main>
  )
}

export default ConcertDetailPage
