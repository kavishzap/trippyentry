import { useEffect, useState } from 'react'
import { currency } from '@/states'
import {
  Button,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Image,
  Row,
} from 'react-bootstrap'
import { BsGeoAlt, BsCalendar } from 'react-icons/bs'
import { FaShareAlt } from 'react-icons/fa'
import { FaCopy } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import { BsTicket } from 'react-icons/bs'

type Concert = {
  id: number
  concert_name: string
  concert_date: string
  concert_location_name: string
  concert_image: string,
  front_image: string
  price: number // Optional or fallback
  concert_description?: string
}

const HotelListCard = ({ hotel }: { hotel: Concert }) => {
  const { front_image, concert_name, concert_date, concert_location_name, id: concertId, concert_description = '', } = hotel
  const [minTicketPrice, setMinTicketPrice] = useState<number | null>(null)

  const truncate = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  useEffect(() => {
    const fetchMinPrice = async () => {
      const { data, error } = await supabase
        .from('tickets')
        .select('price')
        .eq('concert_id', concertId)
        .order('price', { ascending: true })
        .limit(1)
        .single()

      if (error) {
        console.error(`Failed to load ticket price for concert ${concertId}:`, error.message)
      } else {
        setMinTicketPrice(data?.price || null)
      }
    }

    fetchMinPrice()
  }, [concertId])

  return (
    <Card className="shadow-sm border-0 rounded-3 p-2">
      <Row className="g-2 align-items-center">
        <Col md={4}>
          <Link to={`/events/detail?id=${concertId}`} className="d-block">
            <Image
              src={front_image}
              alt={concert_name}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                maxHeight: '500px', // Optional: limit very tall images
              }}
              className="rounded-2"
            />
          </Link>
        </Col>

        <Col md={8}>
          <CardBody className="py-2 px-3">
            <div className="d-flex justify-content-between align-items-start mb-1">
              <h6 className="fw-bold mb-1" style={{ fontSize: '1rem' }}>
                <Link
                  to={`/events/detail?id=${concertId}`}
                  className="text-decoration-none text-body dark:text-light"
                >
                  {concert_name}
                </Link>
              </h6>
              <Dropdown>
                <DropdownToggle
                  className="arrow-none btn btn-sm btn-light btn-round"
                  role="button"
                  id="dropdownShare"
                >
                  <FaShareAlt size={14} />
                </DropdownToggle>
                <DropdownMenu align="end" className="shadow-sm">
                  <DropdownItem
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${window.location.origin}/events/detail?id=${concertId}`
                      )
                    }
                  >
                    <FaCopy className="me-2" />
                    Copy link
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* Truncated Description */}
            {concert_description && (
              <p className="text-body small mb-2" style={{ lineHeight: '1.3rem' }}>
                {truncate(concert_description, 140)}
              </p>
            )}

            <small className="text-body d-flex align-items-center mb-1">
              <BsGeoAlt className="me-2" size={14} />
              {concert_location_name}
            </small>

            <small className="text-body d-flex align-items-center mb-2">
              <BsCalendar className="me-2" size={14} />
              {concert_date}
            </small>

            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-baseline">
                {minTicketPrice !== null ? (
                  <>
                    <span className="fw-semibold me-2 d-flex align-items-center" style={{ fontSize: '0.95rem' }}>
                      <BsTicket className="me-2" />
                      As From {currency} {minTicketPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-muted small">Loading price...</span>
                )}
              </div>
              <Link to={`/events/detail?id=${concertId}`}>
                <Button variant="dark" size="sm" className="px-3 py-1">
                  Book
                </Button>
              </Link>
            </div>


          </CardBody>
        </Col>
      </Row>
    </Card>
  )
}

export default HotelListCard
