// Tous les textes du site, en français et en anglais.
// Les clés de projects.items et experience.items correspondent aux identifiants de src/data/portfolio.js.
// Champ optionnel d'un projet : "tech" (si les tags se traduisent).

export const translations = {
  fr: {
    meta: {
      title: "Achraf Es-serrar — Élève ingénieur Full-Stack & DevOps",
      description:
        "Portfolio d'Achraf Es-serrar, élève ingénieur en Génie Informatique (ENSA Tétouan) spécialisé en Full-Stack, DevOps et microservices. Recherche un PFE de 6 mois dès janvier ou février 2027.",
    },
    nav: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      experience: "Expérience",
      certifications: "Certifications",
      contact: "Contact",
    },
    hero: {
      greeting: "Bonjour, je suis",
      subtitle: "Élève ingénieur Full-Stack & DevOps",
      description:
        "Spécialisé en développement Full-Stack, architectures microservices, déploiement conteneurisé et observabilité.",
      projectsButton: "Voir mes projets",
      cvButton: "Télécharger mon CV",
      statsLabel: "Chiffres clés",
      stats: { projects: "Projets réalisés", technologies: "Technologies", experiences: "Expériences en entreprise" },
    },
    about: {
      title: "À propos de moi",
      bio: [
        "Étudiant en 5ᵉ année de Génie Informatique à l’ENSA de Tétouan (diplôme prévu en 2027), je conçois des applications web modernes, des architectures microservices sécurisées et des solutions cloud⁠-⁠native.",
        "Chez HB Développement, j’ai conçu de bout en bout un SIRH avec Spring Boot et React. Chez NAJA7HOST, j’ai bâti une architecture de microservices Laravel déployée en GitOps sur Kubernetes avec Argo CD, et supervisée avec Prometheus, Grafana et Loki.",
        "Je m’intéresse particulièrement aux systèmes distribués, à l’intelligence artificielle, à l’ingénierie DevOps et aux technologies SAP. Je recherche un PFE de six mois à partir de janvier ou février 2027.",
      ],
      skillsLabel: "Compétences techniques",
      skillTitles: {
        development: "Langages",
        web: "Technologies Web",
        systems: "Backend & Systèmes",
        database: "Bases de données",
        infrastructure: "DevOps & Cloud native",
        ai: "IA & Data",
        mobile: "Développement Mobile",
        sap: "SAP",
      },
    },
    projects: {
      title: "Mes Projets",
      subtitle:
        "Découvrez mes réalisations techniques mettant en œuvre mes compétences en développement et architecture logicielle.",
      filterLabel: "Filtrer les projets par catégorie",
      filters: {
        all: "Tous les projets",
        web: "Web",
        desktop: "Desktop",
        game: "Jeux",
        ml: "IA / ML",
        mobile: "Mobile",
      },
      sourceCode: "Code source",
      dockerHub: "Docker Hub",
      countLabel: "projets techniques",
      countText: "réalisés en Java, C, Laravel, Node.js, ASP.NET et autres technologies",
      previousImage: "Image précédente",
      nextImage: "Image suivante",
      projectImages: "Images du projet",
      image: "Image",
      enlarge: "Agrandir les images du projet",
      details: "Détails",
      detailsLabel: "Voir la description complète et les captures",
      items: {
        interntrack: {
          title: "InternTrack - Gestion des Stages & PFE",
          summary: "Plateforme .NET 10 de gestion des stages et PFE : workflow à états, conventions signées vérifiables par QR code, IA et audit immuable.",
          description:
            "Plateforme qui digitalise le cycle de vie des stages et PFE des ENSA : workflow à états (proposition, validation, stage, soutenance), conventions PDF signées par l'élève, l'école et l'entreprise, vérifiables par QR code et empreinte SHA-256, suivi hebdomadaire avec synthèse IA Gemini, planification des soutenances sans conflit et journal d'audit immuable. Clean Architecture .NET 10, tests xUnit et Testcontainers, CI/CD vers Azure.",
        },
        procureflow: {
          title: "ProcureFlow - Achats & Workflow SAP",
          summary: "Application SAP CAP et Fiori de validation des achats : contrôle budgétaire, risque fournisseur et approbation sur trois niveaux.",
          description:
            "Application SAP de validation des achats (Source-to-Pay) : backend SAP CAP et CDS exposant une API OData V4, interface SAPUI5 au design Fiori et autorisations par rôles. Demandes d'achat avec contrôle budgétaire, scoring du risque fournisseur et circuit d'approbation à trois niveaux jusqu'à la commande, intégration de l'API officielle S/4HANA Purchase Order et déploiement préparé sur SAP BTP (HANA Cloud, XSUAA). Tests node:test et Playwright.",
        },
        "nutrition-risk-classifier": {
          title: "Nutrition Risk Classifier",
          summary: "Pipeline ML de bout en bout classant le risque nutritionnel des aliments (Recall 0,94), servi par FastAPI, Streamlit et Docker.",
          description:
            "Pipeline de Machine Learning de bout en bout (méthode CRISP-DM) détectant les produits alimentaires à haut risque nutritionnel à partir des données Open Food Facts. Recall de 0,94 avec XGBoost, API FastAPI, interface Streamlit et packaging Docker.",
        },
        agileflow: {
          title: "AgileFlow - Gestion de Projets Agiles",
          summary: "Plateforme SaaS type Jira : Kanban, Gantt, diagrammes collaboratifs, chat temps réel et intégration GitHub.",
          description:
            "Plateforme SaaS full-stack de gestion de projets agiles inspirée de Jira : planning, Kanban, diagrammes collaboratifs, chronologie Gantt, rôles, chat temps réel et intégration GitHub.",
        },
        sgitu: {
          title: "SGITU - Sécurisation d’une Architecture Microservices",
          summary: "Backend microservices sécurisé : JWT, API Gateway vers neuf services, événements Kafka, cache Redis et supervision Grafana.",
          description:
            "Backend microservices sécurisé : authentification JWT, gestion des utilisateurs et des rôles, API Gateway centralisant le routage vers neuf microservices, communication événementielle Kafka, cache Redis et supervision Prometheus/Grafana.",
        },
        giftplan: {
          title: "GiftPlan - Cadeaux Collaboratifs",
          summary: "Application mobile Flutter pour organiser des cadeaux de groupe et suivre les contributions en temps réel.",
          description:
            "Application mobile collaborative pour organiser des cadeaux de groupe, créer des listes partagées et suivre en temps réel les contributions vers les objectifs de financement.",
        },
        chrionline: {
          title: "ChriOnline - Application E-commerce Desktop",
          summary: "E-commerce desktop JavaFX client-serveur avec échanges sécurisés TCP/TLS, notifications UDP et administration.",
          description:
            "Application e-commerce JavaFX en architecture client-serveur, avec échanges JSON sur TCP/TLS, notifications UDP, paiement simulé sécurisé et administration des produits, commandes et utilisateurs.",
        },
        ecommerce: {
          title: "Plateforme E-commerce Coopérative Marocaine",
          summary: "Boutique ASP.NET pour une coopérative marocaine : produits, panier, commandes et tableau de bord administrateur.",
          description:
            "Application web ASP.NET complète pour une coopérative marocaine avec gestion produits, commandes, clients, panier et dashboard administrateur.",
        },
        "espace-etudiant": {
          title: "Espace Étudiant - Gestion des Services",
          summary: "Portail Node.js et React centralisant les demandes administratives des étudiants, traitées par l'administration.",
          description:
            "Plateforme web pour centraliser les demandes administratives des étudiants avec traitement automatisé côté administration.",
        },
        servicepro: {
          title: "ServicePro App",
          summary: "Plateforme Laravel de mise en relation entre clients et prestataires de plomberie et d'entretien de piscines.",
          description:
            "Application Laravel pour la gestion des services de plomberie et maintenance de piscines. Plateforme complète de mise en relation clients/prestataires.",
        },
        foot: {
          title: "Système de Réservation Terrains de Foot",
          summary: "Réservation de terrains de foot en PHP avec disponibilités en temps réel et factures générées automatiquement.",
          description:
            "Application web pour la gestion des réservations de terrains avec vérification de disponibilité en temps réel et génération automatique de factures.",
        },
        "campus-events": {
          title: "Campus Events Management System",
          summary: "Gestion des événements étudiants en PHP : rôles, vérification email et attestations PDF automatiques.",
          description:
            "Application PHP/MySQL pour la gestion des événements étudiants avec système de rôles, vérification email et attestations PDF automatisées.",
        },
        pharmacie: {
          title: "Gestion Pharmacie - Application Windows Forms",
          summary: "Application Windows Forms et SQL Server de gestion de pharmacie, avec alertes de péremption et impressions.",
          description:
            "Application complète de gestion de pharmacie avec .NET Windows Forms et SQL Server. Alertes de péremption et impressions de documents.",
        },
        "gaming-store": {
          title: "Gaming Store",
          summary: "Boutique en ligne de jeux vidéo en Laravel, avec espaces client et administrateur.",
          description:
            "Boutique en ligne moderne pour jeux vidéo développée avec Laravel. Interface dynamique avec gestion des comptes administrateurs et utilisateurs.",
        },
        "space-defender": {
          title: "Space Defender Game",
          summary: "Jeu de tir spatial JavaFX, en solo ou en multijoueur réseau via sockets TCP.",
          description:
            "Jeu de tir spatial en Java avec versions mono-joueur et multijoueur. Contrôle du vaisseau, animations et communication réseau via sockets TCP.",
        },
        "salle-sport": {
          title: "Système de Gestion de Salle de Sport",
          summary: "Gestion d'une salle de sport en microservices Docker : membres, planning et paiements.",
          description:
            "Application microservices conteneurisée avec Docker pour la gestion complète d'une salle de sport (membres, planning, paiements).",
        },
        "can-2025": {
          title: "Portail CAN 2025 (projet académique)",
          summary: "Site web responsive sur la CAN 2025 au Maroc, réalisé en équipe de cinq.",
          description:
            "Site web réactif présentant la Coupe d'Afrique des Nations 2025 au Maroc, réalisé en équipe de 5 avec HTML, CSS, JavaScript et Bootstrap.",
        },
        automate: {
          title: "Projet Automate",
          summary: "Automates finis en C : union, concaténation, étoile de Kleene, déterminisation et minimisation.",
          description:
            "Implémentation en C d'automates finis (AFD/AFN) avec opérations avancées : union, concaténation, étoile de Kleene, déterminisation et minimisation.",
          tech: ["C", "Algorithmique", "Théorie des langages"],
        },
        "gestion-etudiants": {
          title: "Système de Gestion des Étudiants",
          summary: "Gestion d'étudiants en C : recherche, tri QuickSort, calcul des moyennes et rapports.",
          description:
            "Application complète en C pour gérer une base de données d'étudiants avec recherche, modification, tri, calcul de moyennes et génération de rapports.",
          tech: ["C", "Structures de données", "Fichiers", "QuickSort"],
        },
      },
    },
    experience: {
      title: "Expérience & Formation",
      subtitle: "Mon parcours académique et professionnel dans le domaine de l'informatique.",
      technicalEnvironment: "Environnement technique :",
      items: {
        formation: {
          date: "2022 – 2027",
          title: "Cycle ingénieur d'État en Génie Informatique",
          place: "École Nationale des Sciences Appliquées (ENSA), Tétouan",
          description:
            "Formation approfondie en architecture logicielle, bases de données, réseaux et systèmes d'information, avec des compétences pratiques en développement web, intelligence artificielle et ingénierie logicielle. Diplôme prévu en 2027.",
          tech: ["Architecture logicielle", "Bases de données", "Réseaux", "IA"],
        },
        pfa: {
          date: "Juillet – Août 2026",
          title: "Stage PFA – Ingénieur Logiciel Full-Stack (SIRH Mentora RH)",
          place: "HB Développement – Tétouan",
          description:
            "Conception et développement de bout en bout d'un SIRH web qui digitalise et automatise les processus RH : accès sécurisés (JWT hybride, RBAC), traçabilité des congés grâce au pattern Ledger, pointage BYOD par QR code avec détection d'anomalies et automatisation documentaire via n8n.",
        },
        work: {
          date: "Juillet – Août 2025",
          title: "Stage en Ingénierie Logicielle & DevOps",
          place: "NAJA7HOST – Tétouan",
          description:
            "Conception d'une architecture e-commerce de 6 microservices (Laravel 12, pattern BFF, événements RabbitMQ) intégrant un chatbot IA (Google Gemini) connecté aux données métier en temps réel. Supervision complète (Golden Signals sous Grafana, métriques Prometheus, logs Loki), sécurisation (JWT, OWASP) et déploiement GitOps sur Kubernetes avec Argo CD.",
        },
        school: {
          date: "2021 – 2022",
          title: "Baccalauréat en Sciences Physiques et Chimiques",
          place: "Lycée Mohamed El-Mekki Naciri, Tétouan",
          description:
            "Option française. Mention Très Bien. Formation scientifique approfondie préparant aux études d'ingénierie.",
        },
      },
    },
    certifications: {
      title: "Certifications",
      subtitle: "Certifications professionnelles validant mes compétences techniques.",
      viewCertificate: "Voir le certificat",
      imageAlt: "certificat",
      openImage: "Agrandir le certificat",
    },
    contact: {
      headerTitle: "Contactez-moi",
      headerSubtitle: "Disponible pour des opportunités de stage, projets ou collaborations techniques.",
      email: "Email",
      phone: "Téléphone",
      location: "Localisation",
      locationValue: "Tétouan, Maroc",
      copy: "Cliquez pour copier",
      emailCopied: "Email copié !",
      phoneCopied: "Numéro copié !",
      copyUnavailable: "Copie indisponible sur ce navigateur.",
      badge: "⚡ Disponible · Tétouan, Maroc",
      title: "Travaillons ensemble",
      subtitle: "Disponible pour stages, alternances et projets collaboratifs. N'hésitez pas à me contacter !",
      form: {
        nameLabel: "Nom complet",
        namePlaceholder: "Votre nom",
        emailLabel: "Email",
        emailPlaceholder: "votre@email.com",
        subjectLabel: "Sujet",
        subjectPlaceholder: "Stage · Collaboration · Question",
        messageLabel: "Message",
        messagePlaceholder: "Bonjour Achraf, je vous contacte au sujet de...",
        honeypotLabel: "Ne pas remplir ce champ",
        sending: "Envoi...",
        submit: "Envoyer le message",
        cv: "Télécharger CV",
        sendingStatus: "Envoi en cours...",
        success: "Message envoyé. Merci pour votre contact, je vous réponds rapidement.",
        successToast: "Message envoyé avec succès.",
        errorToast: "Le message n’a pas pu être envoyé.",
        errors: {
          captcha_required: "Merci de valider la vérification anti-robot avant l’envoi.",
          captcha_failed: "La vérification anti-robot a échoué. Merci de réessayer.",
          validation_error: "Certains champs sont invalides. Vérifiez votre saisie puis réessayez.",
          rate_limited:
            "Trop de messages envoyés depuis votre connexion. Réessayez dans une heure ou écrivez-moi directement par email.",
          origin_not_allowed: "Envoi refusé depuis cette adresse.",
          payload_too_large: "Votre message est trop long.",
          email_failed:
            "Votre message a bien été enregistré, mais la notification email a échoué. Je le lirai tout de même.",
          server_error:
            "Le service de messagerie est momentanément indisponible. Écrivez-moi directement à esserrar.achraf@gmail.com.",
          network_error: "Connexion impossible. Vérifiez votre réseau puis réessayez.",
        },
      },
    },
    footer: {
      description:
        "Élève ingénieur en Génie Informatique, passionné par l'innovation technologique et le développement de solutions digitales performantes.",
      navigation: "Navigation",
      rights: "Tous droits réservés.",
    },
    ui: {
      skipToContent: "Aller au contenu",
      downloadStarted: "Téléchargement du CV en cours...",
      changeThemeToDark: "Activer le thème sombre",
      changeThemeToLight: "Activer le thème clair",
      switchLanguage: "Switch to English",
      menu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      mainNavigation: "Navigation principale",
      backToTop: "Retour en haut",
      close: "Fermer",
      previousImage: "Image précédente",
      nextImage: "Image suivante",
      viewImage: "Voir l'image",
      projectImage: "Image",
      technologiesLabel: "Technologies maîtrisées",
      footerNavigation: "Navigation du pied de page",
      logoAlt: "Logo d'Achraf Es-serrar",
    },
  },
  en: {
    meta: {
      title: "Achraf Es-serrar — Full-Stack & DevOps Engineering Student",
      description:
        "Portfolio of Achraf Es-serrar, Computer Engineering student at ENSA Tétouan specializing in full-stack development, DevOps and microservices. Seeking a 6-month final-year internship from January or February 2027.",
    },
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      experience: "Experience",
      certifications: "Certifications",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I am",
      subtitle: "Full-Stack & DevOps Engineering Student",
      description:
        "Specialized in full-stack development, microservices architectures, containerized deployment, and observability.",
      projectsButton: "View my projects",
      cvButton: "Download my CV",
      statsLabel: "Key figures",
      stats: { projects: "Projects completed", technologies: "Technologies", experiences: "Industry internships" },
    },
    about: {
      title: "About me",
      bio: [
        "As a fifth-year Computer Engineering student at ENSA Tétouan (graduating in 2027), I build modern web applications, secure microservices architectures, and cloud⁠-⁠native solutions.",
        "At HB Développement, I designed and built an end-to-end HRIS with Spring Boot and React. At NAJA7HOST, I built a Laravel microservices architecture deployed with GitOps on Kubernetes using Argo CD, and monitored with Prometheus, Grafana, and Loki.",
        "I am particularly interested in distributed systems, artificial intelligence, DevOps engineering, and SAP technologies. I am seeking a six-month final-year internship starting in January or February 2027.",
      ],
      skillsLabel: "Technical skills",
      skillTitles: {
        development: "Languages",
        web: "Web Technologies",
        systems: "Backend & Systems",
        database: "Databases",
        infrastructure: "DevOps & Cloud native",
        ai: "AI & Data",
        mobile: "Mobile Development",
        sap: "SAP",
      },
    },
    projects: {
      title: "My Projects",
      subtitle: "Explore my technical projects showcasing my software development and architecture skills.",
      filterLabel: "Filter projects by category",
      filters: {
        all: "All projects",
        web: "Web",
        desktop: "Desktop",
        game: "Games",
        ml: "AI / ML",
        mobile: "Mobile",
      },
      sourceCode: "Source code",
      dockerHub: "Docker Hub",
      countLabel: "technical projects",
      countText: "built with Java, C, Laravel, Node.js, ASP.NET, and other technologies",
      previousImage: "Previous image",
      nextImage: "Next image",
      projectImages: "Project images",
      image: "Image",
      enlarge: "Enlarge project images",
      details: "Details",
      detailsLabel: "View the full description and screenshots",
      items: {
        interntrack: {
          title: "InternTrack - Internship & Final-Year Project Management",
          summary: ".NET 10 platform managing internships and final-year projects: state-machine workflow, QR-verifiable signed agreements, AI and immutable audit.",
          description:
            "Platform digitalizing the internship and final-year project lifecycle at ENSA schools: state-machine workflow (proposal, validation, internship, defense), PDF agreements signed by the student, school and company and verifiable by QR code and SHA-256 fingerprint, weekly reports with Gemini AI summaries, conflict-free defense scheduling, and an immutable audit log. .NET 10 Clean Architecture, xUnit and Testcontainers tests, CI/CD to Azure.",
        },
        procureflow: {
          title: "ProcureFlow - SAP Procurement & Approval Workflow",
          summary: "SAP CAP and Fiori purchase approval app: budget checks, supplier risk scoring, and a three-level approval workflow.",
          description:
            "SAP purchase approval application (Source-to-Pay): SAP CAP and CDS backend exposing an OData V4 API, SAPUI5 interface with Fiori design, and role-based authorization. Purchase requests with budget checks, supplier risk scoring, and a three-level approval workflow through to the purchase order, integration of the official S/4HANA Purchase Order API, and deployment prepared for SAP BTP (HANA Cloud, XSUAA). node:test and Playwright tests.",
        },
        "nutrition-risk-classifier": {
          title: "Nutrition Risk Classifier",
          summary: "End-to-end ML pipeline classifying food nutritional risk (0.94 recall), served with FastAPI, Streamlit, and Docker.",
          description:
            "End-to-end machine learning pipeline (CRISP-DM) detecting nutritionally high-risk food products from Open Food Facts data. 0.94 recall with XGBoost, FastAPI REST API, Streamlit interface, and Docker packaging.",
        },
        agileflow: {
          title: "AgileFlow - Agile Project Management",
          summary: "Jira-like SaaS platform: Kanban, Gantt, collaborative diagrams, real-time chat, and GitHub integration.",
          description:
            "Jira-inspired full-stack SaaS platform for agile project management featuring planning, Kanban, collaborative diagrams, a Gantt timeline, project roles, real-time chat, and GitHub integration.",
        },
        sgitu: {
          title: "SGITU - Securing a Microservices Architecture",
          summary: "Secure microservices backend: JWT, API Gateway to nine services, Kafka events, Redis caching, and Grafana monitoring.",
          description:
            "Secure microservices backend featuring JWT authentication, user and role management, an API Gateway centralizing routing to nine microservices, Kafka event-driven communication, Redis caching, and Prometheus/Grafana monitoring.",
        },
        giftplan: {
          title: "GiftPlan - Collaborative Group Gifts",
          summary: "Flutter mobile app to organize group gifts and track contributions in real time.",
          description:
            "Collaborative mobile application for organizing group gifts, creating shared wish lists, and tracking contributions toward funding goals in real time.",
        },
        chrionline: {
          title: "ChriOnline - Desktop E-commerce Application",
          summary: "Client-server JavaFX desktop e-commerce app with secure TCP/TLS exchanges, UDP notifications, and administration.",
          description:
            "Client-server JavaFX e-commerce application featuring JSON communication over TCP/TLS, UDP notifications, secure simulated payments, and product, order, and user administration.",
        },
        ecommerce: {
          title: "Moroccan Cooperative E-commerce Platform",
          summary: "ASP.NET store for a Moroccan cooperative: products, cart, orders, and admin dashboard.",
          description:
            "Complete ASP.NET web application for a Moroccan cooperative, including product, order, customer, cart, and admin dashboard management.",
        },
        "espace-etudiant": {
          title: "Student Portal - Services Management",
          summary: "Node.js and React portal centralizing student administrative requests for the administration to process.",
          description:
            "Web platform centralizing student administrative requests with automated processing for the administration.",
        },
        servicepro: {
          title: "ServicePro App",
          summary: "Laravel platform connecting customers with plumbing and pool maintenance providers.",
          description:
            "Laravel application for managing plumbing and pool maintenance services, connecting customers with service providers.",
        },
        foot: {
          title: "Football Field Booking System",
          summary: "PHP football field booking with real-time availability and automatic invoices.",
          description:
            "Web application for field bookings with real-time availability checks and automatic invoice generation.",
        },
        "campus-events": {
          title: "Campus Events Management System",
          summary: "PHP student events management: roles, email verification, and automatic PDF certificates.",
          description:
            "PHP/MySQL application for managing student events with roles, email verification, and automated PDF certificates.",
        },
        pharmacie: {
          title: "Pharmacy Management - Windows Forms Application",
          summary: "Windows Forms and SQL Server pharmacy management app with expiry alerts and printing.",
          description:
            "Complete pharmacy management application built with .NET Windows Forms and SQL Server, including expiry alerts and document printing.",
        },
        "gaming-store": {
          title: "Gaming Store",
          summary: "Laravel online video game store with customer and administrator areas.",
          description:
            "Modern online video game store built with Laravel, featuring a dynamic interface and administrator and customer account management.",
        },
        "space-defender": {
          title: "Space Defender Game",
          summary: "JavaFX space shooter, single-player or networked multiplayer over TCP sockets.",
          description:
            "Java space shooter with single-player and multiplayer modes, ship controls, animations, and TCP socket networking.",
        },
        "salle-sport": {
          title: "Fitness Center Management System",
          summary: "Dockerized microservices fitness center management: members, schedules, and payments.",
          description:
            "Dockerized microservices application for complete fitness center management, including members, schedules, and payments.",
        },
        "can-2025": {
          title: "AFCON 2025 Portal (academic project)",
          summary: "Responsive website about AFCON 2025 in Morocco, built by a team of five.",
          description:
            "Responsive website covering the 2025 Africa Cup of Nations in Morocco, built by a team of five with HTML, CSS, JavaScript, and Bootstrap.",
        },
        automate: {
          title: "Automata Project",
          summary: "Finite automata in C: union, concatenation, Kleene star, determinization, and minimization.",
          description:
            "C implementation of finite automata (DFA/NFA) with union, concatenation, Kleene star, determinization, and minimization operations.",
          tech: ["C", "Algorithms", "Language Theory"],
        },
        "gestion-etudiants": {
          title: "Student Management System",
          summary: "Student management in C: search, QuickSort sorting, averages, and reports.",
          description:
            "Complete C application for managing a student database with search, editing, sorting, average calculation, and report generation.",
          tech: ["C", "Data Structures", "Files", "QuickSort"],
        },
      },
    },
    experience: {
      title: "Experience & Education",
      subtitle: "My academic and professional journey in computer engineering.",
      technicalEnvironment: "Technical environment:",
      items: {
        formation: {
          date: "2022 – 2027",
          title: "State Engineering Degree in Computer Engineering",
          place: "National School of Applied Sciences (ENSA), Tétouan",
          description:
            "Advanced training in software architecture, databases, networks, and information systems, with practical skills in web development, artificial intelligence, and software engineering. Expected graduation: 2027.",
          tech: ["Software Architecture", "Databases", "Networks", "AI"],
        },
        pfa: {
          date: "July – August 2026",
          title: "End-of-Year Internship – Full-Stack Software Engineer (Mentora HRIS)",
          place: "HB Développement – Tétouan",
          description:
            "Designed and built end-to-end a web-based HRIS that digitalizes and automates HR processes: secured access (hybrid JWT, RBAC), leave traceability using the Ledger pattern, a BYOD QR-code attendance system with anomaly detection, and document automation via n8n.",
        },
        work: {
          date: "July – August 2025",
          title: "Software Engineering & DevOps Internship",
          place: "NAJA7HOST – Tétouan",
          description:
            "Designed an e-commerce architecture of 6 microservices (Laravel 12, BFF pattern, RabbitMQ events) with an AI chatbot (Google Gemini) accessing business data in real time. Set up full monitoring (Golden Signals in Grafana, Prometheus metrics, Loki logs), secured the services (JWT, OWASP), and automated GitOps deployment on Kubernetes with Argo CD.",
        },
        school: {
          date: "2021 – 2022",
          title: "Baccalaureate in Physical and Chemical Sciences",
          place: "Mohamed El-Mekki Naciri High School, Tétouan",
          description:
            "French option. Graduated with highest honors after an advanced scientific curriculum preparing students for engineering studies.",
        },
      },
    },
    certifications: {
      title: "Certifications",
      subtitle: "Professional certifications validating my technical skills.",
      viewCertificate: "View certificate",
      imageAlt: "certificate",
      openImage: "Enlarge certificate",
    },
    contact: {
      headerTitle: "Contact me",
      headerSubtitle: "Available for internships, projects, and technical collaborations.",
      email: "Email",
      phone: "Phone",
      location: "Location",
      locationValue: "Tétouan, Morocco",
      copy: "Click to copy",
      emailCopied: "Email copied!",
      phoneCopied: "Phone number copied!",
      copyUnavailable: "Copying is unavailable in this browser.",
      badge: "⚡ Available · Tétouan, Morocco",
      title: "Let's work together",
      subtitle: "Available for internships, apprenticeships, and collaborative projects. Feel free to reach out!",
      form: {
        nameLabel: "Full name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "you@email.com",
        subjectLabel: "Subject",
        subjectPlaceholder: "Internship · Collaboration · Question",
        messageLabel: "Message",
        messagePlaceholder: "Hello Achraf, I am reaching out about...",
        honeypotLabel: "Do not fill in this field",
        sending: "Sending...",
        submit: "Send message",
        cv: "Download CV",
        sendingStatus: "Sending...",
        success: "Message sent. Thank you for reaching out, I will get back to you shortly.",
        successToast: "Message sent successfully.",
        errorToast: "The message could not be sent.",
        errors: {
          captcha_required: "Please complete the anti-bot check before sending.",
          captcha_failed: "The anti-bot check failed. Please try again.",
          validation_error: "Some fields are invalid. Please check your input and try again.",
          rate_limited:
            "Too many messages sent from your connection. Please try again in an hour or email me directly.",
          origin_not_allowed: "Sending is not allowed from this address.",
          payload_too_large: "Your message is too long.",
          email_failed:
            "Your message was saved, but the email notification failed. I will still read it.",
          server_error:
            "The messaging service is temporarily unavailable. Please email me directly at esserrar.achraf@gmail.com.",
          network_error: "Unable to connect. Please check your network and try again.",
        },
      },
    },
    footer: {
      description:
        "Computer Engineering student passionate about technological innovation and building high-performance digital solutions.",
      navigation: "Navigation",
      rights: "All rights reserved.",
    },
    ui: {
      skipToContent: "Skip to content",
      downloadStarted: "CV download started...",
      changeThemeToDark: "Switch to dark theme",
      changeThemeToLight: "Switch to light theme",
      switchLanguage: "Passer en français",
      menu: "Open menu",
      closeMenu: "Close menu",
      mainNavigation: "Main navigation",
      backToTop: "Back to top",
      close: "Close",
      previousImage: "Previous image",
      nextImage: "Next image",
      viewImage: "View image",
      projectImage: "Image",
      technologiesLabel: "Technology stack",
      footerNavigation: "Footer navigation",
      logoAlt: "Achraf Es-serrar logo",
    },
  },
};
