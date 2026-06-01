# PRD — Portfolio BTS SIO SLAM (Dylan Garnier)

## Problème initial (utilisateur)
Portfolio Next.js (déployé sur Vercel : https://dylangarnier-portfolio.sbs) pour l'épreuve orale E5.
Demandes :
1. Bug : les modifications faites dans la page admin ne s'affichent pas sur le site.
2. Retirer le texte qui affichait le mot de passe admin sur l'écran de connexion.
3. Décrire davantage les projets.
4. Pour chaque réalisation, expliquer chaque compétence du Bloc 1 par un argument = preuve.

## Stack / Architecture
- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind 4, shadcn/ui.
- Persistance contenu : `lib/content-store.ts`
  - Production (Vercel) : Vercel Blob (`BLOB_READ_WRITE_TOKEN` auto). Fichier `data/portfolio-content.json`.
  - Dev : fallback fichier local `.data/portfolio-content.json` (gitignoré).
- API : `app/api/content/route.ts` → `GET` (lecture) / `PUT` (sauvegarde).
- Pages publiques en `force-dynamic` lisant `getContent()` : home, /realisations, /realisations/[slug], /competences, /veille, /tableau-e5.

## Personas
- Dylan (admin) : édite réalisations, compétences, veille, profil, tableau E5 via /admin.
- Jury / visiteurs : consultent le portfolio public.

## Réalisé (2026-01)
- Fix persistance : l'admin charge le contenu depuis `/api/content` et sauvegarde (PUT) à chaque action ; les pages publiques reflètent immédiatement les changements (vérifié e2e, 8/8 tests OK).
- Retrait du texte révélant `btssio2024` sur l'écran de login (`components/admin/login-form.tsx`).
- Enrichissement des descriptions des 6 projets (`lib/data.ts`) : fullDescription détaillée, objectifs précis, contexte.
- Nouveau champ `competencesDetaillees` (code, intitulé, argument, preuve) pour chaque projet, affiché sur la page de la réalisation (« Argument : … / Preuve : … »).
- Enrichissement des preuves du tableau E5 (`realisationsE5`) alignées avec les compétences Bloc 1 (C1.1→C1.6).
- Admin : nouvel onglet « Tableau E5 » (édition des preuves/arguments), éditeur de compétences détaillées dans le dialogue projet, indicateur de sauvegarde, bouton Enregistrer sur le profil, textes d'aide corrigés.

## Backlog / Prochaines actions
- P1 (sécurité) : protéger `PUT /api/content` (et /api/upload, /api/delete) — actuellement non authentifiés côté serveur. Nécessiterait une vraie auth serveur (utilisateur avait choisi de ne pas sécuriser pour l'instant).
- P2 : refactor de `app/admin/page.tsx` (>1600 lignes) en sous-composants par onglet + hook `useContentStore`.
- P2 : permettre l'ajout de nouvelles compétences/articles de veille depuis l'admin (boutons « Ajouter » des onglets skills/veille encore décoratifs).
- P2 : édition des cases (cocher/décocher) des compétences C1.x du tableau E5 depuis l'admin.

## Déploiement
- Code à la racine `/app` (app Next.js complète). Pousser via « Save to GitHub » → Vercel redéploie.
- Vercel Blob déjà configuré sur le projet (uploads existants) → persistance opérationnelle en prod sans config supplémentaire.
