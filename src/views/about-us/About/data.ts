import { type IconType } from 'react-icons'
import { FaCar, FaCalendarAlt} from 'react-icons/fa'
import { FaBowlFood } from 'react-icons/fa6'


type OurStoryType = {
  title: string
  description: string
  icon: IconType
  variant: string
}



const ourStories: OurStoryType[] = [
  {
    title: 'Event Booking',
    description: 'Easily discover and reserve tickets for concerts, festivals, and more — all in one place.',
    icon: FaCalendarAlt,
    variant: 'bg-orange text-orange',
  },

  {
    title: 'Cab Booking',
    description: 'Book reliable and affordable rides instantly.',
    icon: FaCar,
    variant: 'bg-info text-info',
  },

   {
    title: 'Food Coupons',
    description: 'Get exclusive discounts and deals at your favorite restaurants and food outlets with digital coupons.',
    icon: FaBowlFood,
    variant: 'bg-success text-success',
  },
]


export { ourStories}
