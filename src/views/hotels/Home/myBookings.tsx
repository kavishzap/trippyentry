import { useEffect, useState } from 'react';
import { Pagination, Spinner } from 'react-bootstrap';
import QRCode from 'qrcode'
import { supabase } from '@/lib/supabaseClient';
import { FaTicketAlt, FaMoneyBillWave, FaFileInvoice } from 'react-icons/fa'
import { FaLocationPin } from 'react-icons/fa6';

const TICKET_TEMPLATE_PATH = '/ticket_sample.png'

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

function triggerPngDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

type Booking = {
  tickets: {
    ticket_name: string; ticket_id: number; quantity: number
  }[] | false;
  id: number;
  title: string;
  price: string;
  /** Numeric total from booking row (MUR) */
  totalMUR: number;
  concertName: string;
  status: 'Paid' | 'Unpaid';
  concertImage?: string;
  frontImage?: string;
  created_at?: string;
  concertLocation?: string;
};

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Unpaid'>('All');
  const itemsPerPage = 5;
  const [downloadingId, setDownloadingId] = useState<number | null>(null)
  let concertLocation = '';

  
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const email = localStorage.getItem('zeko_username');
    if (!email) {
      console.error('No user email found in localStorage');
      setLoading(false);
      return;
    }

    const { data: userProfile, error: userError } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !userProfile) {
      console.error('Error fetching user profile:', userError?.message);
      setLoading(false);
      return;
    }

    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('userid', userProfile.id)
      .order('created_at', { ascending: false });

    if (bookingError || !bookingData) {
      console.error('Error fetching bookings:', bookingError?.message);
      setLoading(false);
      return;
    }

    const bookingsWithConcerts: Booking[] = await Promise.all(
      bookingData.map(async (b) => {
        let concertName = 'Unknown Concert';
        let concertImage = '';
        let frontImage = '';

        if (b.concertid) {
          const { data: concertData, error: concertError } = await supabase
            .from('concerts')
            .select('concert_name, concert_image, concert_location_name, front_image')
            .eq('id', b.concertid)
            .single();

          if (concertData) {
            concertName = concertData.concert_name;
            concertImage = concertData.concert_image;
            concertLocation = concertData.concert_location_name;
            frontImage = concertData.front_image;
          } else if (concertError) {
            console.warn(`Error fetching concert for booking ${b.id}`, concertError.message);
          }
        }

        return {
          id: b.id,
          title: `Ticket#${b.id}`,
          price: `${Number(b.total || 0).toFixed(2)} MUR`,
          totalMUR: Number(b.total || 0),
          concertName,
          concertImage,
          frontImage,
          concertLocation,
          status: b.status ? 'Paid' : 'Unpaid',
          tickets: b.tickets ?? false,
          created_at: b.created_at,
        };
      })
    );


    setBookings(bookingsWithConcerts);
    setLoading(false);
  };

  const filteredBookings = bookings.filter((b) =>
    statusFilter === 'All' ? true : b.status === statusFilter
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  const downloadTicket = async (booking: Booking) => {
    setDownloadingId(booking.id)
    try {
      const email = localStorage.getItem('zeko_username')
      if (!email) return

      const { data: userProfile } = await supabase
        .from('user_profiles')
        .select('id, first_name, last_name, email')
        .eq('email', email)
        .single()

      const { data: ticketRows } = await supabase
        .from('tickets')
        .select('id, ticket_name, ticket_type, price')

      const ticketLines =
        Array.isArray(booking.tickets) && booking.tickets
          ? booking.tickets.map((t) => {
              const row = ticketRows?.find((r) => r.id === t.ticket_id)
              const unit = row?.price != null ? Number(row.price) : undefined
              return {
                ticketId: t.ticket_id,
                name: row?.ticket_name ?? t.ticket_name ?? `Ticket #${t.ticket_id}`,
                type: row?.ticket_type ?? '',
                quantity: t.quantity,
                lineTotalMUR:
                  unit != null && !Number.isNaN(unit) ? unit * t.quantity : undefined,
              }
            })
          : []

      const qrPayload = {
        v: 1 as const,
        bookingId: booking.id,
        ref: `TICKET-${booking.id}`,
        status: booking.status,
        customer: {
          id: userProfile?.id,
          firstName: userProfile?.first_name ?? '',
          lastName: userProfile?.last_name ?? '',
          email: userProfile?.email ?? email,
        },
        concertName: booking.concertName,
        location: booking.concertLocation ?? null,
        tickets: ticketLines,
        totalMUR: booking.totalMUR,
        issuedAt: new Date().toISOString(),
      }

      const qrDataUrl = await QRCode.toDataURL(JSON.stringify(qrPayload), {
        errorCorrectionLevel: 'M',
        margin: 1,
        width: 900,
      })

      const [template, qrImg] = await Promise.all([
        loadImage(TICKET_TEMPLATE_PATH),
        loadImage(qrDataUrl),
      ])

      const w = template.naturalWidth
      const h = template.naturalHeight
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas not supported')

      ctx.drawImage(template, 0, 0)

      const pad = Math.max(12, Math.round(Math.min(w, h) * 0.028))
      const qrSize = Math.min(Math.round(Math.min(w, h) * 0.22), 640)
      const qrX = w - qrSize - pad - 78
      const qrY = h - qrSize - pad - 135

      ctx.fillStyle = 'rgba(255,255,255,0.92)'
      const bx = qrX - pad * 0.35
      const by = qrY - pad * 0.35
      const bw = qrSize + pad * 0.7
      const bh = qrSize + pad * 0.7
      ctx.fillRect(bx, by, bw, bh)

      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize)

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png', 1),
      )
      if (!blob) throw new Error('Could not build ticket image')
      triggerPngDownload(blob, `Ticket-${booking.id}.png`)
    } catch (e) {
      console.error(e)
      window.alert('Could not download ticket. Please try again.')
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="trippy-dash-title mb-0">My Tickets</h2>
        <div className="trippy-dash-pills" role="group" aria-label="Filter by status">
          {(['All', 'Paid', 'Unpaid'] as const).map((status) => {
            const active = statusFilter === status
            const pillClass =
              status === 'All'
                ? ''
                : status === 'Paid'
                  ? 'trippy-dash-pill--success'
                  : 'trippy-dash-pill--danger'
            return (
              <button
                key={status}
                type="button"
                className={`trippy-dash-pill ${pillClass} ${active ? 'is-active' : ''}`}
                onClick={() => {
                  setStatusFilter(status)
                  setCurrentPage(1)
                }}
              >
                {status}
              </button>
            )
          })}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5 trippy-dash-panel">
          <Spinner animation="border" role="status" />
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-5 trippy-dash-empty trippy-dash-panel">
          <p className="mb-0">
            No tickets <FaTicketAlt className="mx-2" aria-hidden /> yet — start booking your favorite events.
          </p>
        </div>
      ) : (
        <>
          <div className="row">
            {paginatedBookings.map((booking) => (
              <div className="col-12 mb-4" key={booking.id}>
                <div className="trippy-dash-ticket">
                    <div className="row g-3 align-items-center">
                      <div className="col-md-3">
                        {booking.frontImage && (
                          <img
                            src={booking.frontImage}
                            alt=""
                            className="img-fluid w-100"
                            style={{
                              maxHeight: window.innerWidth < 576 ? 220 : 180,
                              objectFit: window.innerWidth < 576 ? 'contain' : 'cover',
                            }}
                          />
                        )}
                      </div>
                      <div className="col-md-9">
                        <div className="d-flex justify-content-between flex-column flex-md-row align-items-start gap-3">
                          <div className="flex-grow-1">
                            <h3 className="trippy-dash-event-title mb-2">
                              <FaTicketAlt className="me-2" aria-hidden /> {booking.concertName}
                            </h3>
                            <p className="mb-1 text-muted small">
                              <FaLocationPin className="me-2" aria-hidden />
                              <span>{booking.concertLocation || 'Unknown Location'}</span>
                            </p>

                            <p className="mb-1 text-muted small">
                              <FaMoneyBillWave className="me-2" aria-hidden />
                              <span>{booking.price}</span>
                            </p>

                            <p className="mb-0">
                              <FaFileInvoice className="me-2 text-muted" aria-hidden />
                              <span
                                className={`badge px-3 py-2 rounded-pill ${
                                  booking.status === 'Paid' ? 'trippy-dash-badge-paid' : 'trippy-dash-badge-unpaid'
                                }`}
                              >
                                {booking.status}
                              </span>
                            </p>
                          </div>
                          <div className="text-md-end">
                            {booking.status === 'Paid' ? (
                              <button
                                type="button"
                                className="trippy-dash-btn trippy-cta-frost trippy-cta-frost--compact"
                                onClick={() => downloadTicket(booking)}
                                disabled={downloadingId === booking.id}
                              >
                                {downloadingId === booking.id ? 'Downloading...' : 'Download ticket'}
                              </button>
                            ) : (
                              <span className="text-muted fst-italic small" style={{ maxWidth: '22rem', display: 'inline-block' }}>
                                Awaiting admin approval — your ticket will be available once payment is confirmed. If you&apos;ve already paid, allow some time for processing.
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4 trippy-dash-pagination">
              <Pagination>
                <Pagination.Prev
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => changePage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );

};

export default MyBookings;
