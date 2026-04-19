import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function ThankYouPage() {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  const calendlyLinks = {
    coaching: "https://calendly.com/biomechanicsandu-coach/1-1-coaching-call",
    assessment:
      "https://calendly.com/biomechanicsandu-coach/movement-assessment",
    general:
      "https://calendly.com/biomechanicsandu-coach/biomechanics-u-onboarding-call",
  };

  const bookingLink = calendlyLinks[type] || calendlyLinks.general;

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = bookingLink;
    }, 3000);

    return () => clearTimeout(timer);
  }, [bookingLink]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #07111F 0%, #091423 45%, #050B14 100%)",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>You're in.</h1>

        <p style={{ fontSize: "18px", marginBottom: "16px", color: "#C8D2E8" }}>
          Your payment is complete.
        </p>

        <p style={{ fontSize: "16px", marginBottom: "30px", color: "#9FB0D1" }}>
          Redirecting you to booking in 3 seconds...
        </p>

        <a
          href={bookingLink}
          style={{
            display: "inline-block",
            padding: "16px 28px",
            borderRadius: "999px",
            background: "#7aa8ff",
            color: "#08111f",
            fontWeight: "700",
            textDecoration: "none",
            fontSize: "16px",
          }}
        >
          Book Your Session Now
        </a>
      </div>
    </div>
  );
}
