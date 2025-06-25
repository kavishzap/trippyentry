import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
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
  BsEyeFill,
  BsGeoAlt,
  BsPinMapFill,
  BsCheckCircleFill,
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

const ConcertDetailPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id')
  const { isOpen, toggle } = useToggle()
  const [concert, setConcert] = useState<Concert | null>(null)
  const [tickets, setTickets] = useState<(Ticket & { quantity: number })[]>([])
  const [cardHeight, setCardHeight] = useState('860px');
  const [loading, setLoading] = useState(true)
  const [showFullDescription, setShowFullDescription] = useState(false)

  useEffect(() => {
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

  useEffect(() => {
    const updateCardHeight = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setCardHeight('320px');
      } else if (width < 768) {
        setCardHeight('450px');
      } else {
        setCardHeight('860px');
      }
    };

    updateCardHeight(); // run once on mount
    window.addEventListener('resize', updateCardHeight);

    return () => {
      window.removeEventListener('resize', updateCardHeight);
    };
  }, []);

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('concert_id', id)

    if (error) {
      console.error('Failed to fetch tickets:', error.message)
    } else {
      setTickets((data || []).map(ticket => ({
        ticket_id: ticket.id, // ✅ correctly assign ticket_id
        ticket_type: ticket.ticket_type || '', // fallback if undefined
        ticket_name: ticket.ticket_name,
        price: Number(ticket.price), // ensure it's a number
        quantity: 0
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

  const base64Image = concert.concert_image.startsWith('data:')
    ? concert.concert_image
    : `data:image/jpeg;base64,${concert.concert_image}`

  return (
    <main className="py-4">
      <Container>
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="fs-3 fs-lg-2 fw-bold">{concert.concert_name}</h1>

            <p className="fw-semibold d-flex flex-wrap align-items-center text-black mb-2">
              <BsGeoAlt className="me-2" />
              {concert.concert_location_name}
              <Link
                to="#"
                onClick={toggle}
                className="ms-3 text-decoration-underline d-flex align-items-center"
              >
                <BsEyeFill className="me-1" /> View On Map
              </Link>
            </p>

            <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-4 flex-wrap">
              <span className="d-flex align-items-center text-black">
                <BsCalendarEvent className="me-2" />
                <strong className="me-1">Date:</strong> {concert.concert_date}
              </span>
              <span className="d-flex align-items-center text-black">
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
            {window.innerWidth < 576 ? (
              <Card className="overflow-hidden">
                <img
                  src={base64Image}
                  alt="concert image"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '0.5rem'
                  }}
                />
              </Card>
            ) : (
              <Card
                className="card-grid-lg card-element-hover overflow-hidden"
                style={{
                  backgroundImage: `url(${base64Image})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  minHeight: cardHeight,
                  backgroundColor: '#000',
                  cursor: 'default'
                }}
              />
            )}
            {/* TICKETS SECTION */}
            {tickets.length > 0 && (
              <Card className="mt-4">
                <CardHeader className="bg-light border-bottom">
                  <h5 className="mb-0">Tickets Available</h5>
                </CardHeader>
                <CardBody>
                  {tickets.map((ticket, index) => (
                    <div
                      key={`${ticket.ticket_id}-${index}`}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div>
                        <h6 className="mb-1">{ticket.ticket_type}</h6>
                        <small className="fw-semibold text-black">
                          Price: Rs {ticket.price} | {ticket.ticket_name}
                        </small>
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          className="me-2"
                          onClick={() => handleDecrement(ticket.ticket_id, index)}
                        >
                          <FaMinus />
                        </Button>
                        <span className="px-2">{ticket.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          className="ms-2"
                          onClick={() => handleIncrement(ticket.ticket_id, index)}
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
                      })
                    }}
                  >
                    Book Tickets
                  </Button>

                </CardBody>

              </Card>
            )}
          </Col>

          <Col md={6}>
            <h4 className="mb-3">About This Event</h4>
            <p className="text-black" style={{ whiteSpace: 'pre-line' }}>
              {showFullDescription
                ? concert.concert_description
                : concert.concert_description.length > 250
                  ? `${concert.concert_description.substring(0, 250)}...`
                  : concert.concert_description}
            </p>
            {concert.concert_description.length > 250 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="btn btn-link p-0"
              >
                {showFullDescription ? 'Show Less' : 'See More'}
              </button>
            )}

            <Card className="bg-transparent mt-4 mb-6">
              <CardHeader className="border-bottom bg-transparent px-0 pt-0">
                <h5 className="mb-0">Event Policies</h5>
              </CardHeader>
              <CardBody className="pt-4 p-0">
                <ul className="list-group list-group-borderless mb-2">
                  <li className="list-group-item d-flex align-items-start">
                    <BsCheckCircleFill size={20} className="me-2 mt-1 text-success" />
                    Any form of harassment, aggression, or disorderly behavior will result in removal from the venue.
                  </li>
                  <li className="list-group-item d-flex align-items-start">
                    <BsCheckCircleFill size={18} className="me-2 mt-1 text-success" />
                    Respect fellow attendees, performers, and staff at all times.
                  </li>
                </ul>
                <div className="bg-danger bg-opacity-10 rounded-2 p-3">
                  <p className="mb-0 text-danger">
                    Valid ID and a confirmed ticket are required for entry.
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card className="bg-transparent mt-4">
              <CardHeader className="border-bottom bg-transparent px-0 pt-0">
                <h5 className="mb-0">How to Book</h5>
              </CardHeader>
              <CardBody className="pt-4 p-0">
                <ul className="list-unstyled position-relative ps-3">
                  {[
                    'Select your preferred ticket and quantity.',
                    'Click the "Book Tickets" button.',
                    'Cross-check your booking details and confirm.',
                    'An Invoice ID will be shown on screen.',
                    'Select Pay via MCB Account as your preferred payment method and use the Invoice ID in the payment description.',
                    'Once payment is verified, download your invoice from the "My Bookings" section under your user profile.',
                  ].map((step, index) => (
                    <li key={index} className="mb-4 d-flex">
                      <div className="me-3 mt-1">
                        <div
                          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '28px', height: '28px' }}
                        >
                          {index + 1}
                        </div>
                      </div>
                      <div className="text-black">{step}</div>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

          </Col>
        </Row>
      </Container>

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
        <div className="modal-footer">
          <a
            href={concert.concert_google_map_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary mb-0 items-center"
          >
            <BsPinMapFill className="me-2" /> View In Google Map
          </a>

        </div>
      </Modal>
    </main>
  )
}

export default ConcertDetailPage
