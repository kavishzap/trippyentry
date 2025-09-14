import FeaturedHoliday from "./components/FeaturedHoliday";
import FeaturedHotels from "./components/FeaturedHotels";
import FooterWithLinks from "./components/FooterWithLinks";
import Hero from "./components/Hero";
// import OfferSlider from './components/OfferSlider'
import TopNavBar from "./components/TopNavBar";
// import ActionBox from "@/views/tours/Home/components/ActionBox";
// import ReminderBanner from "./ReminderBanner";

const HotelHome = () => {
  return (
    <>
      <TopNavBar />

      {/* <ReminderBanner /> */}
      <main>
        <Hero />
        <div className="featured-hotels-wrapper">
          <FeaturedHotels />
        </div>

        <FeaturedHoliday />
      </main>

      <FooterWithLinks />

      <style
        dangerouslySetInnerHTML={{
          __html: `
      /* Prevent unwanted horizontal scroll globally */
      body, html {
        overflow-x: hidden !important;
      }

      /* Prevent any child overflow from Hero or images */
      main {
        overflow-x: hidden;
        width: 100%;
        position: relative;
      }

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
  );
};

export default HotelHome;
