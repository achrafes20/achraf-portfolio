# Contexte global détaillé du portfolio

## 1. Vue d'ensemble

Ce dépôt contient le portfolio personnel d'**Achraf Es-serrar**, étudiant ingénieur en Génie Informatique à l'ENSA de Tétouan. Il s'agit d'une application web monopage (SPA) en français, construite avec **React 19** et **Vite 6**. Son objectif principal est de présenter le profil, les compétences, les projets, le parcours académique et professionnel, puis de permettre une prise de contact.

Le site est entièrement côté client. Il ne possède pas de serveur applicatif dans ce dépôt. La seule persistance distante concerne les messages du formulaire, envoyés directement depuis le navigateur vers l'API REST de Supabase. En cas d'échec, le site ouvre le client de messagerie de l'utilisateur avec un message prérempli.

L'identité visuelle combine une mise en page éditoriale, un thème clair/sombre, des couleurs turquoise/orange/vert et une scène 3D animée dans la section d'accueil.

## 2. Objectifs fonctionnels

Le portfolio remplit les fonctions suivantes :

- présenter immédiatement l'identité et le positionnement d'Achraf ;
- donner accès au CV PDF ;
- résumer les compétences techniques par domaine ;
- présenter 12 projets filtrables par catégorie ;
- afficher plusieurs captures par projet grâce à un carrousel indépendant ;
- rediriger vers le code source de chaque projet ;
- présenter la formation et l'expérience sous forme de chronologie ;
- exposer les coordonnées et liens sociaux ;
- permettre l'envoi d'un message via Supabase ou, à défaut, via `mailto:` ;
- offrir une expérience responsive sur ordinateur, tablette et mobile ;
- conserver le thème choisi entre les visites.

## 3. Stack technique

| Élément | Technologie | Rôle |
|---|---|---|
| Framework UI | React 19 | Rendu déclaratif, composants et gestion d'état |
| Bundler/dev server | Vite 6 | Développement local et build de production |
| 3D/WebGL | Three.js | Moteur de rendu 3D |
| Intégration React/Three | `@react-three/fiber` | Canvas Three.js piloté avec React |
| Utilitaires 3D | `@react-three/drei` | Étoiles, lignes, flottement et contrôles orbitaux |
| Icônes | `lucide-react` | Icônes SVG de l'interface |
| Styles | CSS natif | Thèmes, grilles, responsive et composants visuels |
| Stockage distant | Supabase REST | Insertion des messages de contact |
| Typographies | Google Fonts | Fraunces et Space Grotesk |

Le projet n'utilise actuellement ni TypeScript, ni routeur, ni bibliothèque de composants, ni gestionnaire d'état global, ni framework CSS, ni suite de tests.

## 4. Structure du dépôt

```text
achraf-portfolio/
├── public/
│   ├── ES-SERRAR-ACHRAF-CV.pdf
│   ├── logo_claire.png
│   ├── logo_sombre.png
│   └── images/
│       ├── automate/
│       ├── can/
│       ├── ecommerce/
│       ├── espace_etudiant/
│       ├── etudiants_c/
│       ├── event/
│       ├── fitness/
│       ├── foot/
│       ├── gaming_store/
│       ├── gestion_pharmacie/
│       ├── servicepro/
│       └── space_defender_game/
├── src/
│   ├── components/
│   │   └── HeroScene.jsx
│   ├── data/
│   │   └── portfolio.js
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

### Rôle des fichiers principaux

- `index.html` : document HTML racine, métadonnées, favicon, chargement des polices et point de montage React.
- `src/main.jsx` : point d'entrée JavaScript ; monte `App` dans `#root` sous `React.StrictMode`.
- `src/App.jsx` : composant principal, structure de toutes les sections, état interactif et logique métier du navigateur.
- `src/App.css` : totalité du design system, des styles de composants et du responsive.
- `src/data/portfolio.js` : configuration externe, profil, navigation, statistiques, compétences, projets et chronologie.
- `src/components/HeroScene.jsx` : scène 3D animée du hero.
- `vite.config.js` : configuration Vite minimale avec le plugin React.
- `public/` : fichiers servis tels quels à la racine du site.

## 5. Architecture applicative

L'application est une SPA à sections ancrées, sans changement de route :

```text
main.jsx
└── App
    ├── NavBar
    ├── Hero + HeroScene
    ├── Section À propos + cartes de compétences
    ├── Section Projets + ProjectCard × 12
    ├── Section Expérience/Formation
    ├── Section Contact + formulaire
    ├── Footer
    ├── Bouton retour en haut
    └── Toast de notification
```

`App.jsx` contient quatre composants React :

- `App` : orchestre l'ensemble de l'interface et détient tous les états ;
- `NavBar` : logo, liens d'ancrage, changement de thème et menu mobile ;
- `SectionHeader` : en-tête réutilisé pour les principales sections ;
- `ProjectCard` : carte projet avec galerie, technologies et lien GitHub ;
- `Footer` : résumé, liens sociaux et navigation secondaire.

`HeroScene.jsx` sépare la logique 3D en composants internes :

- `NodeField` : dix nœuds lumineux reliés par onze lignes et animés en rotation ;
- `CodePanel` : panneaux 3D flottants représentant du code ;
- `CoreShape` : icosaèdre filaire avec deux anneaux animés ;
- `SceneContents` : lumières, étoiles, sol filaire et contrôles orbitaux ;
- `HeroScene` : configuration du canvas, de la caméra, du DPR et du tone mapping.

## 6. Modèle de données

Le contenu éditorial est centralisé dans `src/data/portfolio.js`. Cette séparation permet de modifier les textes et projets sans toucher directement au JSX de rendu.

### Configuration

`CONFIG` contient :

- l'URL publique du CV : `/ES-SERRAR-ACHRAF-CV.pdf` ;
- l'URL du projet Supabase ;
- une clé publique/anon Supabase ;
- la table cible `contact_messages`.

### Profil

Le profil contient le nom, le rôle, la localisation, l'adresse email, deux formes du numéro de téléphone, les URLs et identifiants GitHub/LinkedIn, le texte d'accroche, trois paragraphes de présentation et le texte du footer.

### Navigation et indicateurs

La navigation pointe vers cinq ancres : `#home`, `#about`, `#projects`, `#experience` et `#contact`.

Les indicateurs affichés sont :

- 12+ projets réalisés ;
- 8+ technologies maîtrisées ;
- 2+ années d'expérience.

### Compétences

Quatre domaines sont affichés :

1. Développement : Java, Python, C, JavaScript, TypeScript.
2. Technologies Web : React, Angular, Node.js, Laravel, ASP.NET.
3. Bases de données : MySQL, MongoDB, PostgreSQL, SQL Server.
4. Infrastructure : Docker, Git, Linux, AWS, CI/CD.

Chaque entrée possède une clé associée à une icône Lucide dans `skillIcons`.

### Projets

Chaque projet respecte la structure suivante :

```js
{
  id,          // identifiant stable et clé du carrousel
  title,       // titre affiché
  category,    // web, desktop ou game
  badge,       // technologie principale
  description, // résumé fonctionnel
  tech,        // liste de technologies
  repo,        // URL du dépôt source
  images       // captures servies depuis public/images
}
```

Inventaire des projets :

| # | Projet | Catégorie | Badge | Technologies principales | Captures |
|---:|---|---|---|---|---:|
| 1 | Plateforme E-commerce Coopérative Marocaine | Web | ASP.NET | C#, SQL Server, Entity Framework | 3 |
| 2 | Espace Étudiant - Gestion des Services | Web | Node.js | React, MySQL, JWT | 8 |
| 3 | ServicePro App | Web | Laravel | PHP, MySQL, Composer | 5 |
| 4 | Réservation de terrains de foot | Web | PHP | MySQL, JavaScript, AJAX | 4 |
| 5 | Campus Events Management System | Web | PHP | MySQL, JavaScript, Dompdf | 4 |
| 6 | Gestion Pharmacie Windows Forms | Desktop | .NET | C#, Windows Forms, SQL Server | 7 |
| 7 | Gaming Store | Web | Laravel | PHP, MySQL, Composer | 4 |
| 8 | Space Defender Game | Jeu | Java | JavaFX, sockets TCP, JDBC | 4 |
| 9 | Gestion de salle de sport | Web | Docker | Laravel, Angular, MySQL | 2 |
| 10 | Portail CAN 2025 | Web | HTML/CSS | JavaScript, Bootstrap | 7 |
| 11 | Projet Automate | Desktop | C | algorithmes, théorie des langages | 2 |
| 12 | Gestion des étudiants | Desktop | C | structures, fichiers, QuickSort | 1 |

Répartition : 8 projets Web, 3 Desktop et 1 Jeu. Le bouton « Tous les projets » affiche les 12 entrées.

### Expérience et formation

La chronologie contient trois entrées :

- 2022 à présent : diplôme d'ingénieur d'État en Génie Informatique à l'ENSA de Tétouan ;
- juin à août 2025 : stage Full-Stack chez NAJA7HOST, avec Laravel, Tailwind CSS, JavaScript et MySQL ;
- 2021 à 2022 : baccalauréat en Sciences Physiques et Chimiques, option française, mention Très Bien.

## 7. Comportements interactifs

### Thème clair/sombre

L'état `theme` est initialisé depuis `localStorage`, avec `light` comme valeur par défaut. Chaque modification :

- met à jour la classe de `.app-shell` ;
- écrit la préférence dans `localStorage` ;
- renseigne `document.documentElement.dataset.theme`.

Le thème est implémenté principalement par des variables CSS redéfinies sous `.app-shell.dark`. Le logo change aussi selon le thème.

### Navigation

La barre est fixe et translucide. Les liens réalisent un défilement fluide grâce à `scroll-behavior: smooth`. Sous 760 px, les liens sont masqués et un bouton ouvre un menu mobile. Cliquer sur un lien referme ce menu.

### Filtrage des projets

`activeFilter` vaut initialement `all`. `filteredProjects` est calculé avec `useMemo`. Les catégories disponibles sont `all`, `web`, `desktop` et `game`. Aucun appel réseau n'est nécessaire.

### Carrousels

`slideMap` conserve l'index actif pour chaque identifiant de projet. Les boutons précédent/suivant bouclent grâce au modulo. Des points permettent l'accès direct à une capture. Les images utilisent `loading="lazy"`.

### Téléchargement du CV

Le bouton crée temporairement une balise `<a>` avec l'attribut `download`, déclenche son clic, supprime la balise puis affiche un toast pendant 2,8 secondes.

### Copie des coordonnées

L'email et le téléphone sont copiés via `navigator.clipboard.writeText`. Une notification confirme l'action ou indique l'indisponibilité de l'API Clipboard.

### Retour en haut

Un écouteur de scroll passif affiche le bouton lorsque `window.scrollY > 620`. Le retour utilise `window.scrollTo` avec un comportement fluide.

### Notifications

Le toast global accepte les types `info`, `success` et `error`. Il est automatiquement supprimé après 2 800 ms. Le formulaire possède en plus son propre message d'état persistant.

## 8. Flux du formulaire de contact

Le formulaire demande le nom, l'email, le sujet et le message. Tous ces champs sont obligatoires. Un champ caché `website` sert de honeypot rudimentaire contre les robots.

Flux d'envoi :

1. blocage de la soumission HTML classique ;
2. lecture des valeurs avec `FormData` ;
3. abandon silencieux si le honeypot est rempli ;
4. création du payload avec `source: "react_portfolio"` et une date ISO ;
5. requête `POST` vers `/rest/v1/contact_messages` sur Supabase ;
6. ajout de `apikey`, `Authorization`, `Content-Type` et `Prefer: return=minimal` ;
7. en cas de succès : remise à zéro du formulaire et messages de confirmation ;
8. en cas d'échec : création d'une URL `mailto:` préremplie vers l'adresse du profil.

Payload attendu :

```json
{
  "name": "Nom saisi",
  "email": "adresse saisie",
  "subject": "sujet saisi",
  "message": "message saisi",
  "source": "react_portfolio",
  "created_at": "date ISO"
}
```

Supabase doit donc posséder une table compatible et une politique RLS autorisant l'insertion anonyme des seules colonnes nécessaires. La clé présente dans le frontend est une clé publiable, mais la sécurité dépend intégralement des politiques RLS et des permissions de table. Il ne faut jamais remplacer cette clé par une clé de service.

## 9. Design et responsive

Le design system se trouve dans `:root` et dans `.app-shell.dark`. Les variables couvrent notamment les arrière-plans, surfaces, texte, bordures, couleurs d'accent et ombres.

Caractéristiques visuelles :

- police de texte : Space Grotesk ;
- titres : Fraunces ;
- largeur maximale du contenu : 1180 px ;
- rayon dominant : 8 px ;
- arrière-plan quadrillé discret ;
- navigation avec flou d'arrière-plan ;
- cartes bordées et ombrées ;
- palette principale turquoise, orange, vert, ambre et rose ;
- grille de projets en trois colonnes sur grand écran.

Points de rupture :

- **≤ 1040 px** : hero moins haut, statistiques replacées dans le flux, sections À propos/Contact sur une colonne, projets sur deux colonnes ;
- **≤ 760 px** : menu mobile, hero et textes réduits, boutons pleine largeur, toutes les grandes grilles sur une colonne, timeline compacte, footer sur une colonne ;
- **≤ 430 px** : logo et titre réduits, nom de marque sur deux lignes si nécessaire, filtres disposés en grille 2 × 2.

Le `body` impose une largeur minimale de 320 px et masque le débordement horizontal.

## 10. Scène 3D et impact technique

La section d'accueil charge immédiatement un canvas WebGL. La scène comporte des géométries, lumières, étoiles, lignes, animations par frame et contrôles orbitaux avec rotation automatique. Le ratio de pixels est limité entre 1 et 1,8 pour réduire le coût GPU sur les écrans très denses.

Cette scène constitue la majeure partie du coût JavaScript du site, car Three.js et React Three Fiber sont inclus dans le bundle initial. Aucun chargement différé n'est actuellement appliqué.

## 11. Assets statiques

Le dossier `public` contient 54 fichiers pour environ **13,61 Mo**, dont :

- 2 logos PNG ;
- 1 CV PDF d'environ 0,12 Mo ;
- 51 images de projets réparties dans 12 dossiers.

Les dossiers d'images les plus lourds sont approximativement :

- `can` : 3,59 Mo ;
- `space_defender_game` : 2,43 Mo ;
- `gaming_store` : 1,88 Mo.

Les captures sont des PNG servis directement, sans génération responsive, conversion WebP/AVIF ni CDN dans ce dépôt.

## 12. Exécution et build

Prérequis : une version moderne de Node.js et npm.

```bash
npm install
npm run dev
```

Commandes disponibles :

```bash
npm run dev      # serveur de développement Vite
npm run build    # compilation de production dans dist/
npm run preview  # prévisualisation locale du build
```

Le 21 juin 2026, `npm run build` a été exécuté avec succès dans cet environnement :

- 2 141 modules transformés ;
- HTML : 0,96 kB, 0,52 kB gzip ;
- CSS : 15,29 kB, 3,89 kB gzip ;
- JavaScript : 1 120,85 kB, 311,76 kB gzip ;
- avertissement Vite : chunk JavaScript minifié supérieur à 500 kB.

Le build peut être déployé sur n'importe quel hébergement statique. Comme il n'y a pas de routes applicatives, aucune règle spéciale de réécriture SPA n'est indispensable pour les URLs actuelles. Le déploiement doit néanmoins autoriser les requêtes HTTPS vers Supabase et Google Fonts.

## 13. État qualitatif et risques

### Points solides

- contenu éditorial centralisé et facile à mettre à jour ;
- architecture simple, adaptée à la taille actuelle ;
- build de production fonctionnel ;
- navigation responsive et thème persistant ;
- images de projets chargées paresseusement ;
- formulaire avec états de chargement, succès, erreur et solution de repli ;
- libellés ARIA présents sur de nombreux contrôles ;
- écouteur de scroll correctement nettoyé ;
- boutons externes protégés par `rel="noreferrer"`.

### Limites et dette technique

1. **Bundle initial lourd** : environ 1,12 Mo minifié, principalement à cause de la 3D. Un import dynamique de `HeroScene` et un découpage de bundle réduiraient le coût initial.
2. **Médias non optimisés** : environ 13,6 Mo de fichiers publics, surtout en PNG. WebP/AVIF, tailles adaptées et miniatures réduiraient fortement le transfert.
3. **Absence de tests** : aucune validation automatisée des filtres, carrousels, thèmes ou du formulaire.
4. **Absence de linting/formatage configuré** : aucun script ESLint, Prettier ou contrôle CI n'apparaît dans le dépôt.
5. **Composant principal volumineux** : `App.jsx` concentre toute la page et toute la logique. Les sections pourraient devenir des composants autonomes si le site évolue.
6. **Configuration Supabase versionnée** : une clé publique peut être exposée, mais l'URL et la clé devraient idéalement passer par des variables `VITE_*` pour distinguer les environnements et faciliter la rotation.
7. **Protection antispam limitée** : le honeypot ne remplace pas une limitation de débit, une validation serveur ou un CAPTCHA adaptatif.
8. **Validation uniquement native** : les tailles maximales, la normalisation et l'assainissement doivent être contrôlés côté base/API.
9. **Accessibilité partielle des filtres** : le conteneur utilise `role="tablist"`, mais les boutons n'ont pas `role="tab"`, `aria-selected` ni gestion clavier de type tabs. Un groupe de boutons classique serait plus cohérent, ou le pattern ARIA devrait être complété.
10. **Carrousel minimal** : pas de geste tactile, de contrôle clavier dédié, de compteur textuel ou de description distincte par capture.
11. **Préférence de mouvement ignorée** : aucune règle `prefers-reduced-motion` ne désactive la scène 3D, les flottements ou les défilements animés.
12. **SEO/social incomplet** : la description et le titre existent, mais pas de balises Open Graph, Twitter Card, URL canonique ni données structurées.
13. **Date du footer figée** : le copyright indique 2024 en dur.
14. **Dépendance aux Google Fonts** : en cas de blocage réseau, le système de polices de secours prend le relais, mais l'identité typographique change.
15. **Pas de README ni de documentation préalable** : ce fichier devient la référence principale du contexte du projet.

## 14. Priorités d'amélioration recommandées

### Priorité haute

- charger la scène 3D avec `React.lazy`/`Suspense` ou la remplacer sur les appareils modestes ;
- convertir et redimensionner les captures de projets ;
- vérifier les politiques RLS Supabase et ajouter une protection contre les abus ;
- déplacer la configuration Supabase vers des variables d'environnement Vite ;
- ajouter `prefers-reduced-motion` et corriger le pattern ARIA des filtres.

### Priorité moyenne

- extraire les sections dans des composants dédiés ;
- ajouter ESLint, Prettier et des tests avec Vitest/React Testing Library ;
- améliorer le SEO social ;
- générer automatiquement l'année du footer ;
- ajouter des états de focus visibles homogènes à tous les contrôles.

### Priorité basse

- enrichir les projets avec démonstrations live, rôles, durée et résultats mesurables ;
- ajouter une image de partage et des données structurées `Person`/`WebSite` ;
- installer un suivi d'erreurs ou des métriques de performance respectueux de la vie privée.

## 15. Guide de modification rapide

- Modifier les informations personnelles : `src/data/portfolio.js`, objet `profile`.
- Ajouter un projet : ajouter un objet à `projects` et ses images sous `public/images/<dossier>/`.
- Ajouter une catégorie : compléter `filters`, utiliser le même identifiant dans `project.category` et vérifier le responsive des boutons.
- Modifier le parcours : éditer `timeline` et, pour un nouveau type, ajouter une icône dans `timelineIcons`.
- Modifier le CV : remplacer `public/ES-SERRAR-ACHRAF-CV.pdf` ou changer `CONFIG.cvUrl`.
- Modifier le stockage des contacts : adapter `CONFIG.supabase` et la fonction `handleSubmit`.
- Modifier le style : utiliser d'abord les variables de `:root` et `.app-shell.dark` dans `src/App.css`.
- Modifier la 3D : intervenir dans `src/components/HeroScene.jsx` en surveillant le coût GPU et le poids du bundle.

## 16. Conclusion

Le projet est un portfolio React fonctionnel, visuellement riche et directement déployable comme site statique. Son architecture est volontairement simple : une source de données centrale, un composant de page principal, une feuille de style globale et un composant 3D spécialisé. Les fonctionnalités clés sont opérationnelles et le build est validé. Les principaux axes de progrès concernent la performance initiale, l'optimisation des médias, l'accessibilité avancée, la sécurité opérationnelle du formulaire et l'automatisation de la qualité.
