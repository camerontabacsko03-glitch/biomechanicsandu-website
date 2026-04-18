export default function ExerciseCard({ exercise, isMember }) {
  const locked = exercise.isPro && !isMember;

  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(180deg, rgba(17,24,39,0.96) 0%, rgba(15,23,42,0.98) 100%)",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 20px 50px rgba(0,0,0,0.24)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={exercise.thumbnail}
          alt={exercise.name}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            display: "block",
            filter: locked ? "brightness(0.45)" : "brightness(0.92)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.02) 0%, rgba(2,6,23,0.12) 55%, rgba(2,6,23,0.4) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            padding: "7px 12px",
            borderRadius: "999px",
            background: "rgba(2,6,23,0.72)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#dbeafe",
            fontSize: "0.78rem",
            fontWeight: "700",
            letterSpacing: "0.03em",
            backdropFilter: "blur(8px)",
          }}
        >
          {exercise.category}
        </div>

        {locked && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              background: "rgba(2,6,23,0.8)",
              color: "white",
              padding: "7px 12px",
              borderRadius: "999px",
              fontSize: "0.78rem",
              fontWeight: "700",
              border: "1px solid rgba(96,165,250,0.18)",
              backdropFilter: "blur(8px)",
            }}
          >
            🔒 Premium
          </div>
        )}
      </div>

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3
          style={{
            margin: "0 0 10px",
            fontSize: "1.22rem",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
          }}
        >
          {exercise.name}
        </h3>

        {exercise.bias && (
          <div
            style={{
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "rgba(96,165,250,0.12)",
                border: "1px solid rgba(96,165,250,0.2)",
                color: "#dbeafe",
                fontSize: "0.82rem",
                fontWeight: "700",
              }}
            >
              Focus: {exercise.bias}
            </span>
          </div>
        )}

        <p
          style={{
            margin: "0 0 12px",
            color: "#cbd5e1",
            fontSize: "0.95rem",
            lineHeight: "1.6",
          }}
        >
          {exercise.description}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          {exercise.muscles.map((muscle) => (
            <span
              key={muscle}
              style={{
                padding: "7px 10px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#dbeafe",
                fontSize: "0.82rem",
                fontWeight: "600",
              }}
            >
              {muscle}
            </span>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
          }}
        >
          <div
            style={{
              marginBottom: "16px",
              padding: "12px 14px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p
              style={{
                margin: "0 0 5px",
                color: "#94a3b8",
                fontSize: "0.76rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: "700",
              }}
            >
              Equipment
            </p>

            <p
              style={{
                margin: 0,
                color: "#f8fafc",
                fontSize: "0.95rem",
                fontWeight: "600",
              }}
            >
              {exercise.equipment}
            </p>
          </div>

          {locked ? (
            <a
              href="/#pricing"
              style={{
                display: "block",
                width: "100%",
                padding: "13px 16px",
                borderRadius: "14px",
                background: "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                fontWeight: "700",
                fontSize: "0.95rem",
                textAlign: "center",
                textDecoration: "none",
                boxSizing: "border-box",
                boxShadow: "0 12px 30px rgba(37,99,235,0.28)",
              }}
            >
              Unlock Full Access
            </a>
          ) : (
            <button
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                fontWeight: "700",
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              View Exercise
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
