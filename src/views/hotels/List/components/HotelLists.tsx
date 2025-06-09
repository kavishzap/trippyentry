import { useToggle } from '@/hooks'
import { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Container,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
  Spinner,
} from 'react-bootstrap'
import { FaAngleLeft, FaAngleRight, FaSliders } from 'react-icons/fa6'
import HotelListCard from './HotelListCard'
import HotelListFilter from './HotelListFilter'
import { supabase } from '@/lib/supabaseClient' // Make sure this is setup

type Concert = {
  id: number
  concert_name: string
  concert_date: string
  concert_location_name: string
  concert_image: string
  price: number
}

const ConcertLists = () => {
  const { isOpen, toggle } = useToggle()
  const [concerts, setConcerts] = useState<Concert[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const concertsPerPage = 4

  useEffect(() => {
    fetchConcerts()
  }, [])

  const fetchConcerts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('concerts').select('*')
    if (error) {
      console.error('Error fetching concerts:', error.message)
    } else {
      setConcerts(data || [])
    }
    setLoading(false)
  }

  const totalPages = Math.ceil(concerts.length / concertsPerPage)
  const paginatedConcerts = concerts.slice(
    (currentPage - 1) * concertsPerPage,
    currentPage * concertsPerPage
  )

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <section className="pt-0 mb-6">
      <Container>
        <Row className="mb-4">
          <Col xs={12}>
            <div className="hstack gap-3 justify-content-between justify-content-md-end">
              <Button
                onClick={toggle}
                variant="primary-soft"
                className="btn-primary-check mb-0 d-xl-none"
              >
                <FaSliders className="me-1" /> Show filters
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xl={4} xxl={3}>
            <div className="d-none d-xl-block">
              <HotelListFilter />
            </div>
            <Offcanvas
              placement="end"
              show={isOpen}
              onHide={toggle}
              className="offcanvas-xl"
              tabIndex={-1}
              id="offcanvasSidebar"
              aria-labelledby="offcanvasSidebarLabel"
            >
              <OffcanvasHeader closeButton>
                <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
                  Advance Filters
                </h5>
              </OffcanvasHeader>
              <OffcanvasBody className="flex-column p-3 p-xl-0">
                <HotelListFilter />
              </OffcanvasBody>
            </Offcanvas>
          </Col>

          <Col xl={8} xxl={9}>
            <div className="vstack gap-4">
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                paginatedConcerts.map((concert) => (
                  <HotelListCard key={concert.id} hotel={concert} />
                ))
              )}

              {/* Pagination */}
              <nav className="d-flex justify-content-center" aria-label="navigation">
                <ul className="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                  <li className={`page-item mb-0 ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                      <FaAngleLeft />
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <li
                      key={pageNum}
                      className={`page-item mb-0 ${currentPage === pageNum ? 'active' : ''}`}
                    >
                      <button className="page-link" onClick={() => goToPage(pageNum)}>
                        {pageNum}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item mb-0 ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                      <FaAngleRight />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ConcertLists
