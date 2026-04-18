import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./styles.css";
import logo from "./logo.png";
import ApplyForCoachingPage from "./ApplyForCoachingPage";
import CoachingCallApplicationPage from "./CoachingCallApplicationPage";
import MovementAssessmentApplicationPage from "./MovementAssessmentApplicationPage";
import ExerciseLibrary from "./pages/ExerciseLibrary";
import PaymentRedirectPage from "./PaymentRedirectPage";
import ScrollToTop from "./ScrollToTop";

function IntroScreen() {
  return (
    <div className="intro-screen">
      <div className="intro-content">
        <img src={logo} alt="Biomechanics & U logo" className="intro-logo" />
        <div className="intro-text">
          BIOMECHANICS <span>&amp; U</span>
        </div>

        <div className="intro-sub">Strength • Rehab • Performance</div>
      </div>
    </div>
  );
}

function QuoteSection({ text }) {
  return (
    <section
      style={{
        padding: "72px 0",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(14,19,28,1) 0%, rgba(18,25,36,1) 100%)",
      }}
    >
      <div className="container narrow">
        <p
          style={{
            textAlign: "center",
            fontSize: "clamp(1.6rem, 3vw, 2.7rem)",
            lineHeight: 1.25,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          “{text}”
        </p>
      </div>
    </section>
  );
}

function ProblemSolutionSection() {
  return (
    <section
      id="about"
      className="section"
      style={{
        paddingTop: "96px",
        paddingBottom: "96px",
      }}
    >
      <div className="container">
        <div
          className="narrow"
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <p className="eyebrow">Biomechanics-Based Hypertrophy Coaching</p>

          <h2 style={{ marginBottom: "20px" }}>
            Build muscle with training built around your structure
          </h2>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              fontSize: "1.08rem",
              lineHeight: 1.8,
              opacity: 0.9,
            }}
          >
            Biomechanics &amp; U is built for lifters who want more than generic
            programming. This is biomechanics-based hypertrophy coaching for
            people who want to build size, move better, stay strong, and train
            with their structure instead of against it.
          </p>
        </div>

        <div
          className="card-grid"
          style={{ gridTemplateColumns: "1fr 1fr", gap: "24px" }}
        >
          <div
            className="glass-box"
            style={{
              padding: "32px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "24px",
            }}
          >
            <p
              className="eyebrow"
              style={{ marginBottom: "16px", color: "#ffb4b4" }}
            >
              The Problem
            </p>

            <h3 style={{ marginBottom: "18px" }}>
              Most lifters are working hard — but not training for their body
            </h3>

            <ul
              style={{
                paddingLeft: "20px",
                margin: 0,
                lineHeight: 1.9,
              }}
            >
              <li>Constant tightness, pain, or recurring flare-ups</li>
              <li>Plateaus even though effort is high</li>
              <li>Programs that ignore structure and mechanics</li>
              <li>Exercises that never feel right for your body</li>
              <li>Strength in some lifts, but limitations in others</li>
            </ul>
          </div>

          <div
            className="glass-box"
            style={{
              padding: "32px",
              border: "1px solid rgba(122,168,255,0.28)",
              borderRadius: "24px",
              background:
                "linear-gradient(180deg, rgba(122,168,255,0.08) 0%, rgba(122,168,255,0.03) 100%)",
            }}
          >
            <p className="eyebrow" style={{ marginBottom: "16px" }}>
              The Solution
            </p>

            <h3 style={{ marginBottom: "18px" }}>
              A hypertrophy system built around your structure, mechanics, and
              goals
            </h3>

            <ul
              style={{
                paddingLeft: "20px",
                margin: 0,
                lineHeight: 1.9,
              }}
            >
              <li>
                Exercise selection based on your body and movement profile
              </li>
              <li>
                Hypertrophy programming that builds muscle without forcing bad
                positions
              </li>
              <li>Pain-aware substitutions and smarter progressions</li>
              <li>Coaching that adapts as you improve and get stronger</li>
              <li>
                Better movement, better output, and more sustainable progress
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function MeetTheTrainerSection() {
  return (
    <section id="trainer" className="section meet-section">
      <div className="container">
        <div className="meet-grid">
          <div className="meet-image-wrap">
            <div className="meet-image-accent" />

            <div className="meet-image-shell">
              <img
                src="/trainer-photo.png"
                alt="Trainer for Biomechanics & U"
                className="meet-image"
              />

              <div className="meet-floating-card">
                <div className="meet-floating-label">Biomechanics &amp; U</div>
                <div className="meet-floating-title">
                  Built Around Your Structure
                </div>
              </div>
            </div>
          </div>

          <div className="meet-copy">
            <p className="eyebrow">Meet the Trainer</p>

            <h2 className="meet-title">
              Build muscle with coaching that understands both hypertrophy and
              biomechanics
            </h2>

            <p className="meet-text">
              I built Biomechanics &amp; U for lifters who want more than hard
              workouts and generic templates. My coaching is built around your
              structure, your movement patterns, and your long-term progress.
            </p>

            <p className="meet-text">
              The goal is not just to help you train harder. It is to help you
              build muscle, move better, and stay strong with programming that
              actually fits your body.
            </p>

            <div className="meet-points">
              <div className="meet-point">Built around your structure</div>
              <div className="meet-point">
                Hypertrophy with biomechanics in mind
              </div>
              <div className="meet-point">
                Strength progress without constant setbacks
              </div>
            </div>

            <div className="meet-quote-box">
              <p>
                “My goal is to help lifters build muscle and perform at a high
                level without constantly fighting their own body.”
              </p>
            </div>

            <div className="meet-actions">
              <Link to="/apply" className="btn btn-primary">
                Work With Me
              </Link>

              <a href="#pricing" className="btn btn-secondary">
                View Coaching Options
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsStatsStrip() {
  return (
    <section className="results-strip-section">
      <div className="container">
        <div className="results-strip-shell">
          <div className="results-strip-head">
            <p className="eyebrow">What This Coaching Is Built To Do</p>
            <h2 className="results-strip-title">
              Better training outcomes without the usual trade-offs
            </h2>
            <p className="results-strip-text">
              Biomechanics &amp; U is built for lifters who want more than hard
              workouts and generic templates. The goal is simple: build muscle,
              move better, stay strong, and keep progressing without constant
              setbacks.
            </p>
          </div>

          <div className="results-strip-grid">
            <div className="result-stat-card">
              <div className="result-stat-value">Built for Growth</div>
              <div className="result-stat-label">
                Programming that prioritizes real hypertrophy
              </div>
            </div>

            <div className="result-stat-card">
              <div className="result-stat-value">Built for Your Body</div>
              <div className="result-stat-label">
                Exercise selection matched to your structure
              </div>
            </div>

            <div className="result-stat-card">
              <div className="result-stat-value">Built to Perform</div>
              <div className="result-stat-label">
                Strength progress with better movement quality
              </div>
            </div>

            <div className="result-stat-card">
              <div className="result-stat-value">Built to Last</div>
              <div className="result-stat-label">
                Long-term training without constant setbacks
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const premiumButtonBase = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "220px",
    padding: "14px 22px",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: 700,
    transition: "all 0.3s ease",
    transform: "translateY(0)",
  };

  return (
    <section
      className="section"
      style={{
        paddingTop: "96px",
        paddingBottom: "110px",
      }}
    >
      <div className="container">
        <div
          className="glass-box"
          style={{
            maxWidth: "980px",
            margin: "0 auto",
            padding: "48px 28px",
            textAlign: "center",
            borderRadius: "32px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
          }}
        >
          <p className="eyebrow">Start Here</p>

          <h2 style={{ marginBottom: "18px" }}>
            Start coaching built around your structure
          </h2>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto 34px",
              fontSize: "1.08rem",
              lineHeight: 1.8,
              opacity: 0.9,
            }}
          >
            Choose the level of support that fits your goals, or start with a
            one-time assessment to get clear on your next step. Biomechanics
            &amp; U is built for lifters who want a system that fits their body
            — not another generic template.
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#pricing"
              style={{
                ...premiumButtonBase,
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(8px)",
              }}
            >
              View Pricing
            </a>

            <Link
              to="/apply"
              style={{
                ...premiumButtonBase,
                background: "#7aa8ff",
                color: "#08111f",
                border: "1px solid rgba(122,168,255,0.55)",
                boxShadow: "0 0 30px rgba(122,168,255,0.22)",
              }}
            >
              Start Coaching
            </Link>

            <a
              href="#pricing"
              style={{
                ...premiumButtonBase,
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(122,168,255,0.38)",
              }}
            >
              Book Assessment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <div className="site">
      <header className="navbar">
        <div className="container nav-inner">
          <Link to="/" className="brand brand-link">
            <div className="logo-shell">
              <img src={logo} alt="Biomechanics & U logo" className="logo" />
            </div>

            <div className="brand-copy">
              <div className="brand-title">
                BIOMECHANICS <span>&amp; U</span>
              </div>
            </div>
          </Link>

          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#for-who">Who It's For</a>
            <a href="#process">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#trainer">Meet the Trainer</a>
            <Link to="/exercise-library">Exercise Library</Link>
          </nav>

          <div className="nav-actions">
            <Link to="/apply" className="btn btn-primary nav-cta">
              Apply Now
            </Link>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Biomechanics-Based Hypertrophy Coaching</p>

            <h1>
              Build Muscle. <span>Move Better. Stay Strong.</span>
            </h1>

            <p className="hero-text">
              Coaching for lifters who want to build muscle and strength with a
              system built around their structure. Train with better mechanics,
              smarter exercise selection, and fewer setbacks.
            </p>

            <p className="hero-subline">
              Built Around Your Structure • Hypertrophy • Strength • Longevity
            </p>

            <div className="hero-buttons">
              <Link to="/apply" className="btn btn-primary">
                Apply for Coaching
              </Link>
              <a href="#pricing" className="btn btn-secondary">
                View Coaching Options
              </a>
            </div>

            <div className="hero-cards">
              <div className="mini-card">
                Muscle-building systems built for your body
              </div>
              <div className="mini-card">
                Better movement without sacrificing hypertrophy
              </div>
              <div className="mini-card">
                Biomechanics-based coaching for serious lifters
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel-glow" />

            <div className="hero-panel-card hero-panel-primary">
              <div className="hero-panel-label">
                Built Around Your Structure
              </div>
              <h3>Train with better mechanics, not generic templates</h3>
              <p>
                Hypertrophy coaching designed to match your body, reduce
                unnecessary irritation, and create more sustainable progress.
              </p>
            </div>

            <div className="hero-panel-grid">
              <div className="hero-panel-card small">
                <div className="hero-stat">Muscle</div>
                <p>
                  Hypertrophy-focused programming with smarter exercise
                  selection.
                </p>
              </div>

              <div className="hero-panel-card small">
                <div className="hero-stat">Movement</div>
                <p>
                  Biomechanics-based adjustments that work with your structure.
                </p>
              </div>

              <div className="hero-panel-card small">
                <div className="hero-stat">Longevity</div>
                <p>
                  Build strength and size without constant breakdowns or
                  setbacks.
                </p>
              </div>

              <div className="hero-panel-card small">
                <div className="hero-stat">Coaching</div>
                <p>
                  Premium support for lifters who want real progress and
                  clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="strip">
        <div className="container strip-grid">
          <div>Built Around Your Structure</div>
          <div>Biomechanics-Based</div>
          <div>Hypertrophy Focused</div>
          <div>Premium Coaching</div>
        </div>
      </section>

      <QuoteSection text="Most programs add weight. We build bodies that can handle it." />

      <ProblemSolutionSection />

      <section id="for-who" className="section">
        <div className="container narrow">
          <h2>Who This Is For</h2>

          <div className="glass-box">
            <p>
              • Lifters dealing with pain, limitations, or recurring flare-ups
            </p>
            <p>• People stuck between bodybuilding goals and rehab needs</p>
            <p>• Lifters who want size and strength without breaking down</p>
            <p>
              • People who need training built around their structure, not a
              template
            </p>
          </div>
        </div>
      </section>

      <QuoteSection text="If your training isn’t built around your mechanics, you’re leaving progress on the table." />

      <section id="process" className="section">
        <div className="container">
          <h2>How It Works</h2>

          <div className="card-grid three">
            <div className="step-card">
              <h3>Apply</h3>
              <p>
                Fill out your coaching application and tell me your goals,
                injury history, and current limitations.
              </p>
            </div>

            <div className="step-card">
              <h3>Assess</h3>
              <p>
                We look at your structure, movement patterns, training history,
                and what is holding back better progress.
              </p>
            </div>

            <div className="step-card">
              <h3>Build</h3>
              <p>
                You get a customized hypertrophy plan with coaching built around
                your body, not generic programming.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="section pricing-section">
        <div className="container">
          <div className="pricing-head">
            <p className="eyebrow">Coaching Options</p>
            <h2 className="section-title">
              Choose the level of coaching that fits your goals
            </h2>
            <p className="pricing-intro">
              Biomechanics &amp; U is designed to give lifters a clear path from
              structured online coaching to higher-touch support with more
              direct feedback and in-person access.
            </p>
            <p className="pricing-intro">
              Each level builds on the last — more support, more feedback, and
              faster progress.
            </p>
          </div>

          <div className="pricing-note-box">
            <h3>All coaching begins with a structured onboarding process</h3>
            <div
              className="pricing-steps"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(260px, 320px) 1fr",
                gap: "32px",
                alignItems: "start",
              }}
            >
              <div>
                <strong>One-time onboarding fee:</strong> varies by tier
              </div>
              <div style={{ maxWidth: "620px" }}>
                Includes movement assessment, onboarding call, and initial
                program setup. Foundation begins at $99, while higher tiers
                include a $199 onboarding process.
              </div>
            </div>
          </div>

          <div className="pricing-note-box" style={{ marginTop: "20px" }}>
            <h3>How coaching is delivered</h3>
            <div
              className="pricing-steps"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "24px",
                alignItems: "start",
              }}
            >
              <div>
                <strong>Foundation</strong>
                <div style={{ marginTop: "8px" }}>
                  Fully online and built for flexibility, consistency, and
                  expert programming.
                </div>
              </div>

              <div>
                <strong>Performance</strong>
                <div style={{ marginTop: "8px" }}>
                  Introduces in-person coaching access for clients who want more
                  direct support.
                </div>
              </div>

              <div>
                <strong>Elite</strong>
                <div style={{ marginTop: "8px" }}>
                  The highest-touch flagship option with the most hands-on
                  coaching experience.
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "28px",
                paddingTop: "24px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  maxWidth: "760px",
                  margin: "0 auto 18px",
                  fontSize: "1.02rem",
                  lineHeight: 1.8,
                  opacity: 0.92,
                }}
              >
                Online training gives you structure, guidance, and a clear path
                forward. To take it a step further, invest in in-person
                training—where every rep is coached, every detail refined, and
                every limitation addressed in real time to help you become the
                strongest version of yourself.
              </p>

              <Link to="/apply?plan=performance" className="btn btn-primary">
                Apply for In-Person Coaching
              </Link>
            </div>
          </div>

          <div className="card-grid three pricing-grid">
            <div className="price-card">
              <div className="plan-label">
                Level 1 • Online coaching foundation
              </div>
              <h3>Foundation Coaching</h3>
              <div className="price">
                $199<span>/mo</span>
              </div>
              <p className="price-description">
                A personalized online coaching option for lifters who want
                structure, clarity, and a smarter plan built around their body.
              </p>

              <div className="plan-subhead">What you get</div>
              <ul className="plan-list">
                <li>Personalized training program</li>
                <li>Exercise library access</li>
                <li>Monthly program updates</li>
                <li>Basic form review</li>
                <li>Built-in pain-aware exercise substitutions</li>
              </ul>

              <div className="plan-subhead">Best for</div>
              <p className="plan-fit">
                Lifters who want expert programming and a strong online coaching
                structure without needing the highest level of weekly support.
              </p>

              <div
                style={{
                  marginTop: "18px",
                  marginBottom: "18px",
                  fontSize: "0.95rem",
                  opacity: 0.85,
                  fontWeight: 600,
                }}
              >
                + $99 one-time onboarding fee
              </div>

              <Link
                to="/apply?plan=foundation"
                className="btn btn-outline full-width-btn"
              >
                Apply for Foundation
              </Link>
            </div>

            <div className="price-card featured-plan">
              <div className="featured-badge">Most Popular</div>
              <div className="plan-label">
                Level 2 • Online coaching + in-person access
              </div>
              <h3>Performance Coaching</h3>
              <div className="price">
                $399<span>/mo</span>
              </div>
              <p className="price-description">
                Everything in Foundation, plus more direct feedback, weekly
                coaching support, and access to in-person sessions for clients
                who want a more hands-on experience.
              </p>

              <div className="plan-subhead">Everything in Foundation, plus</div>
              <ul className="plan-list">
                <li>Weekly check-ins and coaching feedback</li>
                <li>Movement analysis and form review</li>
                <li>Pain and injury modification strategy</li>
                <li>Progressive overload tracking</li>
                <li>Ongoing messaging support</li>
                <li>In-person coaching access</li>
              </ul>

              <div className="plan-subhead">Best for</div>
              <p className="plan-fit">
                Clients who want to build muscle, improve movement quality, and
                have more direct coaching support with the option for in-person
                guidance.
              </p>

              <div
                style={{
                  marginTop: "18px",
                  marginBottom: "18px",
                  fontSize: "0.95rem",
                  opacity: 0.92,
                  fontWeight: 700,
                }}
              >
                + $199 one-time onboarding fee
              </div>

              <Link
                to="/apply?plan=performance"
                className="btn btn-primary full-width-btn"
              >
                Apply for Performance
              </Link>
            </div>

            <div className="price-card">
              <div className="plan-label">
                Level 3 • Flagship high-touch coaching
              </div>
              <h3>Elite Coaching</h3>
              <div className="price">
                $749<span>/mo</span>
              </div>
              <p className="price-description">
                The highest level of support inside Biomechanics &amp; U. Elite
                combines premium online coaching, priority access, deeper
                analysis, and the most hands-on coaching experience available.
              </p>

              <div className="plan-subhead">
                Everything in Performance, plus
              </div>
              <ul className="plan-list">
                <li>Priority support</li>
                <li>Advanced movement and biomechanics breakdown</li>
                <li>Faster custom exercise changes as needed</li>
                <li>1–2 coaching calls per month</li>
                <li>Higher-touch strategy and accountability</li>
                <li>Priority in-person coaching access</li>
              </ul>

              <div className="plan-subhead">Best for</div>
              <p className="plan-fit">
                Lifters with advanced goals, recurring limitations, or a need
                for the most premium, hands-on coaching experience possible.
              </p>

              <div
                style={{
                  marginTop: "18px",
                  marginBottom: "18px",
                  fontSize: "0.95rem",
                  opacity: 0.85,
                  fontWeight: 600,
                }}
              >
                + $199 one-time onboarding fee
              </div>

              <Link
                to="/apply?plan=elite"
                className="btn btn-outline full-width-btn"
              >
                Apply for Elite
              </Link>
            </div>
          </div>

          <div
            className="pricing-note-box"
            style={{ marginTop: "36px", marginBottom: "36px" }}
          >
            <h3>Not ready for full coaching?</h3>
            <div className="pricing-steps">
              <div>
                Start with a one-time option and get expert direction before
                committing to monthly coaching.
              </div>
            </div>
          </div>

          <div
            className="card-grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "36px",
            }}
          >
            <div className="price-card">
              <div className="plan-label">One-time service</div>
              <h3>Movement Assessment</h3>
              <div className="price">
                $99<span> one-time</span>
              </div>
              <p className="price-description">
                A focused movement screen to identify limitations, improve
                mechanics, and give you a clear path forward.
              </p>

              <div className="plan-subhead">What you get</div>
              <ul className="plan-list">
                <li>Movement screen</li>
                <li>Posture and mobility review</li>
                <li>Personalized recommendations</li>
                <li>Great first step before full coaching</li>
              </ul>

              <div className="plan-subhead">Best for</div>
              <p className="plan-fit">
                Lifters who want clarity on what is holding them back before
                committing to ongoing coaching.
              </p>

              <Link
                to="/apply/movement-assessment"
                className="btn btn-outline full-width-btn"
              >
                Book Assessment
              </Link>
            </div>

            <div className="price-card">
              <div className="plan-label">One-time service</div>
              <h3>1:1 Coaching Call</h3>
              <div className="price">
                $125<span> one-time</span>
              </div>
              <p className="price-description">
                A focused strategy session to help you troubleshoot training,
                mobility, pain points, or programming questions.
              </p>

              <div className="plan-subhead">What you get</div>
              <ul className="plan-list">
                <li>1:1 coaching session</li>
                <li>Training and movement guidance</li>
                <li>Q&amp;A support</li>
                <li>Actionable next steps</li>
              </ul>

              <div className="plan-subhead">Best for</div>
              <p className="plan-fit">
                Lifters who want immediate guidance, problem-solving, and a
                clearer plan for how to move forward.
              </p>

              <Link
                to="/apply/coaching-call"
                className="btn btn-outline full-width-btn"
              >
                Book Call
              </Link>
            </div>
          </div>

          <div className="positioning-box" style={{ marginBottom: "32px" }}>
            <h3>Assessment credit toward coaching</h3>
            <p>
              If you move forward with full coaching after your Movement
              Assessment, that assessment fee can be credited toward your
              onboarding.
            </p>
          </div>

          <div className="pricing-note-box">
            <h3>What happens after you get started</h3>
            <div className="pricing-steps">
              <div>
                <strong>1.</strong> Choose your coaching option
              </div>
              <div>
                <strong>2.</strong> Complete onboarding and movement review
              </div>
              <div>
                <strong>3.</strong> Book your assessment or onboarding call
              </div>
              <div>
                <strong>4.</strong> Begin a structured plan built around your
                body and goals
              </div>
            </div>
          </div>

          <div className="positioning-box">
            <h3>Why this is different</h3>
            <p>
              Generic programs push harder without considering how your body
              moves. Traditional rehab often stops short of helping you actually
              build muscle and perform. Biomechanics &amp; U bridges that gap
              with biomechanics-based hypertrophy coaching built for lifters who
              want size, strength, better mechanics, and fewer setbacks.
            </p>
          </div>
        </div>
      </section>

      <MeetTheTrainerSection />
      <ResultsStatsStrip />
      <QuoteSection text="This isn’t about doing more. It’s about doing what actually works for your body." />
      <FinalCTASection />

      <footer className="footer">
        <div className="container footer-inner">
          <img src={logo} alt="logo" className="logo footer-logo" />

          <p>
            © {new Date().getFullYear()} Biomechanics &amp; U. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showIntro && <IntroScreen />}

      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply" element={<ApplyForCoachingPage />} />
          <Route
            path="/apply/coaching-call"
            element={<CoachingCallApplicationPage />}
          />
          <Route
            path="/apply/movement-assessment"
            element={<MovementAssessmentApplicationPage />}
          />
          <Route path="/payment-redirect" element={<PaymentRedirectPage />} />
          <Route path="/exercise-library" element={<ExerciseLibrary />} />
        </Routes>
      </Router>
    </>
  );
}
