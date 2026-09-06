# RetinaScan AI — Clinical Retinal Screening & Tele-Triage Dashboard

An advanced clinical frontend application for ophthalmic retinal screening and diabetic retinopathy (DR) tele-triage. Built with **React 18**, **Vite**, **Tailwind CSS**, **Lucide React**, **Recharts**, and **Framer Motion**, implementing a 100% frontend-only clinical tele-triage workflow.

---

## 👁 Key Clinical Capabilities

1. **Clinical Triage Dashboard**
   - 2-tier right-aligned header with real-time patient search, operator avatar, date badge, and quick intake launch.
   - 4 KPI cards: Today's Screenings (`24`), Pending Reviews (`3`), Referable Cases (`5`), and Completed Reports (`21`).
   - Hourly Intake Progression stacked bar chart with soft cyan plot backdrop (`#dcf3f9`) and projected intake slots.
   - Live Scan Status card indicating camera calibration (`Nidek AFC-330`), pupil dilation, and retinal preview.
   - Real-time screening ledger with filter tabs (`All`, `Referable`, `Review`, `Normal`), stacked patient IDs, and pagination.

2. **Step-by-Step Screening Protocol**
   - **Step 1 — Find Patient (`/new-screening`)**: Local DB & PACS linked search with live filtering on `"Kumar"`, urgent follow-up flags, and detailed demographic card for demonstration patient **Arun Kumar (PAT-10284)**.
   - **Step 2 — Upload Left Eye (`/new-screening/left-eye`)**: Drag-and-drop dropzone supporting `JPG`, `PNG`, and `TIFF` with instant object URL preview and verified file metadata (`3840 × 3840 px`, 24-bit sRGB).
   - **Step 2b — Left Eye Validation & Neural Analysis (`/new-screening/left-eye/analyzing`)**:
     - 45° macular centration clinical viewer with interactive HUD overlays, FOVEA and Optic Disc reticles, zoom and pan controls.
     - 4-card Automated Quality Gate (Retina Detected 100%, Resolution 3840px, Centration FOV 45°, Artifacts <1.2%).
     - Multi-stage neural classification progress animation simulating ResNet-50 feature extraction.
     - Side-by-side comparison of original fundus photograph and **ResNet-50 + Grad-CAM** deep learning attention activation map.
     - Diagnostic Evaluation confirming **Normal Retinopathy (97.8% confidence, ICD-10 `E11.9`)**.
   - **Step 3 — Upload Right Eye (`/new-screening/right-eye`)**: Right eye temporal arcade capture and AI classification detecting **Moderate NPDR (Referable, 91.2% confidence, ICD-10 `E11.339`)**.
   - **Step 4 — Bilateral Synthesis (`/new-screening/results`)**:
     - Side-by-side bilateral eye cards (Left Normal vs Right Referable).
     - **UNIFIED ALGORITHMIC SYNTHESIS** banner in clinical red/coral indicating **OVERALL SCREENING RESULT: REFERABLE**.
     - Recommended Clinical Action Plan: Slit-lamp biomicroscopy, Macular OCT, HbA1c correlation.
     - Interactive **Referral Order Form** modal (Tier 2 Routine, 2–4 weeks target).
     - Interactive **Screening Dossier Report** modal (`#TR-9921-TN`) with PDF export simulation.

3. **Patients Registry & Longitudinal Dossier (`/patients` & `/patients/:id`)**
   - Triage registry metrics (248 Total Patients, 42 Screened Today, 5 Pending Review).
   - Detailed 3-column demographic, metabolic, and fundus scan dossier for Arun Kumar.
   - Longitudinal history tracking previous screening visits.
   - Searchable and paginated directory of all registered screening patients.

4. **Tele-Triage Cohort Analytics (`/analytics`)**
   - Stratified filters for Result, Age, Gender, and Quality.
   - Screening Activity Area chart with regional target reference line (`28.4/day`).
   - Result Distribution Donut chart (75% Normal, 12.9% Review, 12.1% Referable).
   - Eye-Wise comparative horizontal progress bars (Left OS vs Right OD).
   - Retinal Screening Findings breakdown by the International ICDR Scale (Grade 0 to Grade 4 PDR).
   - Workflow throughput and AI telemetry metrics (`RetinoNet-v4.8`).
   - Recent referable screenings table with direct referral dispatch actions.

5. **Screening Station Settings & Clinical Guidelines (`/settings` & `/help`)**
   - Station hardware configuration (Nidek AFC-330, Canon CR-2 AF, Topcon TRC-NW400), PACS C-ECHO live test ping, and operator credentials.
   - Clinical reference guide for the ICDR diabetic retinopathy disease severity scale and fundus capture quality standards.

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: JavaScript (JSX)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router v7](https://reactrouter.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Monish-stack/SIH-Frontend.git
cd SIH-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔒 Architecture & Compliance

- **Zero-Backend Architecture**: All workflows operate locally using structured mock datasets (`src/data/`) and persistent React Context (`ScreeningContext`), eliminating external server or database requirements.
- **Medical UI Standards**: Built to resemble clinical diagnostic stations conforming to **ISO 13485** medical software usability principles and ICDR clinical triage standards.
