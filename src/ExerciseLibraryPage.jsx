import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  ArrowUpDown,
  Check,
  Play,
  Lock,
  Crown,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import exerciseDatabase from "../data/exerciseDatabase";

function ExerciseListRow({
  exercise,
  onViewExercise,
  isFavorite,
  onToggleFavorite,
  isMember,
  onLockedExercise,
}) {
  const isLocked = exercise.premium && !isMember;

  const muscleText = [
    ...(exercise.primaryMuscles || []),
    ...(exercise.secondaryMuscles || []),
  ]
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "72px 1fr 38px",
        gap: "18px",
        alignItems: "center",
        padding: "18px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        transition: "all 0.2s ease",
        opacity: isLocked ? 0.78 : 1,
      }}
    >
      <button
        type="button"
        onClick={() => {
          if (isLocked) {
            onLockedExercise();
            return;
          }

          onViewExercise();
        }}
        style={{
          gridColumn: "1 / span 2",
          display: "grid",
          gridTemplateColumns: "72px 1fr",
          gap: "18px",
          alignItems: "center",
          border: "none",
          background: "transparent",
          color: "#ffffff",
          textAlign: "left",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "72px",
            height: "72px",
            borderRadius: "14px",
            background:
              "radial-gradient(circle at center, rgba(122,168,255,0.24), rgba(255,255,255,0.04))",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Play size={22} fill="currentColor" color="#dbe8ff" />

          {isLocked && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "14px",
                background: "rgba(0,0,0,0.68)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(2px)",
              }}
            >
              <Lock size={22} color="#ffffff" />
            </div>
          )}
        </div>

        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              margin: "0 0 7px",
              fontSize: "1.12rem",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            {exercise.name}
          </h3>

          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.52)",
              fontSize: "0.95rem",
              lineHeight: 1.45,
            }}
          >
            {muscleText || exercise.category || "Exercise"}
          </p>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "8px",
            }}
          >
            {exercise.premium && (
              <MiniTag label={isLocked ? "Locked Premium" : "Premium"} />
            )}

            {exercise.romBias && exercise.romBias !== "-" && (
              <MiniTag label={exercise.romBias} />
            )}
          </div>
        </div>
      </button>

      <button
        id={`star-${exercise.id}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();

          // ✨ pop animation
          const el = e.currentTarget;
          el.animate(
            [
              { transform: "scale(1)" },
              { transform: "scale(1.35)" },
              { transform: "scale(1)" },
            ],
            { duration: 200, easing: "ease-out" }
          );
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isFavorite
            ? "rgba(47,140,255,0.22)"
            : "rgba(255,255,255,0.08)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isFavorite
            ? "rgba(47,140,255,0.14)"
            : "rgba(255,255,255,0.03)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.9)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "999px",
          border: isFavorite
            ? "1px solid rgba(47,140,255,0.4)"
            : "1px solid rgba(255,255,255,0.08)",
          background: isFavorite
            ? "rgba(47,140,255,0.14)"
            : "rgba(255,255,255,0.03)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
        }}
      >
        <Star
          size={22}
          color={isFavorite ? "#2f8cff" : "rgba(255,255,255,0.35)"}
          fill={isFavorite ? "#2f8cff" : "transparent"}
          style={{
            transition: "all 0.2s ease",
          }}
        />
      </button>
    </div>
  );
}

function MiniTag({ label }) {
  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "999px",
        background: "rgba(122,168,255,0.1)",
        color: "#dbe8ff",
        border: "1px solid rgba(122,168,255,0.16)",
        fontSize: "0.72rem",
        fontWeight: 700,
      }}
    >
      {label}
    </span>
  );
}

function FilterChip({ children, onRemove }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 11px",
        borderRadius: "999px",
        background: "rgba(122,168,255,0.11)",
        border: "1px solid rgba(122,168,255,0.22)",
        color: "#dbe8ff",
        fontSize: "12.5px",
        fontWeight: 700,
      }}
    >
      {children}

      <button
        type="button"
        onClick={onRemove}
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "999px",
          border: "none",
          background: "rgba(255,255,255,0.08)",
          color: "#ffffff",
          cursor: "pointer",
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </span>
  );
}

function BottomSheet({ title, children, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "760px",
          maxHeight: "82vh",
          overflowY: "auto",
          borderTopLeftRadius: "34px",
          borderTopRightRadius: "34px",
          background:
            "linear-gradient(180deg, rgba(31,41,55,0.98), rgba(15,23,42,0.98))",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "28px 24px 32px",
          boxShadow: "0 -20px 80px rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            width: "54px",
            height: "5px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.18)",
            margin: "0 auto 22px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "center",
            marginBottom: "22px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "2rem" }}>{title}</h2>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              width: "38px",
              height: "38px",
              borderRadius: "999px",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function SheetOption({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
        border: "none",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "transparent",
        color: active ? "#ffffff" : "rgba(255,255,255,0.82)",
        fontSize: "1.05rem",
        fontWeight: active ? 800 : 600,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {children}
      {active && <Check size={22} color="#2f8cff" />}
    </button>
  );
}

function SelectGroup({ title, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        marginBottom: "14px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        paddingBottom: "10px",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
          border: "none",
          background: "transparent",
          color: "#ffffff",
          padding: "14px 0",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "1.05rem",
              fontWeight: 800,
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: "4px",
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.52)",
              fontWeight: 600,
            }}
          >
            {value === "All" ? "All" : value}
          </div>
        </div>

        <span
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            color: "rgba(255,255,255,0.55)",
            fontSize: "1.2rem",
          }}
        >
          ⌄
        </span>
      </button>

      {open && (
        <div style={{ paddingBottom: "8px" }}>
          {options.map((option) => (
            <SheetOption
              key={option}
              active={value === option}
              onClick={() => onChange(option)}
            >
              {option}
            </SheetOption>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExerciseLibraryPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 768;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("az");
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showLockedSheet, setShowLockedSheet] = useState(false);

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPrimaryMuscle, setSelectedPrimaryMuscle] = useState("All");
  const [selectedEquipment, setSelectedEquipment] = useState("All");
  const [selectedMovementPattern, setSelectedMovementPattern] = useState("All");
  const [selectedRomBias, setSelectedRomBias] = useState("All");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("exerciseFavorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isMember, setIsMember] = useState(() => {
    try {
      return localStorage.getItem("isMember") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const access = searchParams.get("access");
    const stripeSuccess = searchParams.get("stripe_success");

    if (access === "member" || stripeSuccess === "true") {
      setIsMember(true);
      localStorage.setItem("isMember", "true");

      searchParams.delete("access");
      searchParams.delete("stripe_success");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    localStorage.setItem("exerciseFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("isMember", isMember ? "true" : "false");
  }, [isMember]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };
  const categories = useMemo(() => {
    const values = Array.from(
      new Set(exerciseDatabase.map((ex) => ex.category).filter(Boolean))
    ).sort();
    return ["All", ...values];
  }, []);

  const primaryMuscleOptions = useMemo(() => {
    const values = new Set();
    exerciseDatabase.forEach((ex) =>
      ex.primaryMuscles?.forEach((m) => values.add(m))
    );
    return ["All", ...Array.from(values).sort()];
  }, []);

  const equipmentOptions = useMemo(() => {
    const values = new Set();
    exerciseDatabase.forEach((ex) =>
      ex.equipment?.forEach((e) => values.add(e))
    );
    return ["All", ...Array.from(values).sort()];
  }, []);

  const movementPatternOptions = useMemo(() => {
    const values = Array.from(
      new Set(exerciseDatabase.map((ex) => ex.movementPattern).filter(Boolean))
    ).sort();
    return ["All", ...values];
  }, []);

  const romBiasOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        exerciseDatabase
          .map((ex) => ex.romBias?.trim())
          .filter((v) => v && v !== "-" && v.toLowerCase() !== "dynamic")
      )
    ).sort();

    return ["All", ...values];
  }, []);

  const filteredExercises = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return exerciseDatabase.filter((exercise) => {
      const isUserFavorite = favorites.includes(exercise.id);

      const matchesSearch =
        !search ||
        exercise.name?.toLowerCase().includes(search) ||
        exercise.category?.toLowerCase().includes(search) ||
        exercise.mainTrainingApplication?.toLowerCase().includes(search) ||
        exercise.movementPattern?.toLowerCase().includes(search) ||
        exercise.primaryMuscles?.some((m) =>
          m.toLowerCase().includes(search)
        ) ||
        exercise.secondaryMuscles?.some((m) =>
          m.toLowerCase().includes(search)
        ) ||
        exercise.equipment?.some((e) => e.toLowerCase().includes(search));

      return (
        matchesSearch &&
        (activeCategory === "All" || exercise.category === activeCategory) &&
        (selectedPrimaryMuscle === "All" ||
          exercise.primaryMuscles?.includes(selectedPrimaryMuscle)) &&
        (selectedEquipment === "All" ||
          exercise.equipment?.includes(selectedEquipment)) &&
        (selectedMovementPattern === "All" ||
          exercise.movementPattern === selectedMovementPattern) &&
        (selectedRomBias === "All" || exercise.romBias === selectedRomBias) &&
        (!showPremiumOnly || exercise.premium === true) &&
        (!showFavoritesOnly || isUserFavorite)
      );
    });
  }, [
    searchTerm,
    activeCategory,
    selectedPrimaryMuscle,
    selectedEquipment,
    selectedMovementPattern,
    selectedRomBias,
    showPremiumOnly,
    showFavoritesOnly,
    favorites,
  ]);

  const sortedExercises = useMemo(() => {
    const list = [...filteredExercises];

    list.sort((a, b) => {
      const aFav = favorites.includes(a.id) ? 1 : 0;
      const bFav = favorites.includes(b.id) ? 1 : 0;

      if (bFav !== aFav) return bFav - aFav;

      if (sortBy === "az") return a.name.localeCompare(b.name);
      if (sortBy === "za") return b.name.localeCompare(a.name);
      if (sortBy === "favorites") return bFav - aFav;

      if (sortBy === "muscle") {
        return (a.primaryMuscles?.[0] || "").localeCompare(
          b.primaryMuscles?.[0] || ""
        );
      }

      return 0;
    });

    return list;
  }, [filteredExercises, sortBy, favorites]);

  const sortLabel =
    sortBy === "az"
      ? "A-Z"
      : sortBy === "za"
      ? "Z-A"
      : sortBy === "favorites"
      ? "Favorites"
      : "Muscle Group";

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
    setSelectedPrimaryMuscle("All");
    setSelectedEquipment("All");
    setSelectedMovementPattern("All");
    setSelectedRomBias("All");
    setShowPremiumOnly(false);
    setShowFavoritesOnly(false);
  };

  const hasActiveFilters =
    searchTerm.trim() ||
    activeCategory !== "All" ||
    selectedPrimaryMuscle !== "All" ||
    selectedEquipment !== "All" ||
    selectedMovementPattern !== "All" ||
    selectedRomBias !== "All" ||
    showPremiumOnly ||
    showFavoritesOnly;

  const handleLockedExercise = () => {
    setShowLockedSheet(true);
  };

  return (
    <div
      className="site"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(47,140,255,0.12), transparent 32%), #05070c",
      }}
    >
      <section
        style={{
          padding: isMobile ? "22px 18px 80px" : "34px 28px 90px",
          maxWidth: "980px",
          margin: "0 auto",
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(122,168,255,0.18)";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(122,168,255,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(122,168,255,0.1)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          style={{
            marginBottom: "24px",
            padding: "10px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(122,168,255,0.25)",
            background: "rgba(122,168,255,0.1)",
            color: "#dbe8ff",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          ← Back to Homepage
        </button>

        <div style={{ marginBottom: "28px" }}>
          <p className="eyebrow">Biomechanics &amp; U Movement Library</p>

          <h1
            style={{
              margin: "0 0 12px",
              fontSize: isMobile ? "2.45rem" : "3.5rem",
              lineHeight: 1,
            }}
          >
            Exercises
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: "760px",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.7,
              fontSize: "1.02rem",
            }}
          >
            Search, sort, and filter the movement library by muscle, equipment,
            movement pattern, ROM bias, premium access, and your saved
            favorites.
          </p>

          <p
            style={{
              marginTop: "12px",
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.92rem",
              lineHeight: 1.6,
              maxWidth: "640px",
            }}
          >
            This library is constantly being updated with new exercises,
            coaching cues, and video demonstrations. More content is added
            regularly to improve your training experience.
          </p>
        </div>

        {!isMember && (
          <div
            style={{
              marginBottom: "22px",
              padding: "15px 16px",
              borderRadius: "14px",
              background: "rgba(122,168,255,0.08)",
              border: "1px solid rgba(122,168,255,0.2)",
              color: "#dbe8ff",
              fontSize: "0.92rem",
              lineHeight: 1.6,
            }}
          >
            <strong>Premium exercises are locked.</strong> Unlock full access
            with coaching or a monthly subscription.
          </div>
        )}

        {isMember && (
          <div
            style={{
              marginBottom: "22px",
              padding: "15px 16px",
              borderRadius: "14px",
              background: "rgba(47,140,255,0.1)",
              border: "1px solid rgba(47,140,255,0.25)",
              color: "#dbe8ff",
              fontSize: "0.92rem",
              lineHeight: 1.6,
            }}
          >
            <strong>Premium access active.</strong> All exercises are unlocked.
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 58px",
            gap: "12px",
            marginBottom: "22px",
          }}
        >
          <div style={{ position: "relative" }}>
            <Search
              size={23}
              color="rgba(255,255,255,0.35)"
              style={{
                position: "absolute",
                left: "18px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              style={{
                width: "100%",
                height: "58px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.1)",
                color: "#ffffff",
                padding: "0 18px 0 54px",
                fontSize: "1.15rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilterSheet(true)}
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.1)",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            <SlidersHorizontal size={28} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "18px",
          }}
        >
          <button
            type="button"
            onClick={() => setShowSortSheet(true)}
            style={topControlStyle}
          >
            <ArrowUpDown size={22} />
            SORT BY: {sortLabel}
          </button>

          <button
            type="button"
            onClick={() => setShowFavoritesOnly((prev) => !prev)}
            style={{
              ...topControlStyle,
              color: showFavoritesOnly ? "#2f8cff" : "rgba(255,255,255,0.55)",
            }}
          >
            <Star size={25} fill={showFavoritesOnly ? "#2f8cff" : "none"} />
            FAVORITES
          </button>
        </div>

        {hasActiveFilters && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "18px",
            }}
          >
            {searchTerm.trim() && (
              <FilterChip onRemove={() => setSearchTerm("")}>
                Search: {searchTerm.trim()}
              </FilterChip>
            )}

            {activeCategory !== "All" && (
              <FilterChip onRemove={() => setActiveCategory("All")}>
                Category: {activeCategory}
              </FilterChip>
            )}

            {selectedPrimaryMuscle !== "All" && (
              <FilterChip onRemove={() => setSelectedPrimaryMuscle("All")}>
                Muscle: {selectedPrimaryMuscle}
              </FilterChip>
            )}

            {selectedEquipment !== "All" && (
              <FilterChip onRemove={() => setSelectedEquipment("All")}>
                Equipment: {selectedEquipment}
              </FilterChip>
            )}

            {selectedMovementPattern !== "All" && (
              <FilterChip onRemove={() => setSelectedMovementPattern("All")}>
                Pattern: {selectedMovementPattern}
              </FilterChip>
            )}

            {selectedRomBias !== "All" && (
              <FilterChip onRemove={() => setSelectedRomBias("All")}>
                ROM: {selectedRomBias}
              </FilterChip>
            )}

            {showPremiumOnly && (
              <FilterChip onRemove={() => setShowPremiumOnly(false)}>
                Premium Only
              </FilterChip>
            )}

            {showFavoritesOnly && (
              <FilterChip onRemove={() => setShowFavoritesOnly(false)}>
                Favorites
              </FilterChip>
            )}
          </div>
        )}

        <p
          style={{
            margin: "0 0 12px",
            color: "rgba(255,255,255,0.58)",
            fontWeight: 700,
          }}
        >
          Showing {sortedExercises.length} exercise
          {sortedExercises.length !== 1 ? "s" : ""}
        </p>

        <div>
          {sortedExercises.length > 0 ? (
            sortedExercises.map((exercise) => (
              <ExerciseListRow
                key={exercise.id}
                exercise={exercise}
                isFavorite={favorites.includes(exercise.id)}
                onToggleFavorite={() => toggleFavorite(exercise.id)}
                isMember={isMember}
                onLockedExercise={handleLockedExercise}
                onViewExercise={() => navigate(`/exercise/${exercise.id}`)}
              />
            ))
          ) : (
            <div
              style={{
                padding: "34px 20px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginTop: 0 }}>No exercises found</h3>

              <p style={{ color: "rgba(255,255,255,0.65)" }}>
                Try clearing filters or searching something broader.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                style={primaryButton}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {showSortSheet && (
        <BottomSheet title="Sort By" onClose={() => setShowSortSheet(false)}>
          <SheetOption
            active={sortBy === "favorites"}
            onClick={() => setSortBy("favorites")}
          >
            Favorites
          </SheetOption>

          <SheetOption active={sortBy === "az"} onClick={() => setSortBy("az")}>
            Alphabetical (a-z)
          </SheetOption>

          <SheetOption active={sortBy === "za"} onClick={() => setSortBy("za")}>
            Alphabetical (z-a)
          </SheetOption>

          <SheetOption
            active={sortBy === "muscle"}
            onClick={() => setSortBy("muscle")}
          >
            Muscle group
          </SheetOption>

          <button
            type="button"
            onClick={() => setShowSortSheet(false)}
            style={{ ...primaryButton, marginTop: "24px" }}
          >
            Apply
          </button>
        </BottomSheet>
      )}

      {showFilterSheet && (
        <BottomSheet title="Filters" onClose={() => setShowFilterSheet(false)}>
          <SelectGroup
            title="Category"
            value={activeCategory}
            options={categories}
            onChange={setActiveCategory}
          />

          <SelectGroup
            title="Primary Muscle"
            value={selectedPrimaryMuscle}
            options={primaryMuscleOptions}
            onChange={setSelectedPrimaryMuscle}
          />

          <SelectGroup
            title="Equipment"
            value={selectedEquipment}
            options={equipmentOptions}
            onChange={setSelectedEquipment}
          />

          <SelectGroup
            title="Movement Pattern"
            value={selectedMovementPattern}
            options={movementPatternOptions}
            onChange={setSelectedMovementPattern}
          />

          <SelectGroup
            title="ROM Bias"
            value={selectedRomBias}
            options={romBiasOptions}
            onChange={setSelectedRomBias}
          />

          <SheetOption
            active={showPremiumOnly}
            onClick={() => setShowPremiumOnly((prev) => !prev)}
          >
            Premium only
          </SheetOption>

          <SheetOption
            active={showFavoritesOnly}
            onClick={() => setShowFavoritesOnly((prev) => !prev)}
          >
            Favorites only
          </SheetOption>

          <div style={{ display: "grid", gap: "12px", marginTop: "24px" }}>
            <button
              type="button"
              onClick={() => setShowFilterSheet(false)}
              style={primaryButton}
            >
              Apply
            </button>

            <button
              type="button"
              onClick={clearFilters}
              style={secondaryButton}
            >
              Clear Filters
            </button>
          </div>
        </BottomSheet>
      )}

      {showLockedSheet && (
        <BottomSheet
          title="Unlock Premium Exercises"
          onClose={() => setShowLockedSheet(false)}
        >
          <div style={{ textAlign: "center" }}>
            <Crown size={44} color="#2f8cff" />

            <h2 style={{ marginBottom: "10px" }}>Get Full Access</h2>

            <p
              style={{
                margin: "0 auto 22px",
                maxWidth: "520px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
              }}
            >
              Unlock all premium exercises, coaching cues, and video
              demonstrations through coaching or a monthly subscription.
            </p>

            <button
              type="button"
              onClick={() => {
                setShowLockedSheet(false);
                window.location.href = "/#pricing";
              }}
              style={primaryButton}
            >
              View Coaching Options
            </button>

            <button
              type="button"
              onClick={() => setShowLockedSheet(false)}
              style={{ ...secondaryButton, marginTop: "12px" }}
            >
              Keep Browsing
            </button>
          </div>
        </BottomSheet>
      )}
    </div>
  );
}

const topControlStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  border: "none",
  background: "transparent",
  color: "rgba(255,255,255,0.55)",
  fontWeight: 900,
  fontSize: "0.95rem",
  letterSpacing: "0.04em",
  cursor: "pointer",
  padding: "8px 0",
};

const primaryButton = {
  width: "100%",
  padding: "16px 18px",
  borderRadius: "10px",
  border: "none",
  background: "#168cff",
  color: "#ffffff",
  fontSize: "1rem",
  fontWeight: 900,
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const secondaryButton = {
  width: "100%",
  padding: "15px 18px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)",
  color: "#ffffff",
  fontSize: "1rem",
  fontWeight: 800,
  cursor: "pointer",
};
