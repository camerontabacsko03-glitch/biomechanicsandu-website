import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwm3cgq8IEJTvDBTMiuRR6wZV6TqDucnrcbUwYnVKHc0233kXY-Vfabhh9aSQbbZO6H/exec";

const BOOK_AND_PAY_LINK = "https://buy.stripe.com/dRm4gs8HveHJ75H0oQ1kA06";

const pageBg = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, rgba(54,102,255,0.22), transparent 30%), radial-gradient(circle at top right, rgba(118,167,255,0.14), transparent 28%), linear-gradient(180deg, #07111F 0%, #091423 45%, #050B14 100%)",
  color: "#FFFFFF",
  fontFamily:
    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

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

function Field({ label, hint, children }) {
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

function SectionIntro({ number, title, copy, isMobile }) {
  return (
    <div style={{ marginBottom: 24 }}>
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
          marginBottom: 12,
        }}
      >
        Section {number}
      </div>
      <h3
        style={{
          margin: "0 0 8px",
          fontSize: isMobile ? 24 : 28,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          color: "#B4BED4",
          lineHeight: 1.7,
          fontSize: isMobile ? 15 : 16,
        }}
      >
        {copy}
      </p>
    </div>
  );
}

export default function CoachingCallApplicationPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const [formData, setFormData] = useState({
    serviceType: "1:1 Coaching Call",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    occupation: "",
    instagram: "",
    mainGoal: "",
    whyNow: "",
    currentTraining: "",
    trainingDays: "",
    currentProgram: "",
    currentPain: "",
    injuryHistory: "",
    aggravatingMovements: "",
    bestExercises: "",
    worstExercises: "",
    callTopic: "",
    biggestObstacle: "",
    successfulOutcome: "",
    commitmentLevel: "",
    investReady: "",
    availability: "",
    whyBiomechanicsAndU: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitMessage("Submitting application...");

    const payload = {
      ...formData,
      formType: "Dedicated 1:1 Coaching Call Application",
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
        setSubmitMessage("Form submitted, but response was not valid JSON.");
        setIsSubmitting(false);
        return;
      }

      if (result.success) {
        setSubmitted(true);
        setSubmitMessage("Application submitted successfully.");

        setTimeout(() => {
          window.location.href = BOOK_AND_PAY_LINK;
        }, 800);
      } else {
        setSubmitMessage(
          result.message || "Submission failed inside Apps Script."
        );
      }
    } catch (error) {
      setSubmitMessage(`Request failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div style={pageBg}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: isMobile ? "16px 16px 0" : "20px 20px 0",
        }}
      >
        <button
          onClick={() => navigate("/")}
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
          padding: isMobile ? "26px 16px 24px" : "48px 20px 34px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isTablet ? "1fr" : "1.02fr 0.98fr",
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
                marginBottom: 20,
              }}
            >
              1:1 Coaching Call Application
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
                  ? "clamp(2rem, 10vw, 2.7rem)"
                  : "clamp(2.4rem, 5vw, 4.3rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                margin: "0 0 18px",
                maxWidth: 700,
              }}
            >
              Book a focused 1:1 coaching call with clear next steps.
            </h1>

            <p
              style={{
                fontSize: isMobile ? 16 : 18,
                lineHeight: 1.7,
                color: "#C8D2E8",
                maxWidth: 700,
                margin: "0 0 26px",
              }}
            >
              This call is designed for lifters who want direct feedback on
              training, pain points, biomechanics, exercise selection, or what
              to do next. The more detailed your answers are, the more useful
              and actionable the call will be.
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
                What this call is best for
              </div>
              <div
                style={{
                  color: "#C6D2EE",
                  lineHeight: 1.75,
                  fontSize: isMobile ? 14 : 15,
                }}
              >
                Troubleshooting training issues, identifying exercise problems,
                discussing pain-aware programming, clarifying your next move,
                and getting expert eyes on what is actually holding you back.
              </div>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              {[
                "You want expert help on a specific training or movement issue.",
                "You need fast clarity instead of guessing your next step.",
                "You want a practical answer, not generic advice.",
                "You are serious enough to implement what comes out of the call.",
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

          <div style={sectionCard}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#BFD0F9",
                marginBottom: 8,
              }}
            >
              What happens after you apply
            </div>
            <h2
              style={{
                fontSize: isSmallMobile ? 28 : isMobile ? 30 : 34,
                lineHeight: 1.15,
                margin: "0 0 16px",
              }}
            >
              Premium, simple, and clear.
            </h2>

            <div style={{ display: "grid", gap: 16 }}>
              {[
                [
                  "01",
                  "Submit your application",
                  "Give enough detail that I can understand your training background, limitations, and what you want from the call.",
                ],
                [
                  "02",
                  "Complete payment",
                  "Once submitted, you’ll pay for the 1:1 Coaching Call to secure your next step.",
                ],
                [
                  "03",
                  "Book your session",
                  "You’ll book your slot through Calendly after payment.",
                ],
                [
                  "04",
                  "Get a focused plan",
                  "We’ll use the call to solve the biggest issue, clarify direction, and give you actionable next steps.",
                ],
              ].map(([num, title, copy]) => (
                <div
                  key={num}
                  style={{
                    padding: isSmallMobile ? 16 : 18,
                    borderRadius: 18,
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
        </div>
      </section>

      <section
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: isMobile ? "0 16px 60px" : "0 20px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isTablet ? "1fr" : "0.9fr 1.1fr",
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
              Before you fill this out
            </div>
            <h2
              style={{
                fontSize: isSmallMobile ? 26 : isMobile ? 28 : 32,
                lineHeight: 1.15,
                margin: "0 0 16px",
              }}
            >
              Best for lifters who want direct clarity.
            </h2>
            <p
              style={{
                color: "#B4BED4",
                lineHeight: 1.75,
                margin: "0 0 24px",
                fontSize: isMobile ? 15 : 16,
              }}
            >
              This is not a vague consultation form. It is designed to help you
              explain exactly what is going on so the call can be specific,
              practical, and immediately useful.
            </p>

            <div style={{ display: "grid", gap: 14 }}>
              {[
                "Be specific about the movement, lift, pain point, or programming problem.",
                "Tell me what you’ve already tried so we do not waste time on obvious things.",
                "Explain what a good outcome from the call would look like to you.",
                "The more detail you give now, the more value you get from the call itself.",
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
          </div>

          <div style={sectionCard}>
            {submitted ? (
              <div
                style={{
                  minHeight: isMobile ? "auto" : 420,
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
                  Your <strong>1:1 Coaching Call</strong> application has been
                  submitted successfully.
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
                    Your application was submitted successfully. Use the button
                    below to book and pay for your coaching call in one step.
                  </div>
                </div>
                <a
                  href={BOOK_AND_PAY_LINK}
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
                  Book and Pay for Your 1:1 Coaching Call
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 26 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#BFD0F9",
                      marginBottom: 8,
                    }}
                  >
                    Dedicated intake form
                  </div>
                  <h2
                    style={{
                      fontSize: isSmallMobile ? 28 : isMobile ? 30 : 34,
                      lineHeight: 1.12,
                      margin: 0,
                    }}
                  >
                    1:1 Coaching Call Application
                  </h2>
                  <p
                    style={{
                      color: "#B4BED4",
                      lineHeight: 1.7,
                      marginTop: 12,
                      fontSize: isMobile ? 15 : 16,
                    }}
                  >
                    Fill this out in detail so I can understand your issue and
                    make the call as useful as possible.
                  </p>
                </div>

                <SectionIntro
                  number="1"
                  title="Basic Information"
                  copy="Start with the essentials so I know who you are and how to contact you."
                  isMobile={isMobile}
                />

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
                  hint="Example: desk job, on my feet all day, physically demanding job, student, athlete"
                >
                  <input
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    style={responsiveFieldStyle}
                  />
                </Field>

                <Field label="Instagram Handle or Preferred Social Contact (optional)">
                  <input
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    style={responsiveFieldStyle}
                  />
                </Field>

                <SectionIntro
                  number="2"
                  title="Main Goal + Why This Call Matters"
                  copy="This section clarifies what you actually want help with and why now is the right time."
                  isMobile={isMobile}
                />

                <Field label="What is the main issue, goal, or question you want this coaching call to help with?">
                  <textarea
                    name="mainGoal"
                    value={formData.mainGoal}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                    required
                  />
                </Field>

                <Field label="Why is this important to you right now?">
                  <textarea
                    name="whyNow"
                    value={formData.whyNow}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                    required
                  />
                </Field>

                <SectionIntro
                  number="3"
                  title="Current Training Context"
                  copy="Give me enough background that I can understand your current setup, not just the problem in isolation."
                  isMobile={isMobile}
                />

                <Field label="What does your current training look like right now?">
                  <textarea
                    name="currentTraining"
                    value={formData.currentTraining}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
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
                  <Field label="How many days per week are you training?">
                    <input
                      name="trainingDays"
                      value={formData.trainingDays}
                      onChange={handleChange}
                      style={responsiveFieldStyle}
                    />
                  </Field>

                  <Field label="How would you describe your current program?">
                    <select
                      name="currentProgram"
                      value={formData.currentProgram}
                      onChange={handleChange}
                      style={responsiveSelectStyle}
                      required
                    >
                      <option value="" disabled style={optionStyle}>
                        Select one
                      </option>
                      <option value="No structured program" style={optionStyle}>
                        No structured program
                      </option>
                      <option
                        value="Basic split / self-made"
                        style={optionStyle}
                      >
                        Basic split / self-made
                      </option>
                      <option value="Coach-written program" style={optionStyle}>
                        Coach-written program
                      </option>
                      <option
                        value="Bodybuilding / hypertrophy focus"
                        style={optionStyle}
                      >
                        Bodybuilding / hypertrophy focus
                      </option>
                      <option
                        value="Strength / powerlifting focus"
                        style={optionStyle}
                      >
                        Strength / powerlifting focus
                      </option>
                      <option
                        value="Rehab / return to training"
                        style={optionStyle}
                      >
                        Rehab / return to training
                      </option>
                    </select>
                  </Field>
                </div>

                <SectionIntro
                  number="4"
                  title="Pain, Limitations, and Exercise Problems"
                  copy="This is where you explain what hurts, what feels off, and what exercises or positions create problems."
                  isMobile={isMobile}
                />

                <Field label="Do you currently have pain, tightness, or recurring irritation? If yes, where and how severe is it?">
                  <textarea
                    name="currentPain"
                    value={formData.currentPain}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                  />
                </Field>

                <Field label="Have you had any past injuries, surgeries, or recurring issues I should know about?">
                  <textarea
                    name="injuryHistory"
                    value={formData.injuryHistory}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                  />
                </Field>

                <Field label="What movements, lifts, or training situations tend to aggravate the issue most?">
                  <textarea
                    name="aggravatingMovements"
                    value={formData.aggravatingMovements}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                  />
                </Field>

                <Field label="What exercises feel best for you right now?">
                  <textarea
                    name="bestExercises"
                    value={formData.bestExercises}
                    onChange={handleChange}
                    rows={3}
                    style={textareaStyle}
                  />
                </Field>

                <Field label="What exercises feel worst, feel awkward, or seem to never work well for your body?">
                  <textarea
                    name="worstExercises"
                    value={formData.worstExercises}
                    onChange={handleChange}
                    rows={3}
                    style={textareaStyle}
                  />
                </Field>

                <SectionIntro
                  number="5"
                  title="What You Want From The Call"
                  copy="Be specific about the kind of help you want so the session can stay focused and high-value."
                  isMobile={isMobile}
                />

                <Field label="What do you want the call to focus on most?">
                  <textarea
                    name="callTopic"
                    value={formData.callTopic}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                    required
                  />
                </Field>

                <Field label="What has been the biggest obstacle stopping you from solving this on your own?">
                  <textarea
                    name="biggestObstacle"
                    value={formData.biggestObstacle}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                  />
                </Field>

                <Field label="What would a successful outcome from this call look like to you?">
                  <textarea
                    name="successfulOutcome"
                    value={formData.successfulOutcome}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                    required
                  />
                </Field>

                <SectionIntro
                  number="6"
                  title="Readiness + Logistics"
                  copy="This final section helps me understand commitment, fit, and scheduling."
                  isMobile={isMobile}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(2, minmax(0, 1fr))",
                    gap: 16,
                  }}
                >
                  <Field label="How committed are you to implementing the advice or next steps from this call?">
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
                      <option value="Moderately committed" style={optionStyle}>
                        Moderately committed
                      </option>
                      <option value="Just exploring" style={optionStyle}>
                        Just exploring
                      </option>
                    </select>
                  </Field>

                  <Field label="If further coaching was clearly the best next step, would you be open to it?">
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

                <Field label="What days/times generally work best for a call?">
                  <textarea
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    rows={3}
                    style={textareaStyle}
                  />
                </Field>

                <Field label="Why do you want to work with Biomechanics & U specifically?">
                  <textarea
                    name="whyBiomechanicsAndU"
                    value={formData.whyBiomechanicsAndU}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                  />
                </Field>

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
                  }}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit 1:1 Coaching Call Application"}
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
