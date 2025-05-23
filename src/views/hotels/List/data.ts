import concertOne from '@/assets/images/category/hotel/4by3/Concert1.jpeg'
import concertTwo from '@/assets/images/category/hotel/4by3/Concert2.jpeg'
import concertThree from '@/assets/images/category/hotel/4by3/Concert3.jpeg'
import concertFour from '@/assets/images/category/hotel/4by3/Concert4.jpeg'
import concertFive from '@/assets/images/category/hotel/4by3/Concert5.jpeg'

export type HotelsListType = {
  id: number
  name: string
  address: string
  sale?: string
  images: string[]
  features: string[]
  price: number
  schemes?: string[]
}

export type NotificationType = {
  title: string
  content?: string
  time: string
}

const hotels: HotelsListType[] = [
  {
    id: 1,
    name: 'Stade Germain Comarmond',
    address: 'Rivière Noire Road, La Valette, Bambous, Black River 71501',
    images: [concertOne],
    price: 750,
    features: ['Air Conditioning', 'Wifi', 'Food Coupons'],
    schemes: ['Free Cancellation till 7 Jan 2022'],
    sale: '30% Off',
  },
  {
    id: 2,
    name: 'Big Willy’s',
    address: 'Le Barachois, A3 Road, Tamarin Bay, Tamarin',
    images: [concertTwo],
    price: 980,
    features: ['Air Conditioning', 'Wifi', 'Food Coupons'],
    
  },
  {
    id: 3,
    name: 'C Beach Club',
    address: 'B9 Road, Bel Ombre 61002',
    images: [concertThree],
    price: 540,
    features: ['Air Conditioning', 'Wifi', 'Food Coupons'],
    schemes: ['Free Cancellation till 7 Jan 2022'],
  },
  {
    id: 4,
    name: 'Backstage Lounge Bar (Hennessy Park Hotel)',
    address: '65, Ebene Cybercity, Ebene',
    images: [concertFour],
    price: 845,
    features: ['Air Conditioning', 'Wifi', 'Food Coupons'],
    schemes: ['Free Cancellation till 7 Jan 2022'],
  },
  {
    id: 5,
    name: 'Ile aux Cerfs Island',
    address: "Off the east coast of Mauritius, near Trou d'Eau Douce, Flacq",
    images: [concertFive],
    price: 645,
    features: ['Air Conditioning', 'Wifi', 'Food Coupons'],
  },
]

export const notificationData: NotificationType[] = [
  {
    title: 'New! Booking flights from New York ✈️',
    content: 'Find the flexible ticket on flights around the world. Start searching today',
    time: '05 Feb 2024',
  },
  {
    title: 'Sunshine saving are here 🌞 save 30% or more on a stay',
    time: '24 Aug 2024',
  },
]

export { hotels }
