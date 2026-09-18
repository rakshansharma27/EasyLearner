import React, { useState } from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  Compass,
  LayoutDashboard,
  Map,
  Users,
  MessageSquare,
  Award,
  Coins,
  ChevronDown,
  Sparkles,
  PlusCircle,
  Clock,
  Info,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    activeRole,
    switchRole,
    currentUser,
    learnerProfile,
    mentorProfile,
    requests,
    sessions,
  } = useApp();

  const [showCreditInfo, setShowCreditInfo] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const pendingRequestsCount = requests.filter((r) => r.status === 'pending').length;
  const activeSessionsCount = sessions.filter((s) => s.status === 'active').length;

  const navItems: { id: AppView; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'landing', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    {
      id: activeRole === 'learner' ? 'learner-dashboard' : 'mentor-dashboard',
      label: activeRole === 'learner' ? 'Learner Dashboard' : 'Mentor Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: activeRole === 'mentor' && pendingRequestsCount > 0 ? pendingRequestsCount : undefined,
    },
    { id: 'roadmap', label: 'Project Roadmap', icon: <Map className="w-4 h-4" /> },
    { id: 'mentor-discovery', label: 'Find Mentors', icon: <Compass className="w-4 h-4" /> },
    {
      id: 'session',
      label: 'Mentoring Sessions',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: activeSessionsCount > 0 ? activeSessionsCount : undefined,
    },
    { id: 'profile', label: 'Profile & Badges', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              id="brand-logo-btn"
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-slate-900">EasyLearner</span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    Peer Mentoring
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">Learn by building. Grow by helping.</p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => setCurrentView(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-purple-600 text-white animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Action: New Goal */}
            <button
              id="quick-create-goal-btn"
              onClick={() => setCurrentView('create-goal')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>New Goal</span>
            </button>

            {/* Time Credit Balance Pill with Explainer Popover */}
            <div className="relative">
              <button
                id="time-credit-pill-btn"
                onClick={() => setShowCreditInfo(!showCreditInfo)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold shadow-xs hover:border-amber-400 transition-all cursor-pointer"
                title="Click to view Time Credit details"
              >
                <Coins className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
                <span>{currentUser.timeCredits} Credits</span>
                <span className="text-[10px] text-amber-700 font-normal hidden md:inline">
                  ({currentUser.timeCredits * 30}m)
                </span>
                <Info className="w-3 h-3 text-amber-600 ml-0.5 opacity-70" />
              </button>

              {showCreditInfo && (
                <div className="absolute right-0 mt-2 w-72 p-4 bg-white rounded-xl shadow-xl border border-slate-200 z-50 text-xs text-slate-700">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      Virtual Time-Credit System
                    </span>
                    <button
                      onClick={() => setShowCreditInfo(false)}
                      className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-slate-600 mb-2 leading-relaxed">
                    EasyLearner operates on a peer reciprocity system:
                  </p>
                  <ul className="space-y-1.5 mb-3 text-slate-600">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span><strong>1 credit = 30 minutes</strong> of personalized 1-on-1 mentoring.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">✓</span>
                      <span><strong>Spend credits</strong> when receiving guidance from mentors.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-purple-500 font-bold">✓</span>
                      <span><strong>Earn credits</strong> when mentoring other learners.</span>
                    </li>
                  </ul>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
                    ℹ️ Real money payments will be added in a future release. Current prototype uses 100% virtual time credits.
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Pill (Learner <-> Mentor) */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs">
              <button
                id="switch-role-learner-btn"
                onClick={() => switchRole('learner')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  activeRole === 'learner'
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Learner
              </button>
              <button
                id="switch-role-mentor-btn"
                onClick={() => switchRole('mentor')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  activeRole === 'mentor'
                    ? 'bg-purple-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mentor
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                id="user-profile-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 pl-2 pr-1.5 rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span className="text-xs font-semibold text-slate-800 hidden sm:inline">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 p-2 bg-white rounded-xl shadow-xl border border-slate-200 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="font-semibold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 capitalize">{activeRole} Mode Active</p>
                    <p className="text-[11px] text-blue-600 font-medium mt-1">
                      {currentUser.timeCredits} Time Credits
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      id="menu-view-profile"
                      onClick={() => {
                        setCurrentView('profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 flex items-center gap-2"
                    >
                      <Award className="w-3.5 h-3.5 text-purple-500" />
                      View Profile & Badges
                    </button>
                    <button
                      id="menu-switch-persona"
                      onClick={() => {
                        switchRole(activeRole === 'learner' ? 'mentor' : 'learner');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 flex items-center gap-2"
                    >
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                      Switch to {activeRole === 'learner' ? `Mentor (${mentorProfile.name})` : `Learner (${learnerProfile.name})`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center gap-2 py-2 overflow-x-auto border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium ${
                currentView === item.id
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
