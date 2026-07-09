// Case-study data for the projects section + modal.
// `shot` is the basename of an optional screenshot in /public/projects/
// (tries .png then .jpg) — when no file exists the card shows a labelled
// placeholder instead.
export const PROJECTS = [
  {
    slug: 'dbm-bluedale-crm',
    name: 'DBM Bluedale — CRM',
    cardName: 'DBM Bluedale — CRM',
    type: 'Web App · 2026',
    year: '2026',
    status: 'live in production',
    role: 'Full-Stack Developer',
    duration: '3 months',
    github: 'https://github.com/Vanz2710/DBM_bluedale',
    tags: ['Laravel', 'Vue 3', 'MySQL', 'Sanctum', 'Vite'],
    cardTags: ['Laravel', 'Vue 3', 'MySQL', 'Sanctum', 'Vite'],
    shot: 'dbm-bluedale-crm',
    shotLabel: 'drop DBM CRM screenshot',
    cardDesc:
      'Full-stack multi-user CRM — role-based access control, sales pipeline and a RESTful API. Built during my internship at Bluedale.',
    problem:
      'Bluedale needed a single system to run its entire sales workflow — from lead capture to deal closure — with every role seeing only the data and actions relevant to them.',
    longDesc:
      "Built during my internship at Bluedale Group, this CRM manages the company's full sales workflow — from lead capture to deal closure. Multi-user roles (Admin, Manager, Staff) each see a different interface with different data access levels.",
    bullets: [
      'Role-based access: Admin, Manager, Staff levels',
      'Sales pipeline with drag-and-drop stage management',
      'RESTful API with Laravel Sanctum token authentication',
      'Vue 3 Composition API frontend with Vite build tooling',
      'Deployed to production on cPanel — handover to the company completed, with daily maintenance and support',
    ],
    metrics: [
      { value: '3', label: 'role-based access levels' },
      { value: 'live', label: 'in production on cPanel' },
    ],
  },
  {
    slug: 'fortiroom',
    name: 'Fortiroom',
    cardName: 'Fortiroom',
    type: 'FYP · IoT · 2025–2026',
    year: 'FYP · IoT',
    status: 'completed (FYP)',
    role: 'Backend & IoT Developer',
    duration: '9 months · Aug 2025 – Apr 2026',
    github: 'https://github.com/leshvinsk/Fortiroom',
    tags: ['PHP', 'ESP32', 'Face Recognition', 'PostgreSQL', 'GCP', 'IoT'],
    cardTags: ['PHP', 'ESP32', 'Face Recognition', 'PostgreSQL', 'GCP'],
    shot: 'fortiroom',
    shotLabel: 'drop Fortiroom screenshot',
    cardDesc:
      'IoT smart room booking — face-recognition door unlock via ESP32, real-time environment monitoring and penalty alerts.',
    problem:
      'Manual meeting-room booking offers no way to verify who actually enters a room or to enforce booking rules once a session ends. Fortiroom layers physical access control and live monitoring on top of the booking flow.',
    longDesc:
      'My Final Year Project — a smart room booking system that integrates physical IoT hardware with a web platform. Rooms are unlocked via face verification using ESP32 camera modules, and movement after checkout triggers an automatic penalty.',
    bullets: [
      'Face verification via ESP32 camera modules at room entry',
      'Sensor suite: motion, smoke, magnetic door lock & environmental sensors',
      'Real-time environment monitoring dashboards',
      'Penalty system for unauthorised post-checkout movement',
      'PostgreSQL backend with PHP REST API, deployed on Google Cloud Platform',
      'Validated on a mini-scale physical model of a meeting room',
    ],
    metrics: [
      { value: '96%', label: 'face-recognition accuracy' },
      { value: '3–5s', label: 'door unlock response' },
      { value: '4+', label: 'integrated sensor types' },
    ],
  },
  {
    slug: 'kl-the-guide',
    name: 'KL The Guide — Mobile App',
    cardName: 'KL The Guide',
    type: 'Mobile App · 2026',
    year: '2026',
    status: 'in development',
    role: 'Mobile Developer',
    duration: 'ongoing',
    github: 'https://github.com/Vanz2710/KLTG_Android',
    tags: ['Flutter', 'Dart', 'Mobile'],
    cardTags: ['Flutter', 'Dart', 'Mobile'],
    shot: 'kl-the-guide', // two-panel collage of the phone prototype (portrait split side-by-side)
    shotLabel: 'drop KL The Guide screenshot',
    cardDesc:
      "Cross-platform mobile app for Bluedale's KL The Guide — bringing the Kuala Lumpur city guide to iOS and Android with Flutter.",
    problem:
      "KL The Guide needed a mobile-first way to reach its audience — a single Flutter codebase delivers the guide to both iOS and Android without maintaining two native apps.",
    longDesc:
      'The second project of my Bluedale internship, started after the CRM production handover — a cross-platform mobile app for KL The Guide, built with Flutter and Dart. Currently in active development.',
    bullets: [
      'Single Flutter/Dart codebase targeting iOS and Android',
      'Started after completing the CRM handover to the company',
      'In active development during my internship at Bluedale',
    ],
    metrics: [],
  },
  {
    slug: 'service-day-dashboard',
    name: 'Service Day Dashboard',
    cardName: 'Service Day Dashboard',
    type: 'Web App · 2024',
    year: '2024',
    status: 'academic project',
    role: 'Full-Stack Developer',
    duration: '3 months',
    github: 'https://github.com/Vanz2710/BIT306_Assignment1',
    tags: ['Django', 'Python', 'Chart.js', 'SQLite'],
    cardTags: ['Django', 'Python', 'Chart.js', 'SQLite'],
    shot: 'service-day-dashboard',
    shotLabel: 'drop dashboard screenshot',
    cardDesc:
      'Internal analytics dashboard visualising customer data and service metrics through interactive, filterable charts.',
    problem:
      "A BIT306 course project in enterprise application development — taking raw service data and turning it into a clear, filterable analytics view for managers using Django's MVT pattern.",
    longDesc:
      "Built for BIT306 — a service data visualisation dashboard using Django's MVT architecture. Gives managers a clear view of customer activity, service trends, and key metrics through interactive charts.",
    bullets: [
      'Django MVT architecture with custom templates',
      'Interactive charts with Chart.js',
      'Customer filtering, search, and date-range queries',
      'Export to PDF functionality',
    ],
    metrics: [],
  },
  {
    slug: 'concert-ticket-booking',
    name: 'Concert Ticket Booking',
    cardName: 'Concert Ticket Booking',
    type: 'Web App · 2023',
    year: '2023',
    status: 'academic project',
    role: 'Full-Stack Developer',
    duration: '2 months',
    github: null,
    tags: ['Angular', 'Node.js', 'MongoDB', 'Express'],
    cardTags: ['Angular', 'Node.js', 'MongoDB', 'Express'],
    shot: 'concert-ticket-booking',
    shotLabel: 'drop booking app screenshot',
    cardDesc:
      'Booking platform with interactive seat selection, JWT authentication and order management.',
    problem:
      'Concert-goers needed to browse events, choose exact seats, and book without the risk of double-booking — handled end to end across an Angular front end and a Node/Express API.',
    longDesc:
      'A full-stack concert booking system with an Angular frontend and Node.js + Express backend. Users can browse events, select seats on an interactive map, and complete an order managed through MongoDB.',
    bullets: [
      'Interactive seat map with real-time availability',
      'JWT-based user authentication and session handling',
      'Node.js + Express REST API',
      'MongoDB for order and inventory management',
    ],
    metrics: [],
  },
  {
    slug: 'library-book-rental',
    name: 'Library Book Rental System',
    cardName: 'Library Book Rental',
    type: 'Desktop App · 2023',
    year: '2023',
    status: 'academic project',
    role: 'Developer',
    duration: '2 months',
    github: null,
    tags: ['Java', 'NetBeans', 'MySQL', 'Swing'],
    cardTags: ['Java', 'Swing', 'NetBeans', 'MySQL'],
    shot: 'library-book-rental',
    shotLabel: 'drop desktop app screenshot',
    cardDesc:
      'Java desktop app for library inventory, borrower tracking and overdue notifications via JDBC.',
    problem:
      'Library staff needed one tool to manage inventory, borrower records, and overdue items instead of tracking them by hand — delivered as a Java Swing desktop app backed by MySQL.',
    longDesc:
      'A Java Swing desktop application for managing library inventory, borrower records, and overdue tracking. Built with NetBeans and integrated with a MySQL database via JDBC.',
    bullets: [
      'Book inventory and rental tracking',
      'Borrower management with overdue alerts',
      'MySQL database integration via JDBC',
      'GUI built with Java Swing in NetBeans IDE',
    ],
    metrics: [],
  },
]
