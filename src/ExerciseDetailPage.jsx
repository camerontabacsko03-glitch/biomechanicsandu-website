import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Lock,
  Crown,
  Play,
  Check,
  Sparkles,
  Dumbbell,
  ShieldCheck,
} from "lucide-react";
import exerciseDatabase from "./data/exerciseDatabase";

function getEmbedUrl(url) {
  if (!url) return "";

  if (url.includes("youtube.com/embed/")) return url;

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  return url;
}

function ExerciseVideo({ url, title }) {
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div style={styles.videoPlaceholder}>
        <Play size={34} color="rgba(255,255,255,0.35)" />
        <p>No video added yet</p>
      </div>
    );
  }

  return (
    <div style={styles.videoFrame}>
      <iframe
        src={embedUrl}
        title={title || "Exercise tutorial video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={styles.iframe}
      />
    </div>
  );
}

function PremiumPaywall({ title = "Premium Section Locked", onUnlock }) {
  return (
    <div style={styles.paywall}>
      <div style={styles.paywallGlow} />

      <div style={styles.paywallIcon}>
        <Lock size={22} />
      </div>

      <p style={styles.paywallKicker}>Premium Coaching Library</p>

      <h3 style={styles.paywallTitle}>{title}</h3>

      <p style={styles.paywallText}>
        Unlock the full Biomechanics &amp; U exercise library with multi-angle
        tutorials, common mistakes, progressions, regressions, and Cam’s
        coaching notes.
      </p>

      <div style={styles.paywallBenefits}>
        <span>
          <Check size={16} /> Multi-angle video
        </span>
        <span>
          <Check size={16} /> Coaching cues
        </span>
        <span>
          <Check size={16} /> Cam’s notes
        </span>
      </div>

      <button type="button" onClick={onUnlock} style={styles.unlockButton}>
        View Coaching Options
      </button>
    </div>
  );
}

function InfoPanel({ title, children }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>{title}</h2>
      {children}
    </div>
  );
}

export default function ExerciseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState("main");

  const isMember = localStorage.getItem("isMember") === "true";

  const exercise = useMemo(() => {
    return exerciseDatabase.find((ex) => ex.id === id);
  }, [id]);

  const goToPricing = () => {
    window.location.href = "/#pricing";
  };

  if (!exercise) {
    return (
      <div style={styles.page}>
        <div style={styles.shell}>
          <button
            type="button"
            onClick={() => navigate("/exercise-library")}
            style={styles.backButton}
          >
            <ArrowLeft size={18} />
            Back to Library
          </button>

          <div style={styles.panel}>
            <h2>Exercise not found</h2>
            <p style={styles.muted}>
              This exercise could not be found in the Biomechanics &amp; U
              library.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const videos = exercise.videos || {
    main: exercise.videoUrl,
    side: exercise.sideVideoUrl,
    slow: exercise.slowVideoUrl,
    mistake: exercise.mistakeVideoUrl,
    corrected: exercise.correctedVideoUrl,
  };

  const videoTabs = [
    { key: "main", label: "Main Demo", premium: false },
    { key: "side", label: "Side Angle", premium: true },
    { key: "slow", label: "Slow Rep", premium: true },
    { key: "mistake", label: "Common Mistake", premium: true },
    { key: "corrected", label: "Corrected Version", premium: true },
  ].filter((tab) => videos?.[tab.key]);

  const activeTab = videoTabs.find((tab) => tab.key === activeVideo);
  const activeVideoLocked = activeTab?.premium && !isMember;
  const currentVideo = videos?.[activeVideo] || videos?.main || exercise.videoUrl;

  const primaryMuscles = exercise.primaryMuscles?.join(", ") || "—";
  const secondaryMuscles = exercise.secondaryMuscles?.join(", ") || "—";
  const equipment = Array.isArray(exercise.equipment)
    ? exercise.equipment.join(", ")
    : exercise.equipment || "—";

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <button
          type="button"
          onClick={() => navigate("/exercise-library")}
          style={styles.backButton}
        >
          <ArrowLeft size={18} />
          Back to Library
        </button>

        <section style={styles.hero}>
          <div>
            <p style={styles.kicker}>
              {exercise.premium ? "Premium Exercise" : "Exercise Tutorial"}
            </p>

            <h1 style={styles.title}>{exercise.name}</h1>

            <p style={styles.description}>
              {exercise.shortDescription ||
                exercise.mainTrainingApplication ||
                "A Biomechanics & U exercise tutorial built to help you train with better structure, cleaner execution, and more intent."}
            </p>

            <div style={styles.metaRow}>
              <span style={styles.metaPill}>
                <Dumbbell size={15} /> Primary: {primaryMuscles}
              </span>

              <span style={styles.metaPill}>
                Pattern: {exercise.movementPattern || "—"}
              </span>

              <span style={styles.metaPill}>
                ROM Bias: {exercise.romBias || "—"}
              </span>
            </div>
          </div>

          <div style={styles.heroCard}>
            <div style={styles.heroCardIcon}>
              {isMember ? <ShieldCheck size={24} /> : <Crown size={24} />}
            </div>

            <p style={styles.cardKicker}>
              {isMember ? "Premium Access Active" : "Upgrade Available"}
            </p>

            <h3 style={styles.cardTitle}>Built Around Your Structure</h3>

            <p style={styles.cardText}>
              Full tutorials include video breakdowns, common mistakes,
              progressions, regressions, and Cam’s notes.
            </p>

            {!isMember && (
              <button type="button" onClick={goToPricing} style={styles.cardButton}>
                View Coaching Options
              </button>
            )}
          </div>
        </section>

        <section style={styles.videoSection}>
          <div style={styles.sectionTop}>
            <div>
              <p style={styles.kicker}>Tutorial System</p>
              <h2 style={styles.sectionTitle}>Video Breakdown</h2>
            </div>

            {!isMember && (
              <span style={styles.lockBadge}>
                <Lock size={14} /> Premium clips locked
              </span>
            )}
          </div>

          {videoTabs.length > 0 && (
            <div style={styles.tabs}>
              {videoTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveVideo(tab.key)}
                  style={{
                    ...styles.tab,
                    ...(activeVideo === tab.key ? styles.activeTab : {}),
                  }}
                >
                  {tab.label}
                  {tab.premium && !isMember && <Lock size={13} />}
                </button>
              ))}
            </div>
          )}

          {activeVideoLocked ? (
            <PremiumPaywall
              title={`${activeTab?.label || "Premium Clip"} Locked`}
              onUnlock={goToPricing}
            />
          ) : (
            <ExerciseVideo url={currentVideo} title={exercise.name} />
          )}
        </section>

        <section style={styles.grid}>
          <InfoPanel title="Training Application">
            <p style={styles.muted}>
              {exercise.mainTrainingApplication ||
                "Use this exercise where it best fits the goal of the training session."}
            </p>
          </InfoPanel>

          <InfoPanel title="Muscle Focus">
            <p style={styles.muted}>
              <strong>Primary:</strong> {primaryMuscles}
              <br />
              <strong>Secondary:</strong> {secondaryMuscles}
            </p>
          </InfoPanel>

          <InfoPanel title="Exercise Details">
            <p style={styles.muted}>
              <strong>Movement Pattern:</strong>{" "}
              {exercise.movementPattern || "—"}
              <br />
              <strong>ROM Bias:</strong> {exercise.romBias || "—"}
              <br />
              <strong>Equipment:</strong> {equipment}
            </p>
          </InfoPanel>

          <InfoPanel title="Biomechanics Breakdown">
            <p style={styles.muted}>
              {exercise.biomechanicsBreakdown ||
                exercise.breakdown ||
                "This section explains what the exercise is meant to bias, what positions matter most, and how to perform it with better intent."}
            </p>
          </InfoPanel>

          <InfoPanel title="Key Coaching Cues">
            <ul style={styles.list}>
              {(exercise.cues || exercise.keyCues || []).length > 0 ? (
                (exercise.cues || exercise.keyCues).map((cue, index) => (
                  <li key={index}>{cue}</li>
                ))
              ) : (
                <>
                  <li>Control the rep.</li>
                  <li>Own the working range.</li>
                  <li>Keep tension on the target muscle.</li>
                </>
              )}
            </ul>
          </InfoPanel>

          <InfoPanel title="Common Mistakes">
            {isMember ? (
              <ul style={styles.list}>
                {(exercise.commonMistakes || []).length > 0 ? (
                  exercise.commonMistakes.map((mistake, index) => (
                    <li key={index}>{mistake}</li>
                  ))
                ) : (
                  <>
                    <li>Using too much load too early.</li>
                    <li>Losing position to chase reps.</li>
                    <li>Letting momentum replace control.</li>
                  </>
                )}
              </ul>
            ) : (
              <PremiumPaywall title="Common Mistakes Locked" onUnlock={goToPricing} />
            )}
          </InfoPanel>

          <InfoPanel title="Progressions">
            {isMember ? (
              <ul style={styles.list}>
                {(exercise.progressions || []).length > 0 ? (
                  exercise.progressions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <>
                    <li>Add load.</li>
                    <li>Add reps.</li>
                    <li>Add a pause or slower tempo.</li>
                  </>
                )}
              </ul>
            ) : (
              <PremiumPaywall title="Progressions Locked" onUnlock={goToPricing} />
            )}
          </InfoPanel>

          <InfoPanel title="Regressions">
            {isMember ? (
              <ul style={styles.list}>
                {(exercise.regressions || []).length > 0 ? (
                  exercise.regressions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <>
                    <li>Reduce load.</li>
                    <li>Use a more stable variation.</li>
                    <li>Shorten the range of motion temporarily.</li>
                  </>
                )}
              </ul>
            ) : (
              <PremiumPaywall title="Regressions Locked" onUnlock={goToPricing} />
            )}
          </InfoPanel>
        </section>

        <section style={styles.camsNotes}>
          <div style={styles.notesHeader}>
            <Sparkles size={24} color="#56a6ff" />
            <div>
              <p style={styles.kicker}>Cam’s Notes</p>
              <h2 style={styles.panelTitle}>Coach’s Application</h2>
            </div>
          </div>

          {isMember ? (
            <p style={styles.muted}>
              {exercise.camsNote ||
                exercise.camsNotes ||
                "Use this exercise when the goal is to create better execution, cleaner tension, and a setup that fits the individual instead of forcing the individual into the exercise."}
            </p>
          ) : (
            <PremiumPaywall title="Cam’s Notes Locked" onUnlock={goToPricing} />
          )}
        </section>
      </div>
    </div>
  );
}

const glassPanel = {
  border: "1px solid rgba(255,255,255,0.11)",
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.11), rgba(255,255,255,0.045))",
  boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
  backdropFilter: "blur(18px)",
  borderRadius: "28px",
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "110px 20px 80px",
    background:
      "radial-gradient(circle at top left, rgba(47,134,255,0.22), transparent 34%), radial-gradient(circle at bottom right, rgba(255,255,255,0.08), transparent 28%), #05070d",
    color: "#fff",
  },
  shell: {
    maxWidth: "1180px",
    margin: "0 auto",
  },
  backButton: {
    marginBottom: "28px",
    padding: "10px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.4fr) minmax(280px, 380px)",
    gap: "28px",
    marginBottom: "28px",
  },
  kicker: {
    margin: "0 0 10px",
    color: "#56a6ff",
    fontSize: "0.78rem",
    fontWeight: 900,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    fontSize: "clamp(2.4rem, 6vw, 5rem)",
    lineHeight: 0.95,
    letterSpacing: "-0.06em",
  },
  description: {
    maxWidth: "760px",
    margin: "22px 0 0",
    color: "rgba(255,255,255,0.72)",
    fontSize: "1.05rem",
    lineHeight: 1.7,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "22px",
  },
  metaPill: {
    padding: "10px 13px",
    border: "1px solid rgba(86,166,255,0.22)",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.82)",
    fontSize: "0.85rem",
    fontWeight: 750,
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
  },
  heroCard: {
    ...glassPanel,
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  heroCardIcon: {
    width: "48px",
    height: "48px",
    display: "grid",
    placeItems: "center",
    borderRadius: "16px",
    background: "rgba(86,166,255,0.16)",
    color: "#56a6ff",
    marginBottom: "16px",
  },
  cardKicker: {
    margin: 0,
    color: "#56a6ff",
    fontSize: "0.8rem",
    fontWeight: 900,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
  },
  cardTitle: {
    margin: "12px 0 10px",
    fontSize: "1.7rem",
    letterSpacing: "-0.04em",
  },
  cardText: {
    margin: 0,
    color: "rgba(255,255,255,0.68)",
    lineHeight: 1.65,
  },
  cardButton: {
    marginTop: "18px",
    padding: "13px 16px",
    borderRadius: "999px",
    border: "none",
    background: "#168cff",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
  },
  videoSection: {
    ...glassPanel,
    padding: "22px",
    marginBottom: "28px",
  },
  sectionTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
    marginBottom: "16px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.45rem",
    letterSpacing: "-0.04em",
  },
  lockBadge: {
    padding: "8px 11px",
    borderRadius: "999px",
    background: "rgba(86,166,255,0.12)",
    border: "1px solid rgba(86,166,255,0.24)",
    color: "rgba(255,255,255,0.82)",
    fontSize: "0.78rem",
    fontWeight: 850,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  tabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "18px",
  },
  tab: {
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.76)",
    borderRadius: "999px",
    padding: "10px 14px",
    fontWeight: 850,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
  },
  activeTab: {
    background: "rgba(86,166,255,0.18)",
    borderColor: "rgba(86,166,255,0.4)",
    color: "#fff",
  },
  videoFrame: {
    position: "relative",
    width: "100%",
    paddingBottom: "56.25%",
    overflow: "hidden",
    borderRadius: "22px",
    background: "#000",
  },
  iframe: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: 0,
  },
  videoPlaceholder: {
    minHeight: "360px",
    borderRadius: "22px",
    border: "1px dashed rgba(255,255,255,0.18)",
    color: "rgba(255,255,255,0.55)",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "22px",
  },
  panel: {
    ...glassPanel,
    padding: "26px",
  },
  panelTitle: {
    margin: "0 0 14px",
    fontSize: "1.35rem",
    letterSpacing: "-0.04em",
  },
  muted: {
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.7,
  },
  list: {
    margin: 0,
    paddingLeft: "20px",
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.7,
  },
  paywall: {
    position: "relative",
    overflow: "hidden",
    padding: "28px",
    borderRadius: "24px",
    border: "1px solid rgba(86,166,255,0.28)",
    background:
      "linear-gradient(145deg, rgba(86,166,255,0.18), rgba(255,255,255,0.055))",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
  },
  paywallGlow: {
    position: "absolute",
    width: "180px",
    height: "180px",
    borderRadius: "999px",
    background: "rgba(86,166,255,0.18)",
    filter: "blur(40px)",
    top: "-70px",
    right: "-60px",
  },
  paywallIcon: {
    position: "relative",
    width: "46px",
    height: "46px",
    display: "grid",
    placeItems: "center",
    borderRadius: "16px",
    background: "rgba(86,166,255,0.18)",
    color: "#ffffff",
    marginBottom: "14px",
  },
  paywallKicker: {
    position: "relative",
    margin: "0 0 8px",
    color: "#56a6ff",
    fontSize: "0.75rem",
    fontWeight: 900,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
  paywallTitle: {
    position: "relative",
    margin: "0 0 10px",
    fontSize: "1.45rem",
    letterSpacing: "-0.04em",
  },
  paywallText: {
    position: "relative",
    margin: "0 0 18px",
    color: "rgba(255,255,255,0.7)",
    lineHeight: 1.65,
  },
  paywallBenefits: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "20px",
  },
  unlockButton: {
    position: "relative",
    width: "100%",
    padding: "15px 18px",
    borderRadius: "14px",
    border: "none",
    background: "#168cff",
    color: "#ffffff",
    fontSize: "0.95rem",
    fontWeight: 950,
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  camsNotes: {
    ...glassPanel,
    marginTop: "22px",
    padding: "30px",
    border: "1px solid rgba(86,166,255,0.24)",
    background:
      "radial-gradient(circle at top left, rgba(86,166,255,0.18), transparent 34%), linear-gradient(145deg, rgba(255,255,255,0.11), rgba(255,255,255,0.045))",
  },
  notesHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "16px",
  },
};
