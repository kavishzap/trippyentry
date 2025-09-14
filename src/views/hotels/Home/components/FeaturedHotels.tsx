import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BsArrowRight, BsStars } from "react-icons/bs";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

type Concert = {
  id: number;
  concert_name: string;
  concert_date: string;
  concert_location_name: string;
  concert_image: string;
  front_image: string;
  price: number;
};

const SkeletonCard = ({ index }: { index: number }) => (
  <Col xs={12} sm={6} md={4}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <Card className="overflow-hidden bg-transparent h-100 mb-0">
        <div className="skeleton-card">
          {/* image area */}
          <div className="skeleton skeleton-img rounded-3 shimmer" />
          {/* title line */}
          <div className="mt-3 skeleton skeleton-line w-75 shimmer" />
          {/* price + button row */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="skeleton skeleton-line w-50 shimmer" />
            <div className="skeleton skeleton-btn shimmer" />
          </div>
        </div>
      </Card>
    </motion.div>
    <style>{`
  /* ===== Skeleton / Shimmer ===== */
  .skeleton-card {
    padding: 1rem;
  }

  .skeleton {
    background: #2a2f3a; /* dark base to fit your dark theme */
    border-radius: .5rem;
    position: relative;
    overflow: hidden;
  }

  .skeleton-img {
    width: 100%;
    height: 450px;
    border-radius: .75rem !important;
  }

  .skeleton-line {
    height: 16px;
  }

  .skeleton-btn {
    width: 110px;
    height: 34px;
    border-radius: .5rem;
  }

  /* Shimmer effect */
  .shimmer::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.12) 45%,
      rgba(255,255,255,0.2) 55%,
      rgba(255,255,255,0) 100%
    );
    animation: shimmer 1.4s infinite;
  }

  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }

  /* Optional: smaller skeleton on very small screens */
  @media (max-width: 576px) {
    .skeleton-img { height: 320px; }
  }
`}</style>
  </Col>
);

const FeaturedHotels = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcertsWithTickets = async () => {
      const { data: concertsData, error: concertError } = await supabase
        .from("concerts")
        .select("*")
        .order("id", { ascending: false })
        .limit(3);

      if (concertError || !concertsData) return;

      const concertIds = concertsData.map((c) => c.id);
      const { data: ticketsData, error: ticketError } = await supabase
        .from("tickets")
        .select("concert_id, price")
        .in("concert_id", concertIds);

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
    <Col key={concert?.id || index} xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
      >
        <Card className="card-img-scale overflow-hidden bg-transparent h-100 mb-0">
          <Link
            to={`/events/detail?id=${concert?.id}`}
            className="d-block position-relative"
            style={{ textDecoration: "none" }}
          >
            <div
              className="card-img-scale-wrapper rounded-3"
              style={{
                width: "100%",
                overflow: "hidden",
                backgroundColor: concert ? "transparent" : "#e9ecef",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              {concert ? (
                <img
                  src={`data:image/jpeg;base64,${concert.front_image}`}
                  alt="concert image"
                  loading="lazy"
                  style={{
                    width: "120%",
                    height: "450px",
                    borderRadius: "0.75rem",
                  }}
                />
              ) : (
                <div style={{ height: "100%", width: "100%" }} />
              )}
            </div>
          </Link>

          <div className="card-img-scale-wrapper">
            <h5
              className="card-title mt-3 text-truncate"
              style={{ maxWidth: "100%" }}
            >
              {concert ? (
                <Link
                  to={`/events/detail?id=${concert.id}`}
                  className="stretched-link d-inline-block text-truncate"
                  style={{ maxWidth: "100%" }}
                >
                  {concert.concert_name}
                </Link>
              ) : (
                <div
                  className="bg-secondary bg-opacity-25 rounded"
                  style={{ height: "1.5rem", width: "80%" }}
                />
              )}
            </h5>

            <div className="d-flex justify-content-between align-items-center mt-2">
              {concert ? (
                <>
                  <h6 className="text-primary mb-0">
                    <small className="fw-light">Starting at</small> Rs{" "}
                    {concert.price}
                  </h6>
                  <button className="btn btn-sm btn-outline-primary">
                    Book Now <BsArrowRight />
                  </button>
                </>
              ) : (
                <>
                  <div
                    className="bg-secondary bg-opacity-10 rounded"
                    style={{ height: "1.2rem", width: "50%" }}
                  />
                  <div className="btn btn-sm btn-outline-primary disabled placeholder">
                    →
                  </div>
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

        <Row className="gx-3 gy-3 justify-content-center">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} index={i} />
              ))
            : concerts.slice(0, 3).map((concert, i) => renderCard(concert, i))}
        </Row>

        <Container className="position-relative mt-5">
          <div className="cta-card rounded-4 p-4 p-sm-5 shadow-lg">
            <Row className="align-items-center gy-4">
              {/* Left: Text */}
              <Col lg={8} className="text-center text-lg-start">
                <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-3">
                  <h2 className="fw-bold display-6 mb-0 text-light">
                    It's time to <span className="highlight">enjoy</span>
                  </h2>
                  <BsStars size={32} className="text-warning animate-star" />
                </div>
                <p className="mb-0 lead text-light opacity-90">
                  Ready for an unforgettable night? We bring you the hottest
                  concerts and live shows across Mauritius — all tailored to
                  your vibe and budget!
                </p>
              </Col>

              {/* Right: Button */}
              <Col lg={4} className="text-center text-lg-end">
                <Link
                  to="/events"
                  className="btn btn-lg btn-warning fw-semibold shadow-sm px-4 py-2"
                >
                  View Events →
                </Link>
              </Col>
            </Row>
          </div>

          <style>{`
        .cta-card {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          position: relative;
          overflow: hidden;
        }
        .cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 60%),
                      radial-gradient(circle at bottom right, rgba(255,255,255,0.05), transparent 70%);
          pointer-events: none;
        }
        .highlight {
          background: linear-gradient(90deg, #facc15, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .animate-star {
          animation: twinkle 1.5s infinite ease-in-out;
        }
        @keyframes twinkle {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
      `}</style>
        </Container>
      </Container>
    </section>
  );
};

export default FeaturedHotels;
