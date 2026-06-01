// Données du portfolio - GARNIER Dylan

export const personalInfo = {
  name: "GARNIER Dylan",
  title: "Étudiant BTS SIO option SLAM",
  subtitle: "Développeur Web Full-Stack",
  email: "dydygrnr@gmail.com",
  phone: "+33 6 00 00 00 00",
  location: "Bordeaux, France",
  description:
    "Passionné par le développement web et les nouvelles technologies, je suis actuellement en formation BTS Services Informatiques aux Organisations, spécialité Solutions Logicielles et Applications Métiers (SLAM) au Lycée Gustave Eiffel à Bordeaux. Mon objectif est de concevoir des applications web modernes, performantes et accessibles.",
  linkedin: "https://linkedin.com/in/dylan-garnier",
  github: "https://github.com/dylangarnier",
  cv: "/cv.pdf",
};

export const education = [
  {
    id: 1,
    degree: "BTS SIO option SLAM",
    school: "Lycée Gustave Eiffel, Bordeaux",
    period: "2024 - 2026",
    description:
      "Services Informatiques aux Organisations - Solutions Logicielles et Applications Métiers",
  },
  {
    id: 2,
    degree: "Baccalauréat technologique",
    school: "Mérignac, Bordeaux",
    period: "2022 - 2024",
    description: "Obtention du baccalauréat",
  },
];

export const experiences = [
  {
    id: 1,
    title: "Stage Développeur Web",
    company: "Ferme Laroche",
    period: "2026",
    description:
      "Création d'un site vitrine responsive pour présenter l'activité de la ferme. Mise en place du SEO et déploiement en ligne.",
    technologies: ["HTML", "CSS", "JavaScript", "SEO"],
  },
  {
    id: 2,
    title: "Projets de formation",
    company: "Lycée Gustave Eiffel",
    period: "2026 - Présent",
    description:
      "Développement d'applications web dans le cadre de la formation BTS SIO : Site dynamique M2L, Réservation M2L.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  },
];

// Détail argumenté d'une compétence du Bloc 1 mobilisée sur une réalisation.
// argumentaire = l'explication (contexte + action + résultat) ; preuve = l'élément concret qui le démontre.
export type CompetenceDetail = {
  code: string; // ex: "C1.3"
  intitule: string; // ex: "Développer la présence en ligne de l'organisation"
  preuve: string; // ex: "Code PHP + captures du site en ligne"
  argumentaire: string; // l'explication détaillée à présenter à l'oral
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  context: string;
  objectives: string[];
  technologies: string[];
  competences: string[];
  competencesDetaillees?: CompetenceDetail[];
  image: string;
  gallery: string[];
  demoUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  status: "En cours" | "Terminé" | "En pause";
  startDate: string;
  endDate?: string;
  type: "Professionnel" | "Personnel" | "Scolaire";
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "site-dynamique-m2l",
    title: "Site Dynamique M2L",
    shortDescription:
      "Site web dynamique pour la Maison des Ligues avec gestion de contenu et base de données MySQL.",
    fullDescription:
      "Ce projet consiste en la création d'un site web dynamique pour la Maison des Ligues (M2L), structure qui héberge et accompagne de nombreuses ligues sportives régionales. L'objectif était de remplacer un site statique par une application capable d'afficher du contenu mis à jour sans toucher au code, en s'appuyant sur une base de données MySQL. " +
      "J'ai conçu le modèle de données (tables ligues, actualités, contacts), puis développé en PHP une architecture MVC séparant clairement la logique métier (modèles), l'affichage (vues) et le contrôle des requêtes (contrôleurs). L'accès aux données est réalisé avec PDO et des requêtes préparées afin de prévenir les injections SQL. " +
      "Le site propose une page d'accueil dynamique, la liste des ligues issue de la base, une page d'actualités alimentée depuis MySQL et un formulaire de contact. L'interface est responsive (HTML5 sémantique + CSS) pour rester lisible sur mobile comme sur ordinateur.",
    context:
      "Atelier de professionnalisation (AP) réalisé en formation BTS SIO SLAM au Lycée Gustave Eiffel à Bordeaux. Le commanditaire fictif, la M2L, souhaitait un site facilement actualisable par un utilisateur non technique.",
    objectives: [
      "Concevoir une base de données relationnelle MySQL (MCD puis MLD) adaptée au besoin de la M2L",
      "Développer un site web dynamique en PHP selon une architecture MVC",
      "Sécuriser l'accès aux données avec PDO et des requêtes préparées",
      "Proposer une interface responsive et une navigation claire",
    ],
    technologies: ["PHP", "MySQL", "PDO", "HTML", "CSS", "MVC"],
    competences: [
      "Développer la présence en ligne de l'organisation",
      "Travailler en mode projet",
      "Mettre à disposition des utilisateurs un service informatique",
    ],
    competencesDetaillees: [
      {
        code: "C1.3",
        intitule: "Développer la présence en ligne de l'organisation",
        preuve:
          "Code source PHP/MVC, schéma de la base MySQL et captures des pages dynamiques (accueil, ligues, actualités).",
        argumentaire:
          "La M2L avait besoin d'un site facile à mettre à jour. J'ai développé une application web dynamique en PHP reliée à une base MySQL : le contenu (ligues, actualités) n'est plus écrit \"en dur\" mais lu dans la base et affiché automatiquement. La preuve est le site fonctionnel et son code MVC : ajouter une actualité en base la fait apparaître immédiatement sur le site, ce qui démontre que j'ai bien développé la présence en ligne de l'organisation.",
      },
      {
        code: "C1.4",
        intitule: "Travailler en mode projet",
        preuve:
          "Cahier des charges, planning des tâches et MCD/MLD versionnés.",
        argumentaire:
          "Avant de coder, j'ai analysé le besoin, rédigé un cahier des charges et découpé le travail en étapes (conception de la base, développement des modèles, des vues, tests). J'ai suivi ce planning et documenté mes choix techniques. La preuve est l'ensemble de ces livrables de gestion de projet, qui montrent que j'ai organisé et planifié mon développement plutôt que d'improviser.",
      },
      {
        code: "C1.5",
        intitule: "Mettre à disposition des utilisateurs un service informatique",
        preuve:
          "Procédure d'installation (import SQL + configuration de la connexion) et jeu de tests fonctionnels.",
        argumentaire:
          "J'ai rendu l'application utilisable : script SQL d'import de la base, fichier de configuration de la connexion PDO et tests des principales pages. La preuve est cette procédure d'installation reproductible : un autre utilisateur peut déployer et utiliser le service, ce qui correspond à la mise à disposition d'un service informatique.",
      },
    ],
    image: "/project-image/m2l-dynamique.png",
    gallery: [
      "/gallery/m2l-dynamique/screenshot-1.png",
      "/gallery/m2l-dynamique/screenshot-2.png",
      "/gallery/m2l-dynamique/screenshot-3.png",
      "/gallery/m2l-dynamique/screenshot-4.png",
    ],
    status: "Terminé",
    startDate: "2026",
    type: "Scolaire",
  },
  {
    id: 2,
    slug: "stage-ferme-laroche",
    title: "Stage Ferme Laroche",
    shortDescription:
      "Site vitrine responsive et référencé (SEO) créé en stage pour présenter une exploitation agricole.",
    fullDescription:
      "Lors de mon stage de première année, j'ai conçu et réalisé le site vitrine professionnel de la Ferme Laroche, une exploitation agricole qui ne disposait d'aucune présence en ligne. L'enjeu pour l'entreprise était d'être trouvée sur Google et de présenter clairement son activité, ses produits et ses coordonnées à de futurs clients. " +
      "J'ai d'abord recueilli le besoin auprès du responsable, défini l'arborescence (accueil, présentation, produits, contact) puis intégré des maquettes en HTML/CSS responsive avec une touche de JavaScript pour l'interactivité. " +
      "J'ai accordé une attention particulière au référencement naturel (SEO) : balises title et meta description, structure de titres Hn cohérente, attributs alt sur les images, URL lisibles et temps de chargement optimisé. Enfin, j'ai déployé le site en ligne et vérifié son bon fonctionnement sur différents appareils.",
    context:
      "Stage en entreprise (1ʳᵉ année de BTS SIO). Mission réelle : doter la Ferme Laroche d'un premier site vitrine visible sur les moteurs de recherche.",
    objectives: [
      "Recueillir le besoin du client et définir l'arborescence du site",
      "Créer un site vitrine responsive et accessible (HTML/CSS/JS)",
      "Optimiser le référencement naturel (SEO on-page)",
      "Déployer le site en ligne et vérifier son bon fonctionnement",
    ],
    technologies: ["PHP", "HTML", "CSS", "JavaScript", "SEO"],
    competences: [
      "Développer la présence en ligne de l'organisation",
      "Mettre à disposition des utilisateurs un service informatique",
      "Organiser son développement professionnel",
    ],
    competencesDetaillees: [
      {
        code: "C1.3",
        intitule: "Développer la présence en ligne de l'organisation",
        preuve:
          "Captures du site vitrine en ligne (desktop + mobile) et balises SEO (title, meta, Hn, alt).",
        argumentaire:
          "L'entreprise n'existait pas sur internet. J'ai créé pour elle un site vitrine responsive et l'ai optimisé pour le SEO afin qu'elle soit trouvée sur Google. La preuve est le site en ligne avec ses balises de référencement et son rendu mobile : c'est très exactement \"développer la présence en ligne de l'organisation\", pour un vrai commanditaire.",
      },
      {
        code: "C1.5",
        intitule: "Mettre à disposition des utilisateurs un service informatique",
        preuve:
          "Capture du site déployé sur l'hébergement et tests de bon fonctionnement multi-navigateurs.",
        argumentaire:
          "Je n'ai pas seulement développé le site, je l'ai mis en production : envoi des fichiers sur l'hébergeur, configuration du nom de domaine et vérification de l'affichage sur plusieurs navigateurs et téléphones. La preuve est le site accessible publiquement et fonctionnel, ce qui démontre la mise à disposition effective d'un service auprès des utilisateurs.",
      },
      {
        code: "C1.6",
        intitule: "Organiser son développement professionnel",
        preuve:
          "Fiches de veille SEO et responsive design réalisées pendant le stage.",
        argumentaire:
          "Le SEO n'était pas maîtrisé au départ. Pour réussir la mission, j'ai mené une veille technologique (Google Search Central, articles spécialisés) et consigné mes apprentissages dans des fiches de veille que j'ai ensuite appliquées au site. La preuve est constituée de ces fiches : elles montrent que je sais me former en autonomie pour monter en compétence, c'est-à-dire organiser mon développement professionnel.",
      },
    ],
    image: "https://z0xdytrzzeukmnfd.public.blob.vercel-storage.com/projects/1780340851176-ferme-laroche.png",
    gallery: [
      "/gallery/ferme-laroche/screenshot-1.png",
      "/gallery/ferme-laroche/screenshot-2.png",
      "/gallery/ferme-laroche/screenshot-3.png",
      "/gallery/ferme-laroche/screenshot-4.png",
    ],
    demoUrl: "",
    status: "Terminé",
    startDate: "2026",
    type: "Professionnel",
  },
  {
    id: 3,
    slug: "site-statique-reservation-m2l",
    title: "Site Statique Réservation M2L",
    shortDescription:
      "Site statique HTML/CSS responsive présentant le système de réservation de salles de la M2L.",
    fullDescription:
      "Ce projet est une première étape autour du contexte M2L : un site statique en HTML5 et CSS3 destiné à présenter le service de réservation de salles et d'équipements de la Maison des Ligues. " +
      "L'objectif pédagogique était de maîtriser les fondamentaux du Web avant d'aborder le dynamique : structure HTML sémantique (header, nav, main, section, footer), mise en page moderne en CSS (Flexbox et Grid), design responsive avec media queries, et respect des bonnes pratiques d'accessibilité (contrastes, attributs alt, navigation au clavier). " +
      "J'ai produit plusieurs pages cohérentes (accueil, présentation des salles, modalités de réservation, contact) avec une charte graphique homogène et une navigation claire.",
    context:
      "Projet de formation BTS SIO SLAM au Lycée Gustave Eiffel — fondamentaux HTML/CSS et accessibilité.",
    objectives: [
      "Maîtriser le HTML5 sémantique et structurer correctement les pages",
      "Réaliser une mise en page responsive avec Flexbox/Grid et media queries",
      "Appliquer les bonnes pratiques d'accessibilité (alt, contrastes, navigation)",
      "Mettre en place une charte graphique cohérente sur l'ensemble du site",
    ],
    technologies: ["HTML", "CSS", "Responsive", "Accessibilité"],
    competences: [
      "Développer la présence en ligne de l'organisation",
      "Travailler en mode projet",
    ],
    competencesDetaillees: [
      {
        code: "C1.3",
        intitule: "Développer la présence en ligne de l'organisation",
        preuve:
          "Captures des pages desktop et mobile + code HTML/CSS sémantique et responsive.",
        argumentaire:
          "J'ai construit le support en ligne présentant le service de réservation de la M2L. Le site est responsive et accessible, ce qui le rend consultable par tous. La preuve est le rendu des pages sur ordinateur et mobile accompagné du code HTML sémantique : il démontre ma capacité à créer la présence en ligne d'une organisation en respectant les standards du Web.",
      },
      {
        code: "C1.4",
        intitule: "Travailler en mode projet",
        preuve:
          "Maquette/arborescence du site et planning des pages à réaliser.",
        argumentaire:
          "J'ai d'abord défini l'arborescence et une maquette avant d'intégrer, puis suivi un planning page par page. La preuve est cette maquette et le découpage des tâches : ils montrent que j'ai organisé mon travail de manière structurée, en mode projet, du cadrage à la livraison.",
      },
    ],
    image: "/project-image/m2l-statique.png",
    gallery: [
      "/gallery/m2l-statique/screenshot-1.png",
      "/gallery/m2l-statique/screenshot-2.png",
      "/gallery/m2l-statique/screenshot-3.png",
    ],
    status: "Terminé",
    startDate: "2025",
    type: "Scolaire",
  },
  {
    id: 4,
    slug: "gsb-gestion-frais",
    title: "AP 2.5 - GSB Gestion des Frais",
    shortDescription:
      "Application web de gestion des fiches de frais des visiteurs médicaux GSB, avec rôles et base de données.",
    fullDescription:
      "Application web développée dans le contexte GSB (Galaxy Swiss Bourdin, laboratoire pharmaceutique) permettant aux visiteurs médicaux de saisir et suivre leurs frais de déplacement, et aux comptables de les valider. " +
      "J'ai conçu la base de données relationnelle (visiteurs, fiches de frais, lignes de frais forfaitaires et hors forfait, états) à partir d'un MCD, puis développé l'application en PHP selon une architecture MVC. " +
      "Le projet met l'accent sur la gestion des rôles et des droits d'accès : un visiteur ne voit que ses fiches, un comptable accède à la validation. L'authentification est sécurisée (mots de passe hachés, sessions), et l'accès aux données utilise PDO avec des requêtes préparées. L'application gère le cycle de vie d'une fiche (saisie, clôture, validation, remboursement).",
    context:
      "Atelier de professionnalisation BTS SIO SLAM — contexte d'entreprise GSB, gestion interne des frais des visiteurs médicaux.",
    objectives: [
      "Concevoir et implémenter une base de données relationnelle (MCD/MLD)",
      "Développer une application web PHP en architecture MVC",
      "Mettre en place une authentification et une gestion des droits par rôle",
      "Gérer le cycle de vie des fiches de frais (saisie, validation, remboursement)",
    ],
    technologies: ["PHP", "MySQL", "PDO", "HTML", "CSS", "MVC"],
    competences: [
      "Gérer le patrimoine informatique",
      "Travailler en mode projet",
      "Mettre à disposition des utilisateurs un service informatique",
    ],
    competencesDetaillees: [
      {
        code: "C1.1",
        intitule: "Gérer le patrimoine informatique",
        preuve:
          "MCD/MLD, script SQL de création de la base et gestion des comptes/rôles utilisateurs.",
        argumentaire:
          "Les fiches de frais constituent des données sensibles de l'entreprise. J'ai organisé ce patrimoine informatique : conception de la base, création des tables, et surtout gestion des comptes utilisateurs et de leurs droits (un visiteur n'accède qu'à ses propres fiches, un comptable à la validation). La preuve est le script SQL et la matrice des droits par rôle, qui démontrent que je sais structurer et protéger les données et les accès d'une organisation.",
      },
      {
        code: "C1.4",
        intitule: "Travailler en mode projet",
        preuve:
          "Cahier des charges, MCD et découpage des fonctionnalités en lots.",
        argumentaire:
          "J'ai mené le projet par étapes : analyse du besoin GSB, conception de la base, puis développement fonctionnalité par fonctionnalité (authentification, saisie, validation). La preuve est l'ensemble des documents de conception et le planning : ils montrent une démarche projet rigoureuse et traçable.",
      },
      {
        code: "C1.5",
        intitule: "Mettre à disposition des utilisateurs un service informatique",
        preuve:
          "Comptes de test par rôle, procédure d'installation et tests du parcours visiteur/comptable.",
        argumentaire:
          "L'application est utilisable par ses deux profils d'utilisateurs. J'ai préparé des comptes de test, une procédure d'installation et vérifié les parcours visiteur et comptable. La preuve est ce jeu de tests fonctionnels : il atteste que le service est réellement disponible et conforme aux attentes des utilisateurs.",
      },
    ],
    image: "/project-image/gsb.png",
    gallery: [
      "/gallery/gsb/screenshot-1.png",
      "/gallery/gsb/screenshot-2.png",
      "/gallery/gsb/screenshot-3.png",
      "/gallery/gsb/screenshot-4.png",
    ],
    status: "Terminé",
    startDate: "2025",
    type: "Scolaire",
  },
  {
    id: 5,
    slug: "aux-claviers-citoyens",
    title: "AP 3.2 - Aux Claviers Citoyens",
    shortDescription:
      "API REST documentée (Swagger) pour gérer adhérents, ateliers et inscriptions d'une association.",
    fullDescription:
      "Conception et développement d'une API REST pour l'association « Aux Claviers Citoyens », qui organise des ateliers d'initiation à l'informatique pour le grand public. L'API centralise la gestion des adhérents, des ateliers, des animateurs et des inscriptions, et pourra alimenter aussi bien un site web qu'une application mobile. " +
      "J'ai modélisé les ressources et leurs relations, puis implémenté les opérations CRUD via des routes REST respectant les conventions (verbes HTTP GET/POST/PUT/DELETE, codes de statut appropriés, réponses au format JSON). " +
      "L'API est documentée avec Swagger/OpenAPI : chaque endpoint est décrit (paramètres, corps de requête, réponses), ce qui permet de la tester directement et facilite son intégration. J'ai également travaillé la sécurisation des accès et la validation des données entrantes.",
    context:
      "Atelier de professionnalisation BTS SIO SLAM — conception d'une API RESTful pour une association.",
    objectives: [
      "Modéliser les ressources et concevoir une API REST conforme aux bonnes pratiques",
      "Implémenter les opérations CRUD avec les bons verbes HTTP et codes de statut",
      "Documenter l'API avec Swagger/OpenAPI",
      "Valider les données entrantes et sécuriser les endpoints",
    ],
    technologies: ["PHP", "MySQL", "API REST", "Swagger / OpenAPI", "JSON"],
    competences: [
      "Développer la présence en ligne de l'organisation",
      "Travailler en mode projet",
      "Organiser son développement professionnel",
    ],
    competencesDetaillees: [
      {
        code: "C1.3",
        intitule: "Développer la présence en ligne de l'organisation",
        preuve:
          "Documentation Swagger de l'API et captures des endpoints renvoyant du JSON.",
        argumentaire:
          "J'ai doté l'association d'un service en ligne réutilisable : une API REST qui expose ses données (adhérents, ateliers, inscriptions) et peut alimenter un site ou une application. La preuve est la documentation Swagger et les réponses JSON des endpoints : elles montrent que j'ai développé un point d'accès en ligne moderne pour l'organisation.",
      },
      {
        code: "C1.4",
        intitule: "Travailler en mode projet",
        preuve:
          "Cahier des charges, modélisation des ressources et liste des routes planifiées.",
        argumentaire:
          "J'ai cadré le projet en modélisant d'abord les ressources et les routes nécessaires, puis en développant et testant chaque endpoint. La preuve est la documentation de conception (modèle de données + tableau des routes) qui démontre une conduite de projet méthodique.",
      },
      {
        code: "C1.6",
        intitule: "Organiser son développement professionnel",
        preuve:
          "Fiche de veille sur les bonnes pratiques des API REST (REST, codes HTTP, OpenAPI).",
        argumentaire:
          "Concevoir une API « propre » demandait de connaître les conventions REST. J'ai mené une veille (architecture REST, codes HTTP, standard OpenAPI) que j'ai appliquée directement au projet. La preuve est ma fiche de veille : elle illustre ma capacité à me former de façon autonome sur une technologie nouvelle pour réussir une réalisation.",
      },
    ],
    image: "/project-image/claviers-citoyens.png",
    gallery: [
      "/gallery/claviers-citoyens/screenshot-1.png",
      "/gallery/claviers-citoyens/screenshot-2.png",
      "/gallery/claviers-citoyens/screenshot-3.png",
    ],
    status: "Terminé",
    startDate: "2026",
    type: "Scolaire",
  },
  {
    id: 6,
    slug: "vivonsexpo-exposition",
    title: "AP 4.1 - VivonsExpo",
    shortDescription:
      "Application de gestion d'expositions : œuvres, artistes, emplacements et suivi des visiteurs.",
    fullDescription:
      "Développement d'une application de gestion pour VivonsExpo, organisme qui planifie des expositions culturelles. L'application permet de gérer les expositions, les œuvres exposées, les artistes, les emplacements (salles/stands) et le suivi des entrées de visiteurs. " +
      "J'ai démarré par l'analyse des besoins et la conception du modèle de données (MCD puis MLD) pour représenter correctement les relations entre expositions, œuvres et artistes. J'ai ensuite implémenté la base MySQL et développé les fonctionnalités de gestion en PHP. " +
      "Un travail de structuration des données a aussi été mené sous Excel (import/export, contrôle de cohérence) pour faciliter la reprise des informations existantes. L'application offre une vue d'ensemble des expositions planifiées et le suivi de la fréquentation.",
    context:
      "Atelier de professionnalisation BTS SIO SLAM — gestion d'événements culturels pour VivonsExpo.",
    objectives: [
      "Analyser les besoins d'un centre d'exposition",
      "Concevoir le modèle de données (MCD/MLD) et la base MySQL",
      "Développer la gestion des expositions, œuvres et artistes",
      "Mettre en place le suivi des visiteurs et la cohérence des données",
    ],
    technologies: ["PHP", "MySQL", "HTML", "CSS", "Excel", "MCD/MLD"],
    competences: [
      "Gérer le patrimoine informatique",
      "Travailler en mode projet",
      "Organiser son développement professionnel",
    ],
    competencesDetaillees: [
      {
        code: "C1.1",
        intitule: "Gérer le patrimoine informatique",
        preuve:
          "MCD/MLD, script SQL de la base et fichier Excel de structuration/contrôle des données.",
        argumentaire:
          "Les informations de VivonsExpo (œuvres, artistes, expositions) sont le patrimoine de données de l'organisation. Je l'ai organisé : conception du MCD/MLD, création de la base MySQL et structuration des données existantes sous Excel avec contrôles de cohérence. La preuve est l'ensemble base + fichier Excel : il démontre ma capacité à recenser, structurer et fiabiliser le patrimoine informatique d'une organisation.",
      },
      {
        code: "C1.4",
        intitule: "Travailler en mode projet",
        preuve:
          "Document d'analyse des besoins, MCD et planning de développement.",
        argumentaire:
          "J'ai conduit le projet de l'analyse des besoins jusqu'au développement, en passant par la modélisation. La preuve est la documentation de conception et le planning associé : ils montrent une démarche projet complète et organisée.",
      },
      {
        code: "C1.6",
        intitule: "Organiser son développement professionnel",
        preuve:
          "Documentation technique du projet et veille sur la modélisation de données (MCD/MLD).",
        argumentaire:
          "Pour modéliser correctement un domaine nouveau (la gestion d'expositions), je me suis documenté sur les bonnes pratiques de modélisation et j'ai consigné ma démarche. La preuve est cette documentation technique : elle atteste que je sais capitaliser mes apprentissages et organiser ma montée en compétence.",
      },
    ],
    image: "/project-image/vivonsexpo.png",
    gallery: [
      "/gallery/vivonsexpo/screenshot-1.png",
      "/gallery/vivonsexpo/screenshot-2.png",
      "/gallery/vivonsexpo/screenshot-3.png",
    ],
    status: "Terminé",
    startDate: "2026",
    type: "Scolaire",
  },
];

export type Skill = {
  id: number;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Autres";
  level: number;
  description: string;
};

export const skills: Skill[] = [
  {
    id: 1,
    name: "HTML/CSS",
    category: "Frontend",
    level: 5,
    description:
      "Maîtrise avancée du HTML5 sémantique et CSS3 avec Flexbox, Grid, animations",
  },
  {
    id: 2,
    name: "JavaScript",
    category: "Frontend",
    level: 4,
    description: "ES6+, manipulation DOM, fetch API, programmation asynchrone",
  },
  {
    id: 3,
    name: "PHP",
    category: "Backend",
    level: 4,
    description: "POO, MVC, PDO, sessions, sécurité web",
  },
  {
    id: 4,
    name: "MySQL",
    category: "Database",
    level: 4,
    description: "Conception BDD, requêtes complexes, procédures stockées",
  },
  {
    id: 5,
    name: "Git",
    category: "DevOps",
    level: 4,
    description:
      "Versionning, branches, merge, GitHub/GitLab, collaboration",
  },
  {
    id: 6,
    name: "Linux",
    category: "Autres",
    level: 3,
    description:
      "Administration système, ligne de commande, scripts shell",
  },
];

// Structure pour le tableau E5 matriciel
export type CompetenceC1 = {
  code: string;
  titre: string;
  description: string;
};

export const competencesC1: CompetenceC1[] = [
  { code: "C1.1", titre: "Patrimoine", description: "Organiser des fichiers et des droits d'accès" },
  { code: "C1.2", titre: "Incidents", description: "Résoudre des bugs signalés par des utilisateurs" },
  { code: "C1.3", titre: "Présence web", description: "Créer un site pour une vraie organisation" },
  { code: "C1.4", titre: "Projet", description: "Planifier et organiser son travail" },
  { code: "C1.5", titre: "Déploiement", description: "Tester et livrer une application" },
  { code: "C1.6", titre: "Dev pro", description: "Se former et faire de la veille technologique" },
];

export type RealisationE5 = {
  id: string;
  code: string;
  titre: string;
  contexte: string;
  categorie: "formation" | "stage1" | "stage2";
  competences: {
    c11?: boolean;
    c12?: boolean;
    c13?: boolean;
    c14?: boolean;
    c15?: boolean;
    c16?: boolean;
  };
  preuves?: {
    competence: string;
    preuve: string;
    description: string;
  }[];
};

export const realisationsE5: RealisationE5[] = [
  {
    id: "site-dynamique-m2l",
    code: "AP 3.1",
    titre: "Site Dynamique M2L",
    contexte: "Formation - Lycée Gustave Eiffel",
    categorie: "formation",
    competences: { c13: true, c14: true, c15: true },
    preuves: [
      { competence: "C1.3", preuve: "Code PHP/MVC + schéma de la base MySQL + captures des pages dynamiques", description: "J'ai développé un site dynamique qui lit son contenu dans une base MySQL : ajouter une actualité en base l'affiche aussitôt sur le site, ce qui prouve le développement de la présence en ligne de l'organisation." },
      { competence: "C1.4", preuve: "Cahier des charges, MCD/MLD et planning des tâches", description: "J'ai analysé le besoin, conçu la base puis découpé et planifié le développement (modèles, vues, tests), ce qui démontre une vraie conduite de projet." },
      { competence: "C1.5", preuve: "Script SQL d'import + configuration PDO + tests fonctionnels", description: "J'ai rendu l'application installable et utilisable par un tiers grâce à une procédure reproductible, ce qui correspond à la mise à disposition d'un service." },
    ],
  },
  {
    id: "site-statique-m2l",
    code: "AP 2.3",
    titre: "Site Statique Réservation M2L",
    contexte: "Formation - Lycée Gustave Eiffel",
    categorie: "formation",
    competences: { c13: true, c14: true },
    preuves: [
      { competence: "C1.3", preuve: "Captures desktop + mobile et code HTML/CSS sémantique et responsive", description: "J'ai créé le support en ligne présentant le service de réservation M2L, responsive et accessible, ce qui démontre le développement de la présence en ligne." },
      { competence: "C1.4", preuve: "Maquette / arborescence et planning des pages", description: "J'ai défini l'arborescence et une maquette avant d'intégrer, puis suivi un planning page par page : une démarche projet structurée." },
    ],
  },
  {
    id: "stage-ferme-laroche",
    code: "Stage",
    titre: "Ferme Laroche",
    contexte: "Stage - Site vitrine",
    categorie: "stage1",
    competences: { c13: true, c15: true, c16: true },
    preuves: [
      { competence: "C1.3", preuve: "Captures du site vitrine en ligne + balises SEO (title, meta, Hn, alt)", description: "J'ai créé et référencé un site vitrine responsive pour un vrai commanditaire qui n'avait aucune présence en ligne, afin qu'il soit trouvé sur Google." },
      { competence: "C1.5", preuve: "Capture du site déployé sur l'hébergement + tests multi-navigateurs", description: "J'ai mis le site en production (hébergement, domaine, tests d'affichage), ce qui prouve la mise à disposition effective d'un service auprès des utilisateurs." },
      { competence: "C1.6", preuve: "Fiches de veille SEO et responsive design", description: "Je me suis formé en autonomie au SEO via une veille puis je l'ai appliqué au site : j'ai organisé mon développement professionnel." },
    ],
  },
  {
    id: "gsb-gestion-frais",
    code: "AP 2.5",
    titre: "GSB Gestion des Frais",
    contexte: "Formation - Lycée Gustave Eiffel",
    categorie: "formation",
    competences: { c11: true, c14: true, c15: true },
    preuves: [
      { competence: "C1.1", preuve: "MCD/MLD, script SQL et matrice des droits par rôle", description: "J'ai structuré et protégé un patrimoine de données sensibles (fiches de frais) avec des comptes et des droits différenciés visiteur / comptable." },
      { competence: "C1.4", preuve: "Cahier des charges et découpage des fonctionnalités en lots", description: "J'ai mené le projet par étapes, de l'analyse du besoin GSB jusqu'au développement fonctionnalité par fonctionnalité." },
      { competence: "C1.5", preuve: "Comptes de test par rôle + procédure d'installation + tests des parcours", description: "J'ai rendu l'application utilisable par ses deux profils et vérifié les parcours, ce qui atteste la mise à disposition du service." },
    ],
  },
  {
    id: "aux-claviers-citoyens",
    code: "AP 3.2",
    titre: "Aux Claviers Citoyens",
    contexte: "Formation - Lycée Gustave Eiffel",
    categorie: "formation",
    competences: { c13: true, c14: true, c16: true },
    preuves: [
      { competence: "C1.3", preuve: "Documentation Swagger de l'API + captures des endpoints JSON", description: "J'ai exposé en ligne les données de l'association via une API REST réutilisable par un site ou une application, ce qui développe sa présence en ligne." },
      { competence: "C1.4", preuve: "Cahier des charges, modélisation des ressources et tableau des routes", description: "J'ai cadré le projet en modélisant ressources et routes avant de développer et tester chaque endpoint : une conduite de projet méthodique." },
      { competence: "C1.6", preuve: "Fiche de veille sur les bonnes pratiques des API REST / OpenAPI", description: "Je me suis documenté sur REST, les codes HTTP et OpenAPI puis je les ai appliqués : organisation de mon développement professionnel." },
    ],
  },
  {
    id: "vivonsexpo-exposition",
    code: "AP 4.1",
    titre: "VivonsExpo",
    contexte: "Formation - Lycée Gustave Eiffel",
    categorie: "formation",
    competences: { c11: true, c14: true, c16: true },
    preuves: [
      { competence: "C1.1", preuve: "MCD/MLD, script SQL et fichier Excel de structuration/contrôle", description: "J'ai recensé, structuré et fiabilisé le patrimoine de données de VivonsExpo (œuvres, artistes, expositions) entre la base MySQL et Excel." },
      { competence: "C1.4", preuve: "Document d'analyse des besoins, MCD et planning de développement", description: "J'ai conduit le projet de l'analyse des besoins au développement en passant par la modélisation : une démarche projet complète." },
      { competence: "C1.6", preuve: "Documentation technique + veille sur la modélisation (MCD/MLD)", description: "Je me suis formé aux bonnes pratiques de modélisation pour un domaine nouveau et j'ai capitalisé ma démarche dans une documentation." },
    ],
  },
];

// Ancienne structure conservée pour compatibilité
export type CompetenceE5 = {
  id: string;
  code: string;
  titre: string;
  activites: {
    code: string;
    titre: string;
    realisations: {
      projet: string;
      description: string;
      periode: string;
    }[];
  }[];
};

export const competencesE5: CompetenceE5[] = [
  {
    id: "b1",
    code: "B1",
    titre: "Support et mise à disposition de services informatiques",
    activites: [
      {
        code: "B1.3",
        titre: "Développer la présence en ligne de l'organisation",
        realisations: [
          {
            projet: "Site Dynamique M2L",
            description: "Développement d'un site dynamique avec PHP et MySQL",
            periode: "Formation",
          },
          {
            projet: "Site Statique Réservation M2L",
            description: "Création d'un site HTML/CSS responsive",
            periode: "Formation",
          },
          {
            projet: "Stage Ferme Laroche",
            description: "Site vitrine responsive avec optimisation SEO",
            periode: "Stage",
          },
        ],
      },
      {
        code: "B1.4",
        titre: "Travailler en mode projet",
        realisations: [
          {
            projet: "Site Dynamique M2L",
            description: "Planification et organisation du développement",
            periode: "Formation",
          },
        ],
      },
      {
        code: "B1.5",
        titre: "Mettre à disposition des utilisateurs un service informatique",
        realisations: [
          {
            projet: "Stage Ferme Laroche",
            description: "Déploiement du site vitrine en ligne",
            periode: "Stage",
          },
        ],
      },
      {
        code: "B1.6",
        titre: "Organiser son développement professionnel",
        realisations: [
          {
            projet: "Stage Ferme Laroche",
            description: "Veille technologique sur le SEO et le responsive",
            periode: "Stage",
          },
        ],
      },
    ],
  },
];

// Sources de veille Feedly
export type VeilleSource = {
  id: number;
  name: string;
  url: string;
  feedUrl: string;
  description: string;
  category: string;
  icon?: string;
};

export type VeilleCategory = {
  id: number;
  name: string;
  description: string;
  sources: VeilleSource[];
};

export const veilleCategories: VeilleCategory[] = [
  {
    id: 1,
    name: "Veille Sécurité PHP",
    description: "Flux de veille sur la sécurité des applications web et PHP",
    sources: [
      {
        id: 1,
        name: "OWASP Foundation",
        url: "https://owasp.org",
        feedUrl: "https://owasp.org/feed.xml",
        description: "Organisation mondiale pour la sécurité des applications web. Ressources sur les vulnérabilités, bonnes pratiques et outils de sécurité.",
        category: "Sécurité",
        icon: "shield",
      },
      {
        id: 2,
        name: "PHP.net News & Announcements",
        url: "https://www.php.net",
        feedUrl: "https://www.php.net/feed.atom",
        description: "Actualités officielles de PHP : nouvelles versions, correctifs de sécurité et annonces importantes.",
        category: "PHP",
        icon: "code",
      },
      {
        id: 3,
        name: "PortSwigger Blog",
        url: "https://portswigger.net/blog",
        feedUrl: "https://portswigger.net/blog/rss",
        description: "Blog de l'équipe Burp Suite sur les vulnérabilités web, techniques d'exploitation et recherches en sécurité.",
        category: "Sécurité",
        icon: "bug",
      },
      {
        id: 4,
        name: "The Hacker News",
        url: "https://thehackernews.com",
        feedUrl: "https://feeds.feedburner.com/TheHackersNews",
        description: "Actualités cybersécurité : failles de sécurité, attaques, malwares et tendances du secteur.",
        category: "Sécurité",
        icon: "newspaper",
      },
    ],
  },
];

export type VeilleArticle = {
  id: number;
  title: string;
  summary: string;
  content: string;
  source: string;
  sourceUrl: string;
  date: string;
  tags: string[];
  category: "IA" | "Web" | "Sécurité" | "DevOps" | "Autre";
};

export const veilleArticles: VeilleArticle[] = [
  {
    id: 1,
    title: "Les Core Web Vitals et le SEO",
    summary: "Comprendre l'importance des métriques de performance pour le référencement.",
    content: "Les Core Web Vitals sont des métriques essentielles pour le SEO...",
    source: "Google Developers",
    sourceUrl: "https://developers.google.com/search",
    date: "2025-01",
    tags: ["SEO", "Performance", "Google"],
    category: "Web",
  },
  {
    id: 2,
    title: "Responsive Design en 2025",
    summary: "Les meilleures pratiques pour créer des sites adaptatifs.",
    content: "Le responsive design reste essentiel pour l'expérience utilisateur...",
    source: "MDN Web Docs",
    sourceUrl: "https://developer.mozilla.org",
    date: "2025-02",
    tags: ["CSS", "Responsive", "Mobile"],
    category: "Web",
  },
];

export type FicheVeille = {
  id: number;
  sujet: string;
  problematique: string;
  dateDebut: string;
  dateFin?: string;
  pourquoi: string;
  sources: {
    nom: string;
    url: string;
    type: "Blog" | "Site officiel" | "Newsletter" | "Réseau social" | "Communauté" | "Autre";
  }[];
  articles: {
    titre: string;
    source: string;
    date: string;
    resume: string;
    lien: string;
  }[];
  synthese: string;
  impact: string;
  status: "En cours" | "Terminée";
};

// Informations sur le lycée
export const lycee = {
  nom: "Lycée Gustave Eiffel",
  ville: "Bordeaux",
  adresse: "143 cours de la Marne, 33000 Bordeaux",
  description: "Le lycée Gustave Eiffel de Bordeaux est un établissement public proposant des formations du CAP au BTS dans les domaines du numérique, de l'électronique et de l'informatique.",
};

// Parcours BTS SIO
export const parcoursBTS = [
  {
    id: 1,
    annee: "1ère année (2024-2025)",
    description: "Acquisition des fondamentaux du développement web et de la programmation.",
    status: "Terminée",
    points: ["PHP/MySQL", "HTML/CSS", "JavaScript", "Projets M2L", "Stage Ferme Laroche"],
  },
  {
    id: 2,
    annee: "2ème année (2025-2026)",
    description: "Approfondissement et spécialisation SLAM, préparation aux épreuves.",
    status: "En cours",
    points: ["Frameworks", "API REST", "Projets avancés", "Stage 2", "Épreuves E4/E5"],
  },
];

export const fichesVeille: FicheVeille[] = [
  {
    id: 1,
    sujet: "SEO et Référencement Naturel",
    problematique: "Comment optimiser le référencement d'un site vitrine pour améliorer sa visibilité sur Google ?",
    dateDebut: "2025-04",
    dateFin: "2025-06",
    pourquoi: "Lors de mon stage chez Ferme Laroche, j'ai dû créer un site vitrine. Pour qu'il soit visible sur Google et attire des clients, j'ai dû me former au SEO.",
    sources: [
      { nom: "Google Search Central", url: "https://developers.google.com/search", type: "Site officiel" },
      { nom: "Moz Blog", url: "https://moz.com/blog", type: "Blog" },
    ],
    articles: [
      {
        titre: "Guide du débutant en SEO",
        source: "Google Search Central",
        date: "2025-04-10",
        resume: "Ce guide officiel de Google explique les bases du référencement.",
        lien: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
      },
    ],
    synthese: "Le SEO repose sur 3 piliers : le contenu de qualité, la technique, et la popularité.",
    impact: "J'ai appliqué ces connaissances sur le site Ferme Laroche.",
    status: "Terminée",
  },
];
