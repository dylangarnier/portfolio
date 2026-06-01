# Test Credentials — Portfolio BTS SIO (Dylan Garnier)

## Admin panel
- URL (local/dev): http://localhost:3000/admin
- URL (production Vercel): https://dylangarnier-portfolio.sbs/admin
- Mot de passe administrateur: `btssio2024`
  - Défini dans `lib/auth-context.tsx` (constante `ADMIN_PASSWORD`).
  - Le texte qui affichait ce mot de passe sur l'écran de connexion a été retiré (demande utilisateur).
  - Auth client-side (sessionStorage), inchangée fonctionnellement.

## Notes environnement
- App = Next.js 16 (App Router). Les routes API sont servies par Next sur le port 3000
  (ex: `/api/content`, `/api/upload`). En local, tout doit être testé via http://localhost:3000.
- Persistance du contenu: Vercel Blob en production (BLOB_READ_WRITE_TOKEN auto sur Vercel),
  fichier local `.data/portfolio-content.json` en dev (fallback automatique).
