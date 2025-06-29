import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FooterWithLinks from '../Home/components/FooterWithLinks'
import TopNavBar4 from '../Home/components/TopNavBar'
import { Container, Card, CardBody, Toast, ToastContainer } from 'react-bootstrap'

// import QRCode from 'react-qr-code'

const HotelDetails = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const [showToast, setShowToast] = useState(false)
    const accountNumber = '000452396956'
    const amount = Number(searchParams.get('amount')) || 0
    const invoiceParam = searchParams.get('invoiceId')
    const invoiceId = invoiceParam ? `INV-${invoiceParam}` : 'INV-UNKNOWN'

    useEffect(() => {
        window.scrollTo(0, 0)
        setShowToast(true)

        const timeout = setTimeout(() => {
            setShowToast(false)
        }, 8000)

        return () => clearTimeout(timeout)
    }, [])



    return (
        <>
            <TopNavBar4 />
            {/* Toast */}
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={8000}
                    autohide
                    style={{
                        backgroundColor: '#1c1c2e',
                        color: '#ffffff',
                        borderLeft: '4px solid #00e676',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        minWidth: '300px',
                    }}
                >
                    <Toast.Header
                        closeButton={false}
                        style={{
                            backgroundColor: 'transparent',
                            borderBottom: 'none',
                            color: '#00e676',
                            fontWeight: 600,
                        }}
                    >
                        <strong className="me-auto">Action Required</strong>
                    </Toast.Header>
                    <Toast.Body style={{ fontSize: '0.95rem', color: '#e0e0e0' }}>
                        Your booking is temporarily reserved. Please complete the payment within 30 minutes to avoid automatic cancellation.
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <main className="py-5">
                <Container className='mb-5'>
                    <Card className="shadow-sm">
                        <CardBody>
                            <h3 className="mb-4 justify-content-center text-center">Complete Payment to confirm booking</h3>
                            <h5 className="mb-4 justify-content-center text-center">And Go to My bookings in User Section to download your ticket</h5>
                            {/* <p className='mb-4 justify-content-center text-center'>To complete your booking, please follow these steps:</p> */}
                            {/* <div className="text-center mt-4">
                                <h5 className="mb-3">Scan this QR to Pay via Juice:</h5>
                                <div className="position-relative d-inline-block text-center">
                                    <div style={{ filter: 'blur(8px)', pointerEvents: 'none' }}>
                                        <QRCode value={juiceUrl} size={180} />
                                    </div>

                                    <div
                                        className="position-absolute top-50 start-50 translate-middle text-center"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '0.5rem',
                                            fontWeight: 'bold',
                                            color: '#333',
                                        }}
                                    >
                                        Coming Soon
                                    </div>
                                </div>

                            </div> */}

                            {/* OR Divider */}
                            {/* <div className="my-4 d-flex align-items-center">
                                <hr className="flex-grow-1" />
                                <span className="mx-3 text-muted fw-bold">OR</span>
                                <hr className="flex-grow-1" />
                            </div> */}

                            {/* Manual Bank Transfer Option */}
                            <div className="mb-4 d-flex justify-content-center">
                                <div className="text-center">
                                    <h5 className="mb-4">Pay Directly to MCB Account: </h5>
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <p className="fs-5">
                                                <strong>Bank:</strong> MCB (Mauritius Commercial Bank)
                                            </p>
                                        </li>
                                        <li>
                                            <p className="fs-5">
                                                <strong>Account Number:</strong>{' '}
                                                <span className="text-primary">{accountNumber}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p className="fs-5">
                                                <strong>Amount:</strong> Rs {amount}
                                            </p>
                                        </li>
                                        <li>
                                            <p className="fs-5">
                                                <strong>Description:</strong> {invoiceId}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center">
                                <div className="mt-4 alert alert-info text-center" style={{ maxWidth: '600px' }}>
                                    <strong>Note:</strong> After payment, please take a screenshot of your confirmation.
                                    Your booking will be confirmed within a few hours via mail or please call on{' '}
                                    <a href="tel:59182520" className="text-decoration-underline fw-semibold">59182520</a>{' '}
                                    to accelerate confirmation.
                                    <br />
                                    <strong>More payment options will be available soon.</strong>
                                </div>

                            </div>
                            <div className="text-center mt-4 d-flex justify-content-center gap-3 flex-wrap">
                                <Link to="/" className="btn btn-outline-primary">
                                    Go to Homepage
                                </Link>
                                <Link to="/userDashboard?tab=booking" className="btn btn-primary">
                                    View My Bookings
                                </Link>

                            </div>


                        </CardBody>
                    </Card>
                </Container>
            </main>

            <FooterWithLinks />

            <style
                dangerouslySetInnerHTML={{
                    __html: `
      html, body {
        overflow-x: hidden !important;
      }

      main {
        overflow-x: hidden;
        width: 100%;
        position: relative;
      }
    `,
                }}
            />
        </>
    )
}

export default HotelDetails
