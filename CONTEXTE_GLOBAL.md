# Contexte global du portfolio

> Mis à jour le 22 novembre 2026. Ce document décrit l'état réel du dépôt : architecture,
> contenu, sécurité, performance et accessibilité. Pour démarrer, voir le [README](README.md).

## 1. Vue d'ensemble

Portfolio personnel d'**Achraf Es-serrar**, élève ingénieur en 5ᵉ année de Génie Informatique à
l'ENSA de Tétouan (diplôme prévu en 2027), spécialisé en Full-Stack et DevOps. Il recherche un
PFE de six mois à partir de janvier 2027.

- Site en ligne : <https://esserrar-achraf.vercel.app>
- Application monopage bilingue **FR/EN**, thème **clair/sombre**, responsive.
- Front entièrement statique (Vercel). Seul composant serveur : la fonction Edge Supabase du formulaire de contact.
- Le contenu est aligné sur le CV PDF (`public/ES-SERRAR-ACHRAF-CV.pdf` et `-ENG.pdf`), qui fait référence.

## 2. Stack technique

| Élément | Technologie | Rôle |
|---|---|---|
| UI | React 19 | composants, état, contexte de langue |
| Build | Vite 6 | serveur de dev, build de production |
| Icônes UI | lucide-react | icônes SVG de l'interface |
| Logos technos | SVG locaux (`public/icons`) | devicon 2.16.0 figé + icônes maison |
| Styles | CSS natif (`src/App.css`) | variables de thème, grilles, responsive |
| Formulaire | Supabase Edge Function + Resend | validation, anti-spam, stockage, email |
| Anti-robot | Cloudflare Turnstile (optionnel) | captcha activé par variables d'environnement |
| Qualité | ESLint 9 (react-hooks, react-refresh) | `npm run lint` |
| Outillage | sharp | optimisation d'images, image Open Graph |
| Hébergement | Vercel | site statique + en-têtes (`vercel.json`) |

Pas de routeur, pas de framework CSS, pas de bibliothèque de composants. La 3D (Three.js),
utilisée dans une ancienne version, a été retirée au profit d'une grille hexagonale en CSS.

## 3. Structure

```
src/
├── main.jsx                montage React + LanguageProvider
├── App.jsx                 composition, visionneuse, toasts, défilement des liens profonds
├── App.css                 design system complet
├── config.js               URL du site, CV par langue, Supabase, clé Turnstile
├── translations.js         TOUS les textes FR/EN
├── LanguageContext.jsx     langue (mémorisée, sinon langue du navigateur)
├── data/portfolio.js       données structurelles (liens, technos, images, catégories)
├── data/image-sizes.json   dimensions des images (généré par npm run images)
├── hooks/
│   ├── useTheme.js         thème clair/sombre, préférence système par défaut
│   ├── useActiveSection.js section visible -> lien actif de la navigation
│   ├── useContactForm.js   envoi du formulaire, codes d'erreur traduits
│   ├── useDocumentMeta.js  titre, description et Open Graph selon la langue
│   └── useToast.js         notifications temporaires
├── lib/storage.js          localStorage protégé (try/catch)
├── components/             NavBar, Footer, Section, ProjectCard, ProjectLightbox,
│                           HexGrid, SmartImage, Turnstile
└── sections/               Hero, About, Projects, Experience, Certifications, Contact
public/
├── images/<projet>/*.webp  captures optimisées (noms en kebab-case)
├── icons/*.svg             logos des technologies
├── og-image.png            aperçu de partage 1200×630
├── robots.txt, sitemap.xml
└── CV FR et EN (PDF)
supabase/
├── functions/send-contact-email/index.ts
└── migrations/20261122000000_secure_contact_messages.sql
scripts/
├── optimize-images.mjs     PNG/JPG -> WebP, kebab-case, dimensions
└── generate-og-image.mjs   image Open Graph
```

## 4. Modèle de contenu

**Règle : un texte n'existe qu'à un seul endroit.**

- `src/data/portfolio.js` : ce qui ne se traduit pas : identifiants, catégories, badges,
  technologies, liens, images.
- `src/translations.js` : ce qui se traduit, indexé par le même `id` : `title`, `description`,
  `tech` (si les tags se traduisent).

Les chiffres du hero sont calculés : nombre de projets (17), nombre de technologies de la grille
hexagonale (22), nombre d'expériences en entreprise déduit de la chronologie (2).

### Projets (17)

| Projet | Catégorie |
|---|---|
| Nutrition Risk Classifier | IA/ML |
| AgileFlow | Web |
| SGITU – microservices sécurisés | Web |
| GiftPlan | Mobile |
| ChriOnline | Desktop |
| E-commerce coopérative (ASP.NET) | Web |
| Espace Étudiant | Web |
| ServicePro | Web |
| Réservation terrains de foot | Web |
| Campus Events | Web |
| Gestion Pharmacie | Desktop |
| Gaming Store | Web |
| Space Defender | Jeu |
| Salle de sport | Web |
| Portail CAN 2025 (projet académique) | Web |
| Projet Automate | Desktop |
| Gestion des étudiants (C) | Desktop |

### Parcours

1. 2022 – 2027 : cycle ingénieur d'État en Génie Informatique, ENSA Tétouan.
2. Juillet – août 2026 : stage PFA Full-Stack chez **HB Développement** (SIRH Mentora RH : Spring Boot, React, PostgreSQL, JWT hybride/RBAC, pattern Ledger, pointage BYOD par QR code, n8n).
3. Juillet – août 2025 : stage Ingénierie logicielle & DevOps chez **NAJA7HOST** (6 microservices Laravel 12, BFF, RabbitMQ, chatbot Gemini, Prometheus/Grafana/Loki, GitOps Kubernetes + Argo CD).
4. 2021 – 2022 : baccalauréat Sciences Physiques et Chimiques, mention Très Bien.

### Certifications

IBM Applied DevOps Engineering, IBM Exploratory Data Analysis for ML, SAP Professional
Fundamentals. Le lien du certificat SAP est vide (`link: null`) en attendant le lien de partage Coursera.

## 5. Comportements

- **Langue** : bouton FR/EN, choix mémorisé, sinon langue du navigateur. Met à jour
  `<html lang>`, le titre, la meta description et les balises Open Graph. Le CV téléchargé suit la langue.
- **Thème** : un script inline dans `index.html` applique le thème sur `<html data-theme>` avant le
  premier rendu (pas de flash). Par défaut, le site suit la préférence système ; un choix explicite est mémorisé.
- **Navigation** : barre fixe, lien de la section visible surligné (`aria-current`). Le menu
  mobile expose `aria-expanded` et se ferme avec Échap. Un lien d'évitement mène au contenu.
- **Liens profonds** : `/#projects`, `/#contact`… défilent vers la section après le rendu React.
- **Projets** : filtres (`aria-pressed`), carrousel par carte.
- **Visionneuse** (projets et certificats) : flèches, Échap, swipe, miniatures, focus piégé
  dans la boîte de dialogue puis rendu à l'élément d'origine.
- **Mouvement réduit** : `prefers-reduced-motion` coupe les animations et le défilement animé.

## 6. Formulaire de contact et sécurité

Flux : navigateur → fonction Edge `send-contact-email` → validation → Turnstile (si configuré)
→ limite de fréquence → insertion en base (clé service) → email Resend → statut `sent`/`failed`.

- CORS limité au site, aux prévisualisations Vercel du projet et à localhost.
- Requête limitée à 16 Ko ; honeypot vérifié côté serveur.
- 5 messages par heure et par IP, 50 messages sur 24 h au total (réglables).
- IP stockée sous forme d'empreinte SHA-256 salée uniquement.
- Table `contact_messages` : RLS activée, aucun droit pour `anon`/`authenticated`. `created_at` fixé par la base.
- Le client ne reçoit que des codes d'erreur neutres, traduits dans l'interface ; le détail reste dans les logs.
- Retours à la ligne retirés des champs d'en-tête (nom, sujet), HTML échappé dans l'email.

Déploiement et secrets : voir [EMAIL_SETUP.md](EMAIL_SETUP.md).

`vercel.json` ajoute les en-têtes `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
et `Permissions-Policy`, ainsi qu'un cache long pour les assets.

## 7. Performance

- Images : 27 Mo de PNG convertis en **4,1 Mo de WebP** (83 images, largeur ≤ 1600 px).
- `width`/`height` renseignés automatiquement (`SmartImage` + `image-sizes.json`) : pas de décalage de mise en page.
- Chargement différé (`loading="lazy"`) des captures et des miniatures.
- Logos servis localement : plus de dépendance à un CDN sans version figée.
- Trois familles de polices Google (Fraunces, Space Grotesk, JetBrains Mono).
- Bundle : environ 271 Ko de JS (84 Ko gzip) et 30 Ko de CSS (7 Ko gzip).

## 8. SEO et partage

Titre explicite, meta description, URL canonique, Open Graph et Twitter Card avec image 1200×630,
données structurées `Person` (JSON-LD), `robots.txt`, `sitemap.xml`, `<noscript>` de secours.

## 9. Points restant à traiter (hors code)

1. Déployer la migration et la nouvelle fonction Edge (voir EMAIL_SETUP.md), et idéalement activer Turnstile.
2. Renseigner le lien de partage du certificat SAP (`src/data/portfolio.js`).
3. Vérifier l'URL LinkedIn : le site utilise `/in/achraf-es-serrar-300bb2279`, le CV `/in/esserrar-achraf`.
4. Le CV indique la certification IBM DevOps « En cours », alors que le site affiche le certificat obtenu : mettre le CV à jour si elle est terminée.
5. Pistes : tests automatisés (Vitest + Testing Library), pré-rendu HTML pour un meilleur référencement, Content-Security-Policy.
