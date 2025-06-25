import clsx from 'clsx'
import { Col, Container, Row } from 'react-bootstrap'
import { ourStories } from '../data'

const OurStory = () => {
  return (
    <section className="our-story-section">

      <Container>
        <Row className="mb-4 mb-md-5">
          <Col md={10} className="mx-auto">
            <Container>
              <Row>
                <Col className="text-center">
                  <h2 className="mb-0">Our Story</h2>
                  <p className="fw-bold mt-5">How we founded ZEKO...</p>
                  <p className="mb-0">
                    ZEKO was born from a simple idea — to make event booking easier, faster, and more accessible for everyone in Mauritius.
                    Whether you're 16 or 60, tech-savvy or not, our mission is to bring live entertainment to your fingertips with zero hassle.
                    <br /><br />
                    We are a team of developers, designers, and event lovers who understand the unique culture and vibrant energy of Mauritius.
                    That’s why we created a platform that bridges traditional ticketing with modern digital convenience — all in one sleek experience.
                    <br /><br />
                    From concerts and festivals to theatre nights and community gatherings, ZEKO empowers both organizers and attendees.
                    Because we believe unforgettable experiences should be for everyone — not just a few.
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>


        <Row className="g-4 justify-content-center">
          {ourStories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Col key={idx} sm={6} lg={3} className="text-center">
                <div
                  className={clsx(
                    'icon-lg bg-opacity-10 rounded-2 d-inline-flex align-items-center justify-content-center',
                    item.variant
                  )}
                  style={{ width: '60px', height: '60px' }}
                >
                  <Icon size={21} />
                </div>
                <h5 className="mt-2">{item.title}</h5>
                <p className="mb-0">{item.description}</p>
              </Col>
            );
          })}
        </Row>


      </Container>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .our-story-section {
              padding-top: 15rem; 
            }

            @media (min-width: 992px) {
              .our-story-section {
                padding-top: 15rem; /* for larger screens */
              }
            }
          `
        }}
      />









    </section>
  )
}

export default OurStory
