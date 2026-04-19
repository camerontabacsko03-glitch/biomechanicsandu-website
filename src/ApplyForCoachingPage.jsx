import logo from "./logo.png";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwm3cgq8IEJTvDBTMiuRR6wZV6TqDucnrcbUwYnVKHc0233kXY-Vfabhh9aSQbbZO6H/exec";

const fieldStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#F5F7FB",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle = {
  ...fieldStyle,
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  backgroundColor: "rgba(255,255,255,0.04)",
  color: "#F5F7FB",
};

const optionStyle = {
  color: "#081120",
  background: "#FFFFFF",
};

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontSize: 14,
  fontWeight: 600,
  color: "#E7ECF7",
};

function Field({ label, children, hint }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {hint ? (
        <div style={{ marginTop: 7, fontSize: 12, color: "#99A3BA" }}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}

export default function ApplyForCoachingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  const sectionCard = {
    background:
      "linear-gradient(180deg, rgba(20,24,35,0.96) 0%, rgba(12,16,26,0.96) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: isSmallMobile ? 20 : 24,
    padding: isSmallMobile ? 18 : isMobile ? 22 : 28,
    boxShadow: "0 20px 50px rgba(0,0,0,0.28)",
  };

  const responsiveFieldStyle = {
    ...fieldStyle,
    fontSize: isMobile ? 16 : 15,
    padding: isSmallMobile ? "13px 14px" : "14px 16px",
  };

  const responsiveSelectStyle = {
    ...selectStyle,
    fontSize: isMobile ? 16 : 15,
    padding: isSmallMobile ? "13px 14px" : "14px 16px",
  };

  const textareaStyle = {
    ...responsiveFieldStyle,
    resize: "vertical",
    minHeight: 110,
  };

  const initialPlan = searchParams.get("plan") || "";

  const planLabels = {
    foundation: "Foundation Coaching",
    performance: "Performance Coaching",
    elite: "Elite Coaching",
  };

  const bookAndPayLinks = {
    foundation: "https://buy.stripe.com/test_5kQcMY8Hj5qCa1iefS1VK02",
    performance: "https://buy.stripe.com/test_4gMfZa2iV4my6P67Ru1VK03",
    elite: "https://buy.stripe.com/test_28E3co8Hj9GSb5m0p21VK04",
  };

  const bookAndPayLabels = {
    foundation: "Continue to Payment",
    performance: "Continue to Payment",
    elite: "Continue to Payment",
  };

  const planCards = [
    {
      key: "foundation",
      title: "Foundation",
      subtitle: "Online coaching foundation",
      description:
        "Best for clients who want expert structure, clarity, and a streamlined online coaching experience.",
    },
    {
      key: "performance",
      title: "Performance",
      subtitle: "More support",
      description:
        "For clients who want deeper coaching, more feedback, and a higher-touch performance-focused process.",
    },
    {
      key: "elite",
      title: "Elite",
      subtitle: "Highest level",
      description:
        "For serious clients who want the most complete coaching experience, attention to detail, and premium support.",
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(
    ["foundation", "performance", "elite"].includes(initialPlan)
      ? initialPlan
      : ""
  );
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const selectedPlanLabel = selectedPlan
    ? planLabels[selectedPlan]
    : "Select Your Coaching Tier";

  const selectedBookAndPayLink = selectedPlan
    ? bookAndPayLinks[selectedPlan]
    : "#";

  const selectedBookAndPayLabel = selectedPlan
    ? bookAndPayLabels[selectedPlan]
    : "Book and Pay";

  const [formData, setFormData] = useState({
    selectedPlan: ["foundation", "performance", "elite"].includes(initialPlan)
      ? initialPlan
      : "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    occupation: "",
    trainingDays: "",
    experience: "",
    primaryGoals: [],
    topGoal: "",
    painNow: "",
    injuryHistory: "",
    discomfortMovements: "",
    biggestObstacle: "",
    commitmentLevel: "",
    investReady: "",
  });
  const goals = useMemo(
    () => [
      "Build muscle",
      "Move with less pain",
      "Improve mobility",
      "Increase strength",
      "Lose body fat",
      "Improve athletic performance",
    ],
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlanSelect = (value) => {
    setSelectedPlan(value);
    setFormData((prev) => ({
      ...prev,
      selectedPlan: value,
    }));
  };

  const handleCheckbox = (goal) => {
    setFormData((prev) => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter((g) => g !== goal)
        : [...prev.primaryGoals, goal],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlan) {
      alert("Please select your coaching tier.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("Submitting application...");

    const payload = {
      ...formData,
      formType: "General Application",
      selectedPlan: planLabels[selectedPlan],
      primaryGoals: formData.primaryGoals.join(", "),
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();

      let result = {};
      try {
        result = JSON.parse(text);
      } catch (parseError) {
        setSubmitMessage("Form submitted, but response was not valid.");
        setIsSubmitting(false);
        return;
      }

      if (result.success) {
        setSubmitted(true);
        setSubmitMessage("Application submitted successfully.");
        setTimeout(() => {
          window.location.href = selectedBookAndPayLink;
        }, 800);
        setFormData({
          selectedPlan: selectedPlan,
          firstName: "",
          lastName: "",
          email: "",
          age: "",
          occupation: "",
          trainingDays: "",
          experience: "",
          primaryGoals: [],
          topGoal: "",
          painNow: "",
          injuryHistory: "",
          discomfortMovements: "",
          biggestObstacle: "",
          commitmentLevel: "",
          investReady: "",
        });
      } else {
        setSubmitMessage(
          result.message || "Submission failed inside Apps Script."
        );
      }
    } catch (error) {
      console.error(error);
      setSubmitMessage(`Request failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(54,102,255,0.22), transparent 30%), radial-gradient(circle at top right, rgba(118,167,255,0.14), transparent 28%), linear-gradient(180deg, #07111F 0%, #091423 45%, #050B14 100%)",
        color: "#FFFFFF",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
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
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(120,160,255,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(120,160,255,0.12)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
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
            transition: "all 0.25s ease",
            fontSize: isMobile ? 14 : 15,
            width: isSmallMobile ? "100%" : "auto",
          }}
        >
          ← Back to Homepage
        </button>
      </div>

      <section
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: isMobile ? "30px 16px 24px" : "72px 20px 36px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isTablet ? "1fr" : "1.05fr 0.95fr",
            gap: isMobile ? 20 : 28,
            alignItems: "stretch",
          }}
        >
          <div style={sectionCard}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 999,
                background: "rgba(84,129,255,0.14)",
                border: "1px solid rgba(120,160,255,0.18)",
                color: "#C9D9FF",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 0.2,
                marginBottom: 20,
              }}
            >
              {selectedPlan ? selectedPlanLabel : "Application Page"}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  width: isSmallMobile ? 54 : 62,
                  height: isSmallMobile ? 54 : 62,
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(37,99,235,0.16))",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow:
                    "0 10px 30px rgba(37,99,235,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
                  flexShrink: 0,
                }}
              >
                <img
                  src={logo}
                  alt="Biomechanics & U logo"
                  style={{
                    width: isSmallMobile ? 34 : 40,
                    height: isSmallMobile ? 34 : 40,
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "#9EBBFF",
                    fontWeight: 800,
                    marginBottom: 4,
                    lineHeight: 1.4,
                  }}
                >
                  Biomechanics &amp; U
                </div>

                <div
                  style={{
                    color: "#D9E4FB",
                    fontSize: isMobile ? 13 : 14,
                    lineHeight: 1.5,
                  }}
                >
                  Premium biomechanics-based hypertrophy coaching
                </div>
              </div>
            </div>

            <h1
              style={{
                fontSize: isSmallMobile
                  ? "clamp(2rem, 10vw, 2.8rem)"
                  : "clamp(2.6rem, 5vw, 4.5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                margin: "0 0 18px",
                maxWidth: 700,
              }}
            >
              Apply to Work With Biomechanics &amp; U
            </h1>

            <p
              style={{
                fontSize: isMobile ? 16 : 18,
                lineHeight: 1.7,
                color: "#C8D2E8",
                maxWidth: 680,
                margin: "0 0 26px",
              }}
            >
              Choose the coaching tier that best fits the level of support you
              want, then complete the application below. This keeps the process
              clear, premium, and tailored to your goals.
            </p>

            <div
              style={{
                padding: isSmallMobile ? 16 : 18,
                borderRadius: 18,
                background:
                  "linear-gradient(180deg, rgba(75,124,255,0.14), rgba(122,168,255,0.05))",
                border: "1px solid rgba(130,167,255,0.18)",
                marginBottom: 26,
              }}
            >
              <div
                style={{ fontWeight: 800, marginBottom: 8, color: "#EAF1FF" }}
              >
                Selected Option
              </div>
              <div
                style={{
                  color: "#C6D2EE",
                  lineHeight: 1.7,
                  fontSize: isMobile ? 14 : 15,
                }}
              >
                {selectedPlan
                  ? selectedPlanLabel
                  : "Please choose a coaching tier below."}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isTablet
                  ? "1fr"
                  : "repeat(3, minmax(0, 1fr))",
                gap: 14,
                marginBottom: 26,
              }}
            >
              {[
                [
                  "Personalized Programming",
                  "Built around your body, goals, and training history.",
                ],
                [
                  "Movement-First Coaching",
                  "Improve how you move while still driving results.",
                ],
                [
                  "Serious Client Experience",
                  "A premium process from application to onboarding.",
                ],
              ].map(([title, copy]) => (
                <div
                  key={title}
                  style={{
                    padding: isSmallMobile ? 16 : 18,
                    borderRadius: 18,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      marginBottom: 8,
                      color: "#F6F8FF",
                      lineHeight: 1.35,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? 14 : 14,
                      lineHeight: 1.6,
                      color: "#AEB8CD",
                    }}
                  >
                    {copy}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                flexDirection: isSmallMobile ? "column" : "row",
              }}
            >
              <a
                href="#apply-form"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 22px",
                  borderRadius: 14,
                  background:
                    "linear-gradient(135deg, #4B7CFF 0%, #7AA8FF 100%)",
                  color: "#081120",
                  textDecoration: "none",
                  fontWeight: 800,
                  boxShadow: "0 14px 34px rgba(72,120,255,0.35)",
                  width: isSmallMobile ? "100%" : "auto",
                  textAlign: "center",
                }}
              >
                Continue to Application
              </a>
              <a
                href="#process"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 22px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.04)",
                  color: "#F0F4FF",
                  textDecoration: "none",
                  fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.1)",
                  width: isSmallMobile ? "100%" : "auto",
                  textAlign: "center",
                }}
              >
                See How It Works
              </a>
            </div>
          </div>

          <div
            style={{
              ...sectionCard,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#BFD0F9",
                  marginBottom: 14,
                }}
              >
                Who this is for
              </div>
              <h2
                style={{
                  fontSize: isSmallMobile ? 26 : isMobile ? 28 : 30,
                  lineHeight: 1.15,
                  margin: "0 0 16px",
                }}
              >
                Coaching for clients who want results without training blindly.
              </h2>
              <p
                style={{
                  color: "#B4BED4",
                  lineHeight: 1.75,
                  fontSize: isMobile ? 15 : 16,
                  margin: "0 0 22px",
                }}
              >
                This application helps make sure the fit is right on both sides.
                The better your answers, the better your starting plan,
                strategy, and coaching recommendations will be.
              </p>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              {[
                "You want to build muscle while moving better.",
                "You have old injuries, stiffness, or recurring pain points that need smarter programming.",
                "You are ready for structure, accountability, and a personalized approach.",
                "You are serious about making measurable progress over the next 3 to 6 months.",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: isSmallMobile ? 14 : 16,
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      marginTop: 8,
                      background:
                        "linear-gradient(135deg, #5B89FF 0%, #9BC0FF 100%)",
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      color: "#D8E0F2",
                      lineHeight: 1.6,
                      fontSize: isMobile ? 14 : 15,
                    }}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="process"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: isMobile ? "0 16px 24px" : "10px 20px 32px",
        }}
      >
        <div style={{ ...sectionCard, padding: isSmallMobile ? 20 : 30 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#BFD0F9",
              marginBottom: 8,
            }}
          >
            The funnel copy
          </div>
          <h2
            style={{
              fontSize: isSmallMobile ? 28 : isMobile ? 32 : 36,
              lineHeight: 1.1,
              margin: "0 0 12px",
            }}
          >
            How the process works
          </h2>
          <p
            style={{
              color: "#B4BED4",
              lineHeight: 1.7,
              maxWidth: 760,
              marginBottom: 24,
              fontSize: isMobile ? 15 : 16,
            }}
          >
            Designed to feel personal, premium, and clear from the first click.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet
                ? isMobile
                  ? "1fr"
                  : "repeat(2, minmax(0, 1fr))"
                : "repeat(4, minmax(0, 1fr))",
              gap: 16,
            }}
          >
            {[
              [
                "01",
                "Choose",
                "Select the coaching tier that best fits your goals and support needs.",
              ],
              [
                "02",
                "Apply",
                "Fill out the intake form so I can understand your goals, injury history, and training background.",
              ],
              [
                "03",
                "Book + Pay",
                "Use the next-step booking flow to lock in your payment and reserve your spot.",
              ],
              [
                "04",
                "Start Strong",
                "Book your onboarding call and begin with a plan built around your goals.",
              ],
            ].map(([num, title, copy]) => (
              <div
                key={num}
                style={{
                  padding: isSmallMobile ? 16 : 20,
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#8BA7F8",
                    fontWeight: 800,
                    marginBottom: 10,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? 18 : 20,
                    fontWeight: 700,
                    marginBottom: 8,
                    lineHeight: 1.35,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    color: "#AEB8CD",
                    lineHeight: 1.65,
                    fontSize: isMobile ? 14 : 15,
                  }}
                >
                  {copy}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="apply-form"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: isMobile ? "0 16px 60px" : "0 20px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isTablet ? "1fr" : "0.88fr 1.12fr",
            gap: isMobile ? 20 : 28,
            alignItems: "start",
          }}
        >
          <div style={sectionCard}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#BFD0F9",
                marginBottom: 8,
              }}
            >
              Before you apply
            </div>
            <h2
              style={{
                fontSize: isSmallMobile ? 28 : isMobile ? 30 : 34,
                lineHeight: 1.15,
                margin: "0 0 16px",
              }}
            >
              What I look for in a coaching client
            </h2>
            <p
              style={{
                color: "#B4BED4",
                lineHeight: 1.75,
                margin: "0 0 24px",
                fontSize: isMobile ? 15 : 16,
              }}
            >
              Biomechanics & U is best for people who value good coaching, clear
              communication, and a thoughtful approach to training.
            </p>

            <div style={{ display: "grid", gap: 14, marginBottom: 26 }}>
              {[
                "A clear goal and a real reason behind it",
                "Willingness to follow a structured plan",
                "Honesty about pain, injury history, and limitations",
                "A desire to train hard and train intelligently",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    color: "#D8E0F2",
                    lineHeight: 1.7,
                    fontSize: isMobile ? 14 : 15,
                  }}
                >
                  • {item}
                </div>
              ))}
            </div>

            <div
              style={{
                padding: isSmallMobile ? 16 : 20,
                borderRadius: 18,
                background:
                  "linear-gradient(180deg, rgba(75,124,255,0.14), rgba(122,168,255,0.05))",
                border: "1px solid rgba(130,167,255,0.18)",
              }}
            >
              <div
                style={{ fontWeight: 800, marginBottom: 8, color: "#EAF1FF" }}
              >
                Selected Option
              </div>
              <div
                style={{
                  color: "#C6D2EE",
                  lineHeight: 1.7,
                  fontSize: isMobile ? 14 : 15,
                }}
              >
                {selectedPlan ? selectedPlanLabel : "No option selected yet."}
              </div>
            </div>
          </div>

          <div style={sectionCard}>
            {submitted ? (
              <div
                style={{
                  minHeight: isMobile ? "auto" : 400,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#9CC0FF",
                    marginBottom: 10,
                  }}
                >
                  Application received
                </div>

                <h3
                  style={{
                    fontSize: isSmallMobile ? 28 : isMobile ? 30 : 34,
                    lineHeight: 1.15,
                    margin: "0 0 14px",
                  }}
                >
                  Thanks for applying.
                </h3>

                <p
                  style={{
                    color: "#B8C4DA",
                    lineHeight: 1.75,
                    maxWidth: 560,
                    marginBottom: 18,
                    fontSize: isMobile ? 15 : 16,
                  }}
                >
                  Your form has been submitted successfully for{" "}
                  <strong>{selectedPlanLabel}</strong>.
                </p>

                <div
                  style={{
                    padding: isSmallMobile ? 16 : 18,
                    borderRadius: 18,
                    background:
                      "linear-gradient(180deg, rgba(75,124,255,0.14), rgba(122,168,255,0.05))",
                    border: "1px solid rgba(130,167,255,0.18)",
                    marginBottom: 20,
                    width: "100%",
                    maxWidth: 560,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      marginBottom: 8,
                      color: "#EAF1FF",
                    }}
                  >
                    Next Step
                  </div>
                  <div
                    style={{
                      color: "#C6D2EE",
                      lineHeight: 1.7,
                      fontSize: isMobile ? 14 : 15,
                    }}
                  >
                    Use the button below to complete your onboarding payment.
                    After payment, you’ll be redirected to book your onboarding
                    call.
                  </div>
                </div>

                <a
                  href={selectedBookAndPayLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "14px 18px",
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg, #4B7CFF 0%, #7AA8FF 100%)",
                    color: "#091321",
                    fontWeight: 800,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isSmallMobile ? "100%" : "auto",
                    textAlign: "center",
                  }}
                >
                  {selectedBookAndPayLabel}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 22 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#BFD0F9",
                      marginBottom: 8,
                    }}
                  >
                    Application form
                  </div>
                  <h2
                    style={{
                      fontSize: isSmallMobile ? 28 : isMobile ? 30 : 34,
                      lineHeight: 1.12,
                      margin: 0,
                    }}
                  >
                    Apply to Work With Me
                  </h2>
                  <p
                    style={{
                      color: "#B4BED4",
                      lineHeight: 1.7,
                      marginTop: 12,
                      fontSize: isMobile ? 15 : 16,
                    }}
                  >
                    Answer a few questions so I can better understand your
                    goals, training background, and how to help you best.
                  </p>
                </div>

                <Field
                  label="Choose your coaching tier"
                  hint="Select the level of support that fits you best"
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isTablet
                        ? "1fr"
                        : "repeat(3, minmax(0, 1fr))",
                      gap: 14,
                    }}
                  >
                    {planCards.map((plan) => {
                      const isSelected = selectedPlan === plan.key;

                      return (
                        <button
                          key={plan.key}
                          type="button"
                          onClick={() => handlePlanSelect(plan.key)}
                          style={{
                            textAlign: "left",
                            padding: isSmallMobile ? 16 : 18,
                            borderRadius: 18,
                            border: isSelected
                              ? "1px solid rgba(130,170,255,0.55)"
                              : "1px solid rgba(255,255,255,0.08)",
                            background: isSelected
                              ? "linear-gradient(180deg, rgba(75,124,255,0.22), rgba(122,168,255,0.08))"
                              : "rgba(255,255,255,0.03)",
                            color: "#F5F7FB",
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                            boxShadow: isSelected
                              ? "0 10px 30px rgba(72,120,255,0.18)"
                              : "none",
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.transform =
                                "translateY(-2px)";
                              e.currentTarget.style.border =
                                "1px solid rgba(130,170,255,0.22)";
                              e.currentTarget.style.background =
                                "rgba(255,255,255,0.05)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.border =
                                "1px solid rgba(255,255,255,0.08)";
                              e.currentTarget.style.background =
                                "rgba(255,255,255,0.03)";
                            }
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              gap: 12,
                              marginBottom: 10,
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontSize: isMobile ? 17 : 18,
                                  fontWeight: 800,
                                  color: "#F6F8FF",
                                  marginBottom: 4,
                                  lineHeight: 1.3,
                                }}
                              >
                                {plan.title}
                              </div>
                              <div
                                style={{
                                  fontSize: 12,
                                  fontWeight: 700,
                                  letterSpacing: "0.06em",
                                  textTransform: "uppercase",
                                  color: isSelected ? "#CFE0FF" : "#8FA3C7",
                                  lineHeight: 1.4,
                                }}
                              >
                                {plan.subtitle}
                              </div>
                            </div>

                            <div
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 999,
                                border: isSelected
                                  ? "6px solid #7AA8FF"
                                  : "2px solid rgba(255,255,255,0.25)",
                                background: isSelected
                                  ? "#EAF1FF"
                                  : "transparent",
                                flexShrink: 0,
                                marginTop: 2,
                              }}
                            />
                          </div>

                          <div
                            style={{
                              fontSize: 14,
                              lineHeight: 1.65,
                              color: isSelected ? "#DFE9FF" : "#AEB8CD",
                            }}
                          >
                            {plan.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <input
                    type="hidden"
                    name="selectedPlan"
                    value={selectedPlan}
                    required
                  />
                </Field>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(2, minmax(0, 1fr))",
                    gap: 16,
                  }}
                >
                  <Field label="First Name">
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      style={responsiveFieldStyle}
                      required
                    />
                  </Field>
                  <Field label="Last Name">
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      style={responsiveFieldStyle}
                      required
                    />
                  </Field>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(2, minmax(0, 1fr))",
                    gap: 16,
                  }}
                >
                  <Field label="Email Address">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={responsiveFieldStyle}
                      required
                    />
                  </Field>
                  <Field label="Age">
                    <input
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      style={responsiveFieldStyle}
                      required
                    />
                  </Field>
                </div>

                <Field
                  label="Occupation / Daily Activity Level"
                  hint="Example: desk job, on my feet all day, active job, athlete"
                >
                  <input
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    style={responsiveFieldStyle}
                  />
                </Field>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(2, minmax(0, 1fr))",
                    gap: 16,
                  }}
                >
                  <Field label="Current Training Experience">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      style={responsiveSelectStyle}
                      required
                    >
                      <option value="" disabled style={optionStyle}>
                        Select one
                      </option>
                      <option value="Beginner" style={optionStyle}>
                        Beginner
                      </option>
                      <option value="Intermediate" style={optionStyle}>
                        Intermediate
                      </option>
                      <option value="Advanced" style={optionStyle}>
                        Advanced
                      </option>
                    </select>
                  </Field>

                  <Field label="How many days per week are you training?">
                    <input
                      name="trainingDays"
                      value={formData.trainingDays}
                      onChange={handleChange}
                      style={responsiveFieldStyle}
                    />
                  </Field>
                </div>

                <Field
                  label="What are your primary goals right now?"
                  hint="Select all that apply"
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isSmallMobile
                        ? "1fr"
                        : isMobile
                        ? "1fr"
                        : "repeat(2, minmax(0, 1fr))",
                      gap: 10,
                    }}
                  >
                    {goals.map((goal) => (
                      <label
                        key={goal}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: isSmallMobile ? "13px 14px" : "14px 16px",
                          borderRadius: 14,
                          background: formData.primaryGoals.includes(goal)
                            ? "rgba(90,135,255,0.16)"
                            : "rgba(255,255,255,0.03)",
                          border: formData.primaryGoals.includes(goal)
                            ? "1px solid rgba(130,170,255,0.45)"
                            : "1px solid rgba(255,255,255,0.08)",
                          color: "#EAF1FF",
                          cursor: "pointer",
                          fontSize: isMobile ? 14 : 15,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.primaryGoals.includes(goal)}
                          onChange={() => handleCheckbox(goal)}
                        />
                        <span>{goal}</span>
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="What is your number one priority over the next 3 to 6 months?">
                  <textarea
                    name="topGoal"
                    value={formData.topGoal}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                    required
                  />
                </Field>

                <Field label="Do you currently have any pain or injuries? If yes, describe the location and severity.">
                  <textarea
                    name="painNow"
                    value={formData.painNow}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                  />
                </Field>

                <Field label="Have you had any past injuries or surgeries?">
                  <textarea
                    name="injuryHistory"
                    value={formData.injuryHistory}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                  />
                </Field>

                <Field label="Are there any movements or exercises that currently cause discomfort?">
                  <textarea
                    name="discomfortMovements"
                    value={formData.discomfortMovements}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                  />
                </Field>

                <Field label="What has held you back in the past from getting the results you want?">
                  <textarea
                    name="biggestObstacle"
                    value={formData.biggestObstacle}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                  />
                </Field>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(2, minmax(0, 1fr))",
                    gap: 16,
                  }}
                >
                  <Field label="How committed are you to following a structured program?">
                    <select
                      name="commitmentLevel"
                      value={formData.commitmentLevel}
                      onChange={handleChange}
                      style={responsiveSelectStyle}
                      required
                    >
                      <option value="" disabled style={optionStyle}>
                        Select one
                      </option>
                      <option value="Very committed" style={optionStyle}>
                        Very committed
                      </option>
                      <option value="Somewhat committed" style={optionStyle}>
                        Somewhat committed
                      </option>
                      <option value="Not sure yet" style={optionStyle}>
                        Not sure yet
                      </option>
                    </select>
                  </Field>

                  <Field label="Are you willing to invest in coaching to reach your goals faster?">
                    <select
                      name="investReady"
                      value={formData.investReady}
                      onChange={handleChange}
                      style={responsiveSelectStyle}
                      required
                    >
                      <option value="" disabled style={optionStyle}>
                        Select one
                      </option>
                      <option value="Yes" style={optionStyle}>
                        Yes
                      </option>
                      <option value="Maybe" style={optionStyle}>
                        Maybe
                      </option>
                      <option value="Not right now" style={optionStyle}>
                        Not right now
                      </option>
                    </select>
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    marginTop: 8,
                    padding: isSmallMobile ? "15px 16px" : "16px 18px",
                    borderRadius: 16,
                    border: "1px solid rgba(122,168,255,0.35)",
                    background:
                      "linear-gradient(135deg, #3B66F5 0%, #5E8CFF 100%)",
                    color: "#EAF1FF",
                    fontSize: isMobile ? 15 : 16,
                    fontWeight: 900,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    boxShadow: "0 12px 28px rgba(62,100,255,0.22)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 18px 36px rgba(62,100,255,0.28)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 28px rgba(62,100,255,0.22)";
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>

                {submitMessage ? (
                  <div
                    style={{
                      marginTop: 14,
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#DCE6FF",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {submitMessage}
                  </div>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
