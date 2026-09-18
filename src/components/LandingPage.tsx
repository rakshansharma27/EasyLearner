import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Coins,
  MapPin,
  Cpu,
  ShieldCheck,
  Zap,
  Users,
  Award,
  Layers,
  HelpCircle,
  Eye,
  Activity,
  Check,
  Star,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, switchRole, goals } = useApp();
  const [heroScenario, setHeroScenario] = useState<'robotics' | 'ai' | 'web'>('robotics');

  const scenarioData = {
    robotics: {
      category: 'Robotics & Hardware',
      tag: 'Autonomous Systems',
      title: 'Build a line-following car in 7 days',
      learner: 'Alex Rivera',
      mentorName: 'Dr. Marcus Chen',
      mentorTitle: 'Senior Robotics Lead',
      mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      progress: 35,
      completedSteps: 2,
      totalSteps: 7,
      steps: [
        { title: '1. Understand components & pinouts', done: true },
        { title: '2. Wire L298N driver & IR sensors', done: true },
        { title: '3. Program PWM motor differential', active: true },
      ],
    },
    ai: {
      category: 'AI & Data Science',
      tag: 'Computer Vision',
      title: 'Build a real-time face tracking camera bot',
      learner: 'Alex Rivera',
      mentorName: 'Priya Sharma',
      mentorTitle: 'Computer Vision Specialist',
      mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      progress: 40,
      completedSteps: 2,
      totalSteps: 5,
      steps: [
        { title: '1. OpenCV environment setup', done: true },
        { title: '2. Haar Cascade face bounding box', done: true },
        { title: '3. Pan-tilt servo PID calibration', active: true },
      ],
    },
    web: {
      category: 'Web & Mobile Development',
      tag: 'Full-Stack IoT',
      title: 'Live hardware telemetry web dashboard',
      learner: 'Alex Rivera',
      mentorName: 'Elena Rostova',
      mentorTitle: 'Hardware Interface Engineer',
      mentorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      progress: 50,
      completedSteps: 3,
      totalSteps: 6,
      steps: [
        { title: '1. React & Vite telemetry scaffold', done: true },
        { title: '2. WebSocket serial packet ingestion', done: true },
        { title: '3. Real-time canvas oscilloscope charts', active: true },
      ],
    },
  };

  const currentScenario = scenarioData[heroScenario];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/15 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-slate-200/80 bg-gradient-to-b from-white via-blue-50/30 to-slate-50">
        {/* Background ambient radial glow & grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-35">
          <div className="absolute -top-12 left-1/4 w-96 h-96 rounded-full bg-blue-300 blur-3xl animate-pulse" />
          <div className="absolute top-8 right-1/4 w-96 h-96 rounded-full bg-purple-300 blur-3xl" />
          <div className="absolute top-24 left-1/2 w-72 h-72 rounded-full bg-emerald-200 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Pitch */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold shadow-2xs">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="tracking-wide">Next-Gen Project-Based Peer Mentoring</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] font-display">
                  Stop watching tutorials. <br />
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Build real projects with mentors.
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
                EasyLearner eliminates “tutorial hell”: enter any physical or software goal, receive an automated 
                technical milestone roadmap, and connect with peer mentors who debug code and circuits with you until you can build independently.
              </p>

              {/* Time Credit System Callout */}
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-200/90 shadow-xs flex items-start gap-4 ring-1 ring-amber-400/10">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-sm shadow-amber-500/20 shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <div className="font-extrabold text-slate-900 flex flex-wrap items-center gap-2">
                    <span className="text-sm">Virtual Time-Credit Economy</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300/80">
                      1 Credit = 30 Min Mentorship
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Zero financial barrier. Spend time credits when you need guidance; replenish your balance by helping fellow learners in topics you know.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="landing-find-mentor-btn"
                  onClick={() => setCurrentView('mentor-discovery')}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Find a Mentor</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>

                <button
                  id="landing-become-mentor-btn"
                  onClick={() => {
                    switchRole('mentor');
                    setCurrentView('mentor-dashboard');
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300/90 text-slate-800 font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Mentor Dashboard</span>
                </button>

                <button
                  id="landing-demo-goal-btn"
                  onClick={() => setCurrentView('roadmap')}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200/90 text-purple-800 font-bold text-xs transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span>Explore 7-Step Roadmap</span>
                </button>
              </div>

              {/* Live Proof Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/90 max-w-lg">
                <div className="space-y-0.5">
                  <div className="text-2xl font-black text-slate-900 font-display">100%</div>
                  <div className="text-xs font-semibold text-slate-500">Hands-on projects</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-black text-blue-600 font-display">30 min</div>
                  <div className="text-xs font-semibold text-slate-500">Per 1 credit session</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-black text-emerald-600 font-display">4.95 ★</div>
                  <div className="text-xs font-semibold text-slate-500">Peer review rating</div>
                </div>
              </div>
            </div>

            {/* Right Hero Interactive Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                {/* Domain Switcher Chips */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Interactive Live Previews:
                  </span>
                  <div className="inline-flex p-1 bg-slate-200/70 rounded-xl text-[11px] font-bold">
                    <button
                      onClick={() => setHeroScenario('robotics')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        heroScenario === 'robotics' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      🚗 Robotics
                    </button>
                    <button
                      onClick={() => setHeroScenario('ai')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        heroScenario === 'ai' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      👁️ AI Vision
                    </button>
                    <button
                      onClick={() => setHeroScenario('web')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        heroScenario === 'web' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      💻 IoT Web
                    </button>
                  </div>
                </div>

                {/* Primary Card */}
                <div className="rounded-3xl bg-white/95 backdrop-blur-xl p-6 shadow-2xl border border-slate-200/90 space-y-4 ring-1 ring-slate-950/5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{currentScenario.category}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{currentScenario.tag}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Project
                    </span>
                  </div>

                  {/* Goal Title */}
                  <div className="space-y-1">
                    <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
                      “{currentScenario.title}”
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Learner: <strong className="text-slate-800">{currentScenario.learner}</strong> • Structured technical roadmap in progress.
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">Automated Milestone Track</span>
                      <span className="text-blue-600">{currentScenario.completedSteps} / {currentScenario.totalSteps} Steps ({currentScenario.progress}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${currentScenario.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones List */}
                  <div className="space-y-2 text-xs">
                    {currentScenario.steps.map((st, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all ${
                          st.done
                            ? 'text-emerald-800 bg-emerald-50/60 border-emerald-100 font-medium'
                            : st.active
                            ? 'text-blue-900 bg-blue-50/70 border-blue-200 font-bold ring-2 ring-blue-500/10'
                            : 'text-slate-500 bg-slate-50 border-slate-100'
                        }`}
                      >
                        {st.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-blue-600 shrink-0 animate-pulse" />
                        )}
                        <span className="truncate">{st.title}</span>
                        {st.active && (
                          <span className="ml-auto text-[10px] uppercase font-extrabold px-1.5 py-0.2 rounded bg-blue-200 text-blue-900">
                            Active
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mentor Pair Pill */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentScenario.mentorAvatar}
                        alt={currentScenario.mentorName}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{currentScenario.mentorName}</p>
                        <p className="text-[11px] text-slate-500">{currentScenario.mentorTitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentView('session')}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                    >
                      Enter Room
                    </button>
                  </div>
                </div>

                {/* Floating Credit Badge */}
                <div className="absolute -bottom-5 -left-5 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 ring-1 ring-slate-950/5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">1 Time Credit Exchanged</div>
                    <div className="text-[10px] text-slate-500">Learner -1 / Mentor +1 Credit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span>The Educational Paradigm Shift</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
              Why Traditional Learning Stalls vs. How EasyLearner Wins
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
              Passive video courses create the illusion of competence. EasyLearner replaces endless lectures with active milestone delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-rose-50/60 to-rose-50/20 border border-rose-200/90 space-y-5 shadow-xs">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold">
                <span>The Problem: “Tutorial Hell” & Forum Fatigue</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">✕</span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Zero Feedback During Blocker:</strong>
                    <span className="text-slate-600 text-xs leading-relaxed">When code crashes or a motor controller shorts, waiting 48 hours for Reddit answers causes 85% of learners to quit.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">✕</span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Expensive 1-on-1 Tutoring:</strong>
                    <span className="text-slate-600 text-xs leading-relaxed">Commercial tutors charge \$60–\$120/hr, completely pricing out students and independent creators.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">✕</span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Unstructured Sub-Skills:</strong>
                    <span className="text-slate-600 text-xs leading-relaxed">Learners know what they want to build, but don’t know what sequential steps are required to get there.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-50/60 to-emerald-50/20 border border-emerald-200/90 space-y-5 shadow-xs">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                <span>The EasyLearner Project-First Architecture</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">✓</span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Automated Milestone Generation:</strong>
                    <span className="text-slate-600 text-xs leading-relaxed">Type your goal, get customized technical milestones with component checklists and time estimations.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">✓</span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Virtual Time-Credit Economy:</strong>
                    <span className="text-slate-600 text-xs leading-relaxed">Spend 1 credit for 30 minutes of mentor guidance; replenish credits by helping peers with what you've mastered.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">✓</span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Guided Independence:</strong>
                    <span className="text-slate-600 text-xs leading-relaxed">Mentors don't just solve problems for you—they teach the underlying debugging principles so you can complete the project on your own.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works in 4 Steps */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider">
              <span>Platform Flow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
              Four Steps From Idea to Working Project
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:border-blue-300 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
                01
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Define Your Goal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your physical computing or software idea. Select your timeline, language, and skill level.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:border-indigo-300 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">
                02
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Get Milestone Roadmap</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                EasyLearner generates a tailored technical roadmap with time estimates and a Bill of Materials.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:border-purple-300 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm">
                03
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Pair with Mentor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter mentors by domain, review rating, and languages. Book 30-min sessions using virtual time credits.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:border-emerald-300 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                04
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Complete & Earn</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verify milestones in live chat with countdown timer. Earn bonus credits and badges for completing full projects!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <span>Get Started in 30 Seconds</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Ready to build your dream project?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
            Join engineering students, makers, and experienced peer mentors on EasyLearner. Start with our line-following car demo or create your custom goal.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentView('create-goal')}
              className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              Create Your Learning Goal
            </button>
            <button
              onClick={() => setCurrentView('learner-dashboard')}
              className="px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all cursor-pointer"
            >
              Open Learner Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
