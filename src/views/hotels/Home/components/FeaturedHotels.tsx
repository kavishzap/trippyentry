import { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { BsGeoAlt, BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

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

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <section>
      <Container>
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <h2 className="mb-0">Featured Events</h2>
          </Col>
        </Row>
        <Row className="gx-3 gy-3 gy-md-4">
          {concerts.map((concert) => (
            <Col key={concert.id} sm={6} xl={3}>
              <Card className="card-img-scale overflow-hidden bg-transparent h-100 mb-0">
                <div className="card-img-scale-wrapper rounded-3" style={{ height: '350px', overflow: 'hidden' }}>
                  <img
                    src={`data:image/jpeg;base64,${concert.concert_image}`}
                    className="card-img"
                    alt="concert image"
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  />
                  <div className="position-absolute bottom-0 start-0 p-3">
                    <div className="badge text-bg-dark fs-6 rounded-pill stretched-link d-flex text-truncate" style={{ maxWidth: '200px' }}>
                      <BsGeoAlt className="me-2" />
                      <span className="text-truncate">{concert.concert_location_name}</span>
                    </div>
                  </div>
                </div>

                <div className="card-img-scale-wrapper">
                  <h5 className="card-title mt-3 text-truncate" style={{ maxWidth: '100%' }}>
                    <Link to={`/events/detail?id=${concert.id}`} className="stretched-link d-inline-block text-truncate" style={{ maxWidth: '100%' }}>
                      {concert.concert_name}
                    </Link>
                  </h5>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <h6 className="text-primary mb-0">
                      <small className="fw-light">Starting at</small> Rs {concert.price}
                    </h6>
                    <button className="btn btn-sm btn-outline-primary">
                      <BsArrowRight />
                    </button>
                  </div>
                </div>
              </Card>

            </Col>
          ))}
        </Row>

        <Container className="position-relative mt-5">
          <div className="bg-light rounded-3 position-relative p-4 p-sm-5">
            <figure className="position-absolute top-50 start-50 d-none d-lg-block translate-middle">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-25">
                <defs>
                  <radialGradient id="lightGlow" cx="0.5" cy="0.5" r="0.6">
                    <stop offset="0%" stopColor="#00f2fe" />
                    <stop offset="100%" stopColor="#4facfe" />
                  </radialGradient>
                </defs>
                <circle cx="70" cy="70" r="60" fill="url(#lightGlow)" />
                <path d="M40 70 L40 50 M50 70 L50 40 M60 70 L60 60 M70 70 L70 30 M80 70 L80 60 M90 70 L90 50 M100 70 L100 40" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <circle cx="70" cy="85" r="6" fill="white" />
                <rect x="67" y="85" width="6" height="20" rx="2" fill="white" />
              </svg>
            </figure>

            <Row className="align-items-center position-relative">
              <Col lg={8}>
                <div className="d-flex">
                  <h3>It's time to enjoy 🎉</h3>
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
