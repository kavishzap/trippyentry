import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Container,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
} from "react-bootstrap";
import { FaAngleLeft, FaAngleRight, FaSliders } from "react-icons/fa6";
import { useToggle } from "@/hooks";
import { supabase } from "@/lib/supabaseClient";
import HotelListCard from "./HotelListCard";
import HotelListFilter from "./HotelListFilter";

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

/* ------------ Skeleton (list-style) ------------ */
const SkeletonListItem = () => (
  <div className="sk-card rounded-3 border p-3 d-flex gap-3 align-items-start flex-column flex-sm-row">
    <div className="sk-img skeleton rounded-3 flex-shrink-0" />
    <div className="flex-grow-1 w-100">
      <div className="skeleton sk-line sk-line-xl mb-2 rounded-2" />
      <div
        className="skeleton sk-line mb-2 rounded-2"
        style={{ width: "80%" }}
      />
      <div
        className="skeleton sk-line mb-2 rounded-2"
        style={{ width: "65%" }}
      />
      <div className="d-flex flex-wrap gap-2 mt-3">
        <div className="skeleton sk-chip rounded-2" />
        <div className="skeleton sk-chip rounded-2" />
        <div className="skeleton sk-chip rounded-2" />
      </div>
      <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between align-items-stretch align-items-sm-center mt-3">
        <div className="skeleton sk-price rounded-2" />
        <div className="skeleton sk-btn rounded-2" />
      </div>
    </div>
  </div>
);
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
        .from("concerts")
        .select("*");

      if (concertsError) {
        console.error("Error fetching concerts:", concertsError.message);
        setLoading(false);
        return;
      }

      const enriched = await Promise.all(
        (concertsData ?? []).map(async (concert) => {
          const { data: ticket } = await supabase
            .from("tickets")
            .select("price")
            .eq("concert_id", concert.id)
            .order("price", { ascending: false }) // keep your current choice
            .limit(1)
            .single();

          return { ...concert, minTicketPrice: ticket?.price ?? 0 };
        })
      );

      setConcerts(enriched.reverse());
      setLoading(false);
    };

    fetchConcerts();
  }, []);

  // Robust price-range parsing
  const parsePriceRange = (label: string): { min?: number; max?: number } => {
    const s = label.toLowerCase();
    const nums = (label.match(/[\d,]+/g) || []).map((n) =>
      parseInt(n.replace(/,/g, ""), 10)
    );
    if (s.includes("up to") && nums[0] != null) return { max: nums[0] };
    if (s.includes("+") && nums[0] != null) return { min: nums[0] };
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

  useEffect(() => setCurrentPage(1), [filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredConcerts.length / concertsPerPage)
  );
  const pageStart = (currentPage - 1) * concertsPerPage;
  const paginatedConcerts = filteredConcerts.slice(
    pageStart,
    pageStart + concertsPerPage
  );
  const SKELETON_COUNT = 2;
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
              <strong>{filteredConcerts.length}</strong> result
              {filteredConcerts.length === 1 ? "" : "s"}
              {filters.priceRange?.length ? (
                <span className="ms-2 text-secondary small">
                  ({filters.priceRange.length} price filter
                  {filters.priceRange.length > 1 ? "s" : ""})
                </span>
              ) : null}
            </div>
          </Col>
          <Col xs="auto" className="ms-md-auto">
            <Button
              onClick={toggle}
              variant="outline-primary"
              className="mb-0 d-xl-none"
            >
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
                <h5 className="offcanvas-title mb-0" id="offcanvasSidebarLabel">
                  Filters
                </h5>
              </OffcanvasHeader>
              <OffcanvasBody className="flex-column p-3 p-xl-0">
                <HotelListFilter
                  onApplyFilter={(f) => {
                    setFilters(f);
                    toggle();
                  }}
                />
              </OffcanvasBody>
            </Offcanvas>
          </Col>

          {/* Results list */}
          <Col xl={8} xxl={9}>
            <div className="vstack gap-4">
              {loading ? (
                <>
                  {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <SkeletonListItem key={i} />
                  ))}
                </>
              ) : paginatedConcerts.length ? (
                paginatedConcerts.map((concert) => (
                  <HotelListCard key={concert.id} hotel={concert} />
                ))
              ) : (
                <div className="empty-state text-center p-5 rounded-3 border">
                  <h5 className="mb-1">No events match these filters</h5>
                  <p className="text-secondary mb-3">
                    Try clearing some filters to see more results.
                  </p>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setFilters({})}
                  >
                    Clear filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && !loading && (
                <nav
                  className="d-flex justify-content-center"
                  aria-label="navigation"
                >
                  <ul className="pagination pagination-modern d-flex flex-wrap justify-content-center gap-2 mb-0">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => goToPage(currentPage - 1)}
                        aria-label="Previous"
                      >
                        <FaAngleLeft />
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (n) => (
                        <li
                          key={n}
                          className={`page-item ${
                            currentPage === n ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => goToPage(n)}
                          >
                            {n}
                          </button>
                        </li>
                      )
                    )}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => goToPage(currentPage + 1)}
                        aria-label="Next"
                      >
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

      {/* UI polish + skeleton styles */}
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

        /* ---------- Skeletons ---------- */
       /* ---------- Skeletons ---------- */
.sk-card {
  background: var(--panel-bg, var(--bs-body-bg));
  border-color: var(--panel-border, var(--bs-border-color-translucent)) !important;
}
.skeleton {
  position: relative;
  background: var(--sk-bg, rgba(0,0,0,.08));
  overflow: hidden;
}
.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-60%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent);
  animation: sk-shimmer 1.1s infinite;
}
@keyframes sk-shimmer { 100% { transform: translateX(60%); } }

/* default (≥576px) */
.sk-img   { width: 160px; height: 220px; }
.sk-line  { height: 14px; width: 92%; }
.sk-line-xl { height: 18px; width: 75%; }
.sk-chip  { width: 72px; height: 24px; }
.sk-price { width: 160px; height: 18px; }
.sk-btn   { width: 140px; height: 36px; }

/* phones */
@media (max-width: 575.98px) {
  .sk-img   { width: 100%; height: 190px; }   /* full-width poster on top */
  .sk-line, .sk-line-xl { width: 100% !important; }
  .sk-price { width: 50%; height: 16px; }     /* shrink price bar */
  .sk-btn   { width: 100%; height: 40px; }     /* full-width button */
}
:where([data-bs-theme="light"]) .skeleton { --sk-bg: #e9ecef; }
:where([data-bs-theme="dark"])  .skeleton { --sk-bg: #1f2732; }

      `}</style>
    </section>
  );
};

export default ConcertLists;
