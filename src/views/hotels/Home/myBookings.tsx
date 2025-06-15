import { useEffect, useState } from 'react';
import { Card, Button, Pagination, Spinner } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { supabase } from '@/lib/supabaseClient';
import { FaTicketAlt, FaMicrophoneAlt, FaMoneyBillWave, FaFileInvoice } from 'react-icons/fa'

type Booking = {
  tickets: { ticket_id: number; quantity: number }[] | false;
  id: number;
  title: string;
  price: string;
  concertName: string;
  status: 'Paid' | 'Unpaid';
  concertImage?: string;
};

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Unpaid'>('All');
  const itemsPerPage = 5;

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
      .order('id', { ascending: true });

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
    const email = localStorage.getItem('zeko_username');
    if (!email) return;

    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('id, first_name, last_name, email')
      .eq('email', email)
      .single();

    const { data: concert } = await supabase
      .from('concerts')
      .select('concert_name, concert_location_name, concert_date, concert_start_time, concert_end_time, concert_image')
      .eq('concert_name', booking.concertName)
      .single();

    const { data: ticketData } = await supabase
      .from('tickets')
      .select('id, ticket_name');

    const doc = new jsPDF('p', 'mm', 'a4');
    const width = doc.internal.pageSize.getWidth();
    const margin = 15;
    let cursorY = margin;

    // Branding stripe
    doc.setFillColor(0, 180, 180);
    doc.rect(0, 0, width, 10, 'F');

    // Border
    doc.setDrawColor(0, 180, 180);
    doc.setLineWidth(1);
    doc.roundedRect(margin, margin, width - margin * 2, 265, 4, 4, 'S');

    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text(`🎟 Ticket Confirmation`, width / 2, cursorY + 10, { align: 'center' });

    cursorY += 20;

    // Booking ID
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Booking Ref: #${booking.id}`, margin + 5, cursorY);
    cursorY += 8;

    // Concert Image
    const imageSize = 50;
    const concertImageBase64 = concert?.concert_image || '';
    if (concertImageBase64) {
      doc.addImage(
        concertImageBase64,
        'PNG',
        margin + 5,
        cursorY,
        imageSize,
        imageSize,
        undefined,
        'FAST'
      );
    }

    // Concert title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const concertTitle = concert?.concert_name?.toUpperCase() || 'EVENT';
    const titleX = margin + imageSize + 10;
    const titleY = cursorY + 10;
    const wrappedTitle = doc.splitTextToSize(concertTitle, width - titleX - margin);
    doc.text(wrappedTitle, titleX, titleY);

    cursorY += imageSize + 10;

    // Customer Info
    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Details:', margin + 5, cursorY);
    cursorY += 6;

    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`, margin + 10, cursorY);
    cursorY += 5;
    doc.text(`Email: ${userProfile?.email || email}`, margin + 10, cursorY);
    cursorY += 10;

    // Tickets
    doc.setFont('helvetica', 'bold');
    doc.text('Tickets:', margin + 5, cursorY);
    cursorY += 6;

    doc.setFont('helvetica', 'normal');
    if (booking.tickets && Array.isArray(booking.tickets)) {
      booking.tickets.forEach((ticket) => {
        const name = ticketData?.find(t => t.id === ticket.ticket_id)?.ticket_name || `Ticket ID ${ticket.ticket_id}`;
        doc.text(`• ${name} — ${ticket.quantity}`, margin + 10, cursorY);
        cursorY += 5;
      });
    }

    cursorY += 8;
    doc.setDrawColor(180);
    doc.line(margin + 5, cursorY, width - margin - 5, cursorY); // divider
    cursorY += 8;

    // Event Info
    doc.setFont('helvetica', 'bold');
    doc.text('Event Details:', margin + 5, cursorY);
    cursorY += 6;

    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${concert?.concert_date || '-'}`, margin + 10, cursorY);
    cursorY += 5;
    doc.text(`Time: ${concert?.concert_start_time || '-'} - ${concert?.concert_end_time || '-'}`, margin + 10, cursorY);
    cursorY += 5;
    doc.text(`Venue: ${concert?.concert_location_name || '-'}, Mauritius`, margin + 10, cursorY);
    cursorY += 10;

    // Total
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Paid: ${booking.price}`, margin + 5, cursorY);
    cursorY += 12;

    // Footer
    doc.setDrawColor(180);
    doc.line(margin + 5, cursorY, width - margin - 5, cursorY); // divider
    cursorY += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 180, 180);
    doc.text('🎫 zeko | ticketbox.mu', margin + 5, cursorY);
    cursorY += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80);
    doc.text('Hotline: +230 5252 8233', margin + 5, cursorY);
    cursorY += 5;
    doc.text('Email: customers@ticketbox.mu', margin + 5, cursorY);
    cursorY += 5;
    doc.text('Website: www.ticketbox.mu', margin + 5, cursorY);
    cursorY += 5;
    doc.text('Please arrive at least 30 minutes before start time.', margin + 5, cursorY);

    doc.save(`Ticket-${booking.id}.pdf`);
  };


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
                            >
                              <FaFileInvoice className="me-2" /> Download
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
