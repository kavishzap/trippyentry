// src/services/bookingService.ts
import { supabase } from '@/lib/supabaseClient'

export const createBooking = async ({
  concertId,
  tickets,
  total,
}: {
  concertId: string
  tickets: { ticket_id: number; quantity: number }[]
  total: number
}) => {
  const username = localStorage.getItem('zeko_username')
  if (!username) throw new Error('User not logged in')
console.log('Username from localStorage:', username)

  // Get user id from profile table using username
  const { data: userData, error: userError } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('email', username)
    .single()

  if (userError || !userData?.id) throw new Error('User not found')

  const payload = {
    userid: userData.id,
    concertid: concertId,
    tickets: tickets,
    status: false,
    total,
  }

  console.log('Creating booking with payload:',payload);

  const { data, error } = await supabase.from('bookings').insert(payload).select().single()
  if (error) throw new Error(error.message)

  return  data.id
}
