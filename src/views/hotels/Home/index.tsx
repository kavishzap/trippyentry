import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageMetaData } from "@/components";
import AboutUsSections from "./components/AboutUsSections";
import FeaturedHoliday from "./components/FeaturedHoliday";
import FeaturedHotels from "./components/FeaturedHotels";
import FooterWithLinks from "./components/FooterWithLinks";
import Hero from "./components/Hero";
// import OfferSlider from './components/OfferSlider'
import TopNavBar from "./components/TopNavBar";
import {
  getFeaturedEventHeroImageUrl,
  loadLatestFeaturedConcert,
  type FeaturedConcert,
} from "./loadFeaturedConcert";
// import ActionBox from "@/views/tours/Home/components/ActionBox";
// import ReminderBanner from "./ReminderBanner";

const HotelHome = () => {
  const [featuredConcert, setFeaturedConcert] = useState<FeaturedConcert | null>(null);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState<string | null>(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash !== "#about") return;
    const el = document.getElementById("about");
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setFeaturedError(null);
      setFeaturedLoading(true);
      const { concert, error } = await loadLatestFeaturedConcert();
      if (cancelled) return;
      setFeaturedConcert(concert);
      setFeaturedError(error);
      setFeaturedLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const heroBackgroundUrl = getFeaturedEventHeroImageUrl(featuredConcert);
  const buyTicketHref = featuredConcert
    ? `/events/detail?id=${featuredConcert.id}`
    : "/events";

  return (
    <>
      <PageMetaData title="Home" />
      <TopNavBar />

      {/* <ReminderBanner /> */}
      <main className="trippy-home-flow">
        <div className="trippy-home-flow__base" aria-hidden />
        <Hero backgroundImageUrl={heroBackgroundUrl} buyTicketHref={buyTicketHref} />
        <div className="featured-hotels-wrapper">
          <FeaturedHotels
            concert={featuredConcert}
            loading={featuredLoading}
            fetchError={featuredError}
          />
        </div>

        <div id="about" className="trippy-home-about-embed">
          <AboutUsSections />
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
        scroll-padding-top: 5.5rem;
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
        position: relative;
        padding-top: 0.5rem;
        border-top: 1px solid rgba(212, 175, 55, 0.1);
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, transparent 40%);
      }
      .trippy-home-about-embed {
        scroll-margin-top: 5.5rem;
        position: relative;
        border-top: 1px solid rgba(212, 175, 55, 0.1);
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 32%);
      }
    `,
        }}
      />
    </>
  );
};

export default HotelHome;
