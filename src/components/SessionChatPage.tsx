import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Send,
  Coins,
  Sparkles,
  MapPin,
  AlertCircle,
  HelpCircle,
  FileCode,
} from 'lucide-react';

export const SessionChatPage: React.FC = () => {
  const {
    activeSession,
    sessions,
    setActiveSessionId,
    sendMessage,
    completeSession,
    currentUser,
    activeRole,
    learnerProfile,
    mentorProfile,
    activeGoal,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(30 * 60); // 30 minutes countdown default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [sessionNotes, setSessionNotes] = useState(
    'Successfully debugged motor polarity and tuned PWM pins. Next action: IR sensor analog threshold calibration.'
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages]);

  if (!activeSession) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">No active mentoring sessions</h2>
        <p className="text-xs text-slate-500">
          Request a mentor or accept an incoming request to launch your 1-on-1 collaborative session.
        </p>
      </div>
    );
  }

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(activeSession.id, inputMessage);
    setInputMessage('');
  };

  const handleConfirmComplete = () => {
    completeSession(activeSession.id, sessionNotes);
    setShowCompleteModal(false);
    setIsTimerRunning(false);
  };

  const isCompleted = activeSession.status === 'completed';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Complete Session Confirmation Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Conclude Mentoring Session</h3>
                <p className="text-xs text-slate-500">Exchange virtual time credits</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Learner:</span>
                <span className="font-semibold text-slate-800">{activeSession.learnerName} (-1 Credit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mentor:</span>
                <span className="font-semibold text-slate-800">{activeSession.mentorName} (+1 Credit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Session Duration:</span>
                <span className="font-semibold text-slate-800">30 minutes</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Mentor Guidance Notes (Appended to Roadmap)
              </label>
              <textarea
                rows={3}
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                placeholder="Summary of what was achieved and next hardware/code steps..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCompleteModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmComplete}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-colors"
              >
                Confirm & Exchange Credit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner: Active Session Context & Live Timer */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isCompleted
                ? 'bg-slate-100 text-slate-600'
                : 'bg-emerald-100 text-emerald-800 animate-pulse'
            }`}>
              {isCompleted ? 'Session Concluded' : '● Live 1-on-1 Session'}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">{activeSession.goalTitle}</span>
          </div>

          <h1 className="text-xl font-bold text-slate-900">
            Mentoring Room: <span className="text-blue-600">{activeSession.learnerName}</span> & <span className="text-purple-600">{activeSession.mentorName}</span>
          </h1>
          <p className="text-xs text-slate-500">
            Topic: Line-Following Car • Step 3: Program the motor driver & PWM speeds
          </p>
        </div>

        {/* Live Session Timer & Action */}
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              SESSION TIMER
            </div>
            <div className="text-2xl font-black font-mono tracking-tight text-slate-900">
              {formatTimer(timerSeconds)}
            </div>
          </div>

          <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
            {!isCompleted && (
              <>
                <button
                  id="toggle-session-timer-btn"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isTimerRunning
                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  title={isTimerRunning ? 'Pause Timer' : 'Start Timer'}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(30 * 60);
                  }}
                  className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors"
                  title="Reset to 30 mins"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </>
            )}

            {!isCompleted ? (
              <button
                id="complete-session-btn"
                onClick={() => setShowCompleteModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer ml-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Session</span>
              </button>
            ) : (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Credits Exchanged</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[520px]">
        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/40">
          <div className="text-center">
            <span className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
              Session started today • 1 Time Credit reserved for 30 minutes of mentoring
            </span>
          </div>

          {activeSession.messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[11px] font-bold text-slate-700">{msg.senderName}</span>
                  <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                </div>
                <div
                  className={`max-w-lg p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Snippet Chips */}
        <div className="px-6 py-2 bg-slate-100/60 border-t border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Quick Tips:</span>
          <button
            onClick={() =>
              setInputMessage(
                'Can you inspect my Arduino PWM setup? Left motor is wired to D5/D6, right motor to D9/D10.'
              )
            }
            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 text-[11px] whitespace-nowrap"
          >
            🔌 PWM Pin Query
          </button>
          <button
            onClick={() =>
              setInputMessage(
                'The black tape reflection threshold reads around 850 in analogRead(A0). Is that reliable for 5V logic?'
              )
            }
            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-purple-600 hover:border-purple-300 text-[11px] whitespace-nowrap"
          >
            📡 IR Calibration Query
          </button>
          <button
            onClick={() =>
              setInputMessage(
                'Both wheels spin forward in unison! Ready to mark step 3 completed and configure sensors.'
              )
            }
            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-300 text-[11px] whitespace-nowrap"
          >
            ✅ Milestone Completed
          </button>
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
          <input
            id="session-chat-input"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Message as ${currentUser.name}...`}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />

          <button
            id="send-message-btn"
            type="submit"
            disabled={!inputMessage.trim()}
            className={`p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              inputMessage.trim()
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Credit Ledger Explainer Footer */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Coins className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>Virtual Time-Credit Transaction:</strong> Concluding this session transfers 1 credit from learner ({learnerProfile.timeCredits} available) to mentor ({mentorProfile.timeCredits} available).
          </span>
        </div>
        <span className="text-[11px] text-amber-700 italic hidden sm:inline">1 Credit = 30 mins</span>
      </div>
    </div>
  );
};
