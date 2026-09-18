import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  LearningGoal,
  Mentor,
  UserProfile,
  MentorshipRequest,
  MentoringSession,
  CreditTransaction,
  AchievementBadge,
  StepStatus,
  SkillLevel,
} from '../types';
import {
  INITIAL_LEARNER,
  INITIAL_MENTOR,
  MOCK_MENTORS,
  DEFAULT_GOAL,
  INITIAL_REQUESTS,
  INITIAL_SESSIONS,
  INITIAL_TRANSACTIONS,
  INITIAL_BADGES,
  generateRoadmapForGoal,
} from '../data/mockData';

export type AppView =
  | 'landing'
  | 'learner-dashboard'
  | 'create-goal'
  | 'roadmap'
  | 'mentor-discovery'
  | 'mentor-dashboard'
  | 'session'
  | 'profile';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  activeRole: 'learner' | 'mentor';
  switchRole: (role: 'learner' | 'mentor') => void;
  currentUser: UserProfile;
  learnerProfile: UserProfile;
  mentorProfile: UserProfile;
  mentors: Mentor[];
  goals: LearningGoal[];
  activeGoal: LearningGoal | undefined;
  activeGoalId: string;
  setActiveGoalId: (id: string) => void;
  requests: MentorshipRequest[];
  sessions: MentoringSession[];
  activeSessionId: string;
  setActiveSessionId: (id: string) => void;
  activeSession: MentoringSession | undefined;
  transactions: CreditTransaction[];
  badges: AchievementBadge[];
  // Actions
  createGoal: (data: {
    title: string;
    description: string;
    category: string;
    skillLevel: SkillLevel;
    desiredCompletionDate: string;
    preferredLanguage: string;
    weeklyAvailabilityHours: number;
    availableTimeCredits: number;
  }) => string;
  updateStepStatus: (goalId: string, stepId: string, status: StepStatus, mentorNotes?: string) => void;
  completeProject: (goalId: string) => void;
  sendMentorRequest: (mentorId: string, goalId: string, message: string, estimatedSessions: number) => boolean;
  acceptRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;
  completeSession: (sessionId: string, mentorNotes?: string) => void;
  sendMessage: (sessionId: string, text: string) => void;
  resetToDemo: () => void;
  toastMessage: string | null;
  clearToast: () => void;
  showToast: (msg: string) => void;
  selectedMentorForRequest: Mentor | null;
  setSelectedMentorForRequest: (mentor: Mentor | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  VIEW: 'easylearner_view',
  ROLE: 'easylearner_role',
  LEARNER: 'easylearner_learner',
  MENTOR: 'easylearner_mentor',
  GOALS: 'easylearner_goals',
  ACTIVE_GOAL: 'easylearner_active_goal',
  REQUESTS: 'easylearner_requests',
  SESSIONS: 'easylearner_sessions',
  ACTIVE_SESSION: 'easylearner_active_session',
  TRANSACTIONS: 'easylearner_transactions',
  BADGES: 'easylearner_badges',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Role
  const [currentView, setCurrentView] = useState<AppView>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VIEW);
    return (saved as AppView) || 'landing';
  });

  const [activeRole, setActiveRole] = useState<'learner' | 'mentor'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return saved === 'mentor' ? 'mentor' : 'learner';
  });

  // User Profiles
  const [learnerProfile, setLearnerProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEARNER);
    return saved ? JSON.parse(saved) : INITIAL_LEARNER;
  });

  const [mentorProfile, setMentorProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MENTOR);
    return saved ? JSON.parse(saved) : INITIAL_MENTOR;
  });

  // Goals
  const [goals, setGoals] = useState<LearningGoal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
    return saved ? JSON.parse(saved) : [DEFAULT_GOAL];
  });

  const [activeGoalId, setActiveGoalId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_GOAL);
    return saved || DEFAULT_GOAL.id;
  });

  // Mentors
  const [mentors] = useState<Mentor[]>(MOCK_MENTORS);
  const [selectedMentorForRequest, setSelectedMentorForRequest] = useState<Mentor | null>(null);

  // Requests
  const [requests, setRequests] = useState<MentorshipRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  // Sessions
  const [sessions, setSessions] = useState<MentoringSession[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    return saved || 'session-1';
  });

  // Transactions & Badges
  const [transactions, setTransactions] = useState<CreditTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [badges, setBadges] = useState<AchievementBadge[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BADGES);
    return saved ? JSON.parse(saved) : INITIAL_BADGES;
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const clearToast = () => setToastMessage(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIEW, currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEARNER, JSON.stringify(learnerProfile));
  }, [learnerProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MENTOR, JSON.stringify(mentorProfile));
  }, [mentorProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_GOAL, activeGoalId);
  }, [activeGoalId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, activeSessionId);
  }, [activeSessionId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  }, [badges]);

  // Derived current user
  const currentUser = activeRole === 'mentor' ? mentorProfile : learnerProfile;
  const activeGoal = goals.find((g) => g.id === activeGoalId) || goals[0];
  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const switchRole = (newRole: 'learner' | 'mentor') => {
    setActiveRole(newRole);
    if (newRole === 'mentor') {
      setCurrentView('mentor-dashboard');
      showToast('Switched to Mentor View: Viewing incoming requests & active mentees.');
    } else {
      setCurrentView('learner-dashboard');
      showToast('Switched to Learner View: Tracking goals & roadmaps.');
    }
  };

  // 1. Create a Learning Goal & generate roadmap
  const createGoal = (data: {
    title: string;
    description: string;
    category: string;
    skillLevel: SkillLevel;
    desiredCompletionDate: string;
    preferredLanguage: string;
    weeklyAvailabilityHours: number;
    availableTimeCredits: number;
  }): string => {
    const generatedSteps = generateRoadmapForGoal(data.title, data.category, data.skillLevel);

    const newGoalId = `goal-${Date.now()}`;
    const newGoal: LearningGoal = {
      id: newGoalId,
      userId: learnerProfile.id,
      title: data.title,
      description: data.description,
      category: data.category,
      skillLevel: data.skillLevel,
      desiredCompletionDate: data.desiredCompletionDate,
      preferredLanguage: data.preferredLanguage,
      weeklyAvailabilityHours: data.weeklyAvailabilityHours,
      availableTimeCredits: data.availableTimeCredits,
      roadmap: generatedSteps,
      progressPercentage: 0,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    setGoals((prev) => [newGoal, ...prev]);
    setActiveGoalId(newGoalId);

    // Update badges
    setBadges((prev) =>
      prev.map((b) => (b.id === 'badge-1' ? { ...b, isEarned: true, earnedDate: 'Just now' } : b))
    );

    showToast(`Goal created! Generated a ${generatedSteps.length}-step tailored learning roadmap.`);
    setCurrentView('roadmap');
    return newGoalId;
  };

  // 2. Update step status and calculate project progress
  const updateStepStatus = (goalId: string, stepId: string, status: StepStatus, mentorNotes?: string) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;

        const updatedRoadmap = goal.roadmap.map((step) => {
          if (step.id !== stepId) return step;
          return {
            ...step,
            status,
            mentorNotes: mentorNotes !== undefined ? mentorNotes : step.mentorNotes,
          };
        });

        const completedCount = updatedRoadmap.filter((s) => s.status === 'Completed').length;
        const progressPercentage = Math.round((completedCount / updatedRoadmap.length) * 100);

        return {
          ...goal,
          roadmap: updatedRoadmap,
          progressPercentage,
          isCompleted: progressPercentage === 100 ? true : goal.isCompleted,
        };
      })
    );

    showToast(`Step updated to: ${status}`);
  };

  // 3. Mark complete project
  const completeProject = (goalId: string) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;
        return {
          ...goal,
          isCompleted: true,
          progressPercentage: 100,
          roadmap: goal.roadmap.map((s) => ({ ...s, status: 'Completed' })),
        };
      })
    );

    // Award bonus credit + badges
    setLearnerProfile((prev) => ({
      ...prev,
      goalsCompleted: prev.goalsCompleted + 1,
      timeCredits: prev.timeCredits + 2, // 2 bonus credits for completing a full project
      creditsEarned: prev.creditsEarned + 2,
    }));

    setTransactions((prev) => [
      {
        id: `tx-bonus-${Date.now()}`,
        date: 'Today',
        amount: 2,
        type: 'bonus',
        description: 'Project Mastery Bonus: Earned for completing all roadmap milestones!',
      },
      ...prev,
    ]);

    setBadges((prev) =>
      prev.map((b) =>
        b.id === 'badge-4' || b.id === 'badge-6'
          ? { ...b, isEarned: true, earnedDate: 'Today' }
          : b
      )
    );

    showToast('🎉 Congratulations! Project completed! You earned +2 bonus Time Credits.');
  };

  // 4. Send mentor request
  const sendMentorRequest = (
    mentorId: string,
    goalId: string,
    message: string,
    estimatedSessions: number
  ): boolean => {
    const mentor = mentors.find((m) => m.id === mentorId);
    const goal = goals.find((g) => g.id === goalId) || activeGoal;

    if (!mentor || !goal) return false;

    const totalCredits = estimatedSessions * mentor.creditRatePerSession;

    if (learnerProfile.timeCredits < totalCredits) {
      showToast(`Insufficient Time Credits: You need ${totalCredits} credits, but currently have ${learnerProfile.timeCredits}.`);
      return false;
    }

    const newReq: MentorshipRequest = {
      id: `req-${Date.now()}`,
      learnerId: learnerProfile.id,
      learnerName: learnerProfile.name,
      learnerAvatar: learnerProfile.avatar,
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorAvatar: mentor.avatar,
      goalId: goal.id,
      goalTitle: goal.title,
      message,
      estimatedSessions,
      totalCredits,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setRequests((prev) => [newReq, ...prev]);

    // Attach mentor to goal
    setGoals((prev) =>
      prev.map((g) => (g.id === goal.id ? { ...g, mentorId: mentor.id } : g))
    );

    showToast(`Mentorship request sent to ${mentor.name}! Swapping to Mentor view lets you accept it.`);
    return true;
  };

  // 5. Accept request (Mentor action)
  const acceptRequest = (requestId: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'accepted' } : r))
    );

    // Create a new session
    const newSessionId = `session-${Date.now()}`;
    const newSession: MentoringSession = {
      id: newSessionId,
      requestId: req.id,
      learnerId: req.learnerId,
      mentorId: req.mentorId,
      goalId: req.goalId,
      goalTitle: req.goalTitle,
      mentorName: req.mentorName,
      learnerName: req.learnerName,
      scheduledTime: 'Today at 5:00 PM',
      status: 'active',
      durationMinutes: 30,
      creditsCost: 1,
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          senderId: req.mentorId,
          senderName: req.mentorName,
          text: `Hi ${req.learnerName}! I've accepted your request for "${req.goalTitle}". Ready to jump into our 30-minute mentoring session!`,
          timestamp: 'Just now',
          isSystem: false,
        },
      ],
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSessionId);

    showToast(`Request accepted! Mentoring session scheduled with ${req.learnerName}.`);
  };

  // 6. Decline request
  const declineRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'declined' } : r))
    );
    showToast('Mentorship request declined.');
  };

  // 7. Complete Session (Deduct credits from learner, add to mentor)
  const completeSession = (sessionId: string, mentorNotes?: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session || session.status === 'completed') return;

    const creditCost = session.creditsCost || 1;

    // Deduct from learner
    setLearnerProfile((prev) => ({
      ...prev,
      timeCredits: Math.max(0, prev.timeCredits - creditCost),
      creditsSpent: prev.creditsSpent + creditCost,
      sessionsCompleted: prev.sessionsCompleted + 1,
    }));

    // Add to mentor
    setMentorProfile((prev) => ({
      ...prev,
      timeCredits: prev.timeCredits + creditCost,
      creditsEarned: prev.creditsEarned + creditCost,
      sessionsCompleted: prev.sessionsCompleted + 1,
    }));

    // Mark session completed
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              status: 'completed',
              notes: mentorNotes || s.notes,
            }
          : s
      )
    );

    // Record transactions
    setTransactions((prev) => [
      {
        id: `tx-deduct-${Date.now()}`,
        date: 'Today',
        amount: -creditCost,
        type: 'spent',
        description: `Mentoring session with ${session.mentorName} for "${session.goalTitle}"`,
        relatedSessionId: sessionId,
      },
      ...prev,
    ]);

    // If mentor notes provided, append to current goal step
    if (mentorNotes && session.goalId) {
      setGoals((prev) =>
        prev.map((g) => {
          if (g.id !== session.goalId) return g;
          const currentStep = g.roadmap.find((s) => s.status === 'In progress') || g.roadmap[2];
          if (!currentStep) return g;

          return {
            ...g,
            roadmap: g.roadmap.map((s) =>
              s.id === currentStep.id
                ? { ...s, mentorNotes: `${s.mentorNotes ? s.mentorNotes + ' • ' : ''}${mentorNotes}` }
                : s
            ),
          };
        })
      );
    }

    // Award badges
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === 'badge-2') return { ...b, isEarned: true, earnedDate: 'Today' };
        if (b.id === 'badge-5' && activeRole === 'mentor') {
          return { ...b, isEarned: true, earnedDate: 'Today' };
        }
        return b;
      })
    );

    showToast(
      `Session completed! Deducted ${creditCost} Time Credit from learner and credited ${creditCost} to mentor.`
    );
  };

  // 8. Send message in session chat
  const sendMessage = (sessionId: string, text: string) => {
    if (!text.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, messages: [...s.messages, newMessage] }
          : s
      )
    );
  };

  // 9. Reset to default demo scenario
  const resetToDemo = () => {
    localStorage.clear();
    setLearnerProfile(INITIAL_LEARNER);
    setMentorProfile(INITIAL_MENTOR);
    setGoals([DEFAULT_GOAL]);
    setActiveGoalId(DEFAULT_GOAL.id);
    setRequests(INITIAL_REQUESTS);
    setSessions(INITIAL_SESSIONS);
    setActiveSessionId(INITIAL_SESSIONS[0].id);
    setTransactions(INITIAL_TRANSACTIONS);
    setBadges(INITIAL_BADGES);
    setActiveRole('learner');
    setCurrentView('learner-dashboard');
    showToast('Reset to default demo: "I want to build a line-following car in 7 days."');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeRole,
        switchRole,
        currentUser,
        learnerProfile,
        mentorProfile,
        mentors,
        goals,
        activeGoal,
        activeGoalId,
        setActiveGoalId,
        requests,
        sessions,
        activeSessionId,
        setActiveSessionId,
        activeSession,
        transactions,
        badges,
        createGoal,
        updateStepStatus,
        completeProject,
        sendMentorRequest,
        acceptRequest,
        declineRequest,
        completeSession,
        sendMessage,
        resetToDemo,
        toastMessage,
        clearToast,
        showToast,
        selectedMentorForRequest,
        setSelectedMentorForRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
