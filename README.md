# Portfolio — Achraf Es-serrar

Portfolio bilingue (FR/EN) d'un élève ingénieur Full-Stack & DevOps.
En ligne : **https://esserrar-achraf.vercel.app**

React 19 · Vite 6 · CSS natif · Supabase Edge Functions · Resend · déployé sur Vercel.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de production dans dist/
npm run preview    # sert le build sur http://localhost:4173
npm run lint       # ESLint
```

## Scripts utilitaires

| Commande | Rôle |
|---|---|
| `npm run images` | Convertit les nouvelles images de `public/images` en WebP (≤ 1600 px), renomme en kebab-case et met à jour `src/data/image-sizes.json`. |
| `npm run og` | Régénère l'aperçu de partage `public/og-image.png` (1200×630). |

## Ajouter ou modifier du contenu

Tout le contenu est dans deux fichiers :

- **`src/data/portfolio.js`** — données structurelles : liens, technologies, images, catégories, chronologie, certifications.
- **`src/translations.js`** — tous les textes FR et EN (titres, descriptions, dates).

Pour ajouter un projet :

1. Déposer les captures dans `public/images/<nom-du-projet>/`, puis lancer `npm run images`.
2. Ajouter l'entrée dans `projects` (`src/data/portfolio.js`) avec un `id` unique.
3. Ajouter `title` et `description` sous `projects.items["<id>"]`,
   **en français et en anglais**, dans `src/translations.js`.

## Structure

```
src/
├── App.jsx                 composition de la page, visionneuse, toasts
├── config.js               URL du site, CV, Supabase, Turnstile
├── translations.js         textes FR / EN
├── LanguageContext.jsx     langue active
├── data/
│   ├── portfolio.js        contenu structurel
│   └── image-sizes.json    dimensions des images (généré)
├── hooks/                  useTheme, useActiveSection, useContactForm, useDocumentMeta, useToast
├── lib/storage.js          accès sûr à localStorage
├── components/             NavBar, Footer, Section, ProjectCard, ProjectLightbox, HexGrid, SmartImage, Turnstile
└── sections/               Hero, About, Projects, Experience, Certifications, Contact
supabase/
├── functions/send-contact-email/   fonction Edge du formulaire
└── migrations/                     schéma et sécurité de la table contact_messages
scripts/                    optimisation des images, image Open Graph
```

## Formulaire de contact

Voir [EMAIL_SETUP.md](EMAIL_SETUP.md) : déploiement de la fonction, secrets, captcha, limites anti-spam.

## Variables d'environnement

Voir [.env.example](.env.example). Elles sont toutes optionnelles et publiques. Les secrets
(clé Resend, clé Turnstile secrète) se configurent uniquement côté Supabase.
