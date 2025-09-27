import {
  Project,
  ProjectCategory,
  ProjectCategoryEnum,
} from "../category/types/ProjectCategory";

export const projectsData: Project[] = [
  {
    id: "file-encryptor",
    title: "🔐 File Encryptor",
    description:
      "Enterprise-grade desktop file encryption application with AES-256 encryption, built with Electron and React.",
    longDescription:
      "A secure, cross-platform desktop application that provides military-grade AES-256 encryption for files. Features drag & drop interface, batch processing, resumable operations, and secure memory handling. Built with TypeScript, React, and Material-UI for a professional user experience.",
    categories: [
      ProjectCategoryEnum.Electron,
      ProjectCategoryEnum.Desktop,
      ProjectCategoryEnum.Security,
      ProjectCategoryEnum.TypeScript,
      ProjectCategoryEnum.React,
    ],
    technologies: [
      "Electron",
      "React",
      "TypeScript",
      "Material-UI",
      "Node.js Crypto",
      "PBKDF2",
      "AES-256-GCM",
    ],
    features: [
      "AES-256 encryption with secure key derivation (PBKDF2)",
      "Drag & drop interface for easy file selection",
      "Batch processing - encrypt/decrypt multiple files",
      "Progress tracking with real-time status updates",
      "Cross-platform - Windows, macOS, and Linux support",
      "Secure memory handling with automatic cleanup",
      "Worker thread processing for large files",
      "Custom themes and keyboard shortcuts",
      "File integrity verification",
    ],
    githubUrl: "https://github.com/Vaporjawn/file-encryptor",
    status: "Complete",
    lastUpdated: "2024",
    stars: 0,
    forks: 0,
    language: "TypeScript",
    difficulty: "Advanced",
    priority: "High",
  },
  {
    id: "youtube-to-mp3",
    title: "⚡️ YouTube to MP3",
    description:
      "Electron application to convert and download YouTube videos as MP3s with modern UI.",
    longDescription:
      "A cross-platform desktop application built with Electron and React that allows users to convert YouTube videos to MP3 format. Features a modern interface with Sass styling and webpack bundling for optimal performance.",
    categories: [
      ProjectCategoryEnum.Electron,
      ProjectCategoryEnum.Desktop,
      ProjectCategoryEnum.Audio,
      ProjectCategoryEnum.JavaScript,
      ProjectCategoryEnum.React,
    ],
    technologies: [
      "Electron",
      "React",
      "JavaScript",
      "Sass",
      "Webpack",
      "YouTube API",
      "FFmpeg",
    ],
    features: [
      "Convert YouTube videos to MP3 format",
      "Modern React-based user interface",
      "Cross-platform desktop application",
      "Sass-powered styling system",
      "Webpack module bundling",
      "YouTube API integration",
      "Audio quality options",
      "Batch download support",
    ],
    githubUrl: "https://github.com/Vaporjawn/Youtube-to-MP3",
    status: "Complete",
    lastUpdated: "2023",
    stars: 2,
    forks: 1,
    language: "JavaScript",
    difficulty: "Intermediate",
    priority: "High",
  },
  {
    id: "sudoku-solver",
    title: "🧩 Sud0ku Game & Solver",
    description:
      "Interactive Sudoku game and solver using backtracking algorithm, available in both Python and JavaScript.",
    longDescription:
      "A comprehensive Sudoku application that includes both a playable game and an automated solver. The Python version features a GUI with pencil-in functionality, while the JavaScript version runs in the browser. Demonstrates advanced algorithm implementation and cross-language development.",
    categories: [
      ProjectCategoryEnum.Game,
      ProjectCategoryEnum.Algorithm,
      ProjectCategoryEnum.Python,
      ProjectCategoryEnum.JavaScript,
      ProjectCategoryEnum.Educational,
    ],
    technologies: [
      "Python",
      "JavaScript",
      "HTML",
      "GUI (Tkinter)",
      "Backtracking Algorithm",
      "Game Logic",
    ],
    features: [
      "Interactive Sudoku game with GUI",
      "Backtracking algorithm solver",
      "Pencil-in number functionality",
      "Real-time solving visualization",
      "Both Python GUI and web versions",
      "Educational algorithm demonstration",
      "Keyboard controls (ENTER, DEL, SPACE)",
      "Multiple difficulty levels",
    ],
    githubUrl: "https://github.com/Vaporjawn/Sud0ku",
    liveUrl: "http://vaporjawn.dev/Sud0ku/",
    status: "Archived",
    lastUpdated: "2023",
    stars: 0,
    forks: 0,
    language: "Python",
    difficulty: "Intermediate",
    priority: "Medium",
  },
  {
    id: "discord-moosik",
    title: "🎵 Discord Moosik",
    description:
      "Feature-rich Discord music bot supporting YouTube, SoundCloud, Spotify, and live streams.",
    longDescription:
      "A comprehensive Discord music bot that allows users to play audio from multiple sources including YouTube, SoundCloud, Spotify, and live streams. Built with Discord.js and featuring advanced audio processing, playlist management, and real-time streaming capabilities.",
    categories: [
      ProjectCategoryEnum.Bot,
      ProjectCategoryEnum.Audio,
      ProjectCategoryEnum.JavaScript,
      ProjectCategoryEnum.API,
      ProjectCategoryEnum.NodeJS,
    ],
    technologies: [
      "JavaScript",
      "Discord.js",
      "Node.js",
      "FFmpeg",
      "YouTube API",
      "SoundCloud API",
      "Spotify API",
      "WebSockets",
    ],
    features: [
      "Play videos/playlists from YouTube",
      "SoundCloud track and set support",
      "Spotify track and playlist integration",
      "Live stream support (Icecast/Shoutcast/Radionomy)",
      "Audio and video file playback",
      "Playlist file support",
      "Real-time audio streaming",
      "Queue management system",
      "Command-based controls",
      "Multiple encoder/decoder support",
    ],
    githubUrl: "https://github.com/Vaporjawn/Discord-Moosik",
    status: "Complete",
    lastUpdated: "2023",
    stars: 0,
    forks: 0,
    language: "JavaScript",
    difficulty: "Advanced",
    priority: "High",
  },
  {
    id: "spell-checker",
    title: "📝 Spell Checker",
    description:
      "Python-based operational spell checker with trainer and probabilistic language model.",
    longDescription:
      "An intelligent spell correction system implementing probabilistic language modeling and edit distance algorithms. Features a trainer component that learns from text corpora and provides accurate spelling suggestions using statistical methods.",
    categories: [
      ProjectCategoryEnum.Python,
      ProjectCategoryEnum.AI,
      ProjectCategoryEnum.Algorithm,
      ProjectCategoryEnum.Educational,
    ],
    technologies: [
      "Python",
      "Natural Language Processing",
      "Probabilistic Models",
      "Edit Distance Algorithm",
      "Machine Learning",
    ],
    features: [
      "Probabilistic spell correction algorithm",
      "Trainable language model",
      "Edit distance candidate generation",
      "Statistical word frequency analysis",
      "Custom dictionary support",
      "Batch text processing",
      "Performance optimization",
      "Extensible architecture",
    ],
    githubUrl: "https://github.com/Vaporjawn/spell-checker",
    status: "Complete",
    lastUpdated: "2022",
    language: "Python",
    difficulty: "Advanced",
    priority: "Medium",
  },
  {
    id: "graphing-calculator",
    title: "📈 Graphing Calculator",
    description:
      "Interactive JavaScript graphing calculator with HTML5 Canvas rendering and mathematical expression parsing.",
    longDescription:
      "A web-based graphing calculator that can plot mathematical functions on a coordinate plane. Features expression parsing, zoom/pan functionality, and support for various mathematical functions including polynomials and trigonometric functions.",
    categories: [
      ProjectCategoryEnum.JavaScript,
      ProjectCategoryEnum.Web,
      ProjectCategoryEnum.Educational,
      ProjectCategoryEnum.Visualization,
    ],
    technologies: [
      "JavaScript",
      "HTML5 Canvas",
      "Mathematical Expression Parser",
      "SVG",
      "CSS",
    ],
    features: [
      "Interactive function graphing",
      "Mathematical expression parser",
      "HTML5 Canvas rendering",
      "Zoom and pan functionality",
      "Multiple function support",
      "Coordinate system with axes",
      "Real-time plotting",
      "Responsive design",
    ],
    githubUrl: "https://github.com/Vaporjawn/Graphing-Calculator",
    status: "In Development",
    lastUpdated: "2022",
    language: "JavaScript",
    difficulty: "Intermediate",
    priority: "Medium",
  },
  {
    id: "autohd-youtube",
    title: "📺 AutoHD for YouTube",
    description:
      "Chrome extension that automatically selects the best HD quality on YouTube videos.",
    longDescription:
      "A browser extension that eliminates the need to manually adjust video quality by automatically selecting the highest available HD quality when YouTube videos load. Uses DOM manipulation and YouTube player API integration.",
    categories: [
      ProjectCategoryEnum.Chrome,
      ProjectCategoryEnum.JavaScript,
      ProjectCategoryEnum.Utility,
      ProjectCategoryEnum.Web,
    ],
    technologies: [
      "JavaScript",
      "Chrome Extension API",
      "DOM Manipulation",
      "YouTube Player API",
      "JSON Manifest",
    ],
    features: [
      "Automatic HD quality selection",
      "YouTube player integration",
      "Dynamic content handling",
      "User preference settings",
      "Mutation observer for SPA content",
      "Background script processing",
      "Chrome extension architecture",
    ],
    githubUrl: "https://github.com/Vaporjawn/AutoHD-for-YouTube",
    status: "Complete",
    lastUpdated: "2020",
    language: "JavaScript",
    difficulty: "Intermediate",
    priority: "Low",
  },
  {
    id: "maze-generator",
    title: "🌀 Maze.JS",
    description:
      "JavaScript maze generator using depth-first search algorithm with visual output.",
    longDescription:
      "A maze generation application that creates random mazes using algorithmic approaches like depth-first search. Features visual representation and demonstrates graph algorithms in an interactive way.",
    categories: [
      ProjectCategoryEnum.JavaScript,
      ProjectCategoryEnum.Algorithm,
      ProjectCategoryEnum.Visualization,
      ProjectCategoryEnum.Educational,
    ],
    technologies: [
      "JavaScript",
      "HTML5 Canvas",
      "Depth-First Search",
      "Graph Algorithms",
      "Randomization",
    ],
    features: [
      "Random maze generation",
      "Depth-first search algorithm",
      "Visual maze rendering",
      "Configurable maze sizes",
      "Step-by-step generation",
      "Interactive controls",
      "Algorithm demonstration",
    ],
    githubUrl: "https://github.com/Vaporjawn/Maze.JS",
    status: "Complete",
    lastUpdated: "2021",
    language: "JavaScript",
    difficulty: "Intermediate",
    priority: "Low",
  },
  {
    id: "traveling-salesman",
    title: "🗺️ Traveling Salesman Problem",
    description:
      "Self-Organizing Map (SOM) approach to solving the Traveling Salesman Problem in Python.",
    longDescription:
      "An innovative approach to the classic NP-hard Traveling Salesman Problem using Self-Organizing Maps (neural networks). Demonstrates advanced AI concepts and optimization techniques with visualization of the solution improvement process.",
    categories: [
      ProjectCategoryEnum.Python,
      ProjectCategoryEnum.AI,
      ProjectCategoryEnum.Algorithm,
      ProjectCategoryEnum.Visualization,
    ],
    technologies: [
      "Python",
      "NumPy",
      "Matplotlib",
      "Self-Organizing Maps",
      "Neural Networks",
      "Optimization Algorithms",
    ],
    features: [
      "Self-Organizing Map implementation",
      "TSP optimization solution",
      "Neural network approach",
      "Iterative improvement visualization",
      "City coordinate mapping",
      "Route optimization",
      "Performance analysis",
      "Educational AI demonstration",
    ],
    githubUrl: "https://github.com/Vaporjawn/Traveling-Salesman-Problem",
    status: "Complete",
    lastUpdated: "2021",
    language: "Python",
    difficulty: "Expert",
    priority: "Medium",
  },
  {
    id: "esperanta-klavaro",
    title: "🌍 Esperanta Klavaro",
    description:
      "Custom iOS keyboard extension for typing Esperanto characters in Swift.",
    longDescription:
      "A specialized iOS keyboard extension that provides native support for the Esperanto alphabet, including special characters like ĉ, ĝ, ĵ, etc. Demonstrates iOS extension development and linguistic application design.",
    categories: [
      ProjectCategoryEnum.Mobile,
      ProjectCategoryEnum.Utility,
      ProjectCategoryEnum.Educational,
    ],
    technologies: [
      "Swift",
      "iOS Keyboard Extension",
      "Interface Builder",
      "iOS Frameworks",
      "Unicode Support",
    ],
    features: [
      "Full Esperanto alphabet support",
      "iOS keyboard extension",
      "Custom character input",
      "QWERTY/Esperanto mode toggle",
      "Native iOS integration",
      "Linguistic accessibility",
      "Swift programming",
    ],
    githubUrl: "https://github.com/Vaporjawn/Esperanta-Klavaro",
    status: "Archived",
    lastUpdated: "2020",
    language: "Swift",
    difficulty: "Intermediate",
    priority: "Low",
  },
  {
    id: "flappy-bird-clone",
    title: "🐦 Flappy-O",
    description:
      "Browser-based Flappy Bird clone built with HTML5 Canvas and JavaScript.",
    longDescription:
      "A faithful recreation of the popular Flappy Bird mobile game for web browsers. Features smooth physics, collision detection, and responsive controls using only vanilla JavaScript and HTML5 Canvas.",
    categories: [
      ProjectCategoryEnum.Game,
      ProjectCategoryEnum.JavaScript,
      ProjectCategoryEnum.Web,
    ],
    technologies: [
      "JavaScript",
      "HTML5 Canvas",
      "CSS",
      "Game Physics",
      "Collision Detection",
    ],
    features: [
      "Flappy Bird gameplay mechanics",
      "HTML5 Canvas rendering",
      "Physics simulation (gravity/jump)",
      "Collision detection system",
      "Score tracking",
      "Game over/restart functionality",
      "Responsive controls",
      "Browser compatibility",
    ],
    githubUrl: "https://github.com/Vaporjawn/Flappy-O",
    status: "Complete",
    lastUpdated: "2021",
    language: "JavaScript",
    difficulty: "Beginner",
    priority: "Low",
  },
  {
    id: "black-hole-visualization",
    title: "🕳️ Black Hole Visualization",
    description:
      "p5.js visualization of light bending around a black hole using gravitational lensing principles.",
    longDescription:
      "An educational physics simulation that demonstrates how light paths bend around massive objects like black holes. Implements gravitational lensing effects and provides an interactive way to understand general relativity concepts.",
    categories: [
      ProjectCategoryEnum.Visualization,
      ProjectCategoryEnum.JavaScript,
      ProjectCategoryEnum.Educational,
      ProjectCategoryEnum.AI,
    ],
    technologies: [
      "p5.js",
      "JavaScript",
      "Physics Simulation",
      "Gravitational Lensing",
      "Mathematical Modeling",
    ],
    features: [
      "Gravitational lensing simulation",
      "Interactive physics demonstration",
      "Real-time light path calculation",
      "Educational visualization",
      "Parameter adjustment controls",
      "Scientific accuracy",
      "p5.js graphics rendering",
    ],
    githubUrl: "https://github.com/Vaporjawn/Black-Hole-Visualization",
    status: "Complete",
    lastUpdated: "2021",
    language: "JavaScript",
    difficulty: "Advanced",
    priority: "Medium",
  },
  {
    id: "node-rest-api",
    title: "🔌 Node REST API",
    description:
      "RESTful API example built in Node.js for technical presentation and demonstration.",
    longDescription:
      "A comprehensive REST API built with Node.js and Express, demonstrating best practices for API design, CRUD operations, and HTTP protocol implementation. Created for educational purposes and technical presentations.",
    categories: [
      ProjectCategoryEnum.NodeJS,
      ProjectCategoryEnum.API,
      ProjectCategoryEnum.JavaScript,
      ProjectCategoryEnum.Educational,
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "JavaScript",
      "REST API",
      "HTTP Protocol",
      "JSON",
    ],
    features: [
      "RESTful API architecture",
      "CRUD operations implementation",
      "Express.js framework",
      "HTTP status code handling",
      "JSON data formatting",
      "API endpoint documentation",
      "Error handling middleware",
      "Technical presentation material",
    ],
    githubUrl: "https://github.com/Vaporjawn/Node-REST-API",
    status: "Complete",
    lastUpdated: "2022",
    language: "JavaScript",
    difficulty: "Intermediate",
    priority: "Medium",
  },
];

export const getProjectsByCategory = (categories: string[]): Project[] => {
  if (categories.length === 0) return projectsData;

  return projectsData.filter((project) =>
    categories.some((category) => project.categories.includes(category as ProjectCategory))
  );
};

export const getProjectsByDifficulty = (difficulty: string): Project[] => {
  return projectsData.filter((project) => project.difficulty === difficulty);
};

export const getProjectsByStatus = (status: string): Project[] => {
  return projectsData.filter((project) => project.status === status);
};

export const getProjectsByPriority = (priority: string): Project[] => {
  return projectsData.filter((project) => project.priority === priority);
};

export const getFeaturedProjects = (): Project[] => {
  return projectsData.filter((project) => project.priority === "High");
};

export const searchProjects = (query: string): Project[] => {
  const lowercaseQuery = query.toLowerCase();
  return projectsData.filter(
    (project) =>
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(lowercaseQuery)
      ) ||
      project.categories.some((cat) =>
        cat.toLowerCase().includes(lowercaseQuery)
      )
  );
};
