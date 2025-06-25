import { useEffect } from 'react'
import FooterWithLinks from '../Home/components/FooterWithLinks'
import HotelGallery from './components/HotelGallery'
import TopNavBar4 from '../Home/components/TopNavBar'

const HotelDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0)

    const fullRelativePath = window.location.pathname + window.location.search
    localStorage.setItem('hotel_details_path', fullRelativePath)
  }, [])

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopNavBar4 />

      <main className="flex-grow-1 mb-5">
        <HotelGallery />
      </main>

      <FooterWithLinks />
    </div>
  )
}

export default HotelDetails
