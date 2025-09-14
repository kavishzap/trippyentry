// Hero.tsx
import { Col, Container, Row } from 'react-bootstrap';

const BG_URL =
  'https://lomezonmvcwxsdjbnimh.supabase.co/storage/v1/object/sign/hosted_img/uo2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOWM2ODdjNC1hM2MxLTQyZjUtOGJmMi1hYTg2NDJkZTY0NDYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3N0ZWRfaW1nL3VvMi5qcGciLCJpYXQiOjE3NTc4OTI4NDIsImV4cCI6MTgxODM3Mjg0Mn0.ToYCZlfAMMtIzaMzmzQ58N-aZn8GVB6N6VSJLCJyty8';

const Hero = () => {
  return (
    <section className="pt-0">
      <Container>
        <div className="hero-banner rounded-3 p-3 p-sm-5">
          <Row className="my-2 my-xl-5">
            <Col md={8} className="mx-auto">
              <h1 className="text-center text-white">Events</h1>
            </Col>
          </Row>
        </div>
      </Container>

      <style>{`
        .hero-banner{
          position: relative;
          min-height: 240px;
          background-image: url('${BG_URL}');
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          overflow: hidden;
        }
        /* subtle dark overlay for readability */
        .hero-banner::after{
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.25));
          pointer-events: none;
        }
        /* keep content above overlay */
        .hero-banner > .row{ position: relative; z-index: 1; }

        @media (max-width: 576px){
          .hero-banner{ min-height: 180px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
