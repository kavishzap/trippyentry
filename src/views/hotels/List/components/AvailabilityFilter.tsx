import { SelectFormInput } from '@/components'
import Flatpicker from '@/components/Flatpicker'
import { useState } from 'react'
import { Button, Col, FormLabel, Row } from 'react-bootstrap'
import { BsCalendar, BsGeoAlt, BsSearch } from 'react-icons/bs'

type AvailabilityFormType = {
  location: string
  stayFor: Date | Array<Date>
}

const AvailabilityFilter = () => {
  const initialValue: AvailabilityFormType = {
    location: 'San Jacinto, USA',
    stayFor: [new Date(), new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)],
  }

  const [formValue, setFormValue] = useState<AvailabilityFormType>(initialValue)

  return (
    <form className="bg-mode shadow rounded-3 position-relative p-4 pe-md-5 pb-5 pb-md-4 mb-4 w-75 mx-auto">
      <Row className="g-4 align-items-center">
        {/* Location */}
        <Col lg={6}>
          <div className="form-control-border form-control-transparent form-fs-md flex-centered gap-2">
            <BsGeoAlt size={37} />
            <div className="flex-grow-1">
              <FormLabel className="form-label">Location</FormLabel>
              <SelectFormInput>
                <option value={-1} disabled>
                  Select location
                </option>
                <option value="1">North</option>
                <option value="2">South</option>
                <option value="3">East</option>
                <option value="4">West</option>
                <option value="5">Center</option>
              </SelectFormInput>
            </div>
          </div>
        </Col>

        {/* Date Picker */}
        <Col lg={6}>
          <div className="flex-centered">
            <BsCalendar size={37} className="me-2" />
            <div className="form-control-border form-control-transparent form-fs-md">
              <FormLabel className="form-label">Date</FormLabel>
              <Flatpicker
                value={formValue.stayFor}
                getValue={(val) => setFormValue({ ...formValue, stayFor: val })}
                options={{
                  mode: 'range',
                  dateFormat: 'd M',
                }}
                className="form-control flatpickr"
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* Search Button */}
      <div className="btn-position-md-middle">
        <Button type="submit" className="icon-lg btn btn-round btn-primary mb-0 flex-centered">
          <BsSearch className="fa-fw" />
        </Button>
      </div>
    </form>
  )
}

export default AvailabilityFilter
