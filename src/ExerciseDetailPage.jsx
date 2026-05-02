import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Lock, ArrowLeft, Check } from "lucide-react";
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

function ExerciseVideo({ url }) {
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return <div style={styles.videoPlaceholder}>No video</div>;
  }

  return (
    <div style={styles.videoFrame}>
      <iframe src={embedUrl} style={styles.iframe} allowFullScreen />
    </div>
  );
}

function PremiumPaywall({ title, compact, onUnlock }) {
  if (compact) {
    return (
      <div style={styles.compactPaywall}>
        <div style={styles.compactLockIcon}>
          <Lock size={16} />
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={styles.compactPaywallTitle}>{title}</h3>

          <button onClick={onUnlock} style={styles.compactUnlockButton}>
            Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.paywall}>
      <div style={styles.paywallIcon}>
        <Lock size={22} />
      </div>

      <h3 style={styles.paywallTitle}>{title}</h3>

      <p style={styles.paywallText}>
        Unlock full exercise tutorials, breakdowns, and coaching notes.
      </p>

      <div style={styles.paywallBenefits}>
        <span>
          <Check size={14} /> Video breakdowns
        </span>
        <span>
          <Check size={14} /> Coaching cues
        </span>
        <span>
          <Check size={14} /> Cam’s notes
        </span>
      </div>

      <button onClick={onUnlock} style={styles.unlockButton}>
        View Coaching Options
      </button>
    </div>
  );
}

function Panel({ title, children }) {
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

  if (!exercise) return <div>Not found</div>;

  const videos = {
    main: exercise.videoUrl,
    side: exercise.sideVideoUrl,
    slow: exercise.slowVideoUrl,
    mistake: exercise.mistakeVideoUrl,
    corrected: exercise.correctedVideoUrl,
  };

  const videoTabs = Object.entries(videos).filter(([_, v]) => v);

  const currentVideo = videos[activeVideo];
  const isLockedVideo = activeVideo !== "main" && !isMember;

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <button
          onClick={() => navigate("/exercise-library")}
          style={styles.back}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <h1 style={styles.title}>{exercise.name}</h1>

        {/* VIDEO */}
        <div style={styles.videoSection}>
          <div style={styles.tabs}>
            {videoTabs.map(([key]) => (
              <button
                key={key}
                onClick={() => setActiveVideo(key)}
                style={{
                  ...styles.tab,
                  ...(activeVideo === key ? styles.activeTab : {}),
                }}
              >
                {key}
              </button>
            ))}
          </div>

          {isLockedVideo ? (
            <PremiumPaywall
              title="Premium Video Locked"
              onUnlock={goToPricing}
            />
          ) : (
            <ExerciseVideo url={currentVideo} />
          )}
        </div>

        {/* GRID */}
        <div style={styles.grid}>
          <Panel title="Training Application">
            <p>{exercise.mainTrainingApplication}</p>
          </Panel>

          <Panel title="Muscle Focus">
            <p>{exercise.primaryMuscles?.join(", ")}</p>
          </Panel>

          <Panel title="Biomechanics">
            <p>{exercise.biomechanicsBreakdown || "—"}</p>
          </Panel>

          <Panel title="Cues">
            <ul>
              {(exercise.cues || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Panel>

          <Panel title="Common Mistakes">
            {isMember ? (
              <ul>
                {(exercise.commonMistakes || []).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            ) : (
              <PremiumPaywall compact title="Locked" onUnlock={goToPricing} />
            )}
          </Panel>

          <Panel title="Progressions">
            {isMember ? (
              <ul>
                {(exercise.progressions || []).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            ) : (
              <PremiumPaywall compact title="Locked" onUnlock={goToPricing} />
            )}
          </Panel>

          <Panel title="Regressions">
            {isMember ? (
              <ul>
                {(exercise.regressions || []).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            ) : (
              <PremiumPaywall compact title="Locked" onUnlock={goToPricing} />
            )}
          </Panel>
        </div>

        {/* CAM NOTES */}
        <div style={styles.notes}>
          <h2>Cam’s Notes</h2>

          {isMember ? (
            <p>{exercise.camsNotes || "—"}</p>
          ) : (
            <PremiumPaywall title="Cam’s Notes Locked" onUnlock={goToPricing} />
          )}
        </div>
      </div>
    </div>
  );
}
