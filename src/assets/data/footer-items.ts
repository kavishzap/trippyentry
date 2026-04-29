import { type IconType } from 'react-icons'
import { FaCar, FaEarthAmericas, FaHotel, FaPlane } from 'react-icons/fa6'

type FooterLink = {
  title: string
  items: {
    name: string
    link?: string
    icon?: IconType
  }[]
}

type TopLink = {
  name: string
  link?: string
}

const footerLinks: FooterLink[] = [
  {
    title: 'Booking',
    items: [
      { name: 'Hotel', icon: FaHotel, link: '/hotels/home' },
      { name: 'Flight', icon: FaPlane, link: '/flights/home' },
      { name: 'Tour', icon: FaEarthAmericas, link: '/tours/home' },
      { name: 'Cabs', icon: FaCar, link: '/cabs/home' },
    ],
  },
]

const topLinks: TopLink[] = [
  { name: 'Flights', link: '/flights/home' },
  { name: 'Hotels', link: '/hotels/home' },
  { name: 'Tour', link: '/tours/home' },
  { name: 'Cabs', link: '/cabs/home' },
  { name: 'About', link: '/dashboard#about' },
  { name: 'Contact us', link: '/pages/contact' },
  { name: 'Blogs', link: '/blogs/blog' },
  { name: 'Services', link: '/help/service' },
  { name: 'Detail page', link: '/directories/detail' },
  { name: 'Policy', link: '/help/privacy-policy' },
  { name: 'Testimonials',link:'/hotels/home#hotels-home-testimonial' },
  { name: 'Newsletters',link:'/blogs/detail' },
  { name: 'Podcasts' },
  { name: 'Protests' },
  { name: 'NewsCyber' },
  { name: 'Education' },
  { name: 'Sports' },
  { name: 'Tech and Auto' },
  { name: 'Opinion' },
  { name: 'Share Market' },
]

export { footerLinks, topLinks }
