import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import exerciseDatabase from "./data/exerciseDatabase";

export default function ExerciseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const exercise = exerciseDatabase.find((ex) => ex.id === id);

  if (!exercise) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        <h2>Exercise not found</h2>
        <button onClick={() => navigate("/exercise-library")}>
          Back to Library
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "#fff",
        padding: "40px",
      }}
    >
      <button
        onClick={() => navigate("/exercise-library")}
        style={{ marginBottom: "20px" }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        {exercise.name}
      </h1>

      {exercise.premium && (
        <div style={{ marginBottom: "20px", color: "#7aa8ff" }}>
          Premium Exercise
        </div>
      )}

      <p style={{ marginBottom: "20px", opacity: 0.85 }}>
        {exercise.mainTrainingApplication}
      </p>

      <div style={{ marginBottom: "20px" }}>
        <strong>Primary Muscles:</strong>{" "}
        {exercise.primaryMuscles?.join(", ") || "—"}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>Secondary Muscles:</strong>{" "}
        {exercise.secondaryMuscles?.join(", ") || "—"}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>Movement Pattern:</strong> {exercise.movementPattern || "—"}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>ROM Bias:</strong> {exercise.romBias || "—"}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>Equipment:</strong> {exercise.equipment?.join(", ") || "—"}
      </div>
    </div>
  );
}
