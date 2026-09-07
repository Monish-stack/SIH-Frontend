export const hourlyIntakeData = [
  { hour: "09 AM", normal: 2, review: 1, referable: 0, total: 3 },
  { hour: "10 AM", normal: 4, review: 2, referable: 0, total: 6 },
  { hour: "11 AM", normal: 5, review: 1, referable: 2, total: 8 },
  { hour: "12 PM", normal: 3, review: 0, referable: 2, total: 5 },
  { hour: "01 PM", normal: 2, review: 0, referable: 0, total: 2 },
  { hour: "02 PM", normal: 4, review: 2, referable: 0, total: 6 },
  { hour: "03 PM", normal: 5, review: 1, referable: 2, total: 8 },
  { hour: "04 PM", normal: 3, review: 2, referable: 0, total: 5 },
  { hour: "05 PM", normal: 0, review: 0, referable: 0, projected: 1.2, total: 0, isProjected: true }
];

export const analyticsKpis = {
  totalScreenings: 248,
  normalCount: 186,
  normalPct: "75%",
  reviewCount: 32,
  reviewPct: "13%",
  referableCount: 30,
  referablePct: "12%"
};

export const screeningActivityData = {
  "7 Days": [
    { day: "Mon", screenings: 26, benchmark: 28.4 },
    { day: "Tue", screenings: 31, benchmark: 28.4 },
    { day: "Wed", screenings: 28, benchmark: 28.4 },
    { day: "Thu", screenings: 34, benchmark: 28.4 },
    { day: "Fri", screenings: 29, benchmark: 28.4 },
    { day: "Sat", screenings: 22, benchmark: 28.4 },
    { day: "Sun", screenings: 18, benchmark: 28.4 }
  ],
  "30 Days": [
    { day: "W1", screenings: 184, benchmark: 175 },
    { day: "W2", screenings: 210, benchmark: 175 },
    { day: "W3", screenings: 196, benchmark: 175 },
    { day: "W4", screenings: 225, benchmark: 175 }
  ],
  "3 Months": [
    { day: "Jul", screenings: 780, benchmark: 720 },
    { day: "Aug", screenings: 845, benchmark: 720 },
    { day: "Sep", screenings: 910, benchmark: 720 }
  ]
};

export const resultDistributionData = [
  { name: "Normal", value: 186, percentage: 75.0, color: "#16a34a" },
  { name: "Review Required", value: 32, percentage: 12.9, color: "#0284c7" },
  { name: "Referable", value: 30, percentage: 12.1, color: "#8b0000" }
];

export const eyeWiseComparisonData = {
  leftEye: {
    total: 248,
    normal: 82,
    review: 10,
    referable: 8
  },
  rightEye: {
    total: 248,
    normal: 76,
    review: 12,
    referable: 12
  }
};

export const icdrFindingsData = [
  { grade: "No DR (Grade 0)", count: 186, percentage: 75, color: "#16a34a" },
  { grade: "Mild NPDR (Grade 1)", count: 20, percentage: 8, color: "#0284c7" },
  { grade: "Moderate NPDR (Grade 2)", count: 22, percentage: 9, color: "#f59e0b" },
  { grade: "Severe NPDR (Grade 3)", count: 12, percentage: 5, color: "#ea580c" },
  { grade: "Proliferative / Critical DR (PDR)", count: 8, percentage: 3, color: "#dc2626" }
];

export const weeklyReferralTrends = [
  { week: "W1", referable: 6, review: 8 },
  { week: "W2", referable: 8, review: 7 },
  { week: "W3", referable: 7, review: 9 },
  { week: "W4", referable: 9, review: 8 }
];

export const qualityMetrics = {
  totalImages: 496,
  goodQuality: { count: 456, percentage: 92, label: "Good Quality (Tier 1 Gradable)" },
  poorQuality: { count: 30, percentage: 6, label: "Poor Quality" },
  incompatible: { count: 10, percentage: 2, label: "Unsupported / Incompatible Format" }
};

export const throughputData = {
  avgScreeningTime: "2m 18s",
  aiLatency: "18s",
  imagesProcessed: 496,
  pendingReviews: 5
};

export const aiTelemetry = {
  engine: "RetinoNet-v4.8",
  screeningsAnalyzed: 248,
  fundusImages: 496,
  avgConfidence: "97.8%",
  gradabilityPassRate: "92.0%",
  inferenceArchitecture: "ResNet-50 + Grad-CAM Attention Gate"
};

export const recentReferableScreenings = [
  {
    patientName: "Arun Kumar",
    patientId: "PAT-10284",
    date: "Today, 10:42 AM",
    affectedEye: "Right Eye (O.D.)",
    classification: "Moderate NPDR (Grade 2)",
    confidence: "91.2%",
    urgency: "Tier 2 Routine (2–4 wks)",
    action: "Slit-lamp & Macular OCT"
  },
  {
    patientName: "Murugan S.",
    patientId: "PAT-10231",
    date: "01 Sep 2026",
    affectedEye: "Bilateral",
    classification: "Severe NPDR / PDR",
    confidence: "95.6%",
    urgency: "Tier 1 Urgent (< 1 wk)",
    action: "Immediate Vitreoretinal Consult"
  },
  {
    patientName: "Rajesh Patel",
    patientId: "PAT-10265",
    date: "04 Sep 2026",
    affectedEye: "Bilateral",
    classification: "Moderate NPDR",
    confidence: "93.4%",
    urgency: "Tier 2 Routine (2–4 wks)",
    action: "Fluorescein Angiography"
  },
  {
    patientName: "Rajesh Varma (Sr)",
    patientId: "PAT-10280",
    date: "15 Aug 2026",
    affectedEye: "Left Eye (O.S.)",
    classification: "Severe NPDR (Grade 3)",
    confidence: "94.8%",
    urgency: "Tier 1 Urgent (< 1 wk)",
    action: "Urgent Laser / Anti-VEGF Eval"
  },
  {
    patientName: "Kavitha Sundaram",
    patientId: "PAT-10258",
    date: "03 Sep 2026",
    affectedEye: "Right Eye (O.D.)",
    classification: "Moderate NPDR",
    confidence: "90.7%",
    urgency: "Tier 2 Routine (2–4 wks)",
    action: "Glycemic control + Retinal Review"
  }
];
