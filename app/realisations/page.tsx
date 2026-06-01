import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { getContent } from "@/lib/content-store";
import { ArrowRight, GraduationCap, Building2 } from "lucide-react";

export const metadata = {
  title: "Réalisations | Portfolio BTS SIO - GARNIER Dylan",
  description: "Découvrez mes projets et réalisations professionnels et scolaires.",
};

export const dynamic = "force-dynamic";

export default async function RealisationsPage() {
  const { projects } = await getContent();
  // Séparer les projets par type
  const projetsLycee = projects.filter(p => p.type === "Scolaire");
  const projetsEntreprise = projects.filter(p => p.type === "Professionnel" || p.type === "Personnel");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold text-foreground">Réalisations</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
              Découvrez l&apos;ensemble de mes projets réalisés dans le cadre de ma
              formation BTS SIO au Lycée Gustave Eiffel et lors de mes stages en entreprise.
            </p>
          </div>
        </section>

        {/* Section Au Lycée */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Au Lycée</h2>
            </div>
            
            <div className="space-y-4">
              {projetsLycee.map((project) => (
                <Link key={project.id} href={`/realisations/${project.slug}`}>
                  <Card className="bg-card border-border hover:border-amber-500/50 transition-all group hover:shadow-lg hover:shadow-amber-500/5">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-amber-500 transition-colors">
                              {project.title}
                            </h3>
                            <span
                              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                project.status === "Terminé"
                                  ? "bg-green-500/20 text-green-500"
                                  : project.status === "En cours"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {project.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-amber-500 group-hover:gap-3 transition-all">
                          <span className="text-sm font-medium hidden sm:block">Voir détails</span>
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {projetsLycee.length === 0 && (
                <p className="text-muted-foreground text-center py-8">Aucun projet scolaire pour le moment.</p>
              )}
            </div>
          </div>
        </section>

        {/* Section En entreprise */}
        <section className="py-12 px-6 lg:px-8 bg-secondary/20">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <Building2 className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">En entreprise</h2>
            </div>
            
            <div className="space-y-4">
              {projetsEntreprise.map((project) => (
                <Link key={project.id} href={`/realisations/${project.slug}`}>
                  <Card className="bg-card border-border hover:border-blue-500/50 transition-all group hover:shadow-lg hover:shadow-blue-500/5">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-blue-500 transition-colors">
                              {project.title}
                            </h3>
                            <span
                              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                project.type === "Professionnel"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-emerald-500/20 text-emerald-400"
                              }`}
                            >
                              {project.type}
                            </span>
                            <span
                              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                project.status === "Terminé"
                                  ? "bg-green-500/20 text-green-500"
                                  : project.status === "En cours"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {project.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-blue-500 group-hover:gap-3 transition-all">
                          <span className="text-sm font-medium hidden sm:block">Voir détails</span>
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {projetsEntreprise.length === 0 && (
                <p className="text-muted-foreground text-center py-8">Aucun projet professionnel pour le moment.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
