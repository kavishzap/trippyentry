import { PageMetaData } from "@/components";
import FooterWithLinks from "../../hotels/Home/components/FooterWithLinks";
import Hero from "./components/Hero";
import TopNavBar from "../../hotels/Home/components/TopNavBar";
const About = () => {
  return (
    <>
      <PageMetaData title="About us" />
      <TopNavBar />
      <Hero />
      <FooterWithLinks />
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
    </>
  );
};

export default About;
