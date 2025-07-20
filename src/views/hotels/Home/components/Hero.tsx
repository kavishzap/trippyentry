import { Col, Container, Row } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import poster1 from '@/assets/newImage/heroSection/WhatsApp Image 2025-06-25 at 09.53.11_639e5b43.jpg'
import poster2 from '@/assets/newImage/heroSection/WhatsApp Image 2025-06-25 at 09.53.12_28965afb.jpg'
import poster4 from '@/assets/newImage/heroSection/YF_artwork 1.png'


const posters = [
  { id: 1, src: poster1 },
  { id: 2, src: poster2 },
  { id: 3, src: poster4 },
]

const Hero = () => {
  const [order, setOrder] = useState(posters)

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => [prev[2], prev[0], prev[1]])
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section className="pt-3 pt-lg-5">
        <Container>
          <Row className="align-items-center">
            {/* Left Column - Text */}
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="mb-3 mt-md-5 display-5">
                Find your best Entertainment <br />
                <span className="position-relative d-inline-block">
                  Packages.
                  <span className="position-absolute top-50 start-50 translate-middle z-index-n1 d-none d-md-block mt-4">
                    <svg width="390.5px" height="21.5px" viewBox="0 0 445.5 21.5">
                      <path
                        fill="#cfeb00"
                        opacity="0.7"
                        d="M409.9,2.6c-9.7-0.6-19.5-1-29.2-1.5c-3.2-0.2-6.4-0.2-9.7-0.3c-7-0.2-14-0.4-20.9-0.5c-3.9-0.1-7.8-0.2-11.7-0.3c-1.1,0-2.3,0-3.4,0c-2.5,0-5.1,0-7.6,0c-11.5,0-23,0-34.5,0c-2.7,0-5.5,0.1-8.2,0.1c-6.8,0.1-13.6,0.2-20.3,0.3c-7.7,0.1-15.3,0.1-23,0.3c-12.4,0.3-24.8,0.6-37.1,0.9c-7.2,0.2-14.3,0.3-21.5,0.6c-12.3,0.5-24.7,1-37,1.5c-6.7,0.3-13.5,0.5-20.2,0.9C112.7,5.3,99.9,6,87.1,6.7C80.3,7.1,73.5,7.4,66.7,8C54,9.1,41.3,10.1,28.5,11.2c-2.7,0.2-5.5,0.5-8.2,0.7c-5.5,0.5-11,1.2-16.4,1.8c-0.3,0-0.7,0.1-1,0.1c-0.7,0.2-1.2,0.5-1.7,1C0.4,15.6,0,16.6,0,17.6c0,1,0.4,2,1.1,2.7c0.7,0.7,1.8,1.2,2.7,1.1c6.6-0.7,13.2-1.5,19.8-2.1c6.1-0.5,12.3-1,18.4-1.6c6.7-0.6,13.4-1.1,20.1-1.7c2.7-0.2,5.4-0.5,8.1-0.7c10.4-0.6,20.9-1.1,31.3-1.7c6.5-0.4,13-0.7,19.5-1.1c2.7-0.1,5.4-0.3,8.1-0.4c10.3-0.4,20.7-0.8,31-1.2c6.3-0.2,12.5-0.5,18.8-0.7c2.1-0.1,4.2-0.2,6.3-0.2c11.2-0.3,22.3-0.5,33.5-0.8c6.2-0.1,12.5-0.3,18.7-0.4c2.2-0.1,4.4-0.1,6.7-0.1c11.5-0.1,23-0.2,34.6-0.4c7.2-0.1,14.4-0.1,21.6-0.1c12.2,0,24.5,0.1,36.7,0.1c2.4,0,4.8,0.1,7.2,0.2c6.8,0.2,13.5,0.4,20.3,0.6c5.1,0.2,10.1,0.3,15.2,0.4c3.6,0.1,7.2,0.4,10.8,0.6c10.6,0.6,21.1,1.2,31.7,1.8c2.7,0.2,5.4,0.4,8,0.6c2.9,0.2,5.8,0.4,8.6,0.7c0.4,0.1,0.9,0.2,1.3,0.3c1.1,0.2,2.2,0.2,3.2-0.4c0.9-0.5,1.6-1.5,1.9-2.5c0.6-2.2-0.7-4.5-2.9-5.2z"
                      />

                    </svg>
                  </span>
                </span>
              </h1>

              {/* Description */}
              <p className="lead mb-3 pe-lg-5">
                Ready for an unforgettable night? We bring you the hottest concerts and live shows across Mauritius — all tailored to your vibe and budget!
              </p>

            </Col>

            {/* Right Column - Animated Posters */}
            <Col lg={6} className="position-relative">
              <div className="image-carousel-static">
                <AnimatePresence>
                  {order.map((poster, index) => (
                    <motion.img
                      key={poster.id}
                      src={poster.src}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: index === 1 ? 1.1 : 0.9,
                        rotate: index === 0 ? -6 : index === 2 ? 6 : 0,
                        x: index === 0 ? -180 : index === 2 ? 180 : 0,
                        zIndex: index === 1 ? 3 : 1,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6 }}
                      className="carousel-img"
                    />
                  ))}
                </AnimatePresence>
              </div>
            </Col>
          </Row>
        </Container>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          .image-carousel-static {
            position: relative;
            margin-top: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .carousel-img {
            width: 220px;
            height: 320px;
            border-radius: 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            position: absolute;
            transition: all 0.3s ease-in-out;
          }

          @media (max-width: 768px) {
            .carousel-img {
              width: 150px;
              height: 220px;
              margin-top: 150px;
            }
          }
        `,
          }}
        />
      </section></>

  )
}

export default Hero
