import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
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

function Video({ url }) {
  const embed = getEmbedUrl(url);

  if (!embed) {
    return (
      <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.6 }}>
        No video
      </div>
    );
  }

  return (
    <div style={{ position: "relative", paddingBottom: "56.25%" }}>
      <iframe
        src={embed}
        style={{ position: "absolute", width: "100%", height: "100%", border: 0 }}
        allowFullScreen
      />
    </div>
  );
}

function Paywall({ compact, onUnlock }) {
  if (compact) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#0e1625",
        padding: 12,
        borderRadius: 10
      }}>
        <div style={{
          background: "#168cff",
          padding: 6,
          borderRadius: 6
        }}>
          <Lock size={14}/>
        </div>

        <button
          onClick={onUnlock}
          style={{
            background: "#168cff",
            border: "none",
            color: "#fff",
            padding: "6px 10px",
            fontSize: 12,
            cursor: "pointer"
          }}
        >
          Unlock
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: 20,
      background: "#0e1625",
      borderRadius: 16,
      textAlign: "center"
    }}>
      <Lock size={20} style={{ marginBottom: 10 }}/>
      <h3>Premium Content Locked</h3>
      <p style={{ opacity: 0.7 }}>
        Unlock full tutorials, cues, and coaching notes.
      </p>

      <button
        onClick={onUnlock}
        style={{
          marginTop: 10,
          background: "#168cff",
          border: "none",
          color: "#fff",
          padding: "10px 14px",
          cursor: "pointer"
        }}
      >
        View Coaching Options
      </button>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div style={{
      background: "#111",
      padding: 20,
      borderRadius: 12
    }}>
      <h3 style={{ marginBottom: 10 }}>{title}</h3>
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
    return exerciseDatabase.find(e => e.id === id);
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
    corrected: exercise.correctedVideoUrl
  };

  const availableVideos = Object.entries(videos).filter(([_, v]) => v);
  const currentVideo = videos[activeVideo];

  const lockedVideo = activeVideo !== "main" && !isMember;

  return (
    <div style={{
      padding: "100px 20px",
      background: "#05070d",
      minHeight: "100vh",
      color: "#fff"
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        <button
          onClick={() => navigate("/exercise-library")}
          style={{ marginBottom: 20 }}
        >
          <ArrowLeft size={16}/> Back
        </button>

        <h1 style={{ fontSize: 32, marginBottom: 20 }}>
          {exercise.name}
        </h1>

        {/* VIDEO */}
        <div style={{ marginBottom: 30 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            {availableVideos.map(([key]) => (
              <button
                key={key}
                onClick={() => setActiveVideo(key)}
                style={{
                  padding: "6px 10px",
                  background: activeVideo === key ? "#168cff" : "#111",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                {key}
              </button>
            ))}
          </div>

          {lockedVideo ? (
            <Paywall onUnlock={goToPricing}/>
          ) : (
            <Video url={currentVideo}/>
          )}
        </div>

        {/* GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: 20
        }}>
          <Panel title="Application">
            {exercise.mainTrainingApplication}
          </Panel>

          <Panel title="Muscles">
            {exercise.primaryMuscles?.join(", ")}
          </Panel>

          <Panel title="Biomechanics">
            {exercise.biomechanicsBreakdown || "—"}
          </Panel>

          <Panel title="Cues">
            <ul>
              {(exercise.cues || []).map((c,i)=><li key={i}>{c}</li>)}
            </ul>
          </Panel>

          <Panel title="Mistakes">
            {isMember ? (
              <ul>
                {(exercise.commonMistakes || []).map((c,i)=><li key={i}>{c}</li>)}
              </ul>
            ) : <Paywall compact onUnlock={goToPricing}/>}
          </Panel>

          <Panel title="Progressions">
            {isMember ? (
              <ul>
                {(exercise.progressions || []).map((c,i)=><li key={i}>{c}</li>)}
              </ul>
            ) : <Paywall compact onUnlock={goToPricing}/>}
          </Panel>

          <Panel title="Regressions">
            {isMember ? (
              <ul>
                {(exercise.regressions || []).map((c,i)=><li key={i}>{c}</li>)}
              </ul>
            ) : <Paywall compact onUnlock={goToPricing}/>}
          </Panel>
        </div>

        {/* CAM NOTES */}
        <div style={{
          marginTop: 30,
          background: "#111",
          padding: 20,
          borderRadius: 12
        }}>
          <h2>Cam’s Notes</h2>

          {isMember ? (
            <p>{exercise.camsNotes || "—"}</p>
          ) : (
            <Paywall onUnlock={goToPricing}/>
          )}
        </div>

      </div>
    </div>
  );
}
