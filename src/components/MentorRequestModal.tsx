import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mentor } from '../types';
import {
  X,
  Coins,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  AlertCircle,
} from 'lucide-react';

interface MentorRequestModalProps {
  mentor: Mentor;
  onClose: () => void;
}

export const MentorRequestModal: React.FC = () => {
  const {
    selectedMentorForRequest,
    setSelectedMentorForRequest,
    activeGoal,
    goals,
    learnerProfile,
    sendMentorRequest,
    setCurrentView,
    switchRole,
  } = useApp();

  const [selectedGoalId, setSelectedGoalId] = useState(activeGoal?.id || goals[0]?.id || '');
  const [sessionsCount, setSessionsCount] = useState(1);
  const [message, setMessage] = useState(
    "Hi Dr. Chen, I'm working on step 3 of my line-following car and need guidance getting the PWM motor speeds and IR sensor readings calibrated properly."
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!selectedMentorForRequest) return null;

  const mentor = selectedMentorForRequest;
  const currentGoal = goals.find((g) => g.id === selectedGoalId) || activeGoal;
  const totalCredits = sessionsCount * mentor.creditRatePerSession;
  const hasEnoughCredits = learnerProfile.timeCredits >= totalCredits;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentGoal) return;

    const success = sendMentorRequest(mentor.id, currentGoal.id, message, sessionsCount);
    if (success) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">
              {isSubmitted ? 'Mentorship Request Confirmed' : 'Request Mentorship Session'}
            </h3>
          </div>
          <button
            onClick={() => setSelectedMentorForRequest(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {isSubmitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900">Request Sent Successfully!</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your request has been dispatched to <strong className="text-slate-800">{mentor.name}</strong> for “{currentGoal?.title}”.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Reserved Sessions:</span>
                <span className="font-semibold text-slate-800">{sessionsCount} session ({sessionsCount * 30} mins)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time Credits to spend:</span>
                <span className="font-semibold text-amber-600">{totalCredits} Credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-indigo-600">Pending Mentor Acceptance</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-[11px] text-purple-800 text-left">
              💡 <strong>Demo Shortcut:</strong> Switch to the <strong>Mentor</strong> role via the top header switcher to accept this request and enter the live session chat!
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedMentorForRequest(null);
                  switchRole('mentor');
                  setCurrentView('mentor-dashboard');
                }}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors"
              >
                Switch to Mentor to Accept
              </button>
              <button
                onClick={() => {
                  setSelectedMentorForRequest(null);
                  setCurrentView('learner-dashboard');
                }}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-6 space-y-5">
            {/* Mentor Summary Strip */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-slate-900 truncate">{mentor.name}</h4>
                <p className="text-xs text-slate-500 truncate">{mentor.title}</p>
                <div className="flex items-center gap-2 text-[11px] text-blue-700 font-semibold mt-0.5">
                  <span>★ {mentor.rating}</span>
                  <span>•</span>
                  <span>{mentor.creditRatePerSession} Credit / 30m</span>
                </div>
              </div>
            </div>

            {/* Select Goal */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Select Your Project Goal
              </label>
              <select
                value={selectedGoalId}
                onChange={(e) => setSelectedGoalId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white outline-none focus:border-blue-500"
              >
                {goals.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title} ({g.progressPercentage}% completed)
                  </option>
                ))}
              </select>
            </div>

            {/* Estimated Sessions & Credit Calculation */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Estimated Sessions
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSessionsCount(Math.max(1, sessionsCount - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold text-slate-900">{sessionsCount}</span>
                  <button
                    type="button"
                    onClick={() => setSessionsCount(sessionsCount + 1)}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  ({sessionsCount * 30} mins of help)
                </span>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Total Time Credits
                </label>
                <div className="flex items-baseline gap-1.5">
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span className="text-xl font-black text-slate-900">{totalCredits}</span>
                  <span className="text-[11px] text-slate-500">Credits</span>
                </div>
                <span className={`text-[10px] block mt-1 ${hasEnoughCredits ? 'text-emerald-600' : 'text-rose-600 font-bold'}`}>
                  Your wallet: {learnerProfile.timeCredits} credits
                </span>
              </div>
            </div>

            {!hasEnoughCredits && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>You don't have enough time credits for {sessionsCount} sessions. Reduce sessions or mentor peers to earn credits!</span>
              </div>
            )}

            {/* Message to Mentor */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Note to Mentor
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What specific blocker or roadmap milestone do you need help with?"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setSelectedMentorForRequest(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!hasEnoughCredits || !message.trim()}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs shadow-sm transition-all cursor-pointer ${
                  hasEnoughCredits && message.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Request ({totalCredits} Credits)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
