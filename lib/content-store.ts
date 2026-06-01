import { promises as fs } from "fs";
import path from "path";
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  skills as defaultSkills,
  veilleArticles as defaultVeilleArticles,
  realisationsE5 as defaultRealisationsE5,
  type Project,
  type Skill,
  type VeilleArticle,
  type RealisationE5,
} from "./data";

export interface PortfolioContent {
  personalInfo: typeof defaultPersonalInfo;
  projects: Project[];
  skills: Skill[];
  veilleArticles: VeilleArticle[];
  realisationsE5: RealisationE5[];
}

// Chemin du fichier de contenu (Vercel Blob en production, fichier local en dev)
const BLOB_PATH = "data/portfolio-content.json";
const LOCAL_PATH = path.join(process.cwd(), ".data", "portfolio-content.json");

export function getDefaultContent(): PortfolioContent {
  return {
    personalInfo: defaultPersonalInfo,
    projects: defaultProjects,
    skills: defaultSkills,
    veilleArticles: defaultVeilleArticles,
    realisationsE5: defaultRealisationsE5,
  };
}

function hasBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

/**
 * Lit le contenu persisté. Sur Vercel, lit le JSON stocké dans Vercel Blob.
 * En local (pas de token Blob), lit un fichier JSON. Si rien n'existe, renvoie
 * les valeurs par défaut de lib/data.ts.
 */
export async function getContent(): Promise<PortfolioContent> {
  try {
    if (hasBlob()) {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: BLOB_PATH });
      const blob = blobs.find((b) => b.pathname === BLOB_PATH);
      if (blob) {
        const res = await fetch(blob.url, { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as Partial<PortfolioContent>;
          return { ...getDefaultContent(), ...data };
        }
      }
    } else {
      const raw = await fs.readFile(LOCAL_PATH, "utf-8");
      const data = JSON.parse(raw) as Partial<PortfolioContent>;
      return { ...getDefaultContent(), ...data };
    }
  } catch {
    // Aucun contenu persisté -> valeurs par défaut
  }
  return getDefaultContent();
}

/**
 * Sauvegarde le contenu complet du portfolio de façon permanente.
 */
export async function saveContent(content: PortfolioContent): Promise<void> {
  const json = JSON.stringify(content, null, 2);
  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    await put(BLOB_PATH, json, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } else {
    await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
    await fs.writeFile(LOCAL_PATH, json, "utf-8");
  }
}
