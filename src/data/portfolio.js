export const CONFIG = {
  cvUrl: "/ES-SERRAR-ACHRAF-CV.pdf",
  supabase: {
    url: "https://rsvwqhimmjzzpwyivllj.supabase.co",
    anonKey: "sb_publishable_LVwnRIngVC1kxFsAkuHmAQ__-M9Dc89",
    table: "contact_messages",
    contactEmailFunction: "send-contact-email",
  },
};

export const profile = {
  name: "Achraf Es-serrar",
  role: "Étudiant Ingénieur en Génie Informatique",
  location: "Tétouan, Maroc",
  email: "esserrar.achraf@gmail.com",
  phone: "+212 620 830 449",
  phoneRaw: "+212620830449",
  github: "https://github.com/achrafes20",
  githubHandle: "/achrafes20",
  linkedin: "https://linkedin.com/in/achraf-es-serrar-300bb2279",
  linkedinHandle: "/in/achraf-es-serrar",
  tagline:
    "Passionné par le développement de solutions innovantes et l'optimisation des systèmes. Je combine créativité et expertise technique pour transformer des idées en réalité numérique.",
  aboutIntro:
    "Ingénieur en informatique passionné par le développement de solutions innovantes et l'optimisation des systèmes.",
  about: [
    "Étudiant en 4ème année de Génie Informatique à l'ENSA de Tétouan, je me spécialise dans le développement logiciel et l'architecture des systèmes.",
    "Mon parcours m'a permis d'acquérir une expertise solide dans les technologies modernes du web, les bases de données et les méthodologies DevOps.",
    "Je suis particulièrement intéressé par l'intelligence artificielle, les systèmes distribués et les bonnes pratiques d'ingénierie logicielle.",
  ],
  footer:
    "Ingénieur en Génie Informatique passionné par l'innovation technologique et le développement de solutions digitales performantes.",
};

export const navLinks = [
  { label: "Accueil", href: "#home" },
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Expérience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: "12+", label: "Projets réalisés" },
  { value: "8+", label: "Technologies maîtrisées" },
  { value: "2+", label: "Années d'expérience" },
];

export const skills = [
  {
    key: "development",
    title: "Développement",
    description: "Java, Python, C, JavaScript, TypeScript",
  },
  {
    key: "web",
    title: "Technologies Web",
    description: "React, Angular, Node.js, Laravel, ASP.NET",
  },
  {
    key: "database",
    title: "Bases de données",
    description: "MySQL, MongoDB, PostgreSQL, SQL Server",
  },
  {
    key: "infrastructure",
    title: "Infrastructure",
    description: "Docker, Git, Linux, AWS, CI/CD",
  },
  {
    key: "mobile",
    title: "Développement Mobile",
    description: "Flutter, Dart, Riverpod, Supabase",
  },
  {
    key: "ai",
    title: "IA & Data",
    description: "Python, XGBoost, FastAPI, Streamlit, Scikit-learn",
  },
  {
    key: "systems",
    title: "Backend & Systèmes",
    description: "Spring Boot, JavaFX, WebSocket, TCP/TLS, UDP, JDBC",
  },
];

export const filters = [
  { id: "all", label: "Tous les projets" },
  { id: "web", label: "Web" },
  { id: "desktop", label: "Desktop" },
  { id: "game", label: "Jeux" },
  { id: "ml", label: "IA / ML" },
  { id: "mobile", label: "Mobile" },
];

export const projects = [
  {
    id: "nutrition-risk-classifier",
    title: "Nutrition Risk Classifier",
    category: "ml",
    badge: "XGBoost",
    description:
      "Solution complète de Machine Learning pour détecter les produits alimentaires à haut risque nutritionnel à partir des données Open Food Facts, avec API FastAPI, interface Streamlit et déploiement Docker.",
    tech: ["Python", "XGBoost", "FastAPI", "Streamlit", "Docker"],
    repo: "https://hub.docker.com/r/achrafes20/nutrition-risk-classifier",
    linkType: "docker",
    images: [
      "/images/Nutrition Risk Classifier/img 1.png",
      "/images/Nutrition Risk Classifier/img 2.png",
    ],
  },
  {
    id: "agileflow",
    title: "AgileFlow - Gestion de Projets Agiles",
    category: "web",
    badge: "Spring Boot",
    description:
      "Plateforme full-stack de gestion de projets agiles inspirée de Jira, avec planning, Kanban, diagrammes collaboratifs, chronologie Gantt, rôles, chat temps réel et intégration GitHub.",
    tech: ["Spring Boot", "React", "TypeScript", "MySQL", "WebSocket"],
    repo: "https://github.com/achrafes20/AgileFlow-Demo",
    images: [
      "/images/AgileFlow/img 1.png",
      "/images/AgileFlow/img 2.png",
      "/images/AgileFlow/img 3.png",
      "/images/AgileFlow/img 4.png",
      "/images/AgileFlow/img 5.png",
      "/images/AgileFlow/img 6.png",
      "/images/AgileFlow/img 7.png",
      "/images/AgileFlow/img 8.png",
      "/images/AgileFlow/img 9.png",

    ],
  },
  {
    id: "giftplan",
    title: "GiftPlan - Cadeaux Collaboratifs",
    category: "mobile",
    badge: "Flutter",
    description:
      "Application mobile collaborative pour organiser des cadeaux de groupe, créer des listes partagées et suivre en temps réel les contributions vers les objectifs de financement.",
    tech: ["Flutter", "Dart", "Riverpod", "Supabase", "PostgreSQL"],
    repo: "https://github.com/Houssam265/application-mobile-GIFT-PLANNING-",
    images: [
      "/images/GiftPlan/image 3.png",
      "/images/GiftPlan/image 1.png",
      "/images/GiftPlan/image 2.png",
    ],
  },
  {
    id: "chrionline",
    title: "ChriOnline - Application E-commerce Desktop",
    category: "desktop",
    badge: "JavaFX",
    description:
      "Application e-commerce JavaFX en architecture client-serveur, avec échanges JSON sur TCP/TLS, notifications UDP, paiement simulé sécurisé et administration des produits, commandes et utilisateurs.",
    tech: ["Java", "JavaFX", "TCP/TLS", "UDP", "MySQL"],
    repo: "https://github.com/Houssam265/Application-JAVA-E-Commerce-ChriOnline-",
    images: [
      "/images/ChriOnline/img 1.png",
      "/images/ChriOnline/img 2.png",
      "/images/ChriOnline/img 3.png",
    ],
  },
  {
    id: "ecommerce",
    title: "Plateforme E-commerce Coopérative Marocaine",
    category: "web",
    badge: "ASP.NET",
    description:
      "Application web ASP.NET complète pour une coopérative marocaine avec gestion produits, commandes, clients, panier et dashboard administrateur.",
    tech: ["ASP.NET", "C#", "SQL Server", "Entity Framework"],
    repo: "https://github.com/achrafes20/Projet-E-commerce-Cooperative",
    images: [
      "/images/ecommerce/img1.png",
      "/images/ecommerce/img2.png",
      "/images/ecommerce/img3.png",
    ],
  },
  {
    id: "espace-etudiant",
    title: "Espace Étudiant - Gestion des Services",
    category: "web",
    badge: "Node.js",
    description:
      "Plateforme web pour centraliser les demandes administratives des étudiants avec traitement automatisé côté administration.",
    tech: ["Node.js", "React", "MySQL", "JWT"],
    repo: "https://github.com/achrafes20/Espace-Etudiant",
    images: [
      "/images/espace_etudiant/img1.png",
      "/images/espace_etudiant/img2.png",
      "/images/espace_etudiant/img3.png",
      "/images/espace_etudiant/img4.png",
      "/images/espace_etudiant/img5.png",
      "/images/espace_etudiant/img6.png",
      "/images/espace_etudiant/img7.png",
      "/images/espace_etudiant/img8.png",
    ],
  },
  {
    id: "servicepro",
    title: "ServicePro App",
    category: "web",
    badge: "Laravel",
    description:
      "Application Laravel pour la gestion des services de plomberie et maintenance de piscines. Plateforme complète de mise en relation clients/prestataires.",
    tech: ["Laravel", "PHP", "MySQL", "Composer"],
    repo: "https://github.com/achrafes20/ServicePro-app",
    images: [
      "/images/servicepro/img1.png",
      "/images/servicepro/img2.png",
      "/images/servicepro/img3.png",
      "/images/servicepro/img4.png",
      "/images/servicepro/img5.png",
    ],
  },
  {
    id: "foot",
    title: "Système de Réservation Terrains de Foot",
    category: "web",
    badge: "PHP",
    description:
      "Application web pour la gestion des réservations de terrains avec vérification de disponibilité en temps réel et génération automatique de factures.",
    tech: ["PHP", "MySQL", "JavaScript", "AJAX"],
    repo: "https://github.com/AmineElBiyadi/MiniProject_2",
    images: [
      "/images/foot/img1.png",
      "/images/foot/img2.png",
      "/images/foot/img3.png",
      "/images/foot/img4.png",
    ],
  },
  {
    id: "campus-events",
    title: "Campus Events Management System",
    category: "web",
    badge: "PHP",
    description:
      "Application PHP/MySQL pour la gestion des événements étudiants avec système de rôles, vérification email et attestations PDF automatisées.",
    tech: ["PHP", "MySQL", "JavaScript", "Dompdf"],
    repo: "https://github.com/achrafes20/Campus-Events",
    images: [
      "/images/event/img1.png",
      "/images/event/img2.png",
      "/images/event/img3.png",
      "/images/event/img4.png",
    ],
  },
  {
    id: "pharmacie",
    title: "Gestion Pharmacie - Application Windows Forms",
    category: "desktop",
    badge: ".NET",
    description:
      "Application complète de gestion de pharmacie avec .NET Windows Forms et SQL Server. Alertes de péremption et impressions de documents.",
    tech: ["C#", ".NET", "Windows Forms", "SQL Server"],
    repo: "https://github.com/achrafes20/Gestion-Pharmacie",
    images: [
      "/images/gestion_pharmacie/img1.png",
      "/images/gestion_pharmacie/img2.png",
      "/images/gestion_pharmacie/img3.png",
      "/images/gestion_pharmacie/img4.png",
      "/images/gestion_pharmacie/img5.png",
      "/images/gestion_pharmacie/img6.png",
      "/images/gestion_pharmacie/img7.png",
    ],
  },
  {
    id: "gaming-store",
    title: "Gaming Store",
    category: "web",
    badge: "Laravel",
    description:
      "Boutique en ligne moderne pour jeux vidéo développée avec Laravel. Interface dynamique avec gestion des comptes administrateurs et utilisateurs.",
    tech: ["Laravel", "PHP", "MySQL", "Composer"],
    repo: "https://github.com/achrafes20/Gaming_store",
    images: [
      "/images/gaming_store/img1.png",
      "/images/gaming_store/img2.png",
      "/images/gaming_store/img3.png",
      "/images/gaming_store/img4.png",
    ],
  },
  {
    id: "space-defender",
    title: "Space Defender Game",
    category: "game",
    badge: "Java",
    description:
      "Jeu de tir spatial en Java avec versions mono-joueur et multijoueur. Contrôle du vaisseau, animations et communication réseau via sockets TCP.",
    tech: ["Java", "JavaFX", "Sockets TCP", "JDBC"],
    repo: "https://github.com/achrafes20/Space_Defender_Game",
    images: [
      "/images/space_defender_game/game_icon.png",
      "/images/space_defender_game/img1.png",
      "/images/space_defender_game/img2.png",
      "/images/space_defender_game/img3.png",
    ],
  },
  {
    id: "salle-sport",
    title: "Système de Gestion de Salle de Sport",
    category: "web",
    badge: "Docker",
    description:
      "Application microservices avec conteneurisation Docker pour la gestion complète d'une salle de sport (membres, planning, paiements).",
    tech: ["Docker", "Laravel", "Angular", "MySQL"],
    repo: "https://github.com/achrafes20/Gestion-Salle-Sport",
    images: ["/images/fitness/img1.png", "/images/fitness/img2.png"],
  },
  {
    id: "can-2025",
    title: "Site Web CAN 2025 - Portail Officiel",
    category: "web",
    badge: "HTML/CSS",
    description:
      "Portail web complet et réactif présentant la Coupe d'Afrique des Nations 2025 au Maroc. Développé en équipe de 5 avec HTML, CSS et JavaScript.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    repo: "https://github.com/achrafes20/Developpement_web",
    images: [
      "/images/can/img1.png",
      "/images/can/img2.png",
      "/images/can/img3.png",
      "/images/can/img4.png",
      "/images/can/img5.png",
      "/images/can/img6.png",
      "/images/can/img7.png",
    ],
  },
  {
    id: "automate",
    title: "Projet Automate",
    category: "desktop",
    badge: "C",
    description:
      "Implémentation en C d'automates finis (AFD/AFN) avec opérations avancées : union, concaténation, étoile de Kleene, déterminisation et minimisation.",
    tech: ["C", "Algorithms", "Théorie Langages"],
    repo: "https://github.com/achrafes20/Projet-Automate",
    images: ["/images/automate/img1.png", "/images/automate/img2.png"],
  },
  {
    id: "gestion-etudiants",
    title: "Système de Gestion des Étudiants",
    category: "desktop",
    badge: "C",
    description:
      "Application complète en C pour gérer une base de données d'étudiants avec recherche, modification, tri, calcul de moyennes et génération de rapports.",
    tech: ["C", "Structures", "Fichiers", "QuickSort"],
    repo: "https://github.com/achrafes20/Gestionnaire-Etudiants",
    images: ["/images/etudiants_c/img1.png"],
  },
];

export const timeline = [
  {
    type: "formation",
    date: "2022 - Présent",
    title: "Diplôme d'ingénieur d'État en Génie Informatique",
    place: "École Nationale des Sciences Appliquées, Tétouan",
    description:
      "Formation approfondie en architecture logicielle, bases de données, réseaux et systèmes d'information. Acquisition de compétences en développement web, intelligence artificielle et ingénierie logicielle.",
    tech: ["Architecture Logicielle", "Bases de Données", "Réseaux", "IA"],
  },
  {
    type: "work",
    date: "Juin - Août 2025",
    title: "Stage en Développement Web Full-Stack",
    place: "NAJA7HOST - Tétouan",
    description:
      "Conception et développement d'une application web d'e-commerce complète avec gestion des produits, commandes, panier et utilisateurs. Interface d'administration moderne et responsive.",
    techLabel: "Environnement technique :",
    tech: ["Laravel", "Tailwind CSS", "JavaScript", "MySQL"],
  },
  {
    type: "school",
    date: "2021 - 2022",
    title: "Baccalauréat en Sciences Physiques et Chimiques",
    place: "Lycée Mohamed El-Mekki Naciri, Tétouan",
    description:
      "Option française. Mention Très Bien. Formation scientifique approfondie préparant aux études d'ingénierie.",
    tech: [],
  },
];
