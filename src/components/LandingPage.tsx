import React from 'react';
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
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, switchRole, goals } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200 bg-gradient-to-b from-white via-blue-50/40 to-slate-50">
        {/* Background ambient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute -top-12 left-1/4 w-80 h-80 rounded-full bg-blue-300 blur-3xl" />
          <div className="absolute top-8 right-1/4 w-80 h-80 rounded-full bg-purple-300 blur-3xl" />
          <div className="absolute top-24 left-1/2 w-64 h-64 rounded-full bg-emerald-200 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Pitch */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Project-Based Peer Mentoring Platform</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  EasyLearner
                </h1>
                <p className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  “Learn by building. Grow by helping.”
                </p>
              </div>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Traditional tutorials leave learners stuck in passive video loops. EasyLearner bridges the gap: enter your project goal, receive an automated milestone roadmap, and connect with experienced mentors who guide you until you can complete it independently.
              </p>

              {/* Time Credit System Callout */}
              <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>Virtual Time-Credit Economy</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                      1 Credit = 30 Min Help
                    </span>
                  </div>
                  <p className="text-slate-600">
                    No real money required in this prototype! Spend time credits when learners seek guidance; earn time credits when mentoring others.
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    *Real-money payment options will be integrated in future releases.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="landing-find-mentor-btn"
                  onClick={() => setCurrentView('mentor-discovery')}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Find a Mentor</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  id="landing-become-mentor-btn"
                  onClick={() => {
                    switchRole('mentor');
                    setCurrentView('mentor-dashboard');
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm shadow-xs transition-all cursor-pointer"
                >
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Become a Mentor</span>
                </button>

                <button
                  id="landing-demo-goal-btn"
                  onClick={() => setCurrentView('roadmap')}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-semibold text-sm transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span>Try Demo: Line-Following Car</span>
                </button>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 max-w-lg">
                <div>
                  <div className="text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500">Hands-on projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">30 min</div>
                  <div className="text-xs text-slate-500">Per Time Credit</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">7-Step</div>
                  <div className="text-xs text-slate-500">Autonomous roadmaps</div>
                </div>
              </div>
            </div>

            {/* Right Hero Interactive Illustration Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                {/* Visual Card 1: Sample Project Banner */}
                <div className="rounded-2xl bg-white p-6 shadow-xl border border-slate-200/80 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Active Learning Goal</div>
                        <div className="text-[11px] text-slate-500">Arduino & Robotics</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      In Progress
                    </span>
                  </div>

                  {/* Goal Title */}
                  <div className="space-y-1">
                    <h2 className="text-base font-bold text-slate-900">
                      “I want to build a line-following car in 7 days.”
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Learner: <span className="font-semibold text-slate-800">Alex Rivera</span> • Target: autonomous 2WD chassis with IR reflection sensors.
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700">Milestone Roadmap</span>
                      <span className="text-blue-600">2 / 7 Completed (35%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-[35%]" />
                    </div>
                  </div>

                  {/* Milestone Mini List */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span className="font-medium">1. Understand components & pinouts</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span className="font-medium">2. Learn circuit connections (L298N)</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700 bg-blue-50/80 p-2 rounded-lg border border-blue-100 font-medium">
                      <Clock className="w-4 h-4 shrink-0 text-blue-600 animate-pulse" />
                      <span>3. Program the motor driver (Active Session)</span>
                    </div>
                  </div>

                  {/* Mentor Pair Pill */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                        alt="Dr. Marcus Chen"
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Dr. Marcus Chen</p>
                        <p className="text-[10px] text-slate-500">Senior Robotics Researcher</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentView('session')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Enter Chat
                    </button>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-5 -left-5 bg-white p-3 rounded-xl shadow-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">1 Time Credit Exchanged</div>
                    <div className="text-[10px] text-slate-500">Learner -1 / Mentor +1 credit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-xs font-bold tracking-wider text-blue-600 uppercase">The EasyLearner Difference</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Traditional Learning Stalls vs. How EasyLearner Solves It
            </p>
            <p className="text-slate-600 text-sm">
              Stop watching 40-hour video series that never translate into functioning hardware or code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-100 text-rose-800 text-xs font-bold">
                <span>The Problem: “Tutorial Hell”</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold mt-0.5">✕</span>
                  <span><strong>Lack of feedback:</strong> When your motor doesn't spin or your circuit shorts, generic forum answers take days.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold mt-0.5">✕</span>
                  <span><strong>Expensive 1-on-1 tutoring:</strong> Commercial tutoring rates ($60-$120/hr) are out of reach for students and self-learners.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold mt-0.5">✕</span>
                  <span><strong>Vague or missing roadmaps:</strong> Beginners don't know what order to learn sub-skills, resulting in abandoned projects.</span>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                <span>The EasyLearner Solution</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span><strong>Goal-specific step-by-step roadmap:</strong> Automatically breaks down high-level aspirations into tangible 30-to-60 min milestones.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span><strong>Peer Time Credits:</strong> 1 credit = 30 minutes of help. Learn by spending credits; replenish your balance by helping others in what you know.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span><strong>Mentors guide until independence:</strong> Real-time debugging and circuit reviews that teach *why* something broke, not just copy-pasting.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works in 4 Steps */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-xs font-bold tracking-wider text-purple-600 uppercase">How It Works</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Four Steps From Idea to Completed Project
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-base text-slate-900">Enter Your Goal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Describe what you want to build (e.g. “Line-following car”, “React dashboard”, “Computer vision sorter”).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-base text-slate-900">Get a Roadmap</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                EasyLearner generates sequential technical milestones with realistic time estimates and task checklists.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-base text-slate-900">Match with a Mentor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse rated mentors, filter by domain expertise and languages, and book 30-min targeted time-credit sessions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="font-bold text-base text-slate-900">Complete & Earn</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conclude sessions with live code reviews. Complete your project to earn completion badges and bonus time credits!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Ready to build your dream project?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
            Join students, makers, and experienced peer mentors on EasyLearner. Start with our line-following car sample goal or define your own.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setCurrentView('create-goal')}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors"
            >
              Create Your Learning Goal
            </button>
            <button
              onClick={() => setCurrentView('learner-dashboard')}
              className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
            >
              Open Learner Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
