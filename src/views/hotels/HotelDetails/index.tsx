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

      <main className="flex-grow-1">
        <HotelGallery />
      </main>
      <main className="mt-5">
        <FooterWithLinks />
      </main>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      html, body {
        overflow-x: hidden !important;
      }

      main {
        overflow-x: hidden;
        width: 100%;
        position: relative;
      }
    `,
        }}
      />
    </div>
  )
}

export default HotelDetails
