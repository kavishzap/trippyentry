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
    </>
  )
}

export default HotelsList
