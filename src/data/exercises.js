const exercises = [
  {
    id: "db-bench-press",
    name: "Dumbbell Bench Press",
    category: "Chest",
    bias: "Mid Chest",
    muscles: ["Chest", "Triceps", "Front Delts"],
    equipment: "Dumbbell",
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    description:
      "A foundational chest press that allows more freedom than a barbell press while still building upper body strength and size.",
    isPro: false
  },
  {
    id: "incline-db-press",
    name: "Incline Dumbbell Press",
    category: "Chest",
    bias: "Upper Chest",
    muscles: ["Upper Chest", "Front Delts", "Triceps"],
    equipment: "Dumbbell",
    thumbnail:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    description:
      "Targets the upper chest while still training shoulders and triceps through a pressing pattern.",
    isPro: true
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    category: "Back",
    bias: "Lat Width",
    muscles: ["Lats", "Upper Back", "Biceps"],
    equipment: "Machine",
    thumbnail:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80",
    description:
      "A staple pulling movement for building lat width and upper back strength.",
    isPro: false
  },
  {
    id: "cable-row",
    name: "Cable Row",
    category: "Back",
    bias: "Mid Back Thickness",
    muscles: ["Mid Back", "Lats", "Biceps"],
    equipment: "Cable",
    thumbnail:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80",
    description:
      "Builds back thickness and improves scapular control through a controlled rowing pattern.",
    isPro: true
  },
  {
    id: "db-lateral-raise",
    name: "Dumbbell Lateral Raise",
    category: "Shoulders",
    bias: "Side Delts",
    muscles: ["Side Delts"],
    equipment: "Dumbbell",
    thumbnail:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Isolates the side delts to build shoulder width and improve upper body proportions.",
    isPro: false
  },
  {
    id: "barbell-curl",
    name: "Barbell Curl",
    category: "Biceps",
    bias: "Biceps Peak",
    muscles: ["Biceps", "Forearms"],
    equipment: "Barbell",
    thumbnail:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    description:
      "A foundational biceps movement for building arm size and strength.",
    isPro: false
  },
  {
    id: "rope-pushdown",
    name: "Rope Pushdown",
    category: "Triceps",
    bias: "Triceps Shortened Position",
    muscles: ["Triceps"],
    equipment: "Cable",
    thumbnail:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Targets the triceps through a controlled extension movement with constant tension.",
    isPro: false
  },
  {
    id: "goblet-squat",
    name: "Goblet Squat",
    category: "Quads",
    bias: "Quad Dominance",
    muscles: ["Quads", "Glutes"],
    equipment: "Dumbbell",
    thumbnail:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    description:
      "A squat variation that builds lower body strength while reinforcing strong positioning.",
    isPro: false
  },
  {
    id: "single-leg-rdl",
    name: "Single Leg RDL",
    category: "Hamstrings",
    bias: "Posterior Chain",
    muscles: ["Hamstrings", "Glutes"],
    equipment: "Dumbbell",
    thumbnail:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=80",
    description:
      "A single-leg hinge movement for building posterior chain strength and balance.",
    isPro: true
  },
  {
    id: "barbell-hip-thrust",
    name: "Barbell Hip Thrust",
    category: "Glutes",
    bias: "Glute Max",
    muscles: ["Glutes", "Hamstrings"],
    equipment: "Barbell",
    thumbnail:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80",
    description:
      "A primary glute-building movement focused on hip extension strength.",
    isPro: true
  },
  {
    id: "standing-calf-raise",
    name: "Standing Calf Raise",
    category: "Calves",
    bias: "Gastrocnemius",
    muscles: ["Calves"],
    equipment: "Machine",
    thumbnail:
      "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Targets the calves through controlled plantarflexion under load.",
    isPro: false
  },
  {
    id: "cable-crunch",
    name: "Cable Crunch",
    category: "Abs",
    bias: "Spinal Flexion",
    muscles: ["Abs"],
    equipment: "Cable",
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    description:
      "A core movement focused on spinal flexion and abdominal control under load.",
    isPro: false
  }
];

export default exercises;
