import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coins,
  Users,
  CheckCircle2,
  XCircle,
  MessageSquare,
  TrendingUp,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  Check,
  Edit,
  Star,
} from 'lucide-react';

export const MentorDashboard: React.FC = () => {
  const {
    mentorProfile,
    requests,
    acceptRequest,
    declineRequest,
    sessions,
    goals,
    setCurrentView,
    updateStepStatus,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'requests' | 'learners' | 'sessions'>('requests');
  const [editingLearnerGoalId, setEditingLearnerGoalId] = useState<string | null>(null);
  const [mentorFeedbackText, setMentorFeedbackText] = useState('');

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const acceptedRequests = requests.filter((r) => r.status === 'accepted');

  // Active learners are those associated with accepted requests or active sessions
  const activeLearners = acceptedRequests.map((req) => {
    const goal = goals.find((g) => g.id === req.goalId);
    return {
      requestId: req.id,
      learnerId: req.learnerId,
      learnerName: req.learnerName,
      learnerAvatar: req.learnerAvatar,
      goalTitle: req.goalTitle,
      goal,
      estimatedSessions: req.estimatedSessions,
    };
  });

  const activeSessions = sessions.filter((s) => s.status === 'active' || s.status === 'scheduled');

  const handleUpdateLearnerProgress = (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;

    // Advance current in-progress or next unstarted step
    const stepToAdvance =
      goal.roadmap.find((s) => s.status === 'In progress') ||
      goal.roadmap.find((s) => s.status === 'Not started');

    if (stepToAdvance) {
      updateStepStatus(goalId, stepToAdvance.id, 'Completed', mentorFeedbackText || 'Verified by Mentor in live session.');
      setEditingLearnerGoalId(null);
      setMentorFeedbackText('');
      showToast(`Advanced step "${stepToAdvance.title}" to Completed for learner!`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Mentor Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-900 text-white shadow-lg">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-purple-100 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Mentor Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome, {mentorProfile.name}! 🚀
          </h1>
          <p className="text-sm text-purple-100 max-w-xl leading-relaxed">
            Review incoming requests from eager learners, guide them through hardware & code milestones, and earn virtual time credits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCurrentView('session')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-purple-800 hover:bg-purple-50 font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>Open Mentoring Chat</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Earned Time Credits */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Earned Time Credits
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{mentorProfile.timeCredits}</span>
            <span className="text-xs font-bold text-amber-600">Credits</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Total lifetime earned: {mentorProfile.creditsEarned} credits ({mentorProfile.creditsEarned * 30}m mentored)
          </p>
        </div>

        {/* Metric 2: Pending Requests */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Incoming Requests
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-600">{pendingRequests.length}</span>
            <span className="text-xs text-slate-500 font-medium">Pending Review</span>
          </div>
          <p className="text-[11px] text-slate-500">Learners waiting for your response</p>
        </div>

        {/* Metric 3: Active Learners */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Learners
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">{activeLearners.length}</span>
            <span className="text-xs text-slate-500 font-medium">Active Projects</span>
          </div>
          <p className="text-[11px] text-slate-500">Guiding until independent completion</p>
        </div>

        {/* Metric 4: Completed Sessions */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Sessions Mentored
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-700">{mentorProfile.sessionsCompleted}</span>
            <span className="text-xs text-slate-500 font-medium">1-on-1 Sessions</span>
          </div>
          <p className="text-[11px] text-slate-500">Rating: 4.95 ★ (34 reviews)</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          id="tab-pending-requests"
          onClick={() => setActiveTab('requests')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'requests'
              ? 'bg-purple-100 text-purple-900 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Incoming Learner Requests</span>
          {pendingRequests.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[10px] font-bold animate-pulse">
              {pendingRequests.length}
            </span>
          )}
        </button>

        <button
          id="tab-active-learners"
          onClick={() => setActiveTab('learners')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'learners'
              ? 'bg-purple-100 text-purple-900 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Active Learners & Projects ({activeLearners.length})</span>
        </button>

        <button
          id="tab-upcoming-sessions"
          onClick={() => setActiveTab('sessions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'sessions'
              ? 'bg-purple-100 text-purple-900 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Scheduled Sessions ({activeSessions.length})</span>
        </button>
      </div>

      {/* Tab Content 1: Incoming Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Pending Mentorship Requests ({pendingRequests.length})
            </h2>
            <span className="text-xs text-slate-500">
              Accepting reserves time credits into your mentor ledger
            </span>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">No pending requests right now</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When learners browse mentors and request guidance for their goals, they will appear here for one-click approval.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  id={`request-card-${req.id}`}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-purple-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={req.learnerAvatar}
                        alt={req.learnerName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{req.learnerName}</h4>
                        <p className="text-xs text-slate-500">Target Project: <strong className="text-slate-800">{req.goalTitle}</strong></p>
                        <span className="text-[11px] text-slate-400">
                          Requested: {req.estimatedSessions} session ({req.estimatedSessions * 30} mins) • Total: {req.totalCredits} Credits
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`accept-request-btn-${req.id}`}
                        onClick={() => acceptRequest(req.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept Request</span>
                      </button>

                      <button
                        id={`decline-request-btn-${req.id}`}
                        onClick={() => declineRequest(req.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                    <span className="font-semibold text-slate-900">Learner's Note:</span>
                    <p className="italic text-slate-600">“{req.message}”</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Active Learners & Progress Tracking */}
      {activeTab === 'learners' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Active Learners & Project Roadmaps ({activeLearners.length})
            </h2>
            <span className="text-xs text-slate-500">
              Keep mentees accountable until they finish their project independently
            </span>
          </div>

          <div className="space-y-4">
            {activeLearners.map((item) => {
              const goal = item.goal;
              if (!goal) return null;

              const completedSteps = goal.roadmap.filter((s) => s.status === 'Completed').length;
              const currentStep =
                goal.roadmap.find((s) => s.status === 'In progress') || goal.roadmap[completedSteps] || goal.roadmap[0];

              return (
                <div
                  key={item.requestId}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-blue-200 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.learnerAvatar}
                        alt={item.learnerName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.learnerName}</h4>
                        <p className="text-xs text-slate-600">{item.goalTitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentView('session')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Message Learner</span>
                      </button>

                      <button
                        onClick={() => setEditingLearnerGoalId(editingLearnerGoalId === goal.id ? null : goal.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Update Progress / Notes</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600">Learner Milestone Completion</span>
                      <span className="text-blue-600">
                        {goal.progressPercentage}% ({completedSteps}/{goal.roadmap.length} steps)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                        style={{ width: `${goal.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Current Active Milestone */}
                  {currentStep && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                          CURRENT WORKING STEP:
                        </span>
                        <span className="font-bold text-slate-800">
                          Step {currentStep.order}: {currentStep.title}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5">{currentStep.description}</p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 shrink-0">
                        {currentStep.status}
                      </span>
                    </div>
                  )}

                  {/* Mentor Inline Progress Advancer / Notes Editor */}
                  {editingLearnerGoalId === goal.id && (
                    <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs space-y-3">
                      <h5 className="font-bold text-purple-900">
                        Mentor Verification & Progress Advance
                      </h5>
                      <input
                        type="text"
                        value={mentorFeedbackText}
                        onChange={(e) => setMentorFeedbackText(e.target.value)}
                        placeholder="Add guidance notes for this milestone (e.g., 'Checked PWM pins 5/6, motor speed looks solid!')..."
                        className="w-full px-3 py-2 rounded-lg border border-purple-300 bg-white text-xs text-slate-800 focus:outline-none"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateLearnerProgress(goal.id)}
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                        >
                          Mark Next Milestone Completed
                        </button>
                        <button
                          onClick={() => setEditingLearnerGoalId(null)}
                          className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content 3: Scheduled Sessions */}
      {activeTab === 'sessions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Scheduled Mentoring Sessions ({activeSessions.length})
            </h2>
          </div>

          <div className="space-y-3">
            {activeSessions.map((sess) => (
              <div
                key={sess.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 uppercase">
                    {sess.scheduledTime}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{sess.goalTitle}</h4>
                  <p className="text-xs text-slate-500">
                    Learner: <strong className="text-slate-800">{sess.learnerName}</strong> • {sess.durationMinutes} mins • Rate: {sess.creditsCost} Time Credit
                  </p>
                </div>

                <button
                  onClick={() => setCurrentView('session')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enter Session Room</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
