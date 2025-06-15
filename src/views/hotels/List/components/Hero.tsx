import bgImg5 from '@/assets/newImage/heroSection/photo-1533174072545-7a4b6ad7a6c3.jpg'
import { Col, Container, Row } from 'react-bootstrap'

const Hero = () => {
  return (
    <section className="pt-0">
      <Container>
        <div
          className="rounded-3 p-3 p-sm-5"
          style={{
            backgroundImage: `url(${bgImg5})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Row className="my-2 my-xl-5">
            <Col md={8} className="mx-auto">
              <h1 className="text-center text-white">Events</h1>
              {/* <h1
                className="text-center"
                style={{
                  color: 'white',
                  WebkitTextStroke: '2px black',
                  fontWeight: 'bold',
                }}
              >
                Events
              </h1> */}
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  )
}

export default Hero

