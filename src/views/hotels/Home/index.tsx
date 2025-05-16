import { PageMetaData } from '@/components'
import FeaturedHoliday from './components/FeaturedHoliday'
import FeaturedHotels from './components/FeaturedHotels'
import Footer from './components/Footer'
import FooterWithLinks from './components/FooterWithLinks'
import Hero from './components/Hero'
import OfferSlider from './components/OfferSlider'
import TopNavBar from './components/TopNavBar'

const HotelHome = () => {
  return (
    <>
      <PageMetaData title="Hotel - Home" />

      <TopNavBar />

      <main>
        <OfferSlider />
        <Hero />

        <FeaturedHotels />

        <FeaturedHoliday />
      </main>

      <FooterWithLinks />

      <Footer />
    </>
  )
}

export default HotelHome
