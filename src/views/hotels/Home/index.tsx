import { PageMetaData } from "@/components";
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
      <PageMetaData title="Home" />
      <TopNavBar />

      {/* <ReminderBanner /> */}
      <main className="trippy-home-flow">
        <div className="trippy-home-flow__base" aria-hidden />
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

      /* One continuous backdrop under hero → featured → why trippy */
      main.trippy-home-flow {
        overflow-x: hidden;
        width: 100%;
        position: relative;
        background-color: #000000;
      }

      .trippy-home-flow__base {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          radial-gradient(ellipse 118% 82% at 50% -18%, rgba(212, 175, 55, 0.3), transparent 56%),
          radial-gradient(ellipse 88% 52% at 100% 38%, rgba(212, 175, 55, 0.1), transparent 50%),
          radial-gradient(ellipse 78% 56% at 0% 72%, rgba(232, 213, 163, 0.11), transparent 46%),
          linear-gradient(180deg, #000000 0%, #080602 42%, #030201 72%, #000000 100%);
      }

      main.trippy-home-flow > *:not(.trippy-home-flow__base) {
        position: relative;
        z-index: 1;
      }

      .featured-hotels-wrapper {
        margin-top: 0;
      }
    `,
        }}
      />
    </>
  );
};

export default HotelHome;
