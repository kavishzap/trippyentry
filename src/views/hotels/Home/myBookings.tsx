
import { useEffect, useState } from 'react';
import { Card, Button, Pagination, Spinner } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { supabase } from '@/lib/supabaseClient';

type Booking = {
  tickets: boolean;
  id: number;
  title: string;
  price: string;
  concertName: string;
  status: 'Paid' | 'Unpaid';
};

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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

    // Get user profile by email
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

    const userId = userProfile.id;

    // Get bookings for this user
    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('userid', userId)
      .order('id', { ascending: true });

    if (bookingError || !bookingData) {
      console.error('Error fetching bookings:', bookingError?.message);
      setLoading(false);
      return;
    }

    const bookingsWithConcerts: Booking[] = await Promise.all(
      bookingData.map(async (b) => {
        let concertName = 'Unknown Concert';

        if (b.concertid) {
          const { data: concertData, error: concertError } = await supabase
            .from('concerts')
            .select('*')
            .eq('id', b.concertid)
            .single();

          if (concertData?.concert_name) {
            concertName = concertData.concert_name;
          } else if (concertError) {
            console.warn(`Error fetching concert for booking ${b.id}`, concertError.message);
          }
        }

        return {
          id: b.id,
          title: `Booking #${b.id}`,
          price: `${Number(b.total || 0).toFixed(2)} MUR`,
          concertName,
          status: b.status === 'Paid' ? 'Paid' : 'Unpaid',
          tickets: b.tickets ?? false, // Add this line to include the tickets property
        };
      })
    );

    setBookings(bookingsWithConcerts);
    setLoading(false);
  };


  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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

    // 🌟 Main layout padding
    const paddingX = 20;
    let cursorY = 20;

    // 🎟 Decorative left band
    doc.setFillColor(0, 180, 180);
    doc.rect(10, 10, 5, 180, 'F');

    // 🔳 Border
    doc.setDrawColor(0, 180, 180);
    doc.setLineWidth(1.2);
    doc.roundedRect(10, 10, width - 20, 180, 5, 5, 'S');

    // 🎫 Booking Ref
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Booking Ref: #${booking.id}`, paddingX, cursorY);
    cursorY += 8;

    // 🖼️ Concert image
    const concertImageBase64 = concert?.concert_image || '';
    if (concertImageBase64) {
      doc.setFillColor(255, 255, 255);
      doc.circle(paddingX + 25, cursorY + 25, 25, 'F');
      doc.addImage(concertImageBase64, 'PNG', paddingX, cursorY, 50, 50);
    }

    // 🎵 Concert name (wrapped)
    const title = concert?.concert_name || 'Event Ticket';
    const titleLines = doc.splitTextToSize(title.toUpperCase(), 120);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(titleLines, 80, cursorY + 10);
    cursorY += 60;

    // 👤 Customer Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Customer: ${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`, paddingX, cursorY);
    cursorY += 6;
    doc.text(`Email: ${userProfile?.email || email}`, paddingX, cursorY);
    cursorY += 10;

    // 🎟 Ticket Summary
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Tickets', paddingX, cursorY);
    cursorY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    if (booking.tickets && Array.isArray(booking.tickets)) {
      for (const item of booking.tickets) {
        const name = ticketData?.find(t => t.id === item.ticket_id)?.ticket_name || `Ticket ID ${item.ticket_id}`;
        doc.text(`• ${name} — ${item.quantity}`, paddingX + 5, cursorY);
        cursorY += 6;
      }
    }

    cursorY += 4;

    // 🗓️ Concert Details
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Event Details', paddingX, cursorY);
    cursorY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Date: ${concert?.concert_date || '-'}`, paddingX + 5, cursorY);
    cursorY += 6;
    doc.text(`Time: ${concert?.concert_start_time || '-'} - ${concert?.concert_end_time || '-'}`, paddingX + 5, cursorY);
    cursorY += 6;
    doc.text(`Venue: ${concert?.concert_location_name || '-'}, Mauritius`, paddingX + 5, cursorY);
    cursorY += 10;

    // 💰 Total
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(`Total: ${booking.price}`, paddingX, cursorY);
    cursorY += 12;

    // 🔻 Separator
    doc.setLineDashPattern([1.5, 1.5], 0);
    doc.line(paddingX, cursorY, width - paddingX, cursorY);
    doc.setLineDashPattern([], 0);
    cursorY += 10;

    // 🧾 Footer / Branding
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('zeko', paddingX, cursorY);
    cursorY += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Hotline: +230 5252 8233`, paddingX, cursorY);
    cursorY += 5;
    doc.text(`Email: customers@ticketbox.mu`, paddingX, cursorY);
    cursorY += 5;
    doc.text(`Website: www.ticketbox.mu`, paddingX, cursorY);
    cursorY += 5;
    doc.text(`Please arrive at least 30 minutes before start time.`, paddingX, cursorY);

    doc.save(`Ticket-${booking.id}.pdf`);
  };
  return (
    <div>
      <h4 className="mb-4">My Bookings</h4>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-5 text-muted">
          You have no bookings yet.
        </div>
      ) : (
        <>
          <div className="row">
            {paginatedBookings.map((booking) => (
              <div className="col-12 mb-4" key={booking.id}>
                <Card className="shadow-sm">
                  <Card.Body className="d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                      <Card.Title>{booking.title}</Card.Title>
                      <Card.Text className="mb-1"><strong>Price:</strong> {booking.price}</Card.Text>
                      <Card.Text className="mb-1"><strong>Concert:</strong> {booking.concertName}</Card.Text>
                      <Card.Text className="mb-0">
                        <strong>Status:</strong>{' '}
                        <span className={booking.status === 'Paid' ? 'text-success' : 'text-danger'}>
                          {booking.status}
                        </span>
                      </Card.Text>
                    </div>
                    <Button
                      variant="success"
                      className="mt-3 mt-md-0"
                      onClick={() => downloadTicket(booking)}
                    >
                      Download Ticket
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  className="mx-1"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    className="mx-1"
                    active={i + 1 === currentPage}
                    onClick={() => changePage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  className="mx-1"
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
