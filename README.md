# PrepSync AI

PrepSync AI is a frontend-only showcase application built as a product management portfolio demo. It serves as a visual prototype to demonstrate product thinking, focusing on a clean, modern SaaS dashboard experience. The platform is designed to look like a "Placement Intelligence" tool that helps students prepare for job interviews.

## Features Built

1. **CV-JD Matching Engine (Simulated AI)**
   - A split-pane layout to paste a resume and job description.
   - An animated AI analysis process that simulates NLP matching.
   - Outputs a simulated match score (using an animated circular dial), identifies matched/gap skills, and provides a concise AI summary.

2. **Mock Interview Console (Simulated AI)**
   - Generates 5 tailored mock interview questions based on identified skill gaps.
   - Each question card features an expandable textarea for practicing answers.
   - Simulated AI feedback provides encouraging, structured critiques for each submitted answer.

3. **Alumni Placement Log**
   - A clean 3-step wizard form for alumni to log their placement journey (company, rounds, topics, resources, tips).
   - Real-time simulated feed updates: Submitting the form triggers a celebration animation (confetti) and prepends the new log to a dynamic "Recent Contributions" feed.

4. **Company Intel Dashboard**
   - A searchable grid of target companies displaying high-level stats (Avg CTC, Top Topics).
   - Clicking a company opens a slide-out "Blueprint" drawer.
   - The drawer features interactive charts (Recharts) for Topic Weightage (Donut Chart) and Hiring Trends (Bar Chart), alongside real quotes from alumni.

## Tech Stack
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion, Canvas Confetti
- **Charts:** Recharts

## How to Run Locally

1. Clone or download this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

*Note: This is a frontend-only prototype. All data is mock/hardcoded (found in `/data`), and there are no actual backend or API calls.*
