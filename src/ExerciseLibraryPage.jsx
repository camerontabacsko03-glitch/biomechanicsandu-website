import React, { useEffect, useMemo, useState } from "react";
import { Search, Play, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const exercises = [
  {
    id: 1,
    title: "Goblet Squat",
    category: "Lower Body",
    level: "Beginner",
    focus: "Quad strength, trunk control, squat mechanics",
    cues: [
      "Keep ribs stacked over pelvis",
      "Sit down between the hips",
      "Drive through the full foot",
    ],
    description:
      "A foundational squat variation to build strength, coordination, and positional awareness.",
  },
  {
    id: 2,
    title: "Romanian Deadlift",
    category: "Lower Body",
    level: "Intermediate",
    focus: "Posterior chain, hip hinge mechanics",
    cues: [
      "Push hips back without rounding",
      "Keep the bar close to the body",
      "Feel tension in hamstrings",
    ],
    description:
      "A hinge-focused movement for glutes and hamstrings while reinforcing clean hip mechanics.",
  },
  {
    id: 3,
    title: "Split Squat",
    category: "Lower Body",
    level: "Beginner",
    focus: "Single-leg strength, balance, pelvic control",
    cues: [
      "Stay tall through the torso",
      "Control the back knee down",
      "Push evenly through the front foot",
    ],
    description:
      "Excellent for unilateral strength, joint control, and reducing side-to-side asymmetries.",
  },
  {
    id: 4,
    title: "Push-Up",
    category: "Upper Body",
    level: "Beginner",
    focus: "Upper body strength, trunk stiffness, scapular control",
    cues: [
      "Keep body in one straight line",
      "Lower under control",
      "Push the floor away at the top",
    ],
    description:
      "A classic bodyweight movement that develops pressing strength and full-body control.",
  },
  {
    id: 5,
    title: "Chest-Supported Row",
    category: "Upper Body",
    level: "Beginner",
    focus: "Upper back strength, scapular mechanics",
    cues: [
      "Pull elbows toward hips",
      "Avoid shrugging shoulders",
      "Pause briefly at the top",
    ],
    description:
      "A stable rowing variation that targets the upper back without excessive low back stress.",
  },
  {
    id: 6,
    title: "Dead Bug",
    category: "Core",
    level: "Beginner",
    focus: "Core control, trunk stability, pelvic positioning",
    cues: [
      "Keep lower back gently connected",
      "Exhale as you reach",
      "Move slowly and with control",
    ],
    description:
      "A core drill that teaches proper trunk control while coordinating arms and legs.",
  },
  {
    id: 7,
    title: "Side Plank",
    category: "Core",
    level: "Intermediate",
    focus: "Lateral core stability, shoulder support",
    cues: [
      "Keep hips lifted",
      "Stack shoulders and ribs",
      "Stay long through the body",
    ],
    description:
      "Builds lateral trunk strength and improves control through the shoulder and pelvis.",
  },
  {
    id: 8,
    title: "90/90 Hip Flow",
    category: "Mobility",
    level: "All Levels",
    focus: "Hip mobility, rotational control",
    cues: [
      "Stay upright through the torso",
      "Rotate from the hips",
      "Move with smooth control",
    ],
    description:
      "A mobility sequence that improves hip internal and external rotation while building control.",
  },
  {
    id: 9,
    title: "Wall Ankle Mobilization",
    category: "Mobility",
    level: "All Levels",
    focus: "Ankle mobility, squat depth support",
    cues: [
      "Keep heel down",
      "Drive knee forward with control",
      "Do not collapse arch",
    ],
    description:
      "A simple drill to improve ankle motion and support better movement in squats and lunges.",
  },
  {
    id: 10,
    title: "Band External Rotation",
    category: "Rehab / Correctives",
    level: "Beginner",
    focus: "Rotator cuff strength, shoulder control",
    cues: [
      "Keep elbow pinned to side",
      "Rotate without shrugging",
      "Move slowly and intentionally",
    ],
    description:
      "A controlled shoulder exercise to improve cuff strength and joint positioning.",
  },
  {
    id: 11,
    title: "Spanish Squat Hold",
    category: "Rehab / Correctives",
    level: "All Levels",
    focus: "Quad loading, knee-friendly strength work",
    cues: [
      "Sit back into the strap",
      "Keep torso upright",
      "Feel quads working hard",
    ],
    description:
      "A useful isometric option for building quad tolerance while managing knee discomfort.",
  },
  {
    id: 12,
    title: "Farmer Carry",
    category: "Performance",
    level: "Intermediate",
    focus: "Grip, trunk stiffness, gait integrity",
    cues: [
      "Stand tall",
      "Walk with controlled steps",
      "Do not let weights swing",
    ],
    description:
      "A powerful loaded carry for building real-world strength, posture, and total-body control.",
  },
];

const categories = [
  "All",
  "Upper Body",
  "Lower Body",
  "Core",
  "Mobility",
  "Rehab / Correctives",
  "Performance",
];

function ExerciseCard({ exercise, isMobile, isSmallMobile }) {
  return (
    <div
      className="glass-box"
      style={{
        borderRadius: isSmallMobile ? "22px" : "28px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.025) 100%)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
      }}
    >
      <div
        style={{
          position: "relative",
          height: isSmallMobile ? "180px" : isMobile ? "190px" : "210px",
          background:
            "radial-gradient(circle at top left, rgba(122,168,255,0.22) 0%, rgba(122,168,255,0.04) 32%, transparent 60%), linear-gradient(180deg, rgba(15,21,32,1) 0%, rgba(9,13,21,1) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            padding: isSmallMobile ? "7px 10px" : "8px 12px",
            borderRadius: "999px",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#ffffff",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
            maxWidth: isSmallMobile ? "140px" : "none",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {exercise.category}
        </div>

        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            padding: isSmallMobile ? "7px 10px" : "8px 12px",
            borderRadius: "999px",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#08111f",
            background: "#7aa8ff",
            border: "1px solid rgba(122,168,255,0.55)",
            maxWidth: isSmallMobile ? "110px" : "none",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {exercise.level}
        </div>

        <div
          style={{
            width: isSmallMobile ? "62px" : "74px",
            height: isSmallMobile ? "62px" : "74px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(122,168,255,0.14)",
            border: "1px solid rgba(122,168,255,0.3)",
            boxShadow: "0 0 30px rgba(122,168,255,0.18)",
          }}
        >
          <Play
            size={isSmallMobile ? 24 : 28}
            fill="currentColor"
            color="#dbe8ff"
          />
        </div>
      </div>

      <div
        style={{ padding: isSmallMobile ? "18px" : isMobile ? "22px" : "26px" }}
      >
        <h3
          style={{
            margin: "0 0 12px",
            fontSize: isSmallMobile ? "1.25rem" : "1.5rem",
            lineHeight: 1.25,
          }}
        >
          {exercise.title}
        </h3>

        <p
          style={{
            margin: "0 0 22px",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.82)",
            fontSize: isMobile ? "0.96rem" : "1rem",
          }}
        >
          {exercise.description}
        </p>

        <div style={{ marginBottom: "20px" }}>
          <div
            className="eyebrow"
            style={{ marginBottom: "8px", fontSize: "0.72rem" }}
          >
            Primary Focus
          </div>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.7,
              fontSize: isMobile ? "0.95rem" : "1rem",
            }}
          >
            {exercise.focus}
          </p>
        </div>

        <div style={{ marginBottom: "22px" }}>
          <div
            className="eyebrow"
            style={{ marginBottom: "10px", fontSize: "0.72rem" }}
          >
            Coaching Cues
          </div>

          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.9)",
              fontSize: isMobile ? "0.95rem" : "1rem",
            }}
          >
            {exercise.cues.map((cue, index) => (
              <li key={index}>{cue}</li>
            ))}
          </ul>
        </div>

        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 18px",
            borderRadius: "999px",
            background: "transparent",
            color: "#ffffff",
            border: "1px solid rgba(122,168,255,0.35)",
            fontWeight: 700,
            cursor: "pointer",
            width: isSmallMobile ? "100%" : "auto",
            justifyContent: "center",
          }}
        >
          View Exercise <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function ExerciseLibraryPage() {
  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = screenWidth <= 1024;
  const isMobile = screenWidth <= 768;
  const isSmallMobile = screenWidth <= 560;

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesCategory =
        activeCategory === "All" || exercise.category === activeCategory;

      const search = searchTerm.toLowerCase();
      const matchesSearch =
        exercise.title.toLowerCase().includes(search) ||
        exercise.category.toLowerCase().includes(search) ||
        exercise.focus.toLowerCase().includes(search) ||
        exercise.description.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="site">
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: isMobile ? "16px 16px 0" : "20px 20px 0",
        }}
      >
        <button
          onClick={() => navigate("/")}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(120,160,255,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(120,160,255,0.12)";
          }}
          style={{
            marginBottom: "16px",
            padding: isSmallMobile ? "10px 14px" : "10px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(120,160,255,0.25)",
            background: "rgba(120,160,255,0.12)",
            color: "#CFE0FF",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: isMobile ? "14px" : "15px",
            width: isSmallMobile ? "100%" : "auto",
          }}
        >
          ← Back to Homepage
        </button>
      </div>

      <section
        className="section"
        style={{
          paddingTop: isSmallMobile ? "46px" : isMobile ? "60px" : "88px",
          paddingBottom: isMobile ? "28px" : "36px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background:
            "radial-gradient(circle at top left, rgba(122,168,255,0.16) 0%, transparent 30%), linear-gradient(180deg, rgba(11,16,25,1) 0%, rgba(9,13,21,1) 100%)",
        }}
      >
        <div className="container">
          <div className="narrow" style={{ maxWidth: "900px" }}>
            <p className="eyebrow">Biomechanics &amp; U Movement Library</p>

            <h1
              style={{
                marginBottom: "18px",
                fontSize: isSmallMobile
                  ? "clamp(2rem, 10vw, 2.8rem)"
                  : undefined,
                lineHeight: isMobile ? 1.05 : undefined,
              }}
            >
              Learn the movements.
              <span style={{ display: "block", opacity: 0.72 }}>
                Train with more precision.
              </span>
            </h1>

            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.08rem",
                lineHeight: 1.8,
                maxWidth: "840px",
                opacity: 0.9,
                marginBottom: "0",
              }}
            >
              A premium exercise library built to help clients understand
              technique, improve execution, and move with greater confidence.
              Explore strength, mobility, corrective, and performance-based
              movements through a biomechanics-first lens.
            </p>
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{
          paddingTop: isMobile ? "24px" : "34px",
          paddingBottom: "30px",
        }}
      >
        <div className="container">
          <div
            className="glass-box"
            style={{
              padding: isSmallMobile ? "16px" : isMobile ? "18px" : "22px",
              borderRadius: isSmallMobile ? "22px" : "26px",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  position: "relative",
                  minWidth: isSmallMobile ? "100%" : "280px",
                  flex: "1 1 320px",
                  width: isSmallMobile ? "100%" : "auto",
                }}
              >
                <Search
                  size={18}
                  color="rgba(255,255,255,0.55)"
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />

                <input
                  type="text"
                  placeholder="Search exercises..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 44px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#ffffff",
                    fontSize: isMobile ? "16px" : "1rem",
                    outline: "none",
                  }}
                />
              </div>

              <div
                className="category-scroll"
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: isMobile ? "nowrap" : "wrap",
                  flex: "1 1 420px",
                  width: isSmallMobile ? "100%" : "auto",
                  overflowX: isMobile ? "auto" : "visible",
                  overflowY: "hidden",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  paddingBottom: isMobile ? "4px" : "0",
                }}
              >
                {categories.map((category) => {
                  const active = activeCategory === category;

                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      style={{
                        padding: isSmallMobile ? "10px 12px" : "10px 14px",
                        borderRadius: "999px",
                        border: active
                          ? "1px solid rgba(122,168,255,0.5)"
                          : "1px solid rgba(255,255,255,0.08)",
                        background: active
                          ? "rgba(122,168,255,0.14)"
                          : "rgba(255,255,255,0.04)",
                        color: active ? "#dbe8ff" : "#ffffff",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: isMobile ? "13px" : "14px",
                        flex: "0 0 auto",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <p
              style={{
                margin: 0,
                opacity: 0.76,
                fontSize: isMobile ? "14px" : "16px",
              }}
            >
              Showing{" "}
              <strong style={{ color: "#ffffff" }}>
                {filteredExercises.length}
              </strong>{" "}
              exercise{filteredExercises.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div
            className="card-grid"
            style={{
              gridTemplateColumns: isSmallMobile
                ? "1fr"
                : isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(320px, 1fr))",
              gap: isMobile ? "18px" : "24px",
            }}
          >
            {filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isMobile={isMobile}
                isSmallMobile={isSmallMobile}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{
          paddingTop: "18px",
          paddingBottom: isMobile ? "70px" : "100px",
        }}
      >
        <div className="container">
          <div
            className="glass-box"
            style={{
              maxWidth: "980px",
              margin: "0 auto",
              padding: isSmallMobile
                ? "24px 18px"
                : isMobile
                ? "30px 22px"
                : "42px 28px",
              textAlign: "center",
              borderRadius: isSmallMobile ? "24px" : "32px",
              border: "1px solid rgba(122,168,255,0.18)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
              background:
                "linear-gradient(180deg, rgba(122,168,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            }}
          >
            <p className="eyebrow">Premium Coaching Experience</p>

            <h2
              style={{
                marginBottom: "18px",
                fontSize: isSmallMobile ? "1.8rem" : undefined,
                lineHeight: isMobile ? 1.15 : undefined,
              }}
            >
              Want a program built around your body, goals, and movement needs?
            </h2>

            <p
              style={{
                maxWidth: "760px",
                margin: "0 auto 28px",
                fontSize: isMobile ? "1rem" : "1.05rem",
                lineHeight: 1.8,
                opacity: 0.9,
              }}
            >
              Apply for coaching to get individualized programming, movement
              analysis, exercise selection, and progress tracking designed for
              real results.
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                justifyContent: "center",
                flexWrap: "wrap",
                flexDirection: isSmallMobile ? "column" : "row",
              }}
            >
              <Link
                to="/apply"
                className="btn btn-primary"
                style={{ width: isSmallMobile ? "100%" : "auto" }}
              >
                Apply for Coaching
              </Link>

              <a
                href="/#pricing"
                className="btn btn-secondary"
                style={{ width: isSmallMobile ? "100%" : "auto" }}
              >
                View Coaching Options
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
