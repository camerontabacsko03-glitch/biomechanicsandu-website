import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwm3cgq8IEJTvDBTMiuRR6wZV6TqDucnrcbUwYnVKHc0233kXY-Vfabhh9aSQbbZO6H/exec";

const BOOK_AND_PAY_LINK = "https://buy.stripe.com/bJe3co5vj1UX1Ln8Vm1kA07";

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
    <div style={{ marginBottom: 24, marginTop: 10 }}>
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

export default function MovementAssessmentApplicationPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const [formData, setFormData] = useState({
    serviceType: "Movement Assessment",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    occupation: "",
    trainingYears: "",
    trainingStyle: "",
    currentProgram: "",
    primaryPainAreas: "",
    painIntensity: "",
    painTiming: "",
    recurringIssues: "",
    movementStruggles: "",
    leftRightDifference: "",
    bestExercises: "",
    worstExercises: "",
    avoidedExercises: "",
    shortTermGoal: "",
    longTermGoal: "",
    whatToFix: "",
    successfulOutcome: "",
    videoNotes: "",
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
      formType: "Dedicated Movement Assessment Application",
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
              Movement Assessment Application
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
              Identify what is actually holding your movement back.
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
              This assessment is for lifters who want a clearer picture of their
              movement limitations, pain triggers, exercise fit, and where to go
              next. The goal is to turn confusion into direction.
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
                What this assessment is best for
              </div>
              <div
                style={{
                  color: "#C6D2EE",
                  lineHeight: 1.75,
                  fontSize: isMobile ? 14 : 15,
                }}
              >
                Clarifying pain points, movement restrictions, exercise
                selection issues, left-to-right differences, and what changes
                will likely improve training quality the fastest.
              </div>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              {[
                "You want clarity on what is actually limiting your lifts or movement.",
                "You feel like certain exercises never fit your body correctly.",
                "You have recurring pain, stiffness, asymmetry, or positional issues.",
                "You want a more structured understanding before committing to ongoing coaching.",
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
              Clear assessment, clear next step.
            </h2>

            <div style={{ display: "grid", gap: 16 }}>
              {[
                [
                  "01",
                  "Submit your assessment form",
                  "Answer the questions in detail so I can understand your background, limitations, pain map, and movement concerns.",
                ],
                [
                  "02",
                  "Complete payment",
                  "Once submitted, you’ll secure the Movement Assessment through the payment link.",
                ],
                [
                  "03",
                  "Book your assessment slot",
                  "You’ll choose your time in Calendly after payment.",
                ],
                [
                  "04",
                  "Get personalized direction",
                  "We’ll identify key issues, discuss likely movement constraints, and outline practical next steps.",
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
              Detail creates a better assessment.
            </h2>
            <p
              style={{
                color: "#B4BED4",
                lineHeight: 1.75,
                margin: "0 0 24px",
                fontSize: isMobile ? 15 : 16,
              }}
            >
              This form is designed to map your current training reality, not
              just collect basic info. Better answers here mean a more useful
              assessment and better recommendations.
            </p>

            <div style={{ display: "grid", gap: 14 }}>
              {[
                "Explain when and where pain happens, not just whether pain exists.",
                "Describe which exercises feel good versus which feel wrong or unstable.",
                "Tell me what movement patterns seem limited or uneven.",
                "Be honest about what you want to fix and what success would look like.",
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
                  Your <strong>Movement Assessment</strong> application has been
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
                    below to book and pay for your movement assessment in one
                    step.
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
                  Book and Pay for Your Movement Assessment
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
                    Movement Assessment Application
                  </h2>
                  <p
                    style={{
                      color: "#B4BED4",
                      lineHeight: 1.7,
                      marginTop: 12,
                      fontSize: isMobile ? 15 : 16,
                    }}
                  >
                    Fill this out in detail so I can understand your movement,
                    pain points, restrictions, and what you want to improve.
                  </p>
                </div>

                <SectionIntro
                  number="1"
                  title="Basic Information"
                  copy="Start with your basic details so I can identify who this assessment is for and how to contact you."
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

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(2, minmax(0, 1fr))",
                    gap: 16,
                  }}
                >
                  <Field label="Height">
                    <input
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      style={responsiveFieldStyle}
                    />
                  </Field>
                  <Field label="Weight">
                    <input
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      style={responsiveFieldStyle}
                    />
                  </Field>
                </div>

                <Field
                  label="Occupation / Daily Activity Level"
                  hint="Example: desk job, active job, physically demanding job, athlete"
                >
                  <input
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    style={responsiveFieldStyle}
                  />
                </Field>

                <SectionIntro
                  number="2"
                  title="Training Background"
                  copy="This section shows me what kind of training exposure you have and what your current setup looks like."
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
                  <Field label="How many years have you been training?">
                    <input
                      name="trainingYears"
                      value={formData.trainingYears}
                      onChange={handleChange}
                      style={responsiveFieldStyle}
                      required
                    />
                  </Field>

                  <Field label="What type of training do you mainly do?">
                    <select
                      name="trainingStyle"
                      value={formData.trainingStyle}
                      onChange={handleChange}
                      style={responsiveSelectStyle}
                      required
                    >
                      <option value="" disabled style={optionStyle}>
                        Select one
                      </option>
                      <option
                        value="Bodybuilding / hypertrophy"
                        style={optionStyle}
                      >
                        Bodybuilding / hypertrophy
                      </option>
                      <option
                        value="Strength / powerlifting"
                        style={optionStyle}
                      >
                        Strength / powerlifting
                      </option>
                      <option value="General fitness" style={optionStyle}>
                        General fitness
                      </option>
                      <option value="Athletic performance" style={optionStyle}>
                        Athletic performance
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

                <Field label="What does your current program look like?">
                  <textarea
                    name="currentProgram"
                    value={formData.currentProgram}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                    required
                  />
                </Field>

                <SectionIntro
                  number="3"
                  title="Pain Mapping + Current Restrictions"
                  copy="This section helps map where symptoms show up, how intense they are, and when they tend to happen."
                  isMobile={isMobile}
                />

                <Field label="What areas currently feel painful, restricted, unstable, or consistently tight?">
                  <textarea
                    name="primaryPainAreas"
                    value={formData.primaryPainAreas}
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
                  <Field label="How intense is the issue, on a scale of 1–10?">
                    <input
                      name="painIntensity"
                      value={formData.painIntensity}
                      onChange={handleChange}
                      style={responsiveFieldStyle}
                    />
                  </Field>

                  <Field label="When does it tend to show up most?">
                    <input
                      name="painTiming"
                      value={formData.painTiming}
                      onChange={handleChange}
                      style={responsiveFieldStyle}
                      placeholder="Example: squats, overhead pressing, after long sitting, next day soreness"
                    />
                  </Field>
                </div>

                <Field label="Have these issues been recurring for a while, or are they more recent?">
                  <textarea
                    name="recurringIssues"
                    value={formData.recurringIssues}
                    onChange={handleChange}
                    rows={3}
                    style={textareaStyle}
                  />
                </Field>

                <SectionIntro
                  number="4"
                  title="Movement Limitations"
                  copy="Tell me which patterns, positions, or sides feel limited so I can better understand the movement picture."
                  isMobile={isMobile}
                />

                <Field label="What movement patterns do you struggle with most?">
                  <textarea
                    name="movementStruggles"
                    value={formData.movementStruggles}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                    placeholder="Example: squat depth, hinging, overhead reaching, pressing, pulling, single-leg work, rotation"
                    required
                  />
                </Field>

                <Field label="Do you notice a left-to-right difference, asymmetry, or one side feeling more stable/mobile than the other?">
                  <textarea
                    name="leftRightDifference"
                    value={formData.leftRightDifference}
                    onChange={handleChange}
                    rows={3}
                    style={textareaStyle}
                  />
                </Field>

                <SectionIntro
                  number="5"
                  title="Exercise-Level Detail"
                  copy="This section is where you tell me which exercises fit you well and which ones feel wrong for your body."
                  isMobile={isMobile}
                />

                <Field label="What exercises feel best for you right now?">
                  <textarea
                    name="bestExercises"
                    value={formData.bestExercises}
                    onChange={handleChange}
                    rows={3}
                    style={textareaStyle}
                  />
                </Field>

                <Field label="What exercises feel worst, most awkward, or most irritating?">
                  <textarea
                    name="worstExercises"
                    value={formData.worstExercises}
                    onChange={handleChange}
                    rows={3}
                    style={textareaStyle}
                    required
                  />
                </Field>

                <Field label="Are there any exercises or positions you avoid completely? Why?">
                  <textarea
                    name="avoidedExercises"
                    value={formData.avoidedExercises}
                    onChange={handleChange}
                    rows={3}
                    style={textareaStyle}
                  />
                </Field>

                <SectionIntro
                  number="6"
                  title="Goals (Short-Term + Long-Term)"
                  copy="This section clarifies exactly what you want to fix, improve, or return to over both the short and long term."
                  isMobile={isMobile}
                />

                <Field label="What do you want to fix or improve first?">
                  <textarea
                    name="whatToFix"
                    value={formData.whatToFix}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
                    required
                  />
                </Field>

                <Field label="What is your short-term goal over the next 4 to 8 weeks?">
                  <textarea
                    name="shortTermGoal"
                    value={formData.shortTermGoal}
                    onChange={handleChange}
                    rows={3}
                    style={textareaStyle}
                    required
                  />
                </Field>

                <Field label="What is your long-term goal over the next 3 to 12 months?">
                  <textarea
                    name="longTermGoal"
                    value={formData.longTermGoal}
                    onChange={handleChange}
                    rows={3}
                    style={textareaStyle}
                    required
                  />
                </Field>

                <Field label="What would a successful outcome from this assessment look like to you?">
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
                  number="7"
                  title="Video Notes + Scheduling"
                  copy="This final section helps you give any extra context and lets me know when you are generally available."
                  isMobile={isMobile}
                />

                <Field
                  label="If you plan to send movement videos, what would you want reviewed?"
                  hint="Example: squat, RDL, split squat, overhead press, pull-up, gait, posture, setup positions"
                >
                  <textarea
                    name="videoNotes"
                    value={formData.videoNotes}
                    onChange={handleChange}
                    rows={3}
                    style={textareaStyle}
                  />
                </Field>

                <Field label="What days/times generally work best for your assessment call?">
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
                    : "Submit Movement Assessment Application"}
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
