import React from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentRedirectPage() {
  const [searchParams] = useSearchParams();
  const plan = (searchParams.get("plan") || "performance").toLowerCase();

  const plans = {
    foundation: {
      name: "Foundation Coaching",
      deposit: 99,
      monthly: 199,
      description:
        "Your coaching subscription will begin after your onboarding process.",
    },
    performance: {
      name: "Performance Coaching",
      deposit: 199,
      monthly: 399,
      description:
        "Your coaching subscription will begin after your onboarding process.",
    },
    elite: {
      name: "Elite Coaching",
      deposit: 199,
      monthly: 749,
      description:
        "Your coaching subscription will begin after your onboarding process.",
    },
  };

  const selectedPlan = plans[plan] || plans.performance;

  const calendlyLink =
    "https://calendly.com/biomechanicsandu-coach/biomechanics-u-onboarding-call";

  const handleBooking = () => {
    window.open(calendlyLink, "_blank");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top left, rgba(54,102,255,0.22), transparent 30%), radial-gradient(circle at top right, rgba(118,167,255,0.14), transparent 28%), linear-gradient(180deg, #07111F 0%, #091423 45%, #050B14 100%)",
        color: "#FFFFFF",
        fontFamily: "Inter, sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: 640,
          width: "100%",
          padding: 32,
          borderRadius: 24,
          background:
            "linear-gradient(180deg, rgba(20,24,35,0.96), rgba(12,16,26,0.96))",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.28)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#9CC0FF",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Deposit Confirmed
        </div>

        <h1 style={{ fontSize: 32, marginBottom: 12 }}>
          Book Your Onboarding Call
        </h1>

        <p
          style={{
            color: "#B8C4DA",
            marginBottom: 24,
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          Your <strong>$199 onboarding deposit</strong> has been received and
          applied to your <strong>{selectedPlan.name}</strong>.
        </p>

        <div
          style={{
            marginBottom: 28,
            padding: 20,
            borderRadius: 18,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              color: "#D7E3F4",
            }}
          >
            <span>Selected Plan</span>
            <strong>{selectedPlan.name}</strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              color: "#22c55e",
            }}
          >
            <span>Deposit Paid Today</span>
            <strong>${selectedPlan.deposit}</strong>
          </div>

          {selectedPlan.monthly > 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#FFFFFF",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              <span>Monthly Coaching</span>
              <span>${selectedPlan.monthly}/month</span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#FFFFFF",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              <span>Next Step</span>
              <span>Assessment + Program Build</span>
            </div>
          )}
        </div>

        <div
          style={{
            marginBottom: 28,
            padding: 18,
            borderRadius: 16,
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.2)",
            color: "#DDFBE7",
            lineHeight: 1.6,
            fontSize: 15,
          }}
        >
          {selectedPlan.monthly > 0 ? (
            <>
              Your onboarding call is the next step. After your assessment and
              initial setup, your <strong>${selectedPlan.monthly}/month</strong>{" "}
              coaching subscription will begin.
            </>
          ) : (
            <>
              Your onboarding call is the next step to complete your assessment,
              strategy, and custom program build.
            </>
          )}
        </div>

        <button
          onClick={handleBooking}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "none",
            background: "#ffffff",
            color: "#000",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Book Onboarding Call
        </button>

        <p style={{ marginTop: 16, fontSize: 13, color: "#8FA4C8" }}>
          Book your onboarding call now to complete your assessment and begin
          your coaching setup.
        </p>
      </div>
    </div>
  );
}
