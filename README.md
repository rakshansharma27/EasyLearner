# 🚀 EasyLearner

> **“Learn by building. Grow by helping.”**  
> An interactive project-based peer mentoring platform featuring automated learning roadmaps, mentor matching, and a virtual time-credit economy.

---

## 🌟 Overview

**EasyLearner** is designed to eliminate the *"Tutorial Hell"* phenomenon. Instead of passively following video lectures, learners input a tangible hardware or software project goal (e.g., *"I want to build a line-following car in 7 days"*), receive an automated step-by-step milestone roadmap, and connect with peer mentors who guide them until they can complete it independently.

### Key Highlights
- **Smart Milestone Generator:** Automatically generates sequential milestones with time estimates and component checklists.
- **Virtual Time-Credit Economy ($1\text{ Credit} = 30\text{ Minutes}$):** Zero monetary friction. Spend credits for 1-on-1 guidance; earn credits by helping other learners in topics you know.
- **Dual Persona Switcher:** Experience both **Learner Mode** (Alex Rivera) and **Mentor Mode** (Dr. Marcus Chen) without logging out.
- **Collaborative Mentoring Room:** Synchronized 30-minute timer, real-time debugging chat, and automatic credit settlement upon session conclusion.
- **Gamified Achievements:** Unlocked badges and double-entry transaction ledgers.

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- npm

### 1. Install Dependencies
```bash
npm install
```
*(Note: An `.npmrc` file is included with `legacy-peer-deps=true` to guarantee clean dependency resolution).*

### 2. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🎬 Guided Hackathon Demo Walkthrough

Use the **Demo Banner** at the top of the app to follow the 7-step evaluation path:
1. **Create Goal:** Define or pre-fill the *"Line-Following Car"* project.
2. **View Roadmap:** Inspect the 7 customized hardware and code milestones.
3. **Find Mentor:** Browse the mentor network and filter by domain (*Robotics*).
4. **Request Help:** Send a 1-credit request for 30 minutes of guidance.
5. **Accept Request:** Switch to Mentor mode and approve the incoming request.
6. **Complete Session:** Enter the session room, test the live timer and chat, and conclude the session to exchange credits.
7. **Complete Project:** Mark all milestones finished to earn completion badges and bonus credits!

---

## 📁 Project Structure

```
easylearner/
├── src/
│   ├── components/
│   │   ├── CreateGoalPage.tsx        # Goal intake & live roadmap preview
│   │   ├── DemoBanner.tsx            # 7-step guided demo navigation
│   │   ├── LandingPage.tsx           # Value proposition, problem/solution
│   │   ├── LearnerDashboard.tsx      # Goals, credit wallet, active sessions
│   │   ├── MentorDashboard.tsx       # Incoming requests, mentee progress
│   │   ├── MentorDiscoveryPage.tsx   # Filterable mentor directory
│   │   ├── MentorRequestModal.tsx    # Session request & credit estimation
│   │   ├── Navbar.tsx                # Sticky navigation & role switcher
│   │   ├── ProfileAchievementsPage.tsx # Badges & transaction ledger
│   │   ├── RoadmapView.tsx           # Interactive 7-step project timeline
│   │   ├── SessionChatPage.tsx       # 30-min timer, live messaging & credit settlement
│   │   └── Toast.tsx                 # Real-time feedback alerts
│   ├── context/
│   │   └── AppContext.tsx            # Global state, economy engine & LocalStorage
│   ├── data/
│   │   └── mockData.ts               # Sample mentors, goals, badges & generator logic
│   ├── types.ts                      # TypeScript models
│   ├── App.tsx
│   └── main.tsx
├── HACKATHON_SUBMISSION.md           # Submission dossier & pitch script
├── package.json
└── vite.config.ts
```

---

## 📄 Hackathon Submission Dossier
For the full pitch, problem breakdown, architecture explanation, and demo video script, see [HACKATHON_SUBMISSION.md](HACKATHON_SUBMISSION.md).
