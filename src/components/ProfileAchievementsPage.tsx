import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Coins,
  CheckCircle2,
  Calendar,
  Flame,
  Target,
  HeartHandshake,
  Cpu,
  Users,
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  Star,
} from 'lucide-react';

export const ProfileAchievementsPage: React.FC = () => {
  const {
    currentUser,
    activeRole,
    switchRole,
    learnerProfile,
    mentorProfile,
    transactions,
    badges,
    goals,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'ledger'>('overview');

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-xs shrink-0"
          />

          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-slate-900">{currentUser.name}</h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 capitalize">
                {activeRole}
              </span>
            </div>

            <p className="text-xs text-slate-500 max-w-xl">{currentUser.bio}</p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Skills:</span>
              {currentUser.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Role Switch in Profile */}
        <div className="shrink-0 space-y-2 text-right">
          <span className="text-[11px] text-slate-400 block">Switch Viewing Perspective:</span>
          <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200">
            <button
              onClick={() => switchRole('learner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeRole === 'learner'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Learner Profile (Alex)
            </button>
            <button
              onClick={() => switchRole('mentor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeRole === 'mentor'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mentor Profile (Dr. Marcus)
            </button>
          </div>
        </div>
      </div>

      {/* Core Profile Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Current Balance</span>
          <div className="flex items-baseline gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            <span className="text-3xl font-black text-slate-900">{currentUser.timeCredits}</span>
            <span className="text-xs text-amber-700 font-bold">Credits</span>
          </div>
          <p className="text-[10px] text-slate-500">{currentUser.timeCredits * 30} minutes available</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Goals Completed</span>
          <div className="flex items-baseline gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-3xl font-black text-slate-900">{currentUser.goalsCompleted}</span>
            <span className="text-xs text-emerald-700 font-bold">Projects</span>
          </div>
          <p className="text-[10px] text-slate-500">Autonomous hardware & apps</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Sessions Completed</span>
          <div className="flex items-baseline gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span className="text-3xl font-black text-slate-900">{currentUser.sessionsCompleted}</span>
            <span className="text-xs text-purple-700 font-bold">Sessions</span>
          </div>
          <p className="text-[10px] text-slate-500">1-on-1 collaborative reviews</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Credits Ledger</span>
          <div className="flex items-center gap-3 pt-1">
            <div>
              <span className="text-[10px] text-emerald-600 font-bold uppercase">Earned:</span>
              <span className="text-lg font-bold text-slate-900 ml-1">+{currentUser.creditsEarned}</span>
            </div>
            <div className="border-l border-slate-200 pl-3">
              <span className="text-[10px] text-rose-600 font-bold uppercase">Spent:</span>
              <span className="text-lg font-bold text-slate-900 ml-1">-{currentUser.creditsSpent}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500">Virtual reciprocity economy</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-blue-50 text-blue-700 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Badges & Achievements
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'ledger'
              ? 'bg-blue-50 text-blue-700 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Time Credit Transaction Ledger ({transactions.length})
        </button>
      </div>

      {/* Tab: Badges */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Achievements & Community Badges
            </h2>
            <span className="text-xs text-slate-500">
              {badges.filter((b) => b.isEarned).length} of {badges.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  badge.isEarned
                    ? 'bg-white border-amber-200 shadow-xs ring-1 ring-amber-400/20'
                    : 'bg-slate-50/70 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    badge.isEarned
                      ? 'bg-gradient-to-tr from-amber-400 to-amber-500 text-white shadow-md shadow-amber-500/20'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {getBadgeIcon(badge.icon)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{badge.name}</h4>
                    {badge.isEarned && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Earned
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{badge.description}</p>
                  {badge.earnedDate && (
                    <span className="text-[10px] text-slate-400 block pt-1">
                      Unlocked: {badge.earnedDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Transactions */}
      {activeTab === 'ledger' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-500" />
              Time Credit Activity Ledger
            </h2>
            <span className="text-xs text-slate-500">1 Credit = 30 Minutes</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs divide-y divide-slate-100">
            {transactions.map((tx) => {
              const isPositive = tx.amount > 0;
              return (
                <div key={tx.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isPositive
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-rose-50 text-rose-600 border border-rose-200'
                      }`}
                    >
                      {isPositive ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{tx.description}</p>
                      <span className="text-[10px] text-slate-400">{tx.date}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-sm font-black ${
                        isPositive ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isPositive ? `+${tx.amount}` : tx.amount} Credits
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {Math.abs(tx.amount) * 30} mins
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
