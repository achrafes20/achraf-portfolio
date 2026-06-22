# Configuration de l’email du formulaire de contact

Le formulaire enregistre le message dans Supabase puis appelle la fonction Edge
`send-contact-email`. Cette fonction envoie un email HTML à
`esserrar.achraf@gmail.com` avec Resend. La clé privée ne doit jamais être ajoutée
au code React ni commitée dans Git.

## 1. Préparer Resend

1. Créer un compte Resend.
2. Ajouter et vérifier un domaine d’envoi.
3. Créer une clé API.

L’adresse utilisée dans `CONTACT_FROM_EMAIL` doit appartenir au domaine vérifié,
par exemple `Portfolio Achraf <contact@votre-domaine.com>`.

## 2. Configurer et déployer la fonction Supabase

Depuis la racine du projet, avec la CLI Supabase installée :

```powershell
npx supabase login
npx supabase link --project-ref rsvwqhimmjzzpwyivllj
npx supabase secrets set RESEND_API_KEY="re_votre_cle" CONTACT_TO_EMAIL="esserrar.achraf@gmail.com" CONTACT_FROM_EMAIL="Portfolio Achraf <contact@votre-domaine-verifie.com>"
npx supabase functions deploy send-contact-email --no-verify-jwt
```

## 3. Tester

Remplir le formulaire depuis le portfolio, puis vérifier :

- la réception de l’email dans `esserrar.achraf@gmail.com` ;
- le dossier spam lors du premier test ;
- la nouvelle ligne dans la table Supabase `contact_messages`.

Le bouton **Répondre** de l’email utilise automatiquement l’adresse saisie par le
visiteur.
