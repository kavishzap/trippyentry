import clsx from 'clsx'
import { Col, Container, Row } from 'react-bootstrap'
import { ourStories } from '../data'

const OurStory = () => {
  return (
    <section className="our-story-section">

      <Container>
        <Row className="mb-4 mb-md-5">
          <Col md={10} className="mx-auto">
            <h3 className="mb-4">Our Story</h3>
            <p className="fw-bold">
              How we founded KREYO...
            </p>
            <p className="mb-0">
              Enter something about us here...
            </p>
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
