import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StepStatus } from '../types';
import {
  CheckCircle2,
  Clock,
  Circle,
  MapPin,
  Sparkles,
  Award,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Compass,
  ArrowRight,
  HelpCircle,
  PlusCircle,
  Edit3,
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const {
    activeGoal,
    goals,
    setActiveGoalId,
    updateStepStatus,
    completeProject,
    setCurrentView,
    activeRole,
    mentors,
    setSelectedMentorForRequest,
  } = useApp();

  const [editingNoteStepId, setEditingNoteStepId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [checkedBOM, setCheckedBOM] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  const toggleBOMItem = (idx: number) => {
    setCheckedBOM((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (!activeGoal) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No active goals found</h2>
        <p className="text-sm text-slate-500">Create your first goal to view a step-by-step roadmap.</p>
        <button
          onClick={() => setCurrentView('create-goal')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          Create Goal
        </button>
      </div>
    );
  }

  const completedSteps = activeGoal.roadmap.filter((s) => s.status === 'Completed').length;
  const totalSteps = activeGoal.roadmap.length;
  const allCompleted = completedSteps === totalSteps;

  const assignedMentor = mentors.find((m) => m.id === activeGoal.mentorId) || mentors[0];

  const handleStatusCycle = (stepId: string, currentStatus: StepStatus) => {
    let nextStatus: StepStatus = 'In progress';
    if (currentStatus === 'Not started') nextStatus = 'In progress';
    else if (currentStatus === 'In progress') nextStatus = 'Completed';
    else if (currentStatus === 'Completed') nextStatus = 'Not started';

    updateStepStatus(activeGoal.id, stepId, nextStatus);
  };

  const handleSaveNote = (stepId: string) => {
    updateStepStatus(activeGoal.id, stepId, activeGoal.roadmap.find((s) => s.id === stepId)?.status || 'In progress', noteText);
    setEditingNoteStepId(null);
    setNoteText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Goal Info & Progress */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {activeGoal.category}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Skill Level: {activeGoal.skillLevel}
              </span>
              {activeGoal.isCompleted ? (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  All Milestones Completed!
                </span>
              ) : (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Target: {activeGoal.desiredCompletionDate}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeGoal.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              {activeGoal.description}
            </p>
          </div>

          {/* Goal Selector Switcher */}
          {goals.length > 1 && (
            <div className="shrink-0 space-y-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase">Select Goal</label>
              <select
                value={activeGoal.id}
                onChange={(e) => setActiveGoalId(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white outline-none"
              >
                {goals.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title.slice(0, 30)}...
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Progress Metric Bar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Project Roadmap Completion</span>
            </span>
            <span className="text-blue-700 font-bold text-sm">
              {completedSteps} of {totalSteps} Steps ({activeGoal.progressPercentage}%)
            </span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${activeGoal.progressPercentage}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Click any step status button to advance it: Not started → In progress → Completed</span>
            {activeGoal.isCompleted ? (
              <span className="font-bold text-emerald-600">🎉 Certified Project Completed!</span>
            ) : (
              <span>Target: Autonomous line-tracking in 7 days</span>
            )}
          </div>
        </div>

        {/* Finish Project Trigger Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500">
            {allCompleted
              ? 'All 7 milestones verified! You can certify this project to earn your completion badge.'
              : `${totalSteps - completedSteps} steps remaining before full autonomous verification.`}
          </div>

          {!activeGoal.isCompleted ? (
            <button
              id="complete-project-btn"
              onClick={() => completeProject(activeGoal.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Mark Final Project as Completed</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Project Mastered (+2 Time Credits Earned)</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid: Roadmap Timeline and Mentor Assistance Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 7 Step Roadmap Timeline */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Step-by-Step Milestones
            </h2>
            <span className="text-xs text-slate-500">
              {completedSteps} / {totalSteps} Completed
            </span>
          </div>

          <div className="space-y-4 relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 hidden sm:block -z-10" />

            {activeGoal.roadmap.map((step, index) => {
              const isCompleted = step.status === 'Completed';
              const isInProgress = step.status === 'In progress';

              return (
                <div
                  key={step.id}
                  id={`roadmap-step-${step.id}`}
                  className={`p-5 rounded-2xl bg-white border transition-all ${
                    isCompleted
                      ? 'border-emerald-200 bg-emerald-50/20 shadow-xs'
                      : isInProgress
                      ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-md'
                      : 'border-slate-200 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step Status Icon Indicator */}
                    <div className="shrink-0 mt-0.5">
                      {isCompleted ? (
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shadow-xs">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      ) : isInProgress ? (
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-xs ring-4 ring-blue-50 animate-pulse">
                          <Clock className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </div>
                      )}
                    </div>

                    {/* Step Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                            Step {index + 1}
                          </span>
                          <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {step.estimatedTime}
                          </span>

                          {/* Interactive Status Cycle Button */}
                          <button
                            id={`toggle-step-${step.id}`}
                            onClick={() => handleStatusCycle(step.id, step.status)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : isInProgress
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 font-bold'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {step.status}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Mentor Notes Display or Edit */}
                      {step.mentorNotes && (
                        <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-100 text-xs text-purple-900 space-y-1">
                          <div className="font-bold flex items-center gap-1.5 text-purple-800">
                            <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                            <span>Mentor Guidance Notes:</span>
                          </div>
                          <p className="text-purple-700 leading-relaxed">{step.mentorNotes}</p>
                        </div>
                      )}

                      {/* Resources / Cheatsheets */}
                      {step.resources && step.resources.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase">Resources:</span>
                          {step.resources.map((res) => (
                            <span
                              key={res}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1"
                            >
                              <BookOpen className="w-2.5 h-2.5 text-slate-400" />
                              {res}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Add/Edit Note Action (useful for mentors & learners) */}
                      <div className="pt-1 flex items-center gap-3">
                        {editingNoteStepId === step.id ? (
                          <div className="w-full space-y-2 pt-2">
                            <input
                              type="text"
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder="Add a mentor tip or personal observation for this step..."
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                            />
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSaveNote(step.id)}
                                className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold"
                              >
                                Save Note
                              </button>
                              <button
                                onClick={() => setEditingNoteStepId(null)}
                                className="px-3 py-1 text-xs text-slate-500 hover:text-slate-800"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingNoteStepId(step.id);
                              setNoteText(step.mentorNotes || '');
                            }}
                            className="text-[11px] font-medium text-slate-400 hover:text-purple-600 flex items-center gap-1 transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>{step.mentorNotes ? 'Edit Note' : '+ Add Note / Tip'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Mentor Pairing & Session Booking */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          {/* Mentor Pairing Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Assigned Mentor
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                1 Credit / 30m
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src={assignedMentor.avatar}
                alt={assignedMentor.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900">{assignedMentor.name}</h4>
                <p className="text-xs text-slate-500">{assignedMentor.title}</p>
                <div className="text-[11px] text-amber-600 font-semibold mt-0.5">
                  ★ {assignedMentor.rating} ({assignedMentor.reviewCount} reviews)
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              “{assignedMentor.bio}”
            </p>

            <div className="space-y-2 pt-1">
              <button
                id="roadmap-request-session-btn"
                onClick={() => {
                  setSelectedMentorForRequest(assignedMentor);
                  setCurrentView('mentor-discovery');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book 30-Min Session (1 Credit)</span>
              </button>

              <button
                onClick={() => setCurrentView('session')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Open Active Session Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Line-Following Car Component Kit Checklist */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                Bill of Materials (Hardware Checklist)
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {Object.values(checkedBOM).filter(Boolean).length} / 7 Ready
              </span>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600">
              {[
                '1x Arduino Uno R3 + USB cable',
                '1x L298N Dual H-Bridge Motor Driver',
                '2x TCRT5000 IR Sensor Modules',
                '2x BO Geared Motors + Rubber Wheels',
                '1x 2WD Acrylic Chassis + Caster Wheel',
                '2x 18650 Li-ion Batteries + Holder',
                'Black electrical insulation tape (19mm)',
              ].map((item, idx) => {
                const isChecked = !!checkedBOM[idx];
                return (
                  <li key={idx}>
                    <button
                      type="button"
                      onClick={() => toggleBOMItem(idx)}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50/70 text-emerald-900 font-medium border border-emerald-100'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                      <span className={isChecked ? '' : 'text-slate-500'}>{item}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
