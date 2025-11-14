// Show/hide sections
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.add('active');
    
    // Activate selected nav button
    event.target.classList.add('active');
}

// Filter exams
function filterExams(category) {
    const examCards = document.querySelectorAll('.exam-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter exam cards
    examCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter careers
function filterCareers(category) {
    const careerCards = document.querySelectorAll('.career-card');
    const filterBtns = document.querySelectorAll('.career-filter-btn');
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter career cards
    careerCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Exam data
const examData = {
    'cbse10': {
        title: 'CBSE Class 10 Board Exam',
        category: 'School Board',
        date: 'February - March 2025',
        official: 'https://cbse.nic.in',
        syllabus: {
            subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science'],
            highlights: 'All subjects as per NCERT curriculum, Internal assessment 20%, Theory 80%'
        },
      links: [
    { name: 'Official Website', url: 'https://www.cbse.gov.in/' },
    { name: 'Syllabus PDF', url: 'https://cbseacademic.nic.in/curriculum_2025.html' },
    { name: 'Sample Papers', url: 'https://cbseacademic.nic.in/SQP_CLASSX_2024-25.html' },
    { name: 'Previous Year Papers', url: 'https://cbseacademic.nic.in/qp_classx.html' }
],

        notifications: [
            'Date Sheet: January 2025',
            'Practical Exams: January 2025',
            'Admit Card: February 2025',
            'Result: May 2025'
        ]
    },
    'cbse12': {
        title: 'CBSE Class 12 Board Exam',
        category: 'School Board',
        date: 'February - March 2025',
        official: 'https://cbse.nic.in',
        syllabus: {
            subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science'],
            highlights: 'All subjects as per NCERT curriculum, Internal assessment 20%, Theory 80%'
        },
      links: [
    { name: 'Official Website', url: 'https://www.cbse.gov.in/' },
    { name: 'Syllabus PDF', url: 'https://cbseacademic.nic.in/curriculum_2025.html' },
    { name: 'Sample Papers', url: 'https://cbseacademic.nic.in/SQP_CLASSX_2024-25.html' },
    { name: 'Previous Year Papers', url: 'https://cbseacademic.nic.in/qp_classx.html' }
],

        notifications: [
            'Date Sheet: January 2025',
            'Practical Exams: January 2025',
            'Admit Card: February 2025',
            'Result: May 2025'
        ]
    },
    'jeemains': {
        title: 'JEE Mains 2025',
        category: 'Engineering',
        date: 'January, April 2025 (Multiple Sessions)',
        official: 'https://jeemain.nta.nic.in',
        syllabus: {
            subjects: ['Physics', 'Chemistry', 'Mathematics'],
            topics: [
                'Physics: Mechanics, Thermodynamics, Optics, Modern Physics',
                'Chemistry: Physical, Organic, Inorganic Chemistry',
                'Mathematics: Algebra, Calculus, Coordinate Geometry'
            ]
        },
        links: [
            { name: 'Official Website', url: 'https://jeemain.nta.nic.in' },
            { name: 'Syllabus PDF', url: 'https://jeemain.nta.nic.in/syllabus' },
            { name: 'Application Form', url: 'https://jeemain.nta.nic.in/application' },
            { name: 'Mock Test', url: 'https://jeemain.nta.nic.in/mock-test' }
        ],
        notifications: [
            'Session 1: January 2025',
            'Session 2: April 2025',
            'Application: November 2024',
            'Admit Card: 15 days before exam'
        ]
    },
  
  
  'jeeadvanced': {
    title: 'JEE Advanced',
    category: 'Engineering Entrance',
    date: '18 May 2025',
    official: 'https://jeeadv.ac.in',
    syllabus: {
        phases: ['Paper 1', 'Paper 2'],
        subjects: {
            Physics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics', 'Oscillations & Waves'],
            Chemistry: ['Physical', 'Organic', 'Inorganic'],
            Mathematics: ['Algebra', 'Trigonometry', 'Calculus', 'Vectors', 'Probability', 'Matrices', '3D Geometry']
        }
    },
    links: [
        { name: 'Official Website', url: 'https://jeeadv.ac.in' },
        { name: 'Official Syllabus PDF', url: 'https://jeeadv.ac.in/documents/jee-advanced-2025-syllabus.pdf' },
        { name: 'Detailed Syllabus', url: 'https://www.esaral.com/jee/jee-advanced-2025-syllabus/' },
        { name: 'Previous Papers (Prepp)', url: 'https://prepp.in/jee-advanced-exam/question-paper' },
        { name: 'Previous Papers (BYJU\'S)', url: 'https://byjus.com/jee/jee-advanced-previous-year-papers/' }
    ],
    notifications: [
        'Notification: April 2025',
        'Registration: April–May 2025',
        'Admit Card: May 2025',
        'Exam: 18 May 2025',
        'Result: June 2025',
        'Counselling: June–July 2025'
    ]
},



    'neet': {
        title: 'NEET UG 2025',
        category: 'Medical',
        date: 'May 2025',
        official: 'https://neet.nta.nic.in',
        syllabus: {
            subjects: ['Physics', 'Chemistry', 'Biology'],
            topics: [
                'Physics: Class 11 & 12 NCERT syllabus',
                'Chemistry: Physical, Organic, Inorganic',
                'Biology: Botany & Zoology'
            ]
        },
        links: [
            { name: 'Official Website', url: 'https://neet.nta.nic.in' },
            { name: 'Syllabus PDF', url: 'https://neet.nta.nic.in/syllabus' },
            { name: 'Information Bulletin', url: 'https://neet.nta.nic.in/information-bulletin' },
            { name: 'Practice Papers', url: 'https://neet.nta.nic.in/practice-papers' }
        ],
        notifications: [
            'Application: March 2025',
            'Admit Card: April 2025',
            'Exam Date: First week of May 2025',
            'Result: June 2025'
        ]
    },
   "ibpspo": {
  "title": "IBPS PO 2025",
  "category": "Banking",
  "date": "October - November 2025",
  "official": "https://ibps.in",
  "syllabus": {
    "phases": ["Prelims", "Mains", "Interview"],
    "subjects": [
      "Prelims: English, Quantitative Aptitude, Reasoning",
      "Mains: Reasoning & Computer Aptitude, Data Analysis & Interpretation, General Awareness, English Language (Essay & Letter Writing)"
    ]
  },
  "links": [
    { "name": "Official Website", "url": "https://ibps.in" },
    { "name": "Latest Notifications", "url": "https://ibps.in/notification" },
    { "name": "Syllabus (Check in Notification PDF)", "url": "https://ibps.in/notification" },
    { "name": "Previous Papers (External Sources)", "url": "https://www.bankersadda.com/ibps-po-previous-year-question-paper/" }
  ],
  "notifications": [
    "Notification: August 2025",
    "Prelims: October 2025",
    "Mains: November 2025",
    "Interview: January 2026"
  ]
},
"sscchsl": {
  "title": "SSC CHSL 2025",
  "category": "Government Exams",
  "date": "November 2025 - Early 2026",
  "official": "https://ssc.gov.in",
  "syllabus": {
    "phases": ["Tier 1", "Tier 2", "Skill/Typing Test"],
    "subjects": [
      "Tier 1: English Language, Quantitative Aptitude, General Intelligence & Reasoning, General Awareness",
      "Tier 2: Mathematical Abilities, Reasoning, English Language & Comprehension, General Awareness, Computer Knowledge",
      "Skill/Typing Test: Data Entry Speed Test (DEO) / Typing Test (LDC, JSA)"
    ]
  },
  "links": [
    { "name": "Official Website", "url": "https://ssc.gov.in" },
    { "name": "Notification PDF", "url": "https://cms.patrika.com/wp-content/uploads/2025/06/SSC-CHSL-Notification-2025-Pdf.pdf" },
    { "name": "Syllabus (Detailed)", "url": "https://www.careerpower.in/ssc-chsl-syllabus.html" },
    { "name": "Previous Papers", "url": "https://www.oswaal360.com/pages/previous-year-papers-ssc-chsl" }
  ],
  "notifications": [
    "Notification: June 2025",
    "Tier 1: November 2025",
    "Tier 2: Early 2026",
    "Skill/Typing Test: Mid 2026"
  ]
},
"sbipo": {
  "title": "SBI PO 2025",
  "category": "Banking",
  "date": "August - September 2025 (Prelims & Mains)",
  "official": "https://sbi.co.in",
  "syllabus": {
    "phases": ["Prelims", "Mains", "Interview"],
    "subjects": [
      "Prelims: English Language, Quantitative Aptitude, Reasoning Ability",
      "Mains: Reasoning & Computer Aptitude, Data Analysis & Interpretation, General/Economy/Banking Awareness, English Language (Descriptive Test: Essay & Letter Writing)"
    ]
  },
  "links": [
    { "name": "Official Website", "url": "https://sbi.co.in" },
    { "name": "Latest Notifications", "url": "https://www.bankersadda.com/sbi-po-notification-2025-out/" },
    { "name": "Syllabus (Detailed)", "url": "https://www.careerpower.in/sbi-po-syllabus.html" },
    { "name": "Previous Papers (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/ssc-banking/sbi-po-previous-year-question-papers/" }
  ],
  "notifications": [
    "Notification: June 2025",
    "Prelims: August 2025 (2nd, 4th & 5th August)",
    "Mains: September 2025 (13th September)",
    "Interview & Final Result: Late 2025"
  ]
},

"sscchsl": {
  "title": "SSC CHSL 2025",
  "category": "Government Exams",
  "date": "November 2025 - Early 2026",
  "official": "https://ssc.gov.in",
  "syllabus": {
    "phases": ["Tier 1", "Tier 2", "Skill/Typing Test"],
    "subjects": [
      "Tier 1: English Language, Quantitative Aptitude, General Intelligence & Reasoning, General Awareness",
      "Tier 2: Mathematical Abilities, Reasoning, English Language & Comprehension, General Awareness, Computer Knowledge",
      "Skill/Typing Test: Data Entry Speed Test (DEO) / Typing Test (LDC, JSA)"
    ]
  },
  "links": [
    { "name": "Official Website", "url": "https://ssc.gov.in" },
    { "name": "Notification PDF", "url": "https://cms.patrika.com/wp-content/uploads/2025/06/SSC-CHSL-Notification-2025-Pdf.pdf" },
    { "name": "Syllabus (Detailed)", "url": "https://www.careerpower.in/ssc-chsl-syllabus.html" },
    { "name": "Previous Papers", "url": "https://www.oswaal360.com/pages/previous-year-papers-ssc-chsl" }
  ],
  "notifications": [
    "Notification: June 2025",
    "Tier 1: November 2025",
    "Tier 2: Early 2026",
    "Skill/Typing Test: Mid 2026"
  ]
},

    'ssccgl': {
        title: 'SSC CGL 2025',
        category: 'SSC',
        date: 'June - July 2025',
        official: 'https://ssc.gov.in/',
        syllabus: {
            tiers: ['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4'],
            subjects: [
                'Tier 1: General Intelligence, English, Quantitative Aptitude, General Awareness',
                'Tier 2: Quantitative Abilities, English Language, Statistics'
            ]
        },
        links: [
            { name: 'Official Website', url: 'https://ssc.gov.in/' },
          
            { name: 'Syllabus PDF', url: 'https://ssc.gov.in/api/attachment/uploads/masterData/Syllabus/CGL-syllabus-169635-.pdf' },

        ],
        notifications: [
            'Notification: April 2025',
            'Tier 1: June 2025',
            'Tier 2: To be announced',
            'Application: April-May 2025'
        ]
    },
    nda: {
  "title": "NDA",
  "category": "Defence",
  "date": "April 2025 & September 2025",
  "official": "https://upsc.gov.in",
  "syllabus": {
    "phases": ["Written Exam", "SSB Interview", "Medical Exam"],
    "subjects": [
      "Mathematics: Algebra, Trigonometry, Calculus, Probability, Statistics",
      "GAT: English, Physics, Chemistry, Biology, History, Geography, Current Affairs"
    ]
  },
  "links": [
    { "name": "Official Website", "url": "https://upsc.gov.in" },
    { "name": "Syllabus", "url": "https://www.pw.live/defence/exams/nda-syllabus" },
    { "name": "Previous Papers", "url": "https://www.pw.live/defence/exams/nda-2-2025-question-paper" }
  ],
  "notifications": [
    "NDA 1 Notification: Dec 2024",
    "NDA 1 Exam: April 2025",
    "NDA 2 Notification: May 2025",
    "NDA 2 Exam: Sept 2025"
  ]
},
cds: {
  "title": "CDS 2025",
  "category": "Defence",
  "date": "April 2025 & September 2025",
  "official": "https://upsc.gov.in",
  "syllabus": {
    "phases": ["Written Exam", "SSB Interview", "Medical Exam"],
    "subjects": [
      "English: Grammar, Vocabulary, Comprehension",
      "General Knowledge: Current Affairs, History, Geography, Polity, Economy, Defence",
      "Elementary Mathematics: Arithmetic, Algebra, Geometry, Trigonometry, Mensuration, Statistics"
    ]
  },
  "links": [
    { "name": "Official Website", "url": "https://upsc.gov.in" },
    { "name": "Syllabus", "url": "https://www.pw.live/defence/exams/cds-syllabus" },
    { "name": "Previous Papers", "url": "https://nddacademy.com/blogs/cds-previous-year-question-papers-2015-2024/" }
  ],
  "notifications": [
    "CDS 1 Notification: Dec 2024",
    "CDS 1 Exam: April 2025",
    "CDS 2 Notification: May 2025",
    "CDS 2 Exam: Sept 2025"
  ]
},


    'upsc': {
        title: 'UPSC Civil Services 2025',
        category: 'UPSC',
        date: 'Prelims: May 2025, Mains: September 2025',
        official: 'https://upsc.gov.in',
        syllabus: {
            stages: ['Prelims', 'Mains', 'Interview'],
            papers: [
                'Prelims: GS Paper 1 & CSAT',
                'Mains: 9 Papers (Essay, GS, Optional)',
                'Interview: Personality Test'
            ]
        },
        links: [
            { name: 'Official Website', url: 'https://upsc.gov.in' },
            { name: 'Syllabus PDF', url: 'https://upsc.gov.in/syllabus' },
            { name: 'Previous Papers', url: 'https://upsc.gov.in/previous-question-papers' },
            { name: 'Calendar 2025', url: 'https://upsc.gov.in/exam-calendar' }
        ],
        notifications: [
            'Notification: February 2025',
            'Prelims: May 2025',
            'Mains: September 2025',
            'Interview: January 2026'
        ]
    },
    'gate': {
        title: 'GATE 2025',
        category: 'Engineering',
        date: 'February 2025',
        official: 'https://gate.iitkgp.ac.in',
        syllabus: {
            papers: ['General Aptitude', 'Engineering Mathematics', 'Subject-specific'],
            subjects: [
                'Computer Science: Programming, Algorithms, OS, DBMS',
                'Electrical: Networks, Signals, Power Systems',
                'Mechanical: Thermodynamics, Mechanics, Manufacturing'
            ]
        },
        links: [
   { "name": "Official Website", "url": "https://gate2025.iitr.ac.in" },
  { "name": "Syllabus PDF", "url": "https://gate2025.iitr.ac.in/exam-papers-and-syllabus.html" },
  { "name": "Previous Papers", "url": "https://gate2025.iitr.ac.in/download.html" },
  { "name": "Mock Test", "url": "https://gate2025.iitr.ac.in/mock-test-links.html" }
],

        notifications: [
            'Registration: August 2024',
            'Admit Card: January 2025',
            'Exam: February 2025',
            'Result: March 2025'
        ]
    },
    cafoundation: {
  "title": "CA Foundation 2025",
  "category": "Other",
  "date": "June 2025 & December 2025",
  "official": "https://icai.org",
  "syllabus": {
    "phases": ["Paper 1", "Paper 2", "Paper 3", "Paper 4"],
    "subjects": [
      "Paper 1: Principles and Practice of Accounting",
      "Paper 2: Business Laws and Business Correspondence & Reporting",
      "Paper 3: Business Mathematics, Logical Reasoning & Statistics",
      "Paper 4: Business Economics and Business & Commercial Knowledge"
    ]
  },
  "links": [
    { "name": "Official Website", "url": "https://icai.org" },
    { "name": "Syllabus (ICAI)", "url": "https://www.icai.org/post/foundation-course" },
    { "name": "Detailed Syllabus (CareerPower)", "url": "https://www.careerpower.in/school/ca/ca-foundation-syllabus" },
    { "name": "Previous Papers (ICAI)", "url": "https://www.icai.org/post/question-papers-foundation-course" }
  ],
  "notifications": [
    "Notification: Jan 2025 (for June session)",
    "Exam: June 2025",
    "Notification: July 2025 (for Dec session)",
    "Exam: December 2025",
    "Result: Within 2 months of exam (e.g., Sept 2025 for June session, Feb 2026 for Dec session)"
  ]
},
"clat": {
  "title": "CLAT 2025",
  "category": "Law Entrance",
  "date": "December 2025",
  "official": "https://consortiumofnlus.ac.in",
  "syllabus": {
    "phases": ["Single Written Exam (UG)"],
    "subjects": [
      "English Language: Comprehension-based passages, Grammar, Vocabulary",
      "Current Affairs including General Knowledge: National & International events, Static GK",
      "Legal Reasoning: Legal principles, Situational Judgement, Case-based reasoning",
      "Logical Reasoning: Critical thinking, Puzzles, Analytical reasoning",
      "Quantitative Techniques: Basic Mathematics (up to Class 10 level), Data Interpretation"
    ]
  },
  "links": [
    { "name": "Official Website", "url": "https://consortiumofnlus.ac.in" },
    { "name": "Official Syllabus (Consortium)", "url": "https://clat2025.consortiumofnlus.ac.in/clat-2025/ug-syllabus.html" },
    { "name": "Detailed Syllabus (Careers360)", "url": "https://law.careers360.com/articles/clat-syllabus-2025" },
    { "name": "Previous Papers (Collegedunia)", "url": "https://collegedunia.com/exams/clat/question-paper" }
  ],
  "notifications": [
    "Notification Release: July 2024",
    "Application Window: July 2024 – October 2024",
    "Admit Card: November 2025",
    "Exam Date: December 2025",
    "Result & Counselling: January 2026"
  ]
}


};

// Career data
const careerData = {
    'frontend': {
        title: 'Frontend Developer',
        description: 'Specializes in creating the visual and interactive aspects of websites and web applications that users see and interact with directly.',
        skills: {
            core: ['HTML5', 'CSS3', 'JavaScript ES6+'],
            frameworks: ['React', 'Vue.js', 'Angular', 'Svelte'],
            tools: ['Git', 'Webpack', 'NPM/Yarn', 'Chrome DevTools'],
            additional: ['Responsive Design', 'CSS Preprocessors', 'REST APIs', 'Web Performance']
        },
        roadmap: [
            'Learn HTML, CSS, JavaScript fundamentals',
            'Master CSS frameworks (Bootstrap, Tailwind)',
            'Learn React/Vue.js/Angular',
            'Practice with projects and build portfolio',
            'Learn state management, testing, and optimization'
        ],
        salary: {
            fresher: '₹4-6 LPA',
            experienced: '₹8-12 LPA',
            senior: '₹15-25 LPA'
        },
        resources: {
            youtube: [
                { name: 'CodeWithHarry - Web Development', url: 'https://youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w' },
                { name: 'Traversy Media', url: 'https://www.youtube.com/c/TraversyMedia' }
            ],
            courses: [
                { name: 'freeCodeCamp - Responsive Web Design', url: 'https://www.freecodecamp.org/learn/responsive-web-design/' },
                { name: 'The Odin Project', url: 'https://www.theodinproject.com/' }
            ],
            practice: [
                { name: 'Frontend Mentor', url: 'https://www.frontendmentor.io/' },
                { name: 'CSS Battles', url: 'https://cssbattle.dev/' }
                
            ]
        }
        
    },
    'backend': {
    title: 'Backend Developer',
    description: 'Focuses on server-side logic, databases, and APIs that power the functionality of web and mobile applications.',
    skills: {
        core: ['Node.js', 'Python', 'Java', 'PHP'],
        frameworks: ['Express.js', 'Django', 'Spring Boot', 'Laravel'],
        tools: ['Git', 'Postman', 'Docker', 'Kubernetes'],
        additional: ['REST APIs', 'GraphQL', 'Authentication & Security', 'Scalability & Performance']
    },
    roadmap: [
        'Learn a backend language (Node.js, Python, Java, or PHP)',
        'Understand databases (SQL & NoSQL)',
        'Learn server frameworks (Express, Django, Spring Boot, etc.)',
        'Build RESTful APIs and integrate with frontend',
        'Learn authentication, security, and deployment (Docker, Cloud)',
        'Work on real-world projects and optimize performance'
    ],
    salary: {
        fresher: '₹5-8 LPA',
        experienced: '₹10-18 LPA',
        senior: '₹20-35 LPA'
    },
    resources: {
        youtube: [
            { name: 'CodeWithHarry - Backend Development', url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agwh1XjRt6QHg5G0pT8lROo' },
            { name: 'Tech With Tim', url: 'https://www.youtube.com/c/TechWithTim' }
        ],
        courses: [
            { name: 'freeCodeCamp - Backend Development APIs', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/' },
            { name: 'The Odin Project - Node.js Path', url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs' }
        ],
        practice: [
            { name: 'LeetCode (Backend & Database Problems)', url: 'https://leetcode.com/' },
            { name: 'HackerRank - REST API Challenges', url: 'https://www.hackerrank.com/domains/tutorials/10-days-of-javascript' }
        ]
    }
},
'fullstack': {
    title: 'Full Stack Developer',
    description: 'Handles both frontend (client-side) and backend (server-side) development, building complete end-to-end web applications.',
    skills: {
        core: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Node.js', 'Databases (SQL/NoSQL)'],
        frameworks: ['React', 'Angular', 'Vue.js', 'Express.js', 'Django', 'Spring Boot'],
        tools: ['Git & GitHub', 'Docker', 'Postman', 'CI/CD Tools', 'Cloud Platforms (AWS/Azure/GCP)'],
        additional: ['REST APIs', 'GraphQL', 'Authentication & Security', 'Testing Frameworks', 'Scalability & Deployment']
    },
    roadmap: [
        'Master frontend basics (HTML, CSS, JavaScript)',
        'Learn a frontend framework (React/Angular/Vue)',
        'Learn a backend language (Node.js, Python, Java, PHP)',
        'Understand databases (MySQL, MongoDB, PostgreSQL)',
        'Build RESTful APIs and integrate with frontend',
        'Learn authentication, security, and testing',
        'Practice deployment with Docker, CI/CD, and Cloud',
        'Work on full projects combining frontend + backend'
    ],
    salary: {
        fresher: '₹6-10 LPA',
        experienced: '₹12-20 LPA',
        senior: '₹25-40 LPA'
    },
    resources: {
        youtube: [
            { name: 'freeCodeCamp - Full Stack Development', url: 'https://www.youtube.com/watch?v=nu_pCVPKzTk' },
            { name: 'Traversy Media - MERN Stack', url: 'https://www.youtube.com/c/TraversyMedia' }
        ],
        courses: [
            { name: 'The Odin Project - Full Stack Path', url: 'https://www.theodinproject.com/paths/full-stack-javascript' },
            { name: 'freeCodeCamp - Full Stack Certification', url: 'https://www.freecodecamp.org/learn' }
        ],
        practice: [
            { name: 'Frontend Mentor (UI Challenges)', url: 'https://www.frontendmentor.io/' },
            { name: 'LeetCode (Full Stack + DB Problems)', url: 'https://leetcode.com/' },
            { name: 'BuildClubs (Project-based Learning)', url: 'https://buildclubs.com/' }
        ]
    }
},
'mobile': {
    title: 'Mobile Developer',
    description: 'Builds applications for mobile devices (Android, iOS, or cross-platform) ensuring smooth performance, responsive UI, and integration with device features.',
    skills: {
        core: ['Java (Android)', 'Kotlin', 'Swift (iOS)', 'Dart (Flutter)', 'JavaScript/TypeScript (React Native)'],
        frameworks: ['Android SDK', 'iOS SDK', 'Flutter', 'React Native', 'Xamarin'],
        tools: ['Android Studio', 'Xcode', 'Firebase', 'Git & GitHub', 'Postman'],
        additional: ['REST APIs', 'Push Notifications', 'App Store Deployment', 'UI/UX for Mobile', 'Performance Optimization']
    },
    roadmap: [
        'Learn core programming language (Java/Kotlin for Android, Swift for iOS, or Dart/JS for cross-platform)',
        'Understand mobile app architecture and lifecycle',
        'Master a framework (Flutter, React Native, or native SDKs)',
        'Learn to integrate APIs, databases, and authentication',
        'Practice deploying apps to Google Play Store and Apple App Store',
        'Work on real-world projects with offline storage, notifications, and performance tuning'
    ],
    salary: {
        fresher: '₹5-8 LPA',
        experienced: '₹10-18 LPA',
        senior: '₹20-35 LPA'
    },
    resources: {
        youtube: [
            { name: 'CodeWithHarry - Android Development', url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agq8vT3Bz0LZ8dD0o3bFv4t' },
            { name: 'Academind - Flutter & React Native', url: 'https://www.youtube.com/c/Academind' }
        ],
        courses: [
            { name: 'freeCodeCamp - Flutter Development', url: 'https://www.youtube.com/watch?v=VPvVD8t02U8' },
            { name: 'Udemy - iOS & Android Development Bootcamps', url: 'https://www.udemy.com/' }
        ],
        practice: [
            { name: 'Exercism - Mobile Tracks', url: 'https://exercism.org/' },
            { name: 'BuildClubs - Mobile Projects', url: 'https://buildclubs.com/' }
        ]
    }
},

'datascientist': {
    title: 'Data Scientist',
    description: 'Analyzes and interprets complex data to help organizations make informed decisions using statistics, machine learning, and data visualization.',
    skills: {
        core: ['Python', 'R', 'SQL', 'Statistics', 'Probability'],
        frameworks: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch'],
        tools: ['Jupyter Notebook', 'Tableau', 'Power BI', 'Git'],
        additional: ['Data Cleaning', 'Feature Engineering', 'Big Data (Hadoop/Spark)', 'Cloud Platforms']
    },
    roadmap: [
        'Learn Python/R and SQL fundamentals',
        'Master statistics, probability, and linear algebra',
        'Practice data wrangling and visualization',
        'Learn machine learning algorithms with Scikit-learn',
        'Work on real datasets and Kaggle competitions',
        'Explore deep learning and big data tools'
    ],
    salary: {
        fresher: '₹8-12 LPA',
        experienced: '₹15-25 LPA',
        senior: '₹30-50 LPA'
    },
    resources: {
        youtube: [
            { name: 'Krish Naik - Data Science', url: 'https://www.youtube.com/c/KrishNaik' },
            { name: 'freeCodeCamp - Data Science', url: 'https://www.youtube.com/watch?v=ua-CiDNNj30' }
        ],
        courses: [
            { name: 'Coursera - Data Science Specialization', url: 'https://www.coursera.org/specializations/jhu-data-science' },
            { name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn' }
        ],
        practice: [
            { name: 'Kaggle Competitions', url: 'https://www.kaggle.com/competitions' },
            { name: 'HackerRank - Data Science', url: 'https://www.hackerrank.com/domains/tutorials/10-days-of-statistics' }
        ]
    }
},
'ai': {
    title: 'AI/ML Engineer',
    description: 'Designs, builds, and deploys machine learning and artificial intelligence models for real-world applications like NLP, computer vision, and recommendation systems.',
    skills: {
        core: ['Python', 'Linear Algebra', 'Calculus', 'Probability & Statistics'],
        frameworks: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn'],
        tools: ['Jupyter Notebook', 'Google Colab', 'MLflow', 'Docker'],
        additional: ['NLP', 'Computer Vision', 'Reinforcement Learning', 'MLOps']
    },
    roadmap: [
        'Master Python and ML fundamentals',
        'Learn supervised and unsupervised algorithms',
        'Practice deep learning with TensorFlow/PyTorch',
        'Explore NLP and Computer Vision projects',
        'Learn model deployment with Flask/Docker',
        'Understand MLOps and cloud deployment',
        'Work on real-world AI projects and research papers'
    ],
    salary: {
        fresher: '₹10-15 LPA',
        experienced: '₹18-30 LPA',
        senior: '₹35-60 LPA'
    },
    resources: {
        youtube: [
            { name: 'Sentdex - Machine Learning', url: 'https://www.youtube.com/user/sentdex' },
            { name: 'freeCodeCamp - Deep Learning', url: 'https://www.youtube.com/watch?v=aircAruvnKk' }
        ],
        courses: [
            { name: 'Andrew Ng - Machine Learning (Coursera)', url: 'https://www.coursera.org/learn/machine-learning' },
            { name: 'DeepLearning.AI Specialization', url: 'https://www.coursera.org/specializations/deep-learning' }
        ],
        practice: [
            { name: 'Kaggle - ML Projects', url: 'https://www.kaggle.com/' },
            { name: 'Papers With Code', url: 'https://paperswithcode.com/' }
        ]
    }
},


'dataanalyst': {
    title: 'Data Analyst',
    description: 'Collects, processes, and analyzes data to generate actionable insights, create reports, and support business decision-making.',
    skills: {
        core: ['SQL', 'Excel', 'Statistics', 'Data Visualization'],
        frameworks: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI', 'Tableau'],
        tools: ['Excel/Google Sheets', 'SQL Databases', 'Power BI', 'Tableau'],
        additional: ['Data Cleaning', 'ETL Processes', 'Business Intelligence', 'Basic Python/R']
    },
    roadmap: [
        'Learn Excel and SQL for data handling',
        'Understand statistics and probability basics',
        'Learn Python/R for data analysis',
        'Practice data visualization with Tableau/Power BI',
        'Work on real datasets and create dashboards',
        'Learn ETL and reporting automation',
        'Build a portfolio with case studies and projects'
    ],
    salary: {
        fresher: '₹4-8 LPA',
        experienced: '₹8-15 LPA',
        senior: '₹18-25 LPA'
    },
    resources: {
        youtube: [
            { name: 'Alex The Analyst', url: 'https://www.youtube.com/c/AlexTheAnalyst' },
            { name: 'freeCodeCamp - Data Analysis with Python', url: 'https://www.youtube.com/watch?v=r-uOLxNrNk8' }
        ],
        courses: [
            { name: 'Google Data Analytics Professional Certificate', url: 'https://www.coursera.org/professional-certificates/google-data-analytics' },
            { name: 'freeCodeCamp - Data Analysis with Python', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/' }
        ],
        practice: [
            { name: 'Kaggle Datasets', url: 'https://www.kaggle.com/datasets' },
            { name: 'Maven Analytics Playground', url: 'https://mavenanalytics.io/data-playground' }
        ]
    }
},

'devops': {
    title: 'DevOps Engineer',
    description: 'Bridges development and operations by automating workflows, managing CI/CD pipelines, and ensuring scalable, reliable deployments.',
    skills: {
        core: ['Linux', 'Networking Basics', 'Scripting (Bash/Python)'],
        frameworks: ['CI/CD Pipelines', 'Infrastructure as Code (Terraform, Ansible)'],
        tools: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'AWS/Azure/GCP'],
        additional: ['Monitoring (Prometheus, Grafana)', 'Security Best Practices', 'Cloud Automation']
    },
    roadmap: [
        'Learn Linux and shell scripting',
        'Understand Git and version control',
        'Master CI/CD tools like Jenkins/GitHub Actions',
        'Learn containerization (Docker) and orchestration (Kubernetes)',
        'Explore cloud platforms (AWS, Azure, GCP)',
        'Automate infrastructure with Terraform/Ansible',
        'Set up monitoring and logging systems'
    ],
    salary: {
        fresher: '₹8-12 LPA',
        experienced: '₹15-25 LPA',
        senior: '₹30-45 LPA'
    },
    resources: {
        youtube: [
            { name: 'TechWorld with Nana - DevOps', url: 'https://www.youtube.com/c/TechWorldwithNana' },
            { name: 'KodeKloud - DevOps Tutorials', url: 'https://www.youtube.com/c/KodeKloud' }
        ],
        courses: [
            { name: 'Udemy - Docker & Kubernetes', url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/' },
            { name: 'HashiCorp Learn - Terraform', url: 'https://learn.hashicorp.com/terraform' }
        ],
        practice: [
            { name: 'Katacoda Scenarios', url: 'https://www.katacoda.com/' },
            { name: 'KodeKloud Labs', url: 'https://kodekloud.com/' }
        ]
    }
},


'cybersecurity': {
    title: 'Cyber Security Specialist',
    description: 'Protects systems, networks, and data from cyber threats through ethical hacking, penetration testing, and security monitoring.',
    skills: {
        core: ['Networking', 'Linux/Windows Security', 'Cryptography'],
        frameworks: ['NIST Cybersecurity Framework', 'OWASP Top 10'],
        tools: ['Wireshark', 'Metasploit', 'Burp Suite', 'Nmap', 'SIEM Tools'],
        additional: ['Ethical Hacking', 'Penetration Testing', 'Incident Response', 'Cloud Security']
    },
    roadmap: [
        'Learn networking and operating system fundamentals',
        'Understand cryptography and security basics',
        'Practice with tools like Wireshark, Nmap, Burp Suite',
        'Learn penetration testing and ethical hacking',
        'Get familiar with SIEM and incident response',
        'Explore cloud and application security',
        'Earn certifications (CEH, CompTIA Security+, CISSP)'
    ],
    salary: {
        fresher: '₹6-10 LPA',
        experienced: '₹12-20 LPA',
        senior: '₹25-40 LPA'
    },
    resources: {
        youtube: [
            { name: 'The Cyber Mentor', url: 'https://www.youtube.com/c/TheCyberMentor' },
            { name: 'HackerSploit', url: 'https://www.youtube.com/c/HackerSploit' }
        ],
        courses: [
            { name: 'Cybrary - Cyber Security Basics', url: 'https://www.cybrary.it/' },
            { name: 'EC-Council - CEH Program', url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/' }
        ],
        practice: [
            { name: 'TryHackMe', url: 'https://tryhackme.com/' },
            { name: 'Hack The Box', url: 'https://www.hackthebox.com/' }
        ]
    }
},
'cloud': {
    title: 'Cloud Engineer',
    description: 'Designs, implements, and manages cloud-based infrastructure and services on platforms like AWS, Azure, and Google Cloud.',
    skills: {
        core: ['Linux/Windows Administration', 'Networking Basics', 'Cloud Fundamentals (AWS, Azure, GCP)'],
        frameworks: ['Infrastructure as Code (Terraform, CloudFormation)', 'Serverless Architectures'],
        tools: ['AWS CLI', 'Azure Portal', 'Google Cloud Console', 'Docker', 'Kubernetes'],
        additional: ['CI/CD Pipelines', 'Cloud Security', 'Monitoring & Logging', 'Cost Optimization']
    },
    roadmap: [
        'Learn basics of operating systems and networking',
        'Understand cloud fundamentals (AWS/Azure/GCP)',
        'Get hands-on with compute, storage, and networking services',
        'Learn Infrastructure as Code (Terraform/CloudFormation)',
        'Practice containerization and orchestration (Docker, Kubernetes)',
        'Set up CI/CD pipelines and monitoring tools',
        'Work on real-world cloud deployment projects',
        'Earn certifications (AWS Solutions Architect, Azure Administrator, GCP Associate Engineer)'
    ],
    salary: {
        fresher: '₹7-12 LPA',
        experienced: '₹15-25 LPA',
        senior: '₹30-45 LPA'
    },
    resources: {
        youtube: [
            { name: 'FreeCodeCamp - AWS Certified Cloud Practitioner', url: 'https://www.youtube.com/watch?v=3hLmDS179YE' },
            { name: 'TechWorld with Nana - Cloud & DevOps', url: 'https://www.youtube.com/c/TechWorldwithNana' }
        ],
        courses: [
            { name: 'AWS Training & Certification', url: 'https://aws.amazon.com/training/' },
            { name: 'Microsoft Learn - Azure Fundamentals', url: 'https://learn.microsoft.com/en-us/training/azure/' },
            { name: 'Google Cloud Training', url: 'https://cloud.google.com/training' }
        ],
        practice: [
            { name: 'Qwiklabs (Google Cloud Hands-on Labs)', url: 'https://www.qwiklabs.com/' },
            { name: 'AWS Skill Builder', url: 'https://skillbuilder.aws/' },
            { name: 'Azure Sandbox Labs', url: 'https://learn.microsoft.com/en-us/training/sandbox/' }
        ]
    }
},


    'datascience': {
        title: 'Data Scientist',
        description: 'Uses scientific methods, processes, algorithms to extract knowledge and insights from structured and unstructured data.',
        skills: {
            programming: ['Python', 'R', 'SQL'],
            libraries: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow'],
            tools: ['Jupyter', 'Tableau', 'Apache Spark', 'Hadoop'],
            concepts: ['Machine Learning', 'Statistics', 'Data Visualization', 'Big Data']
        },
        roadmap: [
            'Learn Python/R programming',
            'Master statistics and mathematics',
            'Learn data manipulation with Pandas',
            'Study machine learning algorithms',
            'Practice with real datasets and competitions'
        ],
        salary: {
            fresher: '₹6-9 LPA',
            experienced: '₹12-20 LPA',
            senior: '₹25-40 LPA'
        },
        resources: {
            youtube: [
                { name: 'Krish Naik', url: 'https://www.youtube.com/c/KrishNaik' },
                { name: 'CodeBasics', url: 'https://www.youtube.com/c/codebasics' }
            ],
            courses: [
                { name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn' },
                { name: 'Coursera - Data Science Specialization', url: 'https://www.coursera.org/specializations/jhu-data-science' }
            ],
            practice: [
                { name: 'Kaggle Competitions', url: 'https://www.kaggle.com/competitions' },
                { name: 'Analytics Vidhya', url: 'https://datahack.analyticsvidhya.com/' }
            ]
        }
    }
};


// Show exam details
function showExamDetails(examId) {
    const exam = examData[examId];
    if (!exam) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${exam.title}</h2>
            <div class="exam-info">
                <span class="category">${exam.category}</span>
                <span class="date">📅 ${exam.date}</span>
            </div>
        </div>
        
        <div class="modal-sections">
            <div class="modal-section">
                <h3>🔗 Official Links</h3>
                <div class="links-grid">
                    ${exam.links.map(link => `
                        <a href="${link.url}" target="_blank" class="modal-link">
                            <strong>${link.name}</strong>
                            <span>${link.url}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h3>📚 Syllabus & Pattern</h3>
                <div class="syllabus-content">
                    ${exam.syllabus.subjects ? `
                        <h4>Subjects:</h4>
                        <ul>
                            ${exam.syllabus.subjects.map(subject => `<li>${subject}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${exam.syllabus.topics ? `
                        <h4>Key Topics:</h4>
                        <ul>
                            ${exam.syllabus.topics.map(topic => `<li>${topic}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${exam.syllabus.phases ? `
                        <h4>Exam Phases:</h4>
                        <ul>
                            ${exam.syllabus.phases.map(phase => `<li>${phase}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${exam.syllabus.highlights ? `
                        <p><strong>Highlights:</strong> ${exam.syllabus.highlights}</p>
                    ` : ''}
                </div>
            </div>
            
            <div class="modal-section">
                <h3>📅 Important Dates</h3>
                <div class="notifications-list">
                    ${exam.notifications.map(notification => `
                        <div class="notification-item">
                            <span class="notification-dot"></span>
                            <span>${notification}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('details-modal').style.display = 'block';
}

// Show career details
function showCareerDetails(careerId) {
    const career = careerData[careerId];
    if (!career) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${career.title}</h2>
            <p class="career-desc">${career.description}</p>
        </div>
        
        <div class="modal-sections">
            <div class="modal-section">
                <h3>💼 Salary Range</h3>
                <div class="salary-cards">
                    <div class="salary-card">
                        <h4>Fresher</h4>
                        <div class="salary-amount">${career.salary.fresher}</div>
                    </div>
                    <div class="salary-card">
                        <h4>Experienced (2-5 years)</h4>
                        <div class="salary-amount">${career.salary.experienced}</div>
                    </div>
                    <div class="salary-card">
                        <h4>Senior (5+ years)</h4>
                        <div class="salary-amount">${career.salary.senior}</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3>🛠️ Skills Required</h3>
                <div class="skills-grid">
                    ${Object.entries(career.skills).map(([category, skills]) => `
                        <div class="skill-category">
                            <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                            <div class="skill-tags">
                                ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h3>🗺️ Learning Roadmap</h3>
                <div class="roadmap">
                    ${career.roadmap.map((step, index) => `
                        <div class="roadmap-step">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-content">${step}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h3>📚 Learning Resources</h3>
                <div class="resources-categories">
                    ${Object.entries(career.resources).map(([category, resources]) => `
                        <div class="resource-category">
                            <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                            <div class="resource-links">
                                ${resources.map(resource => `
                                    <a href="${resource.url}" target="_blank" class="resource-link">
                                        <span class="resource-name">${resource.name}</span>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('details-modal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('details-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('details-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Add some CSS for modal content
const modalStyles = `
    .modal-header {
        border-bottom: 2px solid #f1f3f4;
        padding-bottom: 20px;
        margin-bottom: 25px;
    }
    
    .modal-header h2 {
        color: #333;
        margin-bottom: 10px;
    }
    
    .exam-info {
        display: flex;
        gap: 15px;
        align-items: center;
    }
    
    .category {
        background: #667eea;
        color: white;
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 0.9rem;
    }
    
    .date {
        color: #28a745;
        font-weight: 600;
    }
    
    .modal-sections {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    
    .modal-section h3 {
        color: #333;
        margin-bottom: 15px;
        font-size: 1.3rem;
    }
    
    .links-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
    }
    
    .modal-link {
        display: block;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 10px;
        text-decoration: none;
        color: #333;
        border: 2px solid transparent;
        transition: all 0.3s ease;
    }
    
    .modal-link:hover {
        border-color: #667eea;
        text-decoration: none;
        color: #333;
        transform: translateY(-2px);
    }
    
    .modal-link strong {
        display: block;
        margin-bottom: 5px;
    }
    
    .modal-link span {
        font-size: 0.8rem;
        color: #666;
        word-break: break-all;
    }
    
    .syllabus-content ul {
        padding-left: 20px;
        margin-bottom: 15px;
    }
    
    .syllabus-content li {
        margin-bottom: 8px;
        line-height: 1.5;
    }
    
    .notifications-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .notification-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .notification-dot {
        width: 8px;
        height: 8px;
        background: #28a745;
        border-radius: 50%;
    }
    
    .career-desc {
        color: #666;
        font-size: 1.1rem;
        line-height: 1.6;
    }
    
    .salary-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
    }
    
    .salary-card {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
    }
    
    .salary-card h4 {
        margin-bottom: 10px;
        color: #666;
        font-size: 0.9rem;
    }
    
    .salary-amount {
        font-size: 1.3rem;
        font-weight: 700;
        color: #28a745;
    }
    
    .skills-grid {
        display: grid;
        gap: 20px;
    }
    
    .skill-category h4 {
        margin-bottom: 10px;
        color: #333;
    }
    
    .skill-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }
    
    .skill-tag {
        background: #e9ecef;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 0.8rem;
        color: #495057;
    }
    
    .roadmap {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .roadmap-step {
        display: flex;
        gap: 15px;
        align-items: flex-start;
    }
    
    .step-number {
        background: #667eea;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        flex-shrink: 0;
    }
    
    .step-content {
        flex: 1;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 8px;
        line-height: 1.5;
    }
    
    .resources-categories {
        display: grid;
        gap: 20px;
    }
    
    .resource-category h4 {
        margin-bottom: 10px;
        color: #333;
    }
    
    @media (max-width: 768px) {
        .salary-cards {
            grid-template-columns: 1fr;
        }
        
        .roadmap-step {
            flex-direction: column;
            gap: 10px;
        }
        
        .step-number {
            align-self: flex-start;
        }
    }
`;

