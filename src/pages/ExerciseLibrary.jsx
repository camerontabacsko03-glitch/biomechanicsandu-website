import { useMemo, useState } from "react";
import ExerciseGrid from "../components/ExerciseGrid";
import exercises from "../data/exercises";
import { Link } from "react-router-dom";

export default function ExerciseLibrary() {
  const isMember = false;

  const categories = [
    "All",
    "Chest",
    "Back",
    "Shoulders",
    "Biceps",
    "Triceps",
    "Quads",
    "Hamstrings",
    "Glutes",
    "Calves",
    "Abs",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredExercises = useMemo(() => {
    if (selectedCategory === "All") return exercises;
    return exercises.filter(
      (exercise) => exercise.category === selectedCategory
    );
  }, [selectedCategory]);

  const freeExercises = filteredExercises.filter((exercise) => !exercise.isPro);
  const premiumExercises = filteredExercises.filter(
    (exercise) => exercise.isPro
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(96,165,250,0.12) 0%, rgba(2,6,23,0) 35%), linear-gradient(180deg, #020617 0%, #0f172a 45%, #111827 100%)",
        color: "white",
        padding: "56px 20px 80px",
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "32px",
          }}
        >
          <div style={{ marginBottom: "22px" }}>
            <Link to="/" className="btn btn-secondary">
              ← Back to Homepage
            </Link>
          </div>

          <p
            style={{
              color: "#60a5fa",
              textTransform: "uppercase",
              letterSpacing: "1.4px",
              fontWeight: "800",
              marginBottom: "14px",
              fontSize: "0.82rem",
            }}
          >
            Biomechanics & U
          </p>

          <h1
            style={{
              fontSize: "clamp(2.6rem, 5vw, 4.6rem)",
              lineHeight: "0.98",
              margin: "0 0 18px",
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            Exercise Library
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              maxWidth: "820px",
              fontSize: "1.08rem",
              lineHeight: "1.8",
              margin: 0,
            }}
          >
            Browse exercises by body part and explore movements selected for
            muscle growth, cleaner mechanics, and better long-term training.
            Free exercises give you a preview of the system, while premium
            access unlocks deeper exercise variations, more advanced coaching
            cues, and a complete biomechanics-based training library built for
            serious progress.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "20px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.08) 100%)",
              border: "1px solid rgba(96, 165, 250, 0.24)",
              borderRadius: "22px",
              padding: "24px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "10px",
                fontSize: "1.15rem",
              }}
            >
              Browse by Body Part
            </h2>

            <p
              style={{
                margin: 0,
                color: "#dbeafe",
                lineHeight: "1.7",
                fontSize: "0.98rem",
              }}
            >
              Filter the library by target muscle group to quickly find the
              exercises that match your training focus and current goals.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "22px",
              padding: "24px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                color: "#94a3b8",
                fontSize: "0.82rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "700",
              }}
            >
              Access Model
            </p>

            <p
              style={{
                margin: 0,
                color: "#e2e8f0",
                lineHeight: "1.7",
                fontSize: "0.98rem",
              }}
            >
              Free exercises are open to explore. Premium movements stay visible
              but locked, so users can see the value of the full coaching
              ecosystem before upgrading.
            </p>

            <p
              style={{
                margin: "14px 0 0",
                color: "#cbd5e1",
                lineHeight: "1.7",
                fontSize: "0.95rem",
              }}
            >
              This exercise library is constantly evolving with new movements,
              tutorial videos, and targeted variations. As the system grows,
              you’ll continue to gain access to more tools designed to improve
              execution, muscle development, and long-term training results.
            </p>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "22px",
            padding: "18px",
            marginBottom: "26px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.16)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "999px",
                    border: isActive
                      ? "1px solid rgba(96, 165, 250, 0.55)"
                      : "1px solid rgba(255,255,255,0.1)",
                    background: isActive
                      ? "linear-gradient(180deg, rgba(96,165,250,0.22) 0%, rgba(59,130,246,0.12) 100%)"
                      : "rgba(255,255,255,0.04)",
                    color: isActive ? "#dbeafe" : "#ffffff",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(96,165,250,0.08), 0 8px 24px rgba(37,99,235,0.14)"
                      : "none",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              fontSize: "0.95rem",
            }}
          >
            Showing:{" "}
            <span style={{ color: "#60a5fa", fontWeight: "700" }}>
              {selectedCategory === "All" ? "All Exercises" : selectedCategory}
            </span>
          </p>
        </div>

        <section style={{ marginBottom: "64px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontSize: "1.85rem",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Free Exercises
            </h2>

            <span
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#cbd5e1",
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              {freeExercises.length} available
            </span>
          </div>

          {freeExercises.length > 0 ? (
            <ExerciseGrid exercises={freeExercises} isMember={isMember} />
          ) : (
            <div
              style={{
                padding: "20px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#94a3b8",
                lineHeight: "1.6",
              }}
            >
              No free exercises in this category yet.
            </div>
          )}
        </section>

        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontSize: "1.85rem",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Premium Library
            </h2>

            <span
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                background: "rgba(96,165,250,0.08)",
                border: "1px solid rgba(96,165,250,0.16)",
                color: "#dbeafe",
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              {premiumExercises.length} locked
            </span>
          </div>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "20px",
              lineHeight: "1.7",
              maxWidth: "760px",
            }}
          >
            Unlock more targeted exercises for each body part, deeper
            biomechanics cues, and premium exercise variations.
          </p>

          {premiumExercises.length > 0 ? (
            <ExerciseGrid exercises={premiumExercises} isMember={isMember} />
          ) : (
            <div
              style={{
                padding: "20px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#94a3b8",
                lineHeight: "1.6",
              }}
            >
              No premium exercises in this category yet.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
