export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type StepStatus = 'Not started' | 'In progress' | 'Completed';

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  status: StepStatus;
  mentorNotes?: string;
  resources?: string[];
  order: number;
}

export interface LearningGoal {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  skillLevel: SkillLevel;
  desiredCompletionDate: string;
  preferredLanguage: string;
  weeklyAvailabilityHours: number;
  availableTimeCredits: number;
  roadmap: RoadmapStep[];
  progressPercentage: number;
  isCompleted: boolean;
  createdAt: string;
  mentorId?: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  expertise: string[];
  category: string;
  bio: string;
  rating: number;
  reviewCount: number;
  completedProjects: number;
  languages: string[];
  availability: string;
  creditRatePerSession: number; // usually 1 credit for 30 min
  skillLevelsSupported: SkillLevel[];
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'learner' | 'mentor' | 'both';
  email: string;
  avatar: string;
  bio: string;
  timeCredits: number;
  skills: string[];
  goalsCompleted: number;
  sessionsCompleted: number;
  creditsEarned: number;
  creditsSpent: number;
}

export interface MentorshipRequest {
  id: string;
  learnerId: string;
  learnerName: string;
  learnerAvatar: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  goalId: string;
  goalTitle: string;
  message: string;
  estimatedSessions: number;
  totalCredits: number;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface SessionMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface MentoringSession {
  id: string;
  requestId: string;
  learnerId: string;
  mentorId: string;
  goalId: string;
  goalTitle: string;
  mentorName: string;
  learnerName: string;
  scheduledTime: string;
  status: 'scheduled' | 'active' | 'completed';
  durationMinutes: number;
  creditsCost: number;
  notes?: string;
  messages: SessionMessage[];
}

export interface CreditTransaction {
  id: string;
  date: string;
  amount: number;
  type: 'earned' | 'spent' | 'bonus';
  description: string;
  relatedSessionId?: string;
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate?: string;
  isEarned: boolean;
  category: 'learning' | 'mentoring' | 'consistency';
}
