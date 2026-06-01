import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { competencesC1, type RealisationE5 } from "@/lib/data";
import { getContent } from "@/lib/content-store";
import { Download, Check, ArrowDown } from "lucide-react";

export const metadata = {
  title: "Tableau de Synthèse E5 | Portfolio BTS SIO - GARNIER Dylan",
  description: "Tableau de synthèse des compétences pour l'épreuve E5 du BTS SIO.",
};

export const dynamic = "force-dynamic";

export default async function TableauE5Page() {
  const { realisationsE5 } = await getContent();
  const formationRealisations = realisationsE5.filter((r) => r.categorie === "formation");
  const stage1Realisations = realisationsE5.filter((r) => r.categorie === "stage1");
  const stage2Realisations = realisationsE5.filter((r) => r.categorie === "stage2");

  const totals = {
    c11: realisationsE5.filter((r) => r.competences.c11).length,
    c12: realisationsE5.filter((r) => r.competences.c12).length,
    c13: realisationsE5.filter((r) => r.competences.c13).length,
    c14: realisationsE5.filter((r) => r.competences.c14).length,
    c15: realisationsE5.filter((r) => r.competences.c15).length,
    c16: realisationsE5.filter((r) => r.competences.c16).length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  Tableau de Synthèse E5
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
                  Ce tableau présente les compétences mobilisées lors de mes
                  différentes réalisations professionnelles, conformément au
                  référentiel du BTS SIO.
                </p>
              </div>
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/docs/tableau-e5.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger PDF
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Tableau matriciel */}
        <section className="py-8 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground w-[280px]">
                    Réalisation
                  </th>
                  {competencesC1.map((comp) => (
                    <th
                      key={comp.code}
                      className="text-center py-4 px-2 font-medium text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-foreground font-semibold">{comp.code}</span>
                        <span className="text-xs">{comp.titre}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Section Formation */}
                <tr>
                  <td
                    colSpan={7}
                    className="py-3 px-4 bg-amber-500/20 text-amber-300 font-medium text-sm"
                  >
                    En cours de formation - Lycée Gustave Eiffel
                  </td>
                </tr>
                {formationRealisations.map((realisation) => (
                  <RealisationRow key={realisation.id} realisation={realisation} />
                ))}

                {/* Section Stage 1 */}
                {stage1Realisations.length > 0 && (
                  <>
                    <tr>
                      <td
                        colSpan={7}
                        className="py-3 px-4 bg-primary/20 text-primary font-medium text-sm"
                      >
                        Milieu professionnel — Stage
                      </td>
                    </tr>
                    {stage1Realisations.map((realisation) => (
                      <RealisationRow key={realisation.id} realisation={realisation} />
                    ))}
                  </>
                )}

                {/* Section Stage 2 */}
                {stage2Realisations.length > 0 && (
                  <>
                    <tr>
                      <td
                        colSpan={7}
                        className="py-3 px-4 bg-primary/20 text-primary font-medium text-sm"
                      >
                        Milieu professionnel — Stage 2ème année
                      </td>
                    </tr>
                    {stage2Realisations.map((realisation) => (
                      <RealisationRow key={realisation.id} realisation={realisation} />
                    ))}
                  </>
                )}

                {/* Ligne Total */}
                <tr className="border-t-2 border-border">
                  <td className="py-4 px-4 font-bold text-foreground">Total</td>
                  <td className="py-4 px-2 text-center">
                    <TotalCell count={totals.c11} />
                  </td>
                  <td className="py-4 px-2 text-center">
                    <TotalCell count={totals.c12} />
                  </td>
                  <td className="py-4 px-2 text-center">
                    <TotalCell count={totals.c13} />
                  </td>
                  <td className="py-4 px-2 text-center">
                    <TotalCell count={totals.c14} />
                  </td>
                  <td className="py-4 px-2 text-center">
                    <TotalCell count={totals.c15} />
                  </td>
                  <td className="py-4 px-2 text-center">
                    <TotalCell count={totals.c16} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Détails des preuves */}
        <section className="py-12 px-6 lg:px-8 bg-card/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-8">
              <ArrowDown className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Détails des preuves
              </h2>
            </div>

            <div className="grid gap-6">
              {realisationsE5.map((realisation) => (
                <div
                  key={realisation.id}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-bold shrink-0">
                      {realisation.code}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {realisation.titre}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {realisation.contexte}
                      </p>
                    </div>
                  </div>

                  {realisation.preuves && realisation.preuves.length > 0 && (
                    <div className="ml-0 md:ml-16 space-y-3">
                      {realisation.preuves.map((preuve, index) => (
                        <div
                          key={index}
                          className="bg-secondary/50 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs font-medium">
                              {preuve.competence}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-foreground">Preuve :</span>{" "}
                            {preuve.preuve}
                          </p>
                          <p className="text-sm text-muted-foreground italic">
                            &quot;{preuve.description}&quot;
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Légende des compétences */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Légende des compétences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competencesC1.map((comp) => (
                <div
                  key={comp.code}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-bold">
                      {comp.code}
                    </span>
                    <span className="font-medium text-foreground">{comp.titre}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function RealisationRow({ realisation }: { realisation: RealisationE5 }) {
  return (
    <tr className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
      <td className="py-4 px-4">
        <div>
          <span className="font-semibold text-foreground">{realisation.code}</span>
          <span className="text-muted-foreground"> — {realisation.titre}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{realisation.contexte}</div>
      </td>
      <td className="py-4 px-2 text-center">
        <CompetenceCell active={realisation.competences.c11} />
      </td>
      <td className="py-4 px-2 text-center">
        <CompetenceCell active={realisation.competences.c12} />
      </td>
      <td className="py-4 px-2 text-center">
        <CompetenceCell active={realisation.competences.c13} />
      </td>
      <td className="py-4 px-2 text-center">
        <CompetenceCell active={realisation.competences.c14} />
      </td>
      <td className="py-4 px-2 text-center">
        <CompetenceCell active={realisation.competences.c15} />
      </td>
      <td className="py-4 px-2 text-center">
        <CompetenceCell active={realisation.competences.c16} />
      </td>
    </tr>
  );
}

function CompetenceCell({ active }: { active?: boolean }) {
  if (!active) {
    return <span className="text-muted-foreground/30">—</span>;
  }
  return (
    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-lime-500/20">
      <Check className="h-4 w-4 text-lime-400" />
    </div>
  );
}

function TotalCell({ count }: { count: number }) {
  const isValid = count >= 1;
  return (
    <div
      className={`inline-flex items-center justify-center w-10 h-8 rounded ${
        isValid
          ? "bg-lime-500/20 text-lime-400"
          : "bg-destructive/20 text-destructive"
      } font-bold`}
    >
      {count}
    </div>
  );
}
