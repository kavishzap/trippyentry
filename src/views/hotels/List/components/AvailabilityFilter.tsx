import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SelectFormInput } from '@/components/form';
import { Card, Col, FormLabel, Row } from 'react-bootstrap';
import { BsGeoAlt, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type EventType = {
  name: string;
};

const AvailabilityFilter = () => {
  const [types, setTypes] = useState<EventType[]>([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    const { data, error } = await supabase.from('types').select('name');
    if (error) {
      console.error('Failed to load types:', error.message);
    } else {
      setTypes(data || []);
    }
  };

  return (
    <Row>
      <Col xl={10} className="position-relative mt-n3 mt-xl-n9">
        <h6 className="d-none d-xl-block mb-3">Check Availability</h6>

        <Card as="form" className="shadow rounded-3 position-relative p-4 pe-md-5 pb-5 pb-md-4">
          <Row className="g-4 align-items-center">
            <Col lg={12}>
              <div className="form-control-border form-control-transparent form-fs-md flex-centered gap-2">
                <BsGeoAlt size={37} />

                <div className="flex-grow-1">
                  <FormLabel className="form-label">Type</FormLabel>
                  <SelectFormInput
                    value={selectedType}
                    onChange={(val: string) => setSelectedType(val)}
                  >
                    {
                      [
                        <option value="" disabled key="default">
                          Select Type
                        </option>,
                        ...types.map((type) => (
                          <option key={type.name} value={type.name}>
                            {type.name}
                          </option>
                        )),
                      ]
                    }
                  </SelectFormInput>
                </div>
              </div>
            </Col>
          </Row>

          <div className="btn-position-md-middle">
            <Link to="/events" className="stretched-link">
              <button
                type="submit"
                className="icon-lg btn btn-round btn-primary mb-0 flex-centered"
              >
                <BsSearch className="fa-fw" />
              </button>
            </Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default AvailabilityFilter;
