import { useEffect, useState } from 'react';
import { Card, Button, Pagination, Spinner } from 'react-bootstrap';
import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import { supabase } from '@/lib/supabaseClient';
import { FaTicketAlt, FaMicrophoneAlt, FaMoneyBillWave, FaFileInvoice } from 'react-icons/fa'
import bannerImg from '@/assets/newImage/heroSection/Group 36.png';

const toBase64 = (url: string): Promise<string> =>
  fetch(url)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
    )

type Booking = {
  tickets: {
    ticket_name: string; ticket_id: number; quantity: number
  }[] | false;
  id: number;
  title: string;
  price: string;
  concertName: string;
  status: 'Paid' | 'Unpaid';
  concertImage?: string;
  created_at?: string;
};

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Unpaid'>('All');
  const itemsPerPage = 5;
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  useEffect(() => {
    fetchBookings();
  }, []);

  const hashString = async (input: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

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

        if (b.concertid) {
          const { data: concertData, error: concertError } = await supabase
            .from('concerts')
            .select('concert_name, concert_image')
            .eq('id', b.concertid)
            .single();

          if (concertData) {
            concertName = concertData.concert_name;
            concertImage = concertData.concert_image;
          } else if (concertError) {
            console.warn(`Error fetching concert for booking ${b.id}`, concertError.message);
          }
        }

        return {
          id: b.id,
          title: `Ticket#${b.id}`,
          price: `${Number(b.total || 0).toFixed(2)} MUR`,
          concertName,
          concertImage,
          status: b.status === 'Paid' ? 'Paid' : 'Unpaid',
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

    setDownloadingId(booking.id);
    try {
      const email = localStorage.getItem('zeko_username')
      if (!email) return

      const { data: userProfile } = await supabase
        .from('user_profiles')
        .select('first_name, last_name, email')
        .eq('email', email)
        .single()

      const { data: concert } = await supabase
        .from('concerts')
        .select('concert_name, concert_location_name, concert_date, concert_start_time, concert_end_time')
        .eq('concert_name', booking.concertName)
        .single()

      const doc = new jsPDF()
      let y = 20
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 15

      // Header
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('BOOKING VOUCHER', margin, y)

      y += 8
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(12)
      doc.text(`ORDER REFERENCE NO:  TICKET-${booking.id}`, margin, y)

      y += 6

      console.log('Booking created at:', booking.created_at)
      const orderDate = booking.created_at
        ? new Date(booking.created_at).toLocaleString('en-MU', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
        : 'N/A'

      doc.setFontSize(10)
      doc.text(`Order Date: ${orderDate}`, margin, y)

      y += 10
      doc.setDrawColor(200)
      doc.setLineWidth(0.5)
      doc.line(margin, y, pageWidth - margin, y)

      // Event title
      y += 10
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(0, 102, 204)
      doc.text(concert?.concert_name?.toUpperCase() || 'EVENT NAME', pageWidth / 2, y, { align: 'center' })

      // Customer Info
      y += 10
      doc.setTextColor(0)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Customer Details', margin, y)

      y += 8
      doc.setFont('helvetica', 'normal')
      doc.text(`Full Name: ${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`, margin, y)

      y += 6
      doc.text(`Email: ${userProfile?.email || email}`, margin, y)

      y += 8
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      if (booking.status === 'Paid') {
        doc.setTextColor(0, 150, 0) // green
        doc.text('STATUS OF INVOICE: PAID', margin, y)
      } else {
        doc.setTextColor(200, 0, 0) // red
        doc.text('STATUS OF INVOICE: UNPAID', margin, y)
      }
      doc.setTextColor(0) // reset text color


      // QR Code
      const rawQrValue = `TICKET-${booking.id}`;
      const hashedQrValue = await hashString(rawQrValue); // ✅ secure hash
      const qrDataUrl = await QRCode.toDataURL(hashedQrValue);
      doc.addImage(qrDataUrl, 'PNG', pageWidth - 50, y - 12, 30, 30)

      // Booking Details
      y += 12
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.text('Booking Details', margin, y)

      y += 8
      doc.setFont('helvetica', 'normal')
      doc.text(`Date: ${concert?.concert_date || '-'}`, margin, y)
      y += 6
      doc.text(`Start Time: ${concert?.concert_start_time || '-'}`, margin, y)
      doc.text(`End Time: ${concert?.concert_end_time || '-'}`, margin + 60, y)

      y += 6
      doc.text(`Location: ${concert?.concert_location_name || '-'}, Mauritius`, margin, y)

      // Tickets
      y += 10
      const { data: ticketData } = await supabase
        .from('tickets')
        .select('id, ticket_name')

      if (Array.isArray(booking.tickets)) {
        doc.setFont('helvetica', 'bold')
        doc.text('Tickets:', margin, y)
        y += 6

        // Table header
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.text('#', margin + 2, y)
        doc.text('Ticket Name', margin + 15, y)
        doc.text('Qty', margin + 120, y)
        y += 5
        doc.setDrawColor(180)
        doc.line(margin, y, pageWidth - margin, y)
        y += 4

        doc.setFont('helvetica', 'normal')
        booking.tickets.forEach((ticket, index) => {
          const ticketName = ticketData?.find(t => t.id === ticket.ticket_id)?.ticket_name || `ID ${ticket.ticket_id}`
          doc.text(String(index + 1), margin + 2, y)
          doc.text(ticketName, margin + 15, y)
          doc.text(String(ticket.quantity), margin + 120, y)
          y += 6
        })
      }

      // Notes
      y += 10
      doc.setFont('helvetica', 'bold')
      doc.text('Notes And Important Conditions:', margin, y)
      y += 6
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      const notes = [
        '• Please bring this voucher and proof of ID.',
        '• Any extra services not listed are payable at venue.',
        '• Valid for the date and ticket quantity booked.',
        '• Venue rules apply: timing, dress code, etc.',
        '• Zeko is not responsible for loss/damage of belongings.',
      ]
      notes.forEach((line) => {
        doc.text(line, margin + 2, y)
        y += 5
      })

      // Footer
      y += 5
      doc.setFontSize(10)
      doc.setTextColor(80)
      doc.text('Need Help? Call us at +230 5918 2520 or visit www.zeko.com', margin, y)

      const bannerBase64 = await toBase64(bannerImg)
      const pageHeight = doc.internal.pageSize.getHeight()
      const bannerHeight = 50 // or adjust based on image

      doc.addImage(
        bannerBase64,
        'PNG',
        margin,                        // X: align with other content
        pageHeight - bannerHeight - 10, // Y: 10px margin from bottom
        pageWidth - 2 * margin,        // width: full minus side margins
        bannerHeight
      )

      // Save PDF
      doc.save(`Ticket-${booking.id}.pdf`)
    } finally {
      setDownloadingId(null)
    }
  }
  return (
    <div>
      {/* Always show buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h4 className="mb-0">My Tickets</h4>
        <div className="d-flex gap-2">
          {['All', 'Paid', 'Unpaid'].map((status) => (
            <Button
              key={status}
              variant={
                status === 'All'
                  ? statusFilter === 'All' ? 'primary' : 'outline-primary'
                  : status === 'Paid'
                    ? statusFilter === 'Paid' ? 'success' : 'outline-success'
                    : statusFilter === 'Unpaid' ? 'danger' : 'outline-danger'
              }
              onClick={() => setStatusFilter(status as 'Paid' | 'Unpaid' | 'All')}
              className="fw-semibold"
            >
              {status}
            </Button>
          ))}
        </div>

      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-5 text-muted" style={{ fontSize: '1.25rem' }}>
          <p>No Tickets <FaTicketAlt className="me-2" />  Yet! Start booking your favorite events </p>
        </div>


      ) : (
        <>
          <div className="row">
            {paginatedBookings.map((booking) => (
              <div className="col-12 mb-4" key={booking.id}>
                <Card className="shadow-lg border-0 rounded-4 p-3 bg-light">
                  <Card.Body>
                    <div className="row g-3 align-items-center">
                      <div className="col-md-3">
                        {booking.concertImage && (
                          <img
                            src={booking.concertImage.startsWith('data:')
                              ? booking.concertImage
                              : `data:image/jpeg;base64,${booking.concertImage}`}
                            alt="Concert"
                            className="img-fluid rounded-3"
                            style={{ height: '180px', objectFit: 'cover', width: '100%' }}
                          />
                        )}
                      </div>
                      <div className="col-md-9">
                        <div className="d-flex justify-content-between flex-column flex-md-row align-items-start gap-3">
                          <div className="flex-grow-1">
                            <h5 className="fw-bold text-primary mb-2">
                              <FaTicketAlt className="me-2" /> {booking.title}
                            </h5>
                            <p className="mb-1">
                              <FaMicrophoneAlt className="me-2" />
                              <span className="text-dark">{booking.concertName}</span>
                            </p>
                            <p className="mb-1">
                              <FaMoneyBillWave className="me-2" />
                              <span className="text-dark">{booking.price}</span>
                            </p>
                            <p className="mb-0">
                              <FaFileInvoice className="me-2" />
                              <span
                                className={`badge ${booking.status === 'Paid' ? 'bg-success' : 'bg-danger'
                                  } px-3 py-1`}
                              >
                                {booking.status}
                              </span>
                            </p>
                          </div>
                          <div className="text-md-end">
                            <Button
                              variant="outline-primary"
                              className="fw-semibold px-4 py-2 rounded-pill"
                              onClick={() => downloadTicket(booking)}
                              disabled={downloadingId === booking.id}
                            >
                              {downloadingId === booking.id ? (
                                <>
                                  <Spinner size="sm" animation="border" className="me-2" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <FaFileInvoice className="me-2" /> Download
                                </>
                              )}
                            </Button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
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
