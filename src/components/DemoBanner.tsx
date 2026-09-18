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
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white border-b border-indigo-700/50 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wide uppercase text-indigo-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Demo Walkthrough Guide
            </span>
            <span className="text-xs text-indigo-300 hidden md:inline">
              “I want to build a line-following car in 7 days”
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="reset-demo-scenario-btn"
              onClick={resetToDemo}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-800/80 hover:bg-indigo-700 text-[11px] font-medium text-indigo-100 border border-indigo-600 transition-colors"
              title="Reset state to initial sample scenario"
            >
              <RotateCcw className="w-3 h-3 text-indigo-300" />
              <span>Reset Scenario</span>
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 text-indigo-300 hover:text-white"
              title={collapsed ? 'Expand walkthrough' : 'Collapse walkthrough'}
            >
              {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {!collapsed && (
          <div className="mt-2 pt-2 border-t border-indigo-800/60 overflow-x-auto no-scrollbar pb-1">
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
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all text-left ${
                      step.isCurrent
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                        : step.isDone
                        ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-900/80'
                        : 'bg-indigo-950/60 border border-indigo-700/50 text-indigo-200 hover:bg-indigo-800/60'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px] font-bold">
                      {step.isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : step.num}
                    </span>
                    <span>{step.title}</span>
                  </button>
                  {idx < demoSteps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-indigo-400/60 shrink-0" />
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
