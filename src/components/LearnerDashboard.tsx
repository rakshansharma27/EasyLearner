import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Coins,
  Map,
  PlusCircle,
  Calendar,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Star,
  Award,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const LearnerDashboard: React.FC = () => {
  const {
    learnerProfile,
    goals,
    activeGoal,
    setActiveGoalId,
    setCurrentView,
    sessions,
    mentors,
    setSelectedMentorForRequest,
  } = useApp();

  const activeSessions = sessions.filter((s) => s.status === 'active' || s.status === 'scheduled');
  const completedStepsCount = activeGoal?.roadmap.filter((s) => s.status === 'Completed').length || 0;
  const totalStepsCount = activeGoal?.roadmap.length || 0;

  // Find mentors that match category or keywords of active goal
  const recommendedMentors = mentors.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white shadow-lg">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-blue-100 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Learner Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {learnerProfile.name}! 👋
          </h1>
          <p className="text-sm text-blue-100 max-w-xl leading-relaxed">
            Ready to continue working on your project? Track your milestone progress, request peer mentor reviews, and manage your time credits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="dashboard-new-goal-btn"
            onClick={() => setCurrentView('create-goal')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span>Create New Learning Goal</span>
          </button>
          <button
            id="dashboard-browse-mentors-btn"
            onClick={() => setCurrentView('mentor-discovery')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all cursor-pointer"
          >
            <span>Explore Mentors</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Key Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Time Credits Balance */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Available Balance
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{learnerProfile.timeCredits}</span>
            <span className="text-xs font-bold text-amber-600">Time Credits</span>
          </div>
          <p className="text-[11px] text-slate-500">
            = {learnerProfile.timeCredits * 30} minutes of 1-on-1 mentor guidance.
          </p>
        </div>

        {/* Metric 2: Active Goal Progress */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Goal Progress
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-600">
              {activeGoal ? activeGoal.progressPercentage : 0}%
            </span>
            <span className="text-xs text-slate-500 font-medium">
              ({completedStepsCount}/{totalStepsCount} steps)
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${activeGoal ? activeGoal.progressPercentage : 0}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Upcoming Sessions */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Upcoming Sessions
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{activeSessions.length}</span>
            <span className="text-xs text-purple-600 font-medium">Active / Booked</span>
          </div>
          <p className="text-[11px] text-slate-500">Next: Dr. Marcus Chen (PWM Steering)</p>
        </div>

        {/* Metric 4: Completed Milestones */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Completed Goals
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{learnerProfile.goalsCompleted}</span>
            <span className="text-xs text-emerald-600 font-medium">Finished Projects</span>
          </div>
          <p className="text-[11px] text-slate-500">2 bonus credits awarded per project.</p>
        </div>
      </div>

      {/* Active Learning Goals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Active Learning Goals</h2>
            <p className="text-xs text-slate-500">Track and advance your project roadmap milestones</p>
          </div>
          <button
            onClick={() => setCurrentView('create-goal')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>+ Add Another Goal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {goals.map((goal) => {
            const isSelected = activeGoal?.id === goal.id;
            const completed = goal.roadmap.filter((s) => s.status === 'Completed').length;
            const currentStep = goal.roadmap.find((s) => s.status === 'In progress') || goal.roadmap[completed] || goal.roadmap[0];

            return (
              <div
                key={goal.id}
                className={`p-6 rounded-2xl bg-white border transition-all ${
                  isSelected
                    ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {goal.category}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Skill: {goal.skillLevel}
                      </span>
                      {goal.isCompleted ? (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Project Completed
                        </span>
                      ) : (
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          Target: {goal.desiredCompletionDate}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{goal.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 max-w-3xl leading-relaxed">
                      {goal.description}
                    </p>

                    {currentStep && !goal.isCompleted && (
                      <div className="pt-2 flex items-center gap-2 text-xs">
                        <span className="font-semibold text-slate-700">Current Step:</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium border border-indigo-100">
                          Step {currentStep.order}: {currentStep.title} ({currentStep.estimatedTime})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Progress & Actions */}
                  <div className="lg:w-72 flex flex-col gap-3 pt-4 lg:pt-0 lg:border-l lg:border-slate-100 lg:pl-6">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-600">Roadmap Progress</span>
                        <span className="text-blue-600 font-bold">{goal.progressPercentage}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                          style={{ width: `${goal.progressPercentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>{completed} completed</span>
                        <span>{goal.roadmap.length - completed} remaining</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveGoalId(goal.id);
                          setCurrentView('roadmap');
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <Map className="w-3.5 h-3.5" />
                        <span>View Roadmap</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveGoalId(goal.id);
                          setCurrentView('mentor-discovery');
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        title="Find a mentor for this goal"
                      >
                        Find Mentor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Upcoming Sessions & Recommended Mentors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upcoming Mentoring Sessions */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Upcoming Mentoring Sessions
            </h2>
            <button
              onClick={() => setCurrentView('session')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
            >
              Open Session Chat
            </button>
          </div>

          {activeSessions.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-slate-800">No active sessions scheduled yet</p>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Browse our mentor directory and request 30 minutes of 1-on-1 guidance using your time credits.
              </p>
              <button
                onClick={() => setCurrentView('mentor-discovery')}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                Find a Mentor
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {activeSessions.map((sess) => (
                <div
                  key={sess.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-purple-200 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                        {sess.scheduledTime}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1.5">{sess.goalTitle}</h4>
                      <p className="text-xs text-slate-500">
                        Mentor: <strong className="text-slate-800">{sess.mentorName}</strong> • {sess.durationMinutes} minutes (1 Credit)
                      </p>
                    </div>
                    <span className="flex h-2.5 w-2.5 relative mt-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                  </div>

                  {sess.notes && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">
                      <strong>Focus:</strong> {sess.notes}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">
                      {sess.messages.length} messages in chat
                    </span>
                    <button
                      id="dashboard-join-session-btn"
                      onClick={() => setCurrentView('session')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Enter Chat & Live Timer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recommended Mentors */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              Recommended Mentors for Your Project
            </h2>
            <button
              onClick={() => setCurrentView('mentor-discovery')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recommendedMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-200 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{mentor.name}</h4>
                      <div className="flex items-center gap-0.5 text-xs text-amber-600 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{mentor.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">{mentor.title}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {mentor.expertise.slice(0, 3).map((exp) => (
                        <span
                          key={exp}
                          className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-900">
                    {mentor.creditRatePerSession} Credit <span className="text-[10px] text-slate-500 font-normal">/ 30m</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMentorForRequest(mentor);
                      setCurrentView('mentor-discovery');
                    }}
                    className="mt-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition-colors"
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
