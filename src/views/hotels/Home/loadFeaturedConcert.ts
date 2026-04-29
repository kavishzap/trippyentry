import { supabase } from '@/lib/supabaseClient'

export type FeaturedConcert = {
  id: number
  concert_name: string
  concert_date: string
  concert_location_name: string
  concert_image: string
  front_image: string
  concert_description?: string | null
  price: number
}

export async function loadLatestFeaturedConcert(): Promise<{
  concert: FeaturedConcert | null
  error: string | null
}> {
  try {
    const { data: concertsData, error: concertError } = await supabase
      .from('concerts')
      .select('*')
      .order('id', { ascending: false })
      .limit(1)

    if (concertError || !concertsData?.length) {
      return {
        concert: null,
        error: concertError?.message ?? 'No events available right now.',
      }
    }

    const row = concertsData[0]
    const { data: ticketsData, error: ticketError } = await supabase
      .from('tickets')
      .select('concert_id, price')
      .eq('concert_id', row.id)

    let minPrice = 0
    if (!ticketError && ticketsData?.length) {
      minPrice = Math.min(...ticketsData.map((t) => Number(t.price) || 0))
    }

    return {
      concert: {
        ...row,
        price: minPrice,
      } as FeaturedConcert,
      error: null,
    }
  } catch {
    return { concert: null, error: 'Unable to fetch events right now.' }
  }
}

/** Best image for hero: same as featured card (front, then main concert image). */
export function getFeaturedEventHeroImageUrl(c: FeaturedConcert | null): string | null {
  if (!c) return null
  const front = String(c.front_image ?? '').trim()
  if (front) return front
  const main = String(c.concert_image ?? '').trim()
  if (main) return main
  return null
}
