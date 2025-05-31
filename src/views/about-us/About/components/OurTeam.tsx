import { Col, Container, Row } from 'react-bootstrap'


const OurTeam = () => {
  return (
    <section className="pt-0">
      <Container>
        <Row className="mb-4">
          <Col xs={12}>
            <Container>
              <Row>
                <Col className="text-center">
                  <h2 className="mb-0">Our Team</h2>
                </Col>
              </Row>
            </Container>

           <p className="mt-2 text-center">
              Behind KREYO is a passionate team of developers, designers, and event enthusiasts driven by a shared love for live entertainment. We blend tech innovation with real-world experience to create a seamless, fan-first ticketing platform. Whether we're writing code or curating events, everything we do is built around one goal — making unforgettable experiences easier to access for everyone.
            </p>

          </Col>
        </Row>

      </Container>
    </section>
  )
}

export default OurTeam
