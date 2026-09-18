import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SkillLevel } from '../types';
import {
  Sparkles,
  Map,
  Clock,
  Calendar,
  Layers,
  Coins,
  ArrowRight,
  CheckCircle2,
  Wand2,
  Zap,
} from 'lucide-react';
import { generateRoadmapForGoal } from '../data/mockData';

export const CreateGoalPage: React.FC = () => {
  const { createGoal, learnerProfile, setCurrentView } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Robotics & Hardware');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Beginner');
  const [desiredCompletionDate, setDesiredCompletionDate] = useState('2026-09-25');
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [weeklyAvailabilityHours, setWeeklyAvailabilityHours] = useState(6);
  const [availableTimeCredits, setAvailableTimeCredits] = useState(learnerProfile.timeCredits);

  // Live preview of what roadmap will be generated
  const previewRoadmap = title.trim()
    ? generateRoadmapForGoal(title, category, skillLevel)
    : [];

  const handlePrefillDemo = () => {
    setTitle('I want to build a line-following car in 7 days');
    setDescription(
      'Design, wire, and code a 2-wheel drive autonomous robot using an Arduino Uno, L298N motor controller, and infrared reflection sensors that traces a black line track reliably.'
    );
    setCategory('Robotics & Hardware');
    setSkillLevel('Beginner');
    setDesiredCompletionDate('2026-09-25');
    setPreferredLanguage('English');
    setWeeklyAvailabilityHours(6);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createGoal({
      title,
      description: description.trim() || `Step-by-step project milestone for: ${title}`,
      category,
      skillLevel,
      desiredCompletionDate,
      preferredLanguage,
      weeklyAvailabilityHours,
      availableTimeCredits: learnerProfile.timeCredits,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Smart Milestone Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Create a New Learning Goal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Describe what you want to build. EasyLearner will automatically generate a step-by-step technical roadmap and recommend suitable peer mentors.
          </p>
        </div>

        {/* 1-Click Demo Pre-fill */}
        <button
          id="prefill-demo-goal-btn"
          type="button"
          onClick={handlePrefillDemo}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-semibold text-xs transition-colors cursor-pointer shrink-0"
        >
          <Zap className="w-4 h-4 text-purple-600" />
          <span>Load Demo: Line-Following Car</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            {/* Goal Title */}
            <div className="space-y-1.5">
              <label htmlFor="goal-title" className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                Goal Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="goal-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., I want to build a line-following car in 7 days"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
              <p className="text-[11px] text-slate-400">
                Be specific about what physical project or application you want to build.
              </p>
            </div>

            {/* Detailed Description */}
            <div className="space-y-1.5">
              <label htmlFor="goal-desc" className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                Detailed Description
              </label>
              <textarea
                id="goal-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what components, tools, or outcome you are aiming for..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>

            {/* Topic/Category & Skill Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="goal-category" className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Topic / Category
                </label>
                <select
                  id="goal-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm text-slate-900 outline-none bg-white transition-all"
                >
                  <option value="Robotics & Hardware">Robotics & Hardware</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Web & Mobile Development">Web & Mobile Development</option>
                  <option value="Embedded Systems & IoT">Embedded Systems & IoT</option>
                  <option value="Game Dev & 3D">Game Dev & 3D</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Current Skill Level
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSkillLevel(level)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        skillLevel === level
                          ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desired Completion Date & Preferred Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="goal-date" className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Desired Completion Date
                </label>
                <input
                  id="goal-date"
                  type="date"
                  value={desiredCompletionDate}
                  onChange={(e) => setDesiredCompletionDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm text-slate-900 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="goal-lang" className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Preferred Language
                </label>
                <select
                  id="goal-lang"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm text-slate-900 outline-none bg-white transition-all"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Mandarin">Mandarin</option>
                </select>
              </div>
            </div>

            {/* Weekly Availability & Time Credits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Weekly Availability (Hours)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={2}
                    max={20}
                    step={1}
                    value={weeklyAvailabilityHours}
                    onChange={(e) => setWeeklyAvailabilityHours(Number(e.target.value))}
                    className="flex-1 accent-blue-600"
                  />
                  <span className="text-xs font-bold text-slate-800 w-12 text-right">
                    {weeklyAvailabilityHours} hrs/wk
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Available Time Credits
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                  <Coins className="w-4 h-4 text-amber-600" />
                  <span>{learnerProfile.timeCredits} Credits in Wallet</span>
                  <span className="text-[10px] text-amber-700 font-normal ml-auto">
                    (1 credit = 30m)
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentView('learner-dashboard')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>

              <button
                id="submit-create-goal-btn"
                type="submit"
                disabled={!title.trim()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs shadow-md transition-all cursor-pointer ${
                  title.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Wand2 className="w-4 h-4" />
                <span>Generate Learning Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Live Roadmap Preview Card */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Map className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Roadmap Generator Preview</h3>
                  <p className="text-[11px] text-slate-500">Live milestones for this goal</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                {previewRoadmap.length} Milestones
              </span>
            </div>

            {previewRoadmap.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                <p>Type a goal title or click “Load Demo” above to preview your custom roadmap steps.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {previewRoadmap.map((step, idx) => (
                  <div
                    key={step.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        {step.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{step.estimatedTime}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-5">
                      {step.description}
                    </p>
                  </div>
                ))}

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Submitting will immediately attach this interactive roadmap to your dashboard.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
