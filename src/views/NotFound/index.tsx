import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { PageMetaData } from '@/components';
import FooterWithLinks from '../hotels/Home/components/FooterWithLinks';
import TopNavBar from '../hotels/Home/components/TopNavBar';

import poster1 from '@/assets/newImage/heroSection/WhatsApp Image 2025-06-25 at 09.53.11_639e5b43.jpg';
import poster2 from '@/assets/newImage/heroSection/WhatsApp Image 2025-06-25 at 09.53.12_28965afb.jpg';
import poster3 from '@/assets/newImage/heroSection/WhatsApp Image 2025-06-25 at 20.17.46_7e5ec18f.jpg';

const posters = [
  { id: 1, src: poster1 },
  { id: 2, src: poster2 },
  { id: 3, src: poster3 },
];

const NotFound = () => {
  const [order, setOrder] = useState(posters);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => [prev[2], prev[0], prev[1]]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PageMetaData title="Not Found" />
      <TopNavBar />

      <section className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center py-5">
        <Container>
          <h1 className="text-primary fw-bold mb-3">404</h1>
          <h2 className="mb-2">Oh no, something went wrong!</h2>
          <p className="mb-5">
            Either something went wrong or this page doesn't exist anymore.
          </p>
         
          {/* Poster Slider */}
          <div className="image-carousel-static mb-5">
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

          {/* 404 Content */}
           <Link to="/" className="btn btn-light px-4 py-2 fw-semibold mb-5">
            Take me to Homepage
          </Link>
        </Container>
      </section>

      <FooterWithLinks />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .image-carousel-static {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 320px;
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
            }
            .image-carousel-static {
              height: 220px;
            }
          }
        `,
        }}
      />
    </>
  );
};

export default NotFound;
