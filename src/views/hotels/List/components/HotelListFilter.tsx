import { useRef, useState } from "react";
import { CardBody, Col, Button, Row } from "react-bootstrap";
import { useToggle } from "@/hooks";
import { currency } from "@/states";

interface HotelListFilterProps {
  onApplyFilter: (filters: { priceRange?: string[] }) => void;
}

const PRICE_OPTIONS = [
  { id: "priceRange1", label: `Up to ${currency} 500` },
  { id: "priceRange2", label: `${currency} 500 – ${currency} 1,000` },
  { id: "priceRange3", label: `${currency} 1,000 – ${currency} 1,500` },
  { id: "priceRange4", label: `${currency} 1,500 – ${currency} 2,000` },
  { id: "priceRange5", label: `${currency} 2,000+` },
];

const HotelListFilter = ({ onApplyFilter }: HotelListFilterProps) => {
  useToggle(); // (kept if you use it elsewhere)
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCount, setSelectedCount] = useState(0);

  const syncSelectedCount = () => {
    if (!formRef.current) return;
    const checked = formRef.current.querySelectorAll<HTMLInputElement>(
      'input[name="priceRange"]:checked'
    );
    setSelectedCount(checked.length);
  };

  const handleClearAll = () => {
    if (!formRef.current) return;
    const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((cb) => (cb.checked = false));
    setSelectedCount(0);
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const selected: { priceRange?: string[] } = {};
    const priceFilters = data.getAll("priceRange") as string[];
    if (priceFilters.length > 0) selected.priceRange = priceFilters;

    onApplyFilter(selected);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleFilter}
      onChange={syncSelectedCount}
      className="filter-card rounded-3"
      role="form"
      aria-labelledby="filter-heading"
    >
      {/* Price Range */}
      <CardBody className="rounded-0 p-4 border-0">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 id="filter-heading" className="mb-0 fw-semibold">
            Price Range
          </h5>
          <small className="text-secondary">{selectedCount} selected</small>
        </div>

        <fieldset className="m-0 p-0 border-0">
          <legend className="visually-hidden">Filter by price range</legend>

          {/* Pills grid */}
          <div className="pill-grid">
            {PRICE_OPTIONS.map(({ id, label }) => (
              <div key={id} className="pill-item">
                <input
                  className="btn-check"
                  type="checkbox"
                  id={id}
                  name="priceRange"
                  value={label}
                  autoComplete="off"
                />
                <label
                  className="filter-pill btn btn-outline-secondary w-100"
                  htmlFor={id}
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </CardBody>

      {/* Footer Buttons */}
      <CardBody className="rounded-0 rounded-bottom p-3 pt-0 border-0">
        <Row className="g-2">
          <Col xs={6}>
            <Button
              variant="outline-secondary"
              className="w-100"
              type="button"
              onClick={handleClearAll}
              disabled={selectedCount === 0}
              aria-disabled={selectedCount === 0}
            >
              Clear
            </Button>
          </Col>
          <Col xs={6}>
            <Button variant="primary" type="submit" className="w-100">
              Filter
            </Button>
          </Col>
        </Row>
      </CardBody>

      {/* Local styles */}
      <style>{`
  .filter-card {
    background: var(--panel-bg, var(--bs-body-bg));
    border: 1px solid var(--panel-border, var(--bs-border-color-translucent));
    box-shadow: var(--panel-shadow, 0 12px 28px rgba(0,0,0,.08));
    color: inherit;
    transition: box-shadow .2s ease, transform .2s ease, border-color .2s ease;
    overflow: hidden; /* ✅ keep all content inside rounded card */
  }
  .filter-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 36px rgba(0,0,0,.12);
    border-color: color-mix(in srgb, var(--panel-border, rgba(0,0,0,.1)) 40%, transparent);
  }

  /* Pills grid: auto-fit columns when there is space; otherwise single column */
  .pill-grid {
    display: grid;
    gap: .6rem;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* ✅ responsive, no overflow */
  }

  /* Prevent intrinsic width overflow */
  .pill-item { position: relative; min-width: 0; }
  .btn-check + .filter-pill { width: 100%; }
  .filter-pill {
    border-radius: .75rem;
    padding: .6rem .75rem;
    font-weight: 600;
    border-color: var(--bs-border-color-translucent);
    color: inherit;
    background: var(--pill-bg, transparent);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: normal;    /* ✅ allow wrap */
    text-wrap: balance;     /* nice wrapping where supported */
    line-height: 1.25;
    min-width: 0;           /* ✅ allow shrink within grid track */
    transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease, background .12s ease;
  }
  .filter-pill:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(0,0,0,.06);
    border-color: color-mix(in srgb, var(--bs-border-color-translucent) 50%, transparent);
  }

  /* Checked state */
  .btn-check:checked + .filter-pill {
    background: color-mix(in srgb, var(--bs-primary) 10%, transparent);
    border-color: color-mix(in srgb, var(--bs-primary) 40%, var(--bs-border-color-translucent));
    color: inherit;
  }
  .btn-check:focus + .filter-pill,
  .filter-pill:focus {
    outline: none;
    box-shadow: 0 0 0 .15rem color-mix(in srgb, var(--bs-primary) 25%, transparent);
  }

  /* Theme tokens */
  :where([data-bs-theme="light"]) .filter-card {
    --panel-bg: #fff;
    --panel-border: rgba(0,0,0,.06);
    --panel-shadow: 0 12px 28px rgba(0,0,0,.08);
    --pill-bg: #fff;
  }
  :where([data-bs-theme="dark"]) .filter-card {
    --panel-bg: #0b1220;
    --panel-border: rgba(255,255,255,.08);
    --panel-shadow: 0 18px 48px rgba(0,0,0,.55);
    --pill-bg: rgba(255,255,255,.03);
  }
`}</style>
    </form>
  );
};

export default HotelListFilter;
