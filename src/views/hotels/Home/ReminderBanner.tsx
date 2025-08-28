const ReminderBanner = () => {
  return (
    <div
      className="w-100"
      style={{
        background: "linear-gradient(90deg, #3c3c3cff 0%, #3c3c3cff 100%)",
        color: "#fff",
        position: "sticky",
        top: 64,
        zIndex: 1031,
        overflow: "hidden", // 👈 important for animation clipping
      }}
    >
      <div
        className="container d-flex flex-column flex-md-row align-items-md-center gap-2 gap-md-3 py-2"
        style={{ maxWidth: 1140, overflow: "hidden" }}
      >
        <span
          className="scrolling-text"
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "scroll-left 12s linear infinite",
            fontWeight: 500,
          }}
        >
          <strong>Sam Garrett</strong> — Live in Mauritius,&nbsp;
          <strong>06 Sept</strong>. Please book tickets quickly.
        </span>
      </div>

      {/* Inline keyframes */}
      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ReminderBanner;
