import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mentor } from '../types';
import {
  Compass,
  Search,
  Filter,
  Star,
  Coins,
  CheckCircle2,
  Calendar,
  Languages,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { MentorRequestModal } from './MentorRequestModal';

export const MentorDiscoveryPage: React.FC = () => {
  const {
    mentors,
    selectedMentorForRequest,
    setSelectedMentorForRequest,
    activeGoal,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  // Filter logic
  const filteredMentors = mentors.filter((mentor) => {
    // Search query matches name, title, expertise, or bio
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = mentor.name.toLowerCase().includes(q);
      const matchTitle = mentor.title.toLowerCase().includes(q);
      const matchBio = mentor.bio.toLowerCase().includes(q);
      const matchExpertise = mentor.expertise.some((e) => e.toLowerCase().includes(q));
      if (!matchName && !matchTitle && !matchBio && !matchExpertise) return false;
    }

    // Topic Filter
    if (selectedTopic !== 'All') {
      if (selectedTopic === 'Robotics' && !mentor.category.includes('Robotics')) return false;
      if (selectedTopic === 'AI' && !mentor.category.includes('AI')) return false;
      if (selectedTopic === 'Web' && !mentor.category.includes('Web')) return false;
      if (selectedTopic === 'IoT' && !mentor.expertise.some((e) => e.includes('IoT') || e.includes('ESP32')))
        return false;
    }

    // Skill level filter
    if (selectedSkillLevel !== 'All') {
      if (!mentor.skillLevelsSupported.includes(selectedSkillLevel as any)) return false;
    }

    // Language filter
    if (selectedLanguage !== 'All') {
      if (!mentor.languages.includes(selectedLanguage)) return false;
    }

    // Availability filter
    if (selectedAvailability !== 'All') {
      if (selectedAvailability === 'Weekends' && !mentor.availability.toLowerCase().includes('weekend'))
        return false;
      if (selectedAvailability === 'Weekdays' && !mentor.availability.toLowerCase().includes('weekday') && !mentor.availability.toLowerCase().includes('mon') && !mentor.availability.toLowerCase().includes('tuesday'))
        return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Mentor Request Modal */}
      {selectedMentorForRequest && <MentorRequestModal />}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Peer Mentor Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Find Your Project Mentor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Book focused 30-minute mentoring sessions using your virtual time credits. Get hands-on code reviews, circuit debugging, and roadmap guidance.
          </p>
        </div>

        {activeGoal && (
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <div className="font-bold">Active Goal Context:</div>
              <div className="text-purple-700 font-medium truncate max-w-xs">{activeGoal.title}</div>
            </div>
          </div>
        )}
      </div>

      {/* Search & Filters Bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        {/* Top Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by mentor name, skill (Arduino, L298N, OpenCV, React, ESP32)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Filter: Topic */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Topic / Domain
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white outline-none focus:border-blue-500"
            >
              <option value="All">All Domains</option>
              <option value="Robotics">Robotics & Hardware</option>
              <option value="AI">AI & Vision</option>
              <option value="Web">Web & Mobile</option>
              <option value="IoT">IoT & Firmware</option>
            </select>
          </div>

          {/* Filter: Skill Level */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Learner Skill Level
            </label>
            <select
              value={selectedSkillLevel}
              onChange={(e) => setSelectedSkillLevel(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white outline-none focus:border-blue-500"
            >
              <option value="All">Any Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Filter: Language */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Spoken Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white outline-none focus:border-blue-500"
            >
              <option value="All">All Languages</option>
              <option value="English">English</option>
              <option value="Mandarin">Mandarin</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="Korean">Korean</option>
            </select>
          </div>

          {/* Filter: Availability */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Schedule Availability
            </label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white outline-none focus:border-blue-500"
            >
              <option value="All">Any Time</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Indicator */}
        {(searchQuery || selectedTopic !== 'All' || selectedSkillLevel !== 'All' || selectedLanguage !== 'All' || selectedAvailability !== 'All') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">
              Found {filteredMentors.length} mentor{filteredMentors.length === 1 ? '' : 's'} matching criteria
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic('All');
                setSelectedSkillLevel('All');
                setSelectedLanguage('All');
                setSelectedAvailability('All');
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            id={`mentor-card-${mentor.id}`}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            {/* Header: Avatar, Name, Rating */}
            <div className="flex items-start gap-4">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 truncate">{mentor.name}</h3>
                    <p className="text-xs text-slate-500">{mentor.title}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shrink-0">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{mentor.rating}</span>
                    <span className="text-[10px] text-amber-700 font-normal">({mentor.reviewCount})</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-emerald-500" />
                    <strong>{mentor.completedProjects}</strong> projects completed
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Languages className="w-3 h-3 text-blue-500" />
                    {mentor.languages.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Short Biography */}
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
              {mentor.bio}
            </p>

            {/* Expertise Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Expertise & Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {mentor.expertise.map((exp) => (
                  <span
                    key={exp}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability & Rate Card */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-semibold block">AVAILABILITY</span>
                <span className="text-slate-700 font-medium">{mentor.availability}</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-semibold block">TIME-CREDIT RATE</span>
                <div className="flex items-center gap-1 font-bold text-slate-900">
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span>{mentor.creditRatePerSession} Credit</span>
                  <span className="text-[10px] text-slate-500 font-normal">/ 30 min</span>
                </div>
              </div>
            </div>

            {/* Request Button */}
            <button
              id={`request-mentorship-btn-${mentor.id}`}
              onClick={() => setSelectedMentorForRequest(mentor)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Request Mentorship</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
