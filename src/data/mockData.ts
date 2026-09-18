import {
  LearningGoal,
  Mentor,
  UserProfile,
  MentorshipRequest,
  MentoringSession,
  CreditTransaction,
  AchievementBadge,
  RoadmapStep,
} from '../types';

export const INITIAL_LEARNER: UserProfile = {
  id: 'learner-alex',
  name: 'Alex Rivera',
  role: 'learner',
  email: 'alex.rivera@student.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: 'First-year engineering student passionate about robotics, hands-on hardware tinkering, and autonomous vehicles.',
  timeCredits: 4, // 4 credits available (2 hours of mentoring)
  skills: ['Basic C++', 'Soldering', 'Arduino Basics'],
  goalsCompleted: 0,
  sessionsCompleted: 1,
  creditsEarned: 2,
  creditsSpent: 2,
};

export const INITIAL_MENTOR: UserProfile = {
  id: 'mentor-marcus',
  name: 'Dr. Marcus Chen',
  role: 'mentor',
  email: 'm.chen@robotics-lab.org',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  bio: 'Senior Robotics Researcher & Maker. Guided 30+ students through Arduino, ROS, and motor control projects.',
  timeCredits: 14,
  skills: ['Robotics', 'Arduino', 'Motor Drivers', 'Circuit Design', 'Embedded C', 'Sensor Calibration'],
  goalsCompleted: 8,
  sessionsCompleted: 34,
  creditsEarned: 34,
  creditsSpent: 8,
};

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'mentor-marcus',
    name: 'Dr. Marcus Chen',
    title: 'Embedded Systems & Robotics Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    expertise: ['Robotics', 'Arduino', 'Circuit Design', 'Sensors', 'Motor Drivers'],
    category: 'Robotics & Hardware',
    bio: '10+ years building autonomous rovers and teaching university robotics workshops. I love helping beginners debug their first physical computing projects!',
    rating: 4.95,
    reviewCount: 42,
    completedProjects: 34,
    languages: ['English', 'Mandarin'],
    availability: 'Weekday evenings & Weekends',
    creditRatePerSession: 1, // 1 credit = 30 min
    skillLevelsSupported: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    id: 'mentor-priya',
    name: 'Priya Sharma',
    title: 'Computer Vision & AI Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    expertise: ['Computer Vision', 'Python', 'OpenCV', 'Raspberry Pi', 'Machine Learning'],
    category: 'AI & Data Science',
    bio: 'Masters in AI. I help students build intelligent camera-based robots, face trackers, and gesture-controlled IoT contraptions.',
    rating: 4.9,
    reviewCount: 31,
    completedProjects: 26,
    languages: ['English', 'Hindi'],
    availability: 'Mon, Wed, Fri afternoons',
    creditRatePerSession: 1,
    skillLevelsSupported: ['Beginner', 'Intermediate'],
  },
  {
    id: 'mentor-david',
    name: 'David Kim',
    title: 'IoT & Firmware Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    expertise: ['ESP32', 'MicroPython', 'IoT Protocols', 'Sensors', 'Electronics'],
    category: 'Robotics & Hardware',
    bio: 'Hardware hacker and open-source enthusiast. Passionate about turning paper sketches into functioning circuit boards and battery-efficient devices.',
    rating: 4.85,
    reviewCount: 24,
    completedProjects: 19,
    languages: ['English', 'Korean'],
    availability: 'Flexible daytime & Weekends',
    creditRatePerSession: 1,
    skillLevelsSupported: ['Beginner', 'Intermediate'],
  },
  {
    id: 'mentor-elena',
    name: 'Elena Rostova',
    title: 'Full-Stack & Hardware Interface Dev',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    expertise: ['WebSockets', 'React', 'Node.js', 'Telemetry Dashboards', 'Arduino WiFi'],
    category: 'Web & Mobile Development',
    bio: 'Bridging the web and physical worlds. I teach learners how to build live web control panels for their microcontrollers and hardware setups.',
    rating: 4.88,
    reviewCount: 19,
    completedProjects: 16,
    languages: ['English', 'Russian', 'Spanish'],
    availability: 'Tuesday & Thursday evenings',
    creditRatePerSession: 1,
    skillLevelsSupported: ['Beginner', 'Intermediate', 'Advanced'],
  },
];

export const LINE_CAR_ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 'step-1',
    title: 'Understand components',
    description: 'Inspect the Arduino Uno microcontroller, L298N dual H-bridge motor driver, dual IR reflection sensors, BO motors with rubber wheels, and battery pack connections.',
    estimatedTime: '45 mins',
    status: 'Completed',
    mentorNotes: 'Remember to verify whether your IR sensors output active LOW or active HIGH signals. Great job identifying pinouts!',
    resources: ['Component Pinout Cheatsheet', 'L298N Logic Table'],
    order: 1,
  },
  {
    id: 'step-2',
    title: 'Learn circuit connections',
    description: 'Wire the L298N driver inputs (IN1-IN4) to digital pins 5, 6, 9, 10 on the Arduino. Connect the IR sensor OUT pins to pins 2 and 3, ensuring common ground with the battery.',
    estimatedTime: '1 hour',
    status: 'Completed',
    mentorNotes: 'Always keep the 5V jumper on L298N plugged in if powering under 12V. Tie Arduino GND to battery GND to avoid floating logic.',
    resources: ['Fritzing Breadboard Diagram', 'Common Ground Explained'],
    order: 2,
  },
  {
    id: 'step-3',
    title: 'Program the motor driver',
    description: 'Write an initial Arduino sketch to spin left and right wheels forward, reverse, and pivot turn. Verify directional logic before attaching sensors.',
    estimatedTime: '1 hour',
    status: 'In progress',
    mentorNotes: 'We worked through the PWM speed control during session #1. Try testing analogWrite(ENA, 180) to avoid battery brownout on start.',
    resources: ['Motor Driver Test Code snippet', 'PWM Frequency Guide'],
    order: 3,
  },
  {
    id: 'step-4',
    title: 'Configure sensors',
    description: 'Calibrate the onboard potentiometer on both infrared obstacle/line sensors so they cleanly distinguish the black electrical tape line from the white foam board.',
    estimatedTime: '45 mins',
    status: 'Not started',
    mentorNotes: 'Adjust the potentiometers under ambient room lighting, keeping sensor distance around 8-10mm off the ground.',
    order: 4,
  },
  {
    id: 'step-5',
    title: 'Assemble the car',
    description: 'Fasten motors and caster wheel securely onto the acrylic 2WD chassis. Mount the Arduino, motor driver, and battery cage with spacers, routing all wires neatly.',
    estimatedTime: '1.5 hours',
    status: 'Not started',
    order: 5,
  },
  {
    id: 'step-6',
    title: 'Test and calibrate',
    description: 'Put the car on a figure-8 black tape track. Tune steering response time, braking delays, and speed balance to prevent the robot from overshooting sharp corners.',
    estimatedTime: '1 hour',
    status: 'Not started',
    mentorNotes: 'If the car wobbles, introduce a brief 10ms delay or lower the turning differential speed.',
    order: 6,
  },
  {
    id: 'step-7',
    title: 'Complete final project',
    description: 'Run 3 uninterrupted laps around the test track. Package code with clean documentation, record a demo video, and review final achievements with your mentor.',
    estimatedTime: '45 mins',
    status: 'Not started',
    order: 7,
  },
];

export const DEFAULT_GOAL: LearningGoal = {
  id: 'goal-line-car',
  userId: 'learner-alex',
  title: 'I want to build a line-following car in 7 days',
  description: 'Design, wire, and code a 2-wheel drive autonomous robot using an Arduino Uno, L298N motor controller, and infrared reflection sensors that traces a black line track reliably.',
  category: 'Robotics & Hardware',
  skillLevel: 'Beginner',
  desiredCompletionDate: '2026-09-25',
  preferredLanguage: 'English',
  weeklyAvailabilityHours: 6,
  availableTimeCredits: 4,
  roadmap: LINE_CAR_ROADMAP_STEPS,
  progressPercentage: 35,
  isCompleted: false,
  createdAt: '2026-09-17T14:30:00Z',
  mentorId: 'mentor-marcus',
};

export const INITIAL_REQUESTS: MentorshipRequest[] = [
  {
    id: 'req-1',
    learnerId: 'learner-alex',
    learnerName: 'Alex Rivera',
    learnerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    mentorId: 'mentor-marcus',
    mentorName: 'Dr. Marcus Chen',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    goalId: 'goal-line-car',
    goalTitle: 'I want to build a line-following car in 7 days',
    message: "Hi Dr. Chen! I've mounted the motors and wired the L298N, but I need guidance on getting the PWM differential steering and IR sensor calibration just right.",
    estimatedSessions: 2,
    totalCredits: 2,
    status: 'accepted',
    createdAt: '2026-09-17T15:00:00Z',
  },
];

export const INITIAL_SESSIONS: MentoringSession[] = [
  {
    id: 'session-1',
    requestId: 'req-1',
    learnerId: 'learner-alex',
    mentorId: 'mentor-marcus',
    goalId: 'goal-line-car',
    goalTitle: 'I want to build a line-following car in 7 days',
    mentorName: 'Dr. Marcus Chen',
    learnerName: 'Alex Rivera',
    scheduledTime: 'Today at 4:00 PM',
    status: 'active',
    durationMinutes: 30,
    creditsCost: 1,
    notes: 'Covered motor driver logic and verified step 2 circuit connections. Next up: testing sensor analog readings.',
    messages: [
      {
        id: 'msg-1',
        senderId: 'mentor-marcus',
        senderName: 'Dr. Marcus Chen',
        text: 'Welcome Alex! Great to connect with you. Have you had a chance to test whether your BO motors turn in the same direction when you set IN1 HIGH and IN2 LOW?',
        timestamp: '4:02 PM',
      },
      {
        id: 'msg-2',
        senderId: 'learner-alex',
        senderName: 'Alex Rivera',
        text: 'Hi Dr. Marcus! Yes, the left wheel turns forward, but the right wheel spins backward. I think I swapped the polarity on Motor B.',
        timestamp: '4:04 PM',
      },
      {
        id: 'msg-3',
        senderId: 'mentor-marcus',
        senderName: 'Dr. Marcus Chen',
        text: 'Classic hardware quirk! You can either flip the red/black wires on the OUT3/OUT4 terminal or invert IN3 and IN4 in your Arduino code. Doing it in code is usually easiest.',
        timestamp: '4:06 PM',
      },
      {
        id: 'msg-4',
        senderId: 'learner-alex',
        senderName: 'Alex Rivera',
        text: 'That worked! Both wheels now propel forward in sync when I test the PWM sketch.',
        timestamp: '4:10 PM',
      },
    ],
  },
];

export const INITIAL_TRANSACTIONS: CreditTransaction[] = [
  {
    id: 'tx-1',
    date: 'Sep 16, 2026',
    amount: 5,
    type: 'bonus',
    description: 'Welcome Bonus: Time credits gifted to kickstart your hands-on project journey',
  },
  {
    id: 'tx-2',
    date: 'Sep 17, 2026',
    amount: -1,
    type: 'spent',
    description: 'Mentoring Session #1 with Dr. Marcus Chen (Circuit Verification & Setup)',
    relatedSessionId: 'session-prev',
  },
];

export const INITIAL_BADGES: AchievementBadge[] = [
  {
    id: 'badge-1',
    name: 'First Project Goal',
    description: 'Outlined your first project-based learning roadmap',
    icon: 'Target',
    earnedDate: 'Sep 16, 2026',
    isEarned: true,
    category: 'learning',
  },
  {
    id: 'badge-2',
    name: 'First Mentoring Session',
    description: 'Completed a 1-on-1 collaborative session with a mentor',
    icon: 'Users',
    earnedDate: 'Sep 17, 2026',
    isEarned: true,
    category: 'mentoring',
  },
  {
    id: 'badge-3',
    name: 'Circuit Master',
    description: 'Successfully verified and wired physical microcontroller connections',
    icon: 'Cpu',
    earnedDate: 'Sep 17, 2026',
    isEarned: true,
    category: 'learning',
  },
  {
    id: 'badge-4',
    name: 'First Project Completed',
    description: 'Complete all steps of an autonomous project roadmap',
    icon: 'Award',
    isEarned: false,
    category: 'learning',
  },
  {
    id: 'badge-5',
    name: 'Helpful Mentor',
    description: 'Earned 10+ time credits by helping fellow students debug and learn',
    icon: 'HeartHandshake',
    isEarned: false,
    category: 'mentoring',
  },
  {
    id: 'badge-6',
    name: 'Consistent Learner',
    description: 'Maintained steady progress 3 days in a row on active roadmap milestones',
    icon: 'Flame',
    isEarned: false,
    category: 'consistency',
  },
];

/**
 * Intelligent Roadmap Generator based on user goal title and category
 */
export function generateRoadmapForGoal(
  title: string,
  category: string,
  skillLevel: string
): RoadmapStep[] {
  const lower = title.toLowerCase();

  // 1. Line following or robot car
  if (lower.includes('line') || lower.includes('car') || lower.includes('robot')) {
    return [
      {
        id: 'step-gen-1',
        title: 'Understand components',
        description: 'Examine microcontroller, motor driver, IR line sensors, power distribution, and mechanical chassis.',
        estimatedTime: '45 mins',
        status: 'Not started',
        order: 1,
      },
      {
        id: 'step-gen-2',
        title: 'Learn circuit connections',
        description: 'Wire motor driver pins to PWM logic and connect sensor inputs with unified common ground.',
        estimatedTime: '1 hour',
        status: 'Not started',
        order: 2,
      },
      {
        id: 'step-gen-3',
        title: 'Program the motor driver',
        description: 'Develop motor control functions for forward propulsion, reverse, and differential steering.',
        estimatedTime: '1.5 hours',
        status: 'Not started',
        order: 3,
      },
      {
        id: 'step-gen-4',
        title: 'Configure sensors',
        description: 'Calibrate sensitivity potentiometers on reflective surface for black vs white contrast detection.',
        estimatedTime: '45 mins',
        status: 'Not started',
        order: 4,
      },
      {
        id: 'step-gen-5',
        title: 'Assemble the car',
        description: 'Fasten structural chassis, mount battery bracket, wire harnesses, and align drive wheels.',
        estimatedTime: '1.5 hours',
        status: 'Not started',
        order: 5,
      },
      {
        id: 'step-gen-6',
        title: 'Test and calibrate',
        description: 'Run on curved track curves, tune proportional steering threshold, and eliminate jitter.',
        estimatedTime: '1 hour',
        status: 'Not started',
        order: 6,
      },
      {
        id: 'step-gen-7',
        title: 'Complete final project',
        description: 'Perform complete autonomous test run, record verification video, and finalize documentation.',
        estimatedTime: '45 mins',
        status: 'Not started',
        order: 7,
      },
    ];
  }

  // 2. Web or Mobile App
  if (category.includes('Web') || category.includes('Mobile') || lower.includes('app') || lower.includes('website')) {
    return [
      {
        id: 'step-web-1',
        title: 'Architecture & Component Wireframes',
        description: 'Define application state hierarchy, user flows, and wireframe key interactive screens.',
        estimatedTime: '1 hour',
        status: 'Not started',
        order: 1,
      },
      {
        id: 'step-web-2',
        title: 'Scaffold project & styling system',
        description: 'Initialize Vite/React workspace with Tailwind CSS utility classes and component directory.',
        estimatedTime: '45 mins',
        status: 'Not started',
        order: 2,
      },
      {
        id: 'step-web-3',
        title: 'Implement Core Interactive Features',
        description: 'Build primary state hooks, form inputs, dynamic listings, and user interactions.',
        estimatedTime: '2 hours',
        status: 'Not started',
        order: 3,
      },
      {
        id: 'step-web-4',
        title: 'State persistence & edge cases',
        description: 'Hook into local storage or API cache, add validation, empty states, and loading indicators.',
        estimatedTime: '1.5 hours',
        status: 'Not started',
        order: 4,
      },
      {
        id: 'step-web-5',
        title: 'Responsive testing & polish',
        description: 'Test on mobile screen viewports, verify accessibility contrast, and optimize touch targets.',
        estimatedTime: '1 hour',
        status: 'Not started',
        order: 5,
      },
      {
        id: 'step-web-6',
        title: 'Complete final project & deploy',
        description: 'Run production build, deploy live link, and conduct mentor code review walkthrough.',
        estimatedTime: '45 mins',
        status: 'Not started',
        order: 6,
      },
    ];
  }

  // 3. AI / Data Science
  if (category.includes('AI') || lower.includes('model') || lower.includes('vision') || lower.includes('detection')) {
    return [
      {
        id: 'step-ai-1',
        title: 'Dataset collection & preprocessing',
        description: 'Gather clean labeled samples, normalize inputs, and split into train/test validation sets.',
        estimatedTime: '1.5 hours',
        status: 'Not started',
        order: 1,
      },
      {
        id: 'step-ai-2',
        title: 'Baseline model training',
        description: 'Setup training pipeline, configure loss functions, and evaluate accuracy benchmarks.',
        estimatedTime: '2 hours',
        status: 'Not started',
        order: 2,
      },
      {
        id: 'step-ai-3',
        title: 'Hyperparameter tuning & evaluation',
        description: 'Analyze confusion matrix, adjust learning rate, and prevent model overfitting.',
        estimatedTime: '1.5 hours',
        status: 'Not started',
        order: 3,
      },
      {
        id: 'step-ai-4',
        title: 'Real-time inference interface',
        description: 'Wrap inference script in a clean interactive UI or webcam feed for live testing.',
        estimatedTime: '1.5 hours',
        status: 'Not started',
        order: 4,
      },
      {
        id: 'step-ai-5',
        title: 'Complete final project',
        description: 'Package dependencies, benchmark latency, and present model findings with your mentor.',
        estimatedTime: '1 hour',
        status: 'Not started',
        order: 5,
      },
    ];
  }

  // Default generic project roadmap
  return [
    {
      id: 'step-gen-1',
      title: 'Project scope & requirements review',
      description: 'Define exact acceptance criteria, technical stack, and milestone timeline.',
      estimatedTime: '45 mins',
      status: 'Not started',
      order: 1,
    },
    {
      id: 'step-gen-2',
      title: 'Environment setup & foundational learning',
      description: 'Install required tooling, study reference documentation, and verify hello-world baseline.',
      estimatedTime: '1 hour',
      status: 'Not started',
      order: 2,
    },
    {
      id: 'step-gen-3',
      title: 'Build core prototype milestone',
      description: 'Implement the primary functional loop or hardware wiring required for the project.',
      estimatedTime: '2 hours',
      status: 'Not started',
      order: 3,
    },
    {
      id: 'step-gen-4',
      title: 'Testing & troubleshooting with mentor',
      description: 'Review edge cases, debug anomalies, and refine performance bottlenecks.',
      estimatedTime: '1.5 hours',
      status: 'Not started',
      order: 4,
    },
    {
      id: 'step-gen-5',
      title: 'Final polish & project completion',
      description: 'Finalize project presentation, record demonstration, and celebrate completion!',
      estimatedTime: '1 hour',
      status: 'Not started',
      order: 5,
    },
  ];
}
