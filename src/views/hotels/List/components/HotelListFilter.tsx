import { useToggle } from '@/hooks'
import { currency } from '@/states'
import { Card, CardBody, Col, Collapse, Button, Row } from 'react-bootstrap'
import { FaAngleDown } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const HotelListFilter = () => {
  const { isOpen: hotelTypeIsOpen, toggle: hotelTypeToggle } = useToggle()
  const formRef = useRef<HTMLFormElement>(null)

  const handleClearAll = () => {
    if (formRef.current) {
      const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
      checkboxes.forEach((checkbox) => (checkbox.checked = false))
    }
  }

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(formRef.current!)
    const selected = Array.from(data.entries())
    console.log('Selected filters:', selected) // Replace this with your filter logic
  }

  return (
    <form className="rounded-3 shadow bg-white" ref={formRef} onSubmit={handleFilter}>
      {/* Event Type Filter */}
      <Card as={CardBody} className="rounded-0 rounded-top p-4 border-0">
        <h5 className="mb-3 fw-semibold">Event Type</h5>
        <Col xs={12} className="d-flex flex-column gap-2">
          {[
            { id: 'hotelType1', label: 'All' },
            { id: 'hotelType2', label: 'Indian' },
            { id: 'hotelType3', label: 'Local' },
            { id: 'hotelType4', label: 'European' },
            { id: 'hotelType5', label: 'Reggae' },
          ].map(({ id, label }) => (
            <div className="form-check" key={id}>
              <input className="form-check-input" type="checkbox" id={id} name="eventType" value={label} />
              <label className="form-check-label" htmlFor={id}>
                {label}
              </label>
            </div>
          ))}

          <Collapse in={hotelTypeIsOpen}>
            <div className="multi-collapse" id="hotelType">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="hotelType7" name="eventType" value="Coming Soon" />
                <label className="form-check-label" htmlFor="hotelType7">
                  Coming Soon
                </label>
              </div>
            </div>
          </Collapse>

          <Link
            onClick={hotelTypeToggle}
            to=""
            className="btn btn-link btn-sm text-decoration-none mt-2 align-items-center d-inline-flex"
            role="button"
            aria-expanded={hotelTypeIsOpen}
            aria-controls="hotelType"
          >
            See <span className="ms-1">{hotelTypeIsOpen ? 'less' : 'more'}</span>
            <FaAngleDown className={`ms-2 transition ${hotelTypeIsOpen ? 'rotate-180' : ''}`} />
          </Link>
        </Col>
      </Card>

      {/* Divider */}
      <hr className="my-0" />

      {/* Price Range Filter */}
      <CardBody className="rounded-0 p-4 border-0">
        <h5 className="mb-3 fw-semibold">Price Range</h5>
        <Col xs={12} className="d-flex flex-column gap-2">
          {[
            { id: 'priceRange1', label: `Up to ${currency}500` },
            { id: 'priceRange2', label: `${currency}500 - ${currency}1000` },
            { id: 'priceRange3', label: `${currency}1000 - ${currency}1500` },
            { id: 'priceRange4', label: `${currency}1500 - ${currency}2000` },
            { id: 'priceRange5', label: `${currency}2000+` },
          ].map(({ id, label }) => (
            <div className="form-check" key={id}>
              <input className="form-check-input" type="checkbox" id={id} name="priceRange" value={label} />
              <label className="form-check-label" htmlFor={id}>
                {label}
              </label>
            </div>
          ))}
        </Col>
      </CardBody>

      {/* Footer Buttons */}
      <CardBody className="rounded-0 rounded-bottom p-4 border-0">
        <Row className="gap-2">
          <Col>
            <Button variant="secondary" className="w-100" onClick={handleClearAll}>
              Clear
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="submit" className="w-100">
              Filter
            </Button>
          </Col>
        </Row>
      </CardBody>
    </form>
  )
}

export default HotelListFilter
