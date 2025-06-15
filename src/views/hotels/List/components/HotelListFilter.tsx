import { useToggle } from '@/hooks'
import { currency } from '@/states'
import { CardBody, Col, Button, Row } from 'react-bootstrap'
import { useRef } from 'react'

interface HotelListFilterProps {
  onApplyFilter: (filters: { priceRange?: string[] }) => void
}

const HotelListFilter = ({ onApplyFilter }: HotelListFilterProps) => {
  useToggle()
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
    const selected: { priceRange?: string[] } = {}

    const priceFilters = data.getAll('priceRange') as string[]
    if (priceFilters.length > 0) selected.priceRange = priceFilters

    onApplyFilter(selected)
  }


  return (
    <form className="rounded-3 shadow bg-white" ref={formRef} onSubmit={handleFilter}>

      {/* Price Range Filter */}
      <CardBody className="rounded-0 p-4 border-0">
        <h5 className="mb-3 fw-semibold">Price Range</h5>
        <Col xs={12} className="d-flex flex-column gap-2">
          {[
            { id: 'priceRange1', label: `Up to ${currency}500` },
            { id: 'priceRange2', label: `${currency} 500 - ${currency} 1000` },
            { id: 'priceRange3', label: `${currency} 1000 - ${currency} 1500` },
            { id: 'priceRange4', label: `${currency} 1500 - ${currency} 2000` },
            { id: 'priceRange5', label: `${currency} 2000+` },
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
