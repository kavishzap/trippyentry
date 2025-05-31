import { PageMetaData } from '@/components'
import AboutHotel from './components/AboutHotel'
import FooterWithLinks from '../Home/components/FooterWithLinks'
import HotelGallery from './components/HotelGallery'
import TopNavBar4 from '../Home/components/TopNavBar'

const HotelDetails = () => {
  return (
    <>
      <PageMetaData title="Hotel - Details" />

      <TopNavBar4 />

      <main>
        
        <HotelGallery />
        <AboutHotel />
      </main>

      <FooterWithLinks />
    </>
  )
}

export default HotelDetails
