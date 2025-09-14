import { useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Spinner } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight, FaSliders } from 'react-icons/fa6';
import { useToggle } from '@/hooks';
import { supabase } from '@/lib/supabaseClient';
import HotelListCard from './HotelListCard';
import HotelListFilter from './HotelListFilter';

type Concert = {
  id: number;
  concert_name: string;
  concert_date: string;
  concert_location_name: string;
  concert_image: string;
  front_image: string;
  price: number;
  minTicketPrice?: number;
};

type Filters = { priceRange?: string[] };

const ConcertLists = () => {
  const { isOpen, toggle } = useToggle();
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({});

  const concertsPerPage = 4;

  useEffect(() => {
    const fetchConcerts = async () => {
      setLoading(true);
      const { data: concertsData, error: concertsError } = await supabase
        .from('concerts')
        .select('*');

      if (concertsError) {
        console.error('Error fetching concerts:', concertsError.message);
        setLoading(false);
        return;
      }

      const enriched = await Promise.all(
        (concertsData ?? []).map(async (concert) => {
          const { data: ticket } = await supabase
            .from('tickets')
            .select('price')
            .eq('concert_id', concert.id)
            .order('price', { ascending: false })
            .limit(1)
            .single();

          return { ...concert, minTicketPrice: ticket?.price ?? 0 };
        })
      );

      setConcerts(enriched);
      setLoading(false);
    };

    fetchConcerts();
  }, []);

  // --- Robust price-range parsing (handles "Up to Rs 500", "Rs 1,000 – Rs 1,500", "Rs 2000+")
  const parsePriceRange = (label: string): { min?: number; max?: number } => {
    const s = label.toLowerCase();
    const nums = (label.match(/[\d,]+/g) || []).map((n) => parseInt(n.replace(/,/g, ''), 10));
    if (s.includes('up to') && nums[0] != null) return { max: nums[0] };
    if (s.includes('+') && nums[0] != null) return { min: nums[0] };
    if (nums.length >= 2) return { min: nums[0], max: nums[1] };
    return {};
  };

  const filteredConcerts = useMemo(() => {
    if (!filters.priceRange?.length) return concerts;

    return concerts.filter((c) => {
      const price = c.minTicketPrice ?? 0;
      return filters.priceRange!.some((label) => {
        const { min, max } = parsePriceRange(label);
        if (min != null && max != null) return price > min && price <= max;
        if (min != null) return price > min;
        if (max != null) return price <= max;
        return true;
      });
    });
  }, [concerts, filters]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredConcerts.length / concertsPerPage));
  const pageStart = (currentPage - 1) * concertsPerPage;
  const paginatedConcerts = filteredConcerts.slice(pageStart, pageStart + concertsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="pt-0 mb-6">
      <Container>
        {/* Top bar */}
        <Row className="align-items-center mb-3">
          <Col xs={12} md className="mb-2 mb-md-0">
            <div className="results-bar">
              <strong>{filteredConcerts.length}</strong> result{filteredConcerts.length === 1 ? '' : 's'}
              {filters.priceRange?.length ? (
                <span className="ms-2 text-secondary small">({filters.priceRange.length} price filter{filters.priceRange.length > 1 ? 's' : ''})</span>
              ) : null}
            </div>
          </Col>
          <Col xs="auto" className="ms-md-auto">
            <Button onClick={toggle} variant="outline-primary" className="mb-0 d-xl-none">
              <FaSliders className="me-1" /> Show filters
            </Button>
          </Col>
        </Row>

        <Row>
          {/* Sidebar filter */}
          <Col xl={4} xxl={3}>
            <div className="d-none d-xl-block sticky-sidebar">
              <HotelListFilter onApplyFilter={setFilters} />
            </div>

            {/* Mobile filter drawer */}
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
                <h5 className="offcanvas-title mb-0" id="offcanvasSidebarLabel">Filters</h5>
              </OffcanvasHeader>
              <OffcanvasBody className="flex-column p-3 p-xl-0">
                <HotelListFilter onApplyFilter={(f) => { setFilters(f); toggle(); }} />
              </OffcanvasBody>
            </Offcanvas>
          </Col>

          {/* Results list */}
          <Col xl={8} xxl={9}>
            <div className="vstack gap-4">
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : paginatedConcerts.length ? (
                paginatedConcerts.map((concert) => <HotelListCard key={concert.id} hotel={concert} />)
              ) : (
                <div className="empty-state text-center p-5 rounded-3 border">
                  <h5 className="mb-1">No events match these filters</h5>
                  <p className="text-secondary mb-3">Try clearing some filters to see more results.</p>
                  <Button variant="outline-secondary" onClick={() => setFilters({})}>Clear filters</Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="d-flex justify-content-center" aria-label="navigation">
                  <ul className="pagination pagination-modern d-flex flex-wrap justify-content-center gap-2 mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => goToPage(currentPage - 1)} aria-label="Previous">
                        <FaAngleLeft />
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <li key={n} className={`page-item ${currentPage === n ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => goToPage(n)}>{n}</button>
                      </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => goToPage(currentPage + 1)} aria-label="Next">
                        <FaAngleRight />
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* UI polish */}
      <style>{`
        .results-bar { font-size: .95rem; }
        .sticky-sidebar { position: sticky; top: 88px; }

        .empty-state {
          background: var(--panel-bg, var(--bs-body-bg));
          border-color: var(--panel-border, var(--bs-border-color-translucent)) !important;
        }

        /* Modern compact pagination */
        .pagination-modern .page-link {
          border-radius: .6rem;
          min-width: 40px;
          text-align: center;
          border-color: var(--bs-border-color-translucent);
        }
        .pagination-modern .page-item.active .page-link {
          background: var(--bs-primary);
          border-color: var(--bs-primary);
          color: #fff;
        }
      `}</style>
    </section>
  );
};

export default ConcertLists;
