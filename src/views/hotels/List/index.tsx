import { PageMetaData } from '@/components'
import FooterWithLinks from '../Home/components/FooterWithLinks'
import Hero from './components/Hero'
import HotelLists from './components/HotelLists'
import TopNavBar from '../Home/components/TopNavBar'

const HotelsList = () => {
  return (
    <>
      <PageMetaData title="Hotel - List" />

      <main>
        <TopNavBar />
        <Hero />
        <HotelLists />
      </main>

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
  )
}

export default HotelsList
