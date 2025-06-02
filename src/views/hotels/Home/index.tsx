import { PageMetaData } from '@/components'
import FeaturedHoliday from './components/FeaturedHoliday'
import FeaturedHotels from './components/FeaturedHotels'
import FooterWithLinks from './components/FooterWithLinks'
import Hero from './components/Hero'
// import OfferSlider from './components/OfferSlider'
import TopNavBar from './components/TopNavBar'
import ActionBox from '@/views/tours/Home/components/ActionBox'

const HotelHome = () => {
  return (
    <>
      <PageMetaData title="Hotel - Home" />

      <TopNavBar />

      <main>
        
        <Hero />

        <FeaturedHotels />

        <FeaturedHoliday />

        {/* <OfferSlider /> */}

        
        <ActionBox/>
      </main>

      <FooterWithLinks />

    </>
  )
}

export default HotelHome
