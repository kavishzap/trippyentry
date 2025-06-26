import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { BsStars } from 'react-icons/bs';
import { motion } from 'framer-motion';


type Concert = {
  id: number;
  concert_name: string;
  concert_date: string;
  concert_location_name: string;
  concert_image: string;
  price: number;
};

const FeaturedHotels = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcertsWithTickets = async () => {
      const { data: concertsData, error: concertError } = await supabase
        .from('concerts')
        .select('*')
        .order('id', { ascending: false })
        .limit(4);

      if (concertError || !concertsData) return;

      const concertIds = concertsData.map((c) => c.id);
      const { data: ticketsData, error: ticketError } = await supabase
        .from('tickets')
        .select('concert_id, price')
        .in('concert_id', concertIds);

      if (ticketError || !ticketsData) return;

      const concertMap: { [key: number]: number } = {};
      ticketsData.forEach(({ concert_id, price }) => {
        if (!(concert_id in concertMap) || price < concertMap[concert_id]) {
          concertMap[concert_id] = price;
        }
      });

      const enrichedConcerts = concertsData.map((concert) => ({
        ...concert,
        price: concertMap[concert.id] || 0,
      }));

      setConcerts(enrichedConcerts);
      setLoading(false);
    };

    fetchConcertsWithTickets();
  }, []);

  const renderCard = (concert: Concert | undefined, index: number) => (
    <Col key={concert?.id || index} xs={12} sm={6} md={6} lg={4}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
      >
        <Card className="card-img-scale overflow-hidden bg-transparent h-100 mb-0">
          <Link
            to={`/events/detail?id=${concert?.id}`}
            className="d-block position-relative"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="card-img-scale-wrapper rounded-3"
              style={{
                width: '100%',
                overflow: 'hidden',
                backgroundColor: concert ? 'transparent' : '#e9ecef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
              }}
            >
              {concert ? (
                <img
                  src={`data:image/jpeg;base64,${concert.concert_image}`}
                  alt="concert image"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '550px', // increased from 400px to 550px
                    objectFit: 'contain',
                    borderRadius: '0.75rem', // optional: more rounding
                  }}
                />

              ) : (
                <div style={{ height: '100%', width: '100%' }} />
              )}
            </div>
          </Link>



          {/* Location badge */}
          {/* {concert && (
            <div className="mt-2">
              <div
                className="badge text-bg-dark fs-6 rounded-pill d-flex text-truncate"
                style={{ maxWidth: '200px' }}
              >
                <BsGeoAlt className="me-2" />
                <span className="text-truncate">{concert.concert_location_name}</span>
              </div>
            </div>
          )} */}

          {/* Title & Price */}
          <div className="card-img-scale-wrapper">
            <h5 className="card-title mt-3 text-truncate" style={{ maxWidth: '100%' }}>
              {concert ? (
                <Link
                  to={`/events/detail?id=${concert.id}`}
                  className="stretched-link d-inline-block text-truncate"
                  style={{ maxWidth: '100%' }}
                >
                  {concert.concert_name}
                </Link>
              ) : (
                <div
                  className="bg-secondary bg-opacity-25 rounded"
                  style={{ height: '1.5rem', width: '80%' }}
                />
              )}
            </h5>

            <div className="d-flex justify-content-between align-items-center mt-2">
              {concert ? (
                <>
                  <h6 className="text-primary mb-0">
                    <small className="fw-light">Starting at</small> Rs {concert.price}
                  </h6>
                  <button className="btn btn-sm btn-outline-primary">
                    <BsArrowRight />
                  </button>
                </>
              ) : (
                <>
                  <div
                    className="bg-secondary bg-opacity-10 rounded"
                    style={{ height: '1.2rem', width: '50%' }}
                  />
                  <div className="btn btn-sm btn-outline-primary disabled placeholder">→</div>
                </>
              )}
            </div>
          </div>
        </Card>

      </motion.div>
    </Col>
  );


  return (
    <section>
      <Container>
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <h2 className="mb-0">Featured Events</h2>
          </Col>
        </Row>

        <Row
          className={`gy-3 gy-md-4 ${concerts.length < 4 ? 'justify-content-center gap-3' : 'gx-3'}`}
        >
          {(loading ? Array(4).fill(undefined) : concerts).map((concert, index) =>
            renderCard(concert, index)
          )}
        </Row>

        <Container className="position-relative mt-5">
          <div className="bg-light rounded-3 position-relative p-4 p-sm-5">

            <Row className="align-items-center position-relative">
              <Col lg={8}>
                <div className="d-flex align-items-center gap-2">
                  <h3 className="mb-0">It's time to enjoy</h3>
                  <BsStars size={28} className="text-primary" />
                </div>
                <p className="mb-3 mb-lg-0">
                  Ready for an unforgettable night? We bring you the hottest concerts and live shows across Mauritius — all tailored to your vibe and budget!
                </p>
              </Col>
              <Col lg={4} className="text-lg-end">
                <Link to="/events" className="btn btn-lg btn-dark mb-0">
                  View More events...
                </Link>
              </Col>
            </Row>
          </div>
        </Container>
      </Container>
    </section>
  );
};

export default FeaturedHotels;
