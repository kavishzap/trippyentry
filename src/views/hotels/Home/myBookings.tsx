import { useState } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
import jsPDF from 'jspdf';

type Booking = {
  id: number;
  title: string;
  price: string;
  location: string;
  status: 'Paid' | 'Unpaid';
};

const MyBookings = () => {
  const bookings: Booking[] = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    title: `Booking #${i + 1}`,
    price: `${(100 + i * 10).toFixed(2)} MUR`,
    location: 'Ocean View Resort',
    status: i % 2 === 0 ? 'Paid' : 'Unpaid',
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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

  const downloadTicket = (booking: Booking) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Booking Ticket', 20, 20);

    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking.id}`, 20, 40);
    doc.text(`Title: ${booking.title}`, 20, 50);
    doc.text(`Price: ${booking.price}`, 20, 60);
    doc.text(`Location: ${booking.location}`, 20, 70);
    doc.text(`Status: ${booking.status}`, 20, 80);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 90);

    doc.save(`Booking-${booking.id}.pdf`);
  };

  return (
    <div>
      <h4 className="mb-4">My Bookings</h4>
      <div className="row">
        {paginatedBookings.map((booking) => (
          <div className="col-12 mb-4" key={booking.id}>
            <Card className="shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <Card.Title>{booking.title}</Card.Title>
                  <Card.Text className="mb-1"><strong>Price:</strong> {booking.price}</Card.Text>
                  <Card.Text className="mb-1"><strong>Location:</strong> {booking.location}</Card.Text>
                  <Card.Text className="mb-0">
                    <strong>Status:</strong>{' '}
                    <span className={booking.status === 'Paid' ? 'text-success' : 'text-danger'}>
                      {booking.status}
                    </span>
                  </Card.Text>
                </div>

                {booking.status === 'Paid' ? (
                  <Button
                    variant="success"
                    className="mt-3 mt-md-0"
                    onClick={() => downloadTicket(booking)}
                  >
                    Download Ticket
                  </Button>
                ) : (
                  <div className="mt-3 mt-md-0 text-muted">
                    Please wait while processing...
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  );
};

export default MyBookings;
