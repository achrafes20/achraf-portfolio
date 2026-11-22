// Données structurelles du portfolio (liens, technologies, images, catégories).
// Tous les textes affichés (titres, descriptions, dates, rôles) sont dans
// src/translations.js, indexés par le même identifiant : une seule source par texte.

export const profile = {
  name: "Achraf Es-serrar",
  email: "esserrar.achraf@gmail.com",
  phone: "+212 620 830 449",
  phoneRaw: "+212620830449",
  github: "https://github.com/achrafes20",
  githubHandle: "/achrafes20",
  linkedin: "https://linkedin.com/in/achraf-es-serrar-300bb2279",
  linkedinHandle: "/in/achraf-es-serrar",
};

export const sectionIds = ["home", "about", "projects", "experience", "certifications", "contact"];

// Les technologies sont des noms propres : identiques en français et en anglais.
export const skills = [
  { key: "development", items: "Java, Python, TypeScript, JavaScript, C, C#, PHP, Dart" },
  { key: "web", items: "React, Angular, Node.js, Laravel, ASP.NET, Tailwind CSS" },
  { key: "systems", items: "Spring Boot, Spring Security, RabbitMQ, Kafka, WebSocket, TCP/TLS" },
  { key: "infrastructure", items: "Docker, Kubernetes, Argo CD, GitHub Actions, Prometheus, Grafana, Loki" },
  { key: "database", items: "PostgreSQL, MySQL, MongoDB, SQL Server, Oracle, Supabase" },
  { key: "ai", items: "Python, XGBoost, scikit-learn, pandas, FastAPI, Streamlit" },
  { key: "mobile", items: "Flutter, Dart, Riverpod, Supabase" },
];

export const filters = ["all", "web", "desktop", "game", "ml", "mobile"];

export const projects = [
  {
    id: "nutrition-risk-classifier",
    category: "ml",
    badge: "XGBoost",
    tech: ["Python", "XGBoost", "scikit-learn", "FastAPI", "Streamlit", "Docker"],
    repo: "https://hub.docker.com/r/achrafes20/nutrition-risk-classifier",
    linkType: "docker",
    images: [
      "/images/nutrition-risk-classifier/img-1.webp",
      "/images/nutrition-risk-classifier/img-2.webp",
    ],
  },
  {
    id: "agileflow",
    category: "web",
    badge: "Spring Boot",
    tech: ["Spring Boot", "React", "TypeScript", "MySQL", "WebSocket", "Material UI"],
    repo: "https://github.com/Houssam265/AgileFlow",
    images: Array.from({ length: 9 }, (_, index) => `/images/agileflow/img-${index + 1}.webp`),
  },
  {
    id: "sgitu",
    category: "web",
    badge: "Spring Security",
    tech: ["Java", "Spring Boot", "Spring Security", "Gateway", "Kafka", "Redis", "Docker", "Kubernetes"],
    repo: "https://github.com/Houssam265/SGITU-Microservices",
    images: [
      "/images/sgitu/grafana-global-dashboard.webp",
      "/images/sgitu/prometheus-targets-all-up.webp",
      "/images/sgitu/prometheus-targets-all-up2.webp",
    ],
  },
  {
    id: "giftplan",
    category: "mobile",
    badge: "Flutter",
    tech: ["Flutter", "Dart", "Riverpod", "Supabase", "PostgreSQL"],
    repo: "https://github.com/Houssam265/application-mobile-GIFT-PLANNING-",
    images: [
      "/images/giftplan/image-3.webp",
      "/images/giftplan/image-1.webp",
      "/images/giftplan/image-2.webp",
    ],
  },
  {
    id: "chrionline",
    category: "desktop",
    badge: "JavaFX",
    tech: ["Java", "JavaFX", "TCP/TLS", "UDP", "MySQL"],
    repo: "https://github.com/Houssam265/Application-JAVA-E-Commerce-ChriOnline-",
    images: [
      "/images/chrionline/img-1.webp",
      "/images/chrionline/img-2.webp",
      "/images/chrionline/img-3.webp",
    ],
  },
  {
    id: "ecommerce",
    category: "web",
    badge: "ASP.NET",
    tech: ["ASP.NET", "C#", "SQL Server", "Entity Framework"],
    repo: "https://github.com/Houssam265/Application-E-commerce--DotNet-",
    images: ["/images/ecommerce/img1.webp", "/images/ecommerce/img2.webp", "/images/ecommerce/img3.webp"],
  },
  {
    id: "espace-etudiant",
    category: "web",
    badge: "Node.js",
    tech: ["Node.js", "React", "MySQL", "JWT"],
    repo: "https://github.com/achrafes20/projet-espace-etudiant",
    images: Array.from({ length: 8 }, (_, index) => `/images/espace-etudiant/img${index + 1}.webp`),
  },
  {
    id: "servicepro",
    category: "web",
    badge: "Laravel",
    tech: ["Laravel", "PHP", "MySQL", "Composer"],
    repo: "https://github.com/achrafes20/ServicePro-app",
    images: Array.from({ length: 5 }, (_, index) => `/images/servicepro/img${index + 1}.webp`),
  },
  {
    id: "foot",
    category: "web",
    badge: "PHP",
    tech: ["PHP", "MySQL", "JavaScript", "AJAX"],
    repo: "https://github.com/AmineElBiyadi/MiniProject_2",
    images: Array.from({ length: 4 }, (_, index) => `/images/foot/img${index + 1}.webp`),
  },
  {
    id: "campus-events",
    category: "web",
    badge: "PHP",
    tech: ["PHP", "MySQL", "JavaScript", "Dompdf"],
    repo: "https://github.com/Taha7486/Mini-Projet",
    images: Array.from({ length: 4 }, (_, index) => `/images/event/img${index + 1}.webp`),
  },
  {
    id: "pharmacie",
    category: "desktop",
    badge: ".NET",
    tech: ["C#", ".NET", "Windows Forms", "SQL Server"],
    repo: "https://github.com/achrafes20/Gestion-Pharmacie",
    images: Array.from({ length: 7 }, (_, index) => `/images/gestion-pharmacie/img${index + 1}.webp`),
  },
  {
    id: "gaming-store",
    category: "web",
    badge: "Laravel",
    tech: ["Laravel", "PHP", "MySQL", "Composer"],
    repo: "https://github.com/achrafes20/Gaming_store",
    images: Array.from({ length: 4 }, (_, index) => `/images/gaming-store/img${index + 1}.webp`),
  },
  {
    id: "space-defender",
    category: "game",
    badge: "Java",
    tech: ["Java", "JavaFX", "Sockets TCP", "JDBC"],
    repo: "https://github.com/achrafes20/Space_Defender_Game",
    images: [
      "/images/space-defender-game/game-icon.webp",
      "/images/space-defender-game/img1.webp",
      "/images/space-defender-game/img2.webp",
      "/images/space-defender-game/img3.webp",
    ],
  },
  {
    id: "salle-sport",
    category: "web",
    badge: "Docker",
    tech: ["Docker", "Laravel", "Angular", "MySQL"],
    repo: "https://github.com/achrafes20/projet-web",
    images: ["/images/fitness/img1.webp", "/images/fitness/img2.webp"],
  },
  {
    id: "can-2025",
    category: "web",
    badge: "HTML/CSS",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    repo: "https://github.com/achrafes20/Developpement_web",
    images: Array.from({ length: 7 }, (_, index) => `/images/can/img${index + 1}.webp`),
  },
  {
    id: "automate",
    category: "desktop",
    badge: "C",
    repo: "https://github.com/achrafes20/Projet-Automate",
    images: ["/images/automate/img1.webp", "/images/automate/img2.webp"],
  },
  {
    id: "gestion-etudiants",
    category: "desktop",
    badge: "C",
    repo: "https://github.com/achrafes20/Gestionnaire-Etudiants",
    images: ["/images/etudiants-c/img1.webp"],
  },
];

// Ordre antichronologique. Les textes sont dans translations.js -> experience.items[type].
export const timeline = [
  { type: "formation", icon: "graduation" },
  {
    type: "pfa",
    icon: "briefcase",
    tech: ["Spring Boot", "Spring Security", "React", "TypeScript", "PostgreSQL", "Tailwind CSS", "n8n"],
  },
  {
    type: "work",
    icon: "briefcase",
    tech: ["Laravel 12", "RabbitMQ", "Docker", "Kubernetes", "Argo CD", "Prometheus", "Grafana", "Loki", "Gemini API"],
  },
  { type: "school", icon: "school" },
];

// Nombre d'expériences en entreprise, calculé à partir de la chronologie.
export const PROFESSIONAL_EXPERIENCES = timeline.filter((item) => item.icon === "briefcase").length;

export const certifications = [
  {
    id: "ibm-devops",
    title: "IBM Applied DevOps Engineering",
    issuer: "IBM / Coursera",
    link: "https://coursera.org/share/c24ebd77981cf8828665d32987f161b0",
    skills: [
      "OpenShift",
      "CI/CD",
      "Infrastructure as Code (IaC)",
      "OWASP",
      "Test Driven Development (TDD)",
      "Agile Software Development",
      "Grafana",
    ],
    images: [
      "/images/certifications/ibm-devops-global.webp",
      ...Array.from({ length: 9 }, (_, index) => `/images/certifications/ibm-devops-${index + 1}.webp`),
    ],
  },
  {
    id: "machine-learning",
    title: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM / Coursera",
    link: "https://coursera.org/share/92e680d8213d94b61e0f64a14b956acd",
    skills: [
      "Exploratory Data Analysis",
      "Feature Engineering",
      "Data Cleansing",
      "Statistical Hypothesis Testing",
      "Statistical Inference",
      "Machine Learning",
      "Data Science",
    ],
    images: ["/images/certifications/ml-certificate.webp"],
  },
  {
    id: "sap-professional-fundamentals",
    title: "SAP Professional Fundamentals",
    issuer: "SAP / Coursera",
    // À compléter avec le lien de partage Coursera (« Partager le certificat »).
    // L'ancien lien (…/home/welcome) n'était accessible qu'au compte inscrit.
    link: null,
    skills: [
      "SAP Ecosystem",
      "Business Transformation",
      "Technical Consulting",
      "Project Management",
      "Agile",
      "Design Thinking",
      "Systems Thinking",
    ],
    images: ["/images/certifications/sap.webp"],
  },
];
