import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlayCircle, CheckCircle2, ArrowRight, RotateCcw, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    activeRole,
    switchRole,
    resetToDemo,
    activeGoal,
    requests,
    sessions,
  } = useApp();

  const [collapsed, setCollapsed] = useState(false);

  const pendingReq = requests.find((r) => r.status === 'pending');
  const activeSession = sessions.find((s) => s.status === 'active');
  const isGoalCompleted = activeGoal?.isCompleted;

  const demoSteps = [
    {
      num: '1',
      title: 'Create Goal',
      targetView: 'create-goal',
      targetRole: 'learner',
      isCurrent: currentView === 'create-goal',
      isDone: !!activeGoal,
      description: 'Set goal: "I want to build a line-following car"',
    },
    {
      num: '2',
      title: 'View Roadmap',
      targetView: 'roadmap',
      targetRole: 'learner',
      isCurrent: currentView === 'roadmap',
      isDone: (activeGoal?.roadmap.filter((s) => s.status === 'Completed').length || 0) >= 2,
      description: 'Review 7 customized hardware milestones',
    },
    {
      num: '3',
      title: 'Find Mentor',
      targetView: 'mentor-discovery',
      targetRole: 'learner',
      isCurrent: currentView === 'mentor-discovery',
      isDone: requests.length > 0,
      description: 'Browse Dr. Marcus Chen & robotics mentors',
    },
    {
      num: '4',
      title: 'Request Help',
      targetView: 'mentor-discovery',
      targetRole: 'learner',
      isCurrent: false,
      isDone: requests.length > 0,
      description: 'Estimate 1 credit per 30 min session',
    },
    {
      num: '5',
      title: 'Accept Request',
      targetView: 'mentor-dashboard',
      targetRole: 'mentor',
      isCurrent: currentView === 'mentor-dashboard' && activeRole === 'mentor',
      isDone: requests.some((r) => r.status === 'accepted'),
      description: 'Switch to Mentor to approve incoming learner',
    },
    {
      num: '6',
      title: 'Complete Session',
      targetView: 'session',
      targetRole: 'learner',
      isCurrent: currentView === 'session',
      isDone: sessions.some((s) => s.status === 'completed'),
      description: 'Live chat, timer, auto-deduct/add credits',
    },
    {
      num: '7',
      title: 'Complete Project',
      targetView: 'roadmap',
      targetRole: 'learner',
      isCurrent: false,
      isDone: isGoalCompleted,
      description: 'Mark all finished, earn +2 bonus credits & badge',
    },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden bg-slate-950/95 text-white border-b border-slate-800/80 backdrop-blur-xl shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Judge Demo Walkthrough
              </span>
              <span className="text-[11px] text-slate-400 hidden md:inline border-l border-slate-800 pl-2">
                Scenario: <span className="text-slate-200 font-semibold">“I want to build a line-following car in 7 days”</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="reset-demo-scenario-btn"
              onClick={resetToDemo}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-slate-300 border border-slate-700/80 transition-all cursor-pointer shadow-xs"
              title="Reset state to initial sample scenario"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>Reset State</span>
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800/80 transition-colors cursor-pointer"
              title={collapsed ? 'Expand walkthrough' : 'Collapse walkthrough'}
            >
              {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {!collapsed && (
          <div className="mt-2 pt-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-1.5 min-w-max">
              {demoSteps.map((step, idx) => (
                <React.Fragment key={step.num}>
                  <button
                    onClick={() => {
                      if (step.targetRole !== activeRole) {
                        switchRole(step.targetRole as 'learner' | 'mentor');
                      }
                      setCurrentView(step.targetView as any);
                    }}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                      step.isCurrent
                        ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm ring-2 ring-amber-300/40'
                        : step.isDone
                        ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                      step.isCurrent
                        ? 'bg-slate-950 text-amber-400'
                        : step.isDone
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {step.isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.num}
                    </span>
                    <span>{step.title}</span>
                  </button>
                  {idx < demoSteps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
