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
    { id: 'landing', label: 'Home', icon: <Sparkles className="w-3.5 h-3.5" /> },
    {
      id: activeRole === 'learner' ? 'learner-dashboard' : 'mentor-dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-3.5 h-3.5" />,
      badge: activeRole === 'mentor' && pendingRequestsCount > 0 ? pendingRequestsCount : undefined,
    },
    { id: 'roadmap', label: 'Roadmap', icon: <Map className="w-3.5 h-3.5" /> },
    { id: 'mentor-discovery', label: 'Mentors', icon: <Compass className="w-3.5 h-3.5" /> },
    {
      id: 'session',
      label: 'Sessions',
      icon: <MessageSquare className="w-3.5 h-3.5" />,
      badge: activeSessionsCount > 0 ? activeSessionsCount : undefined,
    },
    { id: 'profile', label: 'Profile', icon: <Award className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 gap-2 w-full">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 xl:gap-4 shrink-0">
            <button
              id="brand-logo-btn"
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 group text-left focus:outline-none cursor-pointer shrink-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 font-display">EasyLearner</span>
                  <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 hidden sm:inline">
                    Peer Mentoring
                  </span>
                </div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-slate-100/70 border border-slate-200/60 shrink-0">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => setCurrentView(item.id)}
                    className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-950/5'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                    }`}
                  >
                    <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Time Credit Balance Pill with Explainer Popover */}
            <div className="relative shrink-0">
              <button
                id="time-credit-pill-btn"
                onClick={() => setShowCreditInfo(!showCreditInfo)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-orange-500/10 border border-amber-300/80 text-amber-900 text-xs font-bold shadow-xs hover:border-amber-400 transition-all cursor-pointer whitespace-nowrap"
                title="Click to view Time Credit details"
              >
                <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] shrink-0">
                  <Coins className="w-2.5 h-2.5" />
                </div>
                <span>{currentUser.timeCredits} <span className="hidden sm:inline">Credits</span></span>
                <span className="text-[10px] text-amber-700/80 font-normal hidden 2xl:inline">
                  ({currentUser.timeCredits * 30}m)
                </span>
              </button>

              {showCreditInfo && (
                <div className="absolute right-0 mt-2.5 w-80 p-5 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 z-50 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <span className="font-extrabold text-slate-900 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                      Virtual Time-Credit Economy
                    </span>
                    <button
                      onClick={() => setShowCreditInfo(false)}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-slate-600 mb-2.5 leading-relaxed font-medium">
                    EasyLearner operates on a peer reciprocity system:
                  </p>
                  <ul className="space-y-2 mb-3.5 text-slate-600 text-xs">
                    <li className="flex items-start gap-2 p-1.5 rounded-lg bg-emerald-50/60 border border-emerald-100/80">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>1 credit = 30 minutes</strong> of focused 1-on-1 peer guidance.</span>
                    </li>
                    <li className="flex items-start gap-2 p-1.5 rounded-lg bg-blue-50/60 border border-blue-100/80">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span><strong>Spend credits</strong> when receiving milestone reviews.</span>
                    </li>
                    <li className="flex items-start gap-2 p-1.5 rounded-lg bg-purple-50/60 border border-purple-100/80">
                      <span className="text-purple-600 font-bold">✓</span>
                      <span><strong>Earn credits</strong> when helping other students debug code.</span>
                    </li>
                  </ul>
                  <div className="p-2.5 rounded-xl bg-slate-100/80 text-[11px] text-slate-500 leading-snug">
                    💡 <strong>Prototype Note:</strong> Real currency monetization gateway is part of the production roadmap.
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Pill (Learner <-> Mentor) */}
            <div className="flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200/80 text-xs shadow-inner shrink-0">
              <button
                id="switch-role-learner-btn"
                onClick={() => switchRole('learner')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer text-xs whitespace-nowrap ${
                  activeRole === 'learner'
                    ? 'bg-white text-blue-700 shadow-xs font-extrabold ring-1 ring-slate-900/5'
                    : 'text-slate-600 hover:text-slate-900 font-semibold'
                }`}
              >
                Learner
              </button>
              <button
                id="switch-role-mentor-btn"
                onClick={() => switchRole('mentor')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer text-xs whitespace-nowrap ${
                  activeRole === 'mentor'
                    ? 'bg-white text-purple-700 shadow-xs font-extrabold ring-1 ring-slate-900/5'
                    : 'text-slate-600 hover:text-slate-900 font-semibold'
                }`}
              >
                Mentor
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative shrink-0">
              <button
                id="user-profile-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-full border border-slate-200/90 hover:border-slate-300 bg-white shadow-2xs hover:shadow-xs transition-all cursor-pointer shrink-0"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                />
                <span className="text-xs font-bold text-slate-800 hidden sm:inline whitespace-nowrap">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
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
