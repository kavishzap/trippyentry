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
      <TopNavBar />

      <main>
        <Hero />
        {/* <AvailabilityFilter /> */}
        <div className="featured-hotels-wrapper">
          <FeaturedHotels />
        </div>

        <FeaturedHoliday />

        <ActionBox />
      </main>

      <FooterWithLinks />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .featured-hotels-wrapper {
              margin-top: 0;
            }

            @media (max-width: 639px) {
              .featured-hotels-wrapper {
                margin-top: 8.5rem; /* Push down on mobile */
              }
            }
          `,
        }}
      />
    </>
  )
}

export default HotelHome
