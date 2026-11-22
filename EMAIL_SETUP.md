# Formulaire de contact : configuration et déploiement

## Fonctionnement

```
Navigateur ──POST──▶ Fonction Edge Supabase « send-contact-email »
                       1. CORS : seules les origines autorisées sont acceptées
                       2. taille max 16 Ko + champ piège à robots (honeypot)
                       3. validation des champs
                       4. Cloudflare Turnstile (si configuré)
                       5. limite : 5 messages / heure / IP, 50 messages / 24 h au total
                       6. INSERT dans contact_messages (clé service)
                       7. email via Resend + statut sent/failed en base
```

Le navigateur **n'écrit plus directement** dans la table `contact_messages` : la migration
retire tous les droits aux clés publiques. Seule la fonction (clé service) peut y écrire.
Les IP ne sont jamais stockées en clair : seule une empreinte SHA-256 salée l'est.

## Déploiement (à faire une fois, dans cet ordre, sans pause entre les étapes)

Depuis la racine du projet :

```powershell
npx supabase login
npx supabase link --project-ref rsvwqhimmjzzpwyivllj

# 1. Migration de la table (colonnes ip_hash/lang/email_status, RLS, retrait des droits publics)
#    Si la CLI réclame un supabase/config.toml, copiez plutôt le contenu de
#    supabase/migrations/20261122000000_secure_contact_messages.sql dans
#    Supabase > SQL Editor > Run : le script est idempotent.
npx supabase db push

# 2. Secrets de la fonction
npx supabase secrets set `
  RESEND_API_KEY="re_votre_cle" `
  CONTACT_TO_EMAIL="esserrar.achraf@gmail.com" `
  CONTACT_FROM_EMAIL="Portfolio Achraf <contact@votre-domaine-verifie.com>" `
  IP_HASH_SALT="une-longue-chaine-aleatoire" `
  ALLOWED_ORIGINS="https://esserrar-achraf.vercel.app,http://localhost:5173,http://localhost:4173"

# 3. Déploiement de la fonction (pas de JWT : la protection est assurée par CORS, captcha et limites)
npx supabase functions deploy send-contact-email --no-verify-jwt

# 4. Déployer le front (git push -> Vercel)
```

> Entre l'étape 1 et l'étape 4, l'ancienne version du site en ligne ne peut plus enregistrer
> de message (elle écrivait directement dans la table). Enchaînez les étapes rapidement.

`SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont fournis automatiquement aux fonctions
Edge par Supabase : inutile de les définir.

## Activer le captcha Cloudflare Turnstile (recommandé)

1. Sur <https://dash.cloudflare.com> → **Turnstile** → **Add widget**.
   Domaines : `esserrar-achraf.vercel.app` et `localhost`. Mode : *Managed*.
2. Clé **secrète** → côté Supabase :
   ```powershell
   npx supabase secrets set TURNSTILE_SECRET_KEY="0x4AAAA..."
   ```
3. Clé **de site** (publique) → Vercel → *Settings* → *Environment Variables* :
   `VITE_TURNSTILE_SITE_KEY=0x4AAAA...`, puis redéployer.

Sans ces deux clés, le formulaire fonctionne quand même (honeypot + limites de fréquence),
mais le captcha est la meilleure protection contre les robots.

## Réglages optionnels (secrets Supabase)

| Variable | Défaut | Rôle |
|---|---|---|
| `RATE_LIMIT_PER_IP` | `5` | messages max par IP sur la fenêtre |
| `RATE_LIMIT_WINDOW_MINUTES` | `60` | durée de la fenêtre |
| `GLOBAL_DAILY_LIMIT` | `50` | messages max sur 24 h, toutes IP confondues |
| `ALLOWED_ORIGINS` | site Vercel + localhost | origines acceptées (séparées par des virgules) |

Les URL de prévisualisation Vercel `https://esserrar-achraf-*.vercel.app` sont acceptées automatiquement.

## Tester

1. Envoyer un message depuis le site.
2. Vérifier la réception dans la boîte mail (et le dossier spam au premier envoi).
3. Dans Supabase → *Table editor* → `contact_messages` : nouvelle ligne avec `email_status = sent`.
4. Logs de la fonction : *Edge Functions* → `send-contact-email` → *Logs*.

Codes d'erreur renvoyés au site (traduits en FR/EN dans `src/translations.js`) :
`validation_error`, `captcha_failed`, `rate_limited`, `origin_not_allowed`,
`payload_too_large`, `email_failed` (message enregistré mais email non parti), `server_error`.

La clé Resend ne doit jamais apparaître dans le code React ni dans Git.
