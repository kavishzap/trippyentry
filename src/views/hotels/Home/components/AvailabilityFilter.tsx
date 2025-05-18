import Flatpicker from '@/components/Flatpicker'
import { SelectFormInput } from '@/components/form'
import { useState } from 'react'
import { Card, Col, FormLabel, Row } from 'react-bootstrap'

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
    <Row>
      <Col xl={10} className="position-relative mt-n3 mt-xl-n9">
        <h6 className="d-none d-xl-block mb-3">Check Availability</h6>

        <Card as="form" className="shadow rounded-3 position-relative p-4 pe-md-5 pb-5 pb-md-4">
          <Row className="g-4 align-items-center">
            <Col lg={4}>
              <div className="form-control-border form-control-transparent form-fs-md flex-centered gap-2">
                <BsGeoAlt size={37} />

                <div className="flex-grow-1">
                  <FormLabel className="form-label">Location</FormLabel>
                  <SelectFormInput>
                    <option value={-1} disabled>
                      Select location
                    </option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                    <option value="centre">Centre</option>

                  </SelectFormInput>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="flex-centered">
                <div>
                  <BsCalendar size={37} className=" me-2" />
                </div>

                <div className="form-control-border form-control-transparent form-fs-md">
                  <FormLabel className="form-label">Check in - out</FormLabel>
                  <Flatpicker
                    value={formValue.stayFor}
                    getValue={(val) => {
                      setFormValue({ ...formValue, stayFor: val })
                    }}
                    options={{
                      mode: 'range',
                      dateFormat: 'd M',
                      closeOnSelect: false
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="form-control-border form-control-transparent form-fs-md flex-centered gap-2">
                <BsGeoAlt size={37} />

                <div className="flex-grow-1">
                  <FormLabel className="form-label">Type</FormLabel>
                  <SelectFormInput>
                    <option value={-1} disabled>
                      Select Type
                    </option>
                    <option value="pop">Indian</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Classical</option>
                    <option value="edm">Electronic / EDM</option>
                    <option value="reggae">Reggae</option>
                  </SelectFormInput>
                </div>
              </div>
            </Col>
          </Row>

          <div className="btn-position-md-middle">
            <button type="submit" className="icon-lg btn btn-round btn-primary mb-0 flex-centered">
              <BsSearch className=" fa-fw" />
            </button>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default AvailabilityFilter
