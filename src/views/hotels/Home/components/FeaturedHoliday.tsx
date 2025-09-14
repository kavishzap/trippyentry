import { Col, Container, Row } from "react-bootstrap";
import {
  FaTicketAlt,
  FaShuttleVan,
  FaConciergeBell,
  FaHeadset,
} from "react-icons/fa";

const FeaturedHoliday = () => {
  return (
    <section className="pb-0 pb-xl-5 mb-5">
      <Container>
        <Row className="g-4 align-items-stretch">
          {/* Left image column */}
          <Col lg={5} className="d-flex">
            <img
              src="https://lomezonmvcwxsdjbnimh.supabase.co/storage/v1/object/sign/hosted_img/final%20sam.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOWM2ODdjNC1hM2MxLTQyZjUtOGJmMi1hYTg2NDJkZTY0NDYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3N0ZWRfaW1nL2ZpbmFsIHNhbS5qcGciLCJpYXQiOjE3NTc4ODU3MTgsImV4cCI6MTgxODM2NTcxOH0.IQk5CBZTz9k3-kvTGz9CA6k-xG5vZBSGZE16Co4E2QA"
              className="rounded-3 w-100 h-100 object-cover"
              alt="Why Choose Us"
            />
          </Col>

          {/* Right features column */}
          <Col lg={7} className="d-flex flex-column">
            <h2 className="mb-3 mb-lg-4 text-center text-lg-start">
              Why Choose Us?
            </h2>
            <p className="mb-3 mb-lg-4 text-center text-lg-start">
              Elevate your event experience with zekomru.com — from quick
              ticketing to food deals and smooth rides, we make your concerts
              unforgettable!
            </p>

            <Row className="g-3 flex-grow-1">
              <Col sm={6} className="d-flex">
                <div className="feature-card w-100">
                  <div className="feature-icon bg-success-subtle text-success">
                    <FaTicketAlt />
                  </div>
                  <h5 className="mt-3 mb-1">Easy Ticket Booking</h5>
                  <p className="mb-0">
                    Book your concert tickets quickly and easily with just a few
                    clicks.
                  </p>
                </div>
              </Col>

              <Col sm={6} className="d-flex">
                <div className="feature-card w-100 feature-disabled">
                  <div className="feature-icon bg-secondary-subtle text-secondary position-relative">
                    <FaShuttleVan />
                    <span className="coming-soon-pill">Soon</span>
                  </div>
                  <h5 className="mt-3 mb-1 text-muted">
                    Transport to Your Event
                  </h5>
                  <p className="mb-0 text-muted">
                    Shuttle rides and transport options will be available soon.
                  </p>
                </div>
              </Col>

              <Col sm={6} className="d-flex">
                <div className="feature-card w-100 feature-disabled">
                  <div className="feature-icon bg-secondary-subtle text-secondary position-relative">
                    <FaConciergeBell />
                    <span className="coming-soon-pill">Soon</span>
                  </div>
                  <h5 className="mt-3 mb-1 text-muted">
                    Food &amp; Drink Coupons
                  </h5>
                  <p className="mb-0 text-muted">
                    Exclusive discounts on food and beverages will be available
                    soon.
                  </p>
                </div>
              </Col>

              <Col sm={6} className="d-flex">
                <div className="feature-card w-100">
                  <div className="feature-icon bg-info-subtle text-info">
                    <FaHeadset />
                  </div>
                  <h5 className="mt-3 mb-1">24 / 7 Support</h5>
                  <p className="mb-0">
                    Our support team is here round-the-clock to help you
                    anytime.
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <style>{`
  .object-cover {
    object-fit: cover;
  }
.feature-card {
  background: var(--bs-body-bg);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.11);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;

  /* ✅ Center content */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(250, 250, 250, 0.08);
  border-color: rgba(0,0,0,0.08);
}

/* Icon badge */
.feature-icon {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  backdrop-filter: saturate(1.2) blur(4px);
  font-size: 28px;

  /* ✅ Needed so "Coming Soon" pill stays relative to icon */
  position: relative;
}

.coming-soon-pill {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ffd166;
  color: #1f2937;
  font-size: 11px;
  font-weight: 600;
  border-radius: 9999px;
  padding: 2px 8px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.feature-disabled {
  opacity: 0.85;
  pointer-events: none;
  user-select: none;
}

`}</style>
      </Container>
    </section>
  );
};

export default FeaturedHoliday;
