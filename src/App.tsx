import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { DemoBanner } from './components/DemoBanner';
import { Toast } from './components/Toast';
import { LandingPage } from './components/LandingPage';
import { LearnerDashboard } from './components/LearnerDashboard';
import { CreateGoalPage } from './components/CreateGoalPage';
import { RoadmapView } from './components/RoadmapView';
import { MentorDiscoveryPage } from './components/MentorDiscoveryPage';
import { MentorDashboard } from './components/MentorDashboard';
import { SessionChatPage } from './components/SessionChatPage';
import { ProfileAchievementsPage } from './components/ProfileAchievementsPage';
import { Compass, Sparkles, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans overflow-x-hidden w-full max-w-full">
      {/* Interactive Demo Walkthrough Banner */}
      <DemoBanner />

      {/* Primary Sticky Header */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'learner-dashboard' && <LearnerDashboard />}
        {currentView === 'create-goal' && <CreateGoalPage />}
        {currentView === 'roadmap' && <RoadmapView />}
        {currentView === 'mentor-discovery' && <MentorDiscoveryPage />}
        {currentView === 'mentor-dashboard' && <MentorDashboard />}
        {currentView === 'session' && <SessionChatPage />}
        {currentView === 'profile' && <ProfileAchievementsPage />}
      </main>

      {/* Application Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-16 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">EasyLearner</span>
            <span>— “Learn by building. Grow by helping.”</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Virtual Time-Credit Economy (1 Credit = 30m)</span>
            <span>•</span>
            <button
              onClick={() => setCurrentView('create-goal')}
              className="hover:text-blue-600 text-slate-600 font-medium"
            >
              New Goal
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentView('mentor-discovery')}
              className="hover:text-blue-600 text-slate-600 font-medium"
            >
              Mentors
            </button>
          </div>
        </div>
      </footer>

      {/* Global Notifications */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
