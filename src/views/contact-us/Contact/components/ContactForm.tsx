import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'react-bootstrap'
import { CheckFormInput, TextAreaFormInput, TextFormInput } from '@/components'
import { useForm } from 'react-hook-form'

const ContactForm = () => {
  const { control, handleSubmit } = useForm()

  return (
    <section className="pt-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="bg-light p-4 position-relative">
              <figure className="position-absolute end-0 bottom-0 mb-n4 me-n2">
                 <svg className="fill-orange" width="104.2px" height="95.2px">
                  <circle cx="2.6" cy="92.6" r="2.6" />
                  <circle cx="2.6" cy="77.6" r="2.6" />
                  <circle cx="2.6" cy="62.6" r="2.6" />
                  <circle cx="2.6" cy="47.6" r="2.6" />
                  <circle cx="2.6" cy="32.6" r="2.6" />
                  <circle cx="2.6" cy="17.6" r="2.6" />
                  <circle cx="2.6" cy="2.6" r="2.6" />
                  <circle cx="22.4" cy="92.6" r="2.6" />
                  <circle cx="22.4" cy="77.6" r="2.6" />
                  <circle cx="22.4" cy="62.6" r="2.6" />
                  <circle cx="22.4" cy="47.6" r="2.6" />
                  <circle cx="22.4" cy="32.6" r="2.6" />
                  <circle cx="22.4" cy="17.6" r="2.6" />
                  <circle cx="22.4" cy="2.6" r="2.6" />
                  <circle cx="42.2" cy="92.6" r="2.6" />
                  <circle cx="42.2" cy="77.6" r="2.6" />
                  <circle cx="42.2" cy="62.6" r="2.6" />
                  <circle cx="42.2" cy="47.6" r="2.6" />
                  <circle cx="42.2" cy="32.6" r="2.6" />
                  <circle cx="42.2" cy="17.6" r="2.6" />
                  <circle cx="42.2" cy="2.6" r="2.6" />
                  <circle cx={62} cy="92.6" r="2.6" />
                  <circle cx={62} cy="77.6" r="2.6" />
                  <circle cx={62} cy="62.6" r="2.6" />
                  <circle cx={62} cy="47.6" r="2.6" />
                  <circle cx={62} cy="32.6" r="2.6" />
                  <circle cx={62} cy="17.6" r="2.6" />
                  <circle cx={62} cy="2.6" r="2.6" />
                  <circle cx="81.8" cy="92.6" r="2.6" />
                  <circle cx="81.8" cy="77.6" r="2.6" />
                  <circle cx="81.8" cy="62.6" r="2.6" />
                  <circle cx="81.8" cy="47.6" r="2.6" />
                  <circle cx="81.8" cy="32.6" r="2.6" />
                  <circle cx="81.8" cy="17.6" r="2.6" />
                  <circle cx="81.8" cy="2.6" r="2.6" />
                  <circle cx="101.7" cy="92.6" r="2.6" />
                  <circle cx="101.7" cy="77.6" r="2.6" />
                  <circle cx="101.7" cy="62.6" r="2.6" />
                  <circle cx="101.7" cy="47.6" r="2.6" />
                  <circle cx="101.7" cy="32.6" r="2.6" />
                  <circle cx="101.7" cy="17.6" r="2.6" />
                  <circle cx="101.7" cy="2.6" r="2.6" />
                </svg>
              </figure>
              <CardHeader className="bg-light p-0 pb-3 text-center">
                <h3 className="mb-0">Have questions about the event?</h3>
                <p className="small mt-1 text-black">Send us a message and we’ll get back to you before the show!</p>
              </CardHeader> 
              <CardBody className="p-0">
                <form onSubmit={handleSubmit(() => {})} className="row g-4">
                  <TextFormInput name="name" label="Full name *" containerClass="col-md-6" control={control} />
                  <TextFormInput name="email" label="Email address *" containerClass="col-md-6" control={control} />
                  <TextFormInput name="mobileNo" label="Phone number *" containerClass="col-12" control={control} />
                  <TextAreaFormInput
                    name="message"
                    label="What would you like to know about the concert? *"
                    containerClass="col-12"
                    rows={4}
                    control={control}
                  />
                  <CheckFormInput
                    id="contact-us-checkbox"
                    name="checkbox"
                    type="checkbox"
                    label="I agree to receive event updates and promotional emails."
                    containerClass="col-12 form-check ms-2"
                    control={control}
                  />
                  <Col xs={12} className="text-center">
                    <Button variant="dark" type="submit">
                      Send Message
                    </Button>
                  </Col>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ContactForm
