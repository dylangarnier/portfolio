import Link from "next/link";
import { ArrowRight, Download, Code, Database, Globe } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  education,
  experiences,
} from "@/lib/data";
import { getContent } from "@/lib/content-store";

const highlights = [
  {
    icon: Code,
    title: "Développement Web",
    description:
      "Création de sites web dynamiques avec PHP, MySQL et JavaScript",
  },
  {
    icon: Database,
    title: "Bases de données",
    description:
      "Conception et gestion de bases de données MySQL",
  },
  {
    icon: Globe,
    title: "Solutions métier",
    description:
      "Développement de solutions adaptées aux besoins des organisations",
  },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { personalInfo, projects, skills } = await getContent();
  const featuredProjects = projects.slice(0, 3);
  const topSkills = skills.filter((s) => s.level >= 4).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-medium mb-4">Bonjour, je suis</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                  {personalInfo.name}
                </h1>
                <p className="mt-2 text-xl md:text-2xl text-muted-foreground">
                  {personalInfo.subtitle}
                </p>
                <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl text-pretty">
                  {personalInfo.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link href="/realisations">
                      Voir mes projets
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href={personalInfo.cv} target="_blank">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger CV
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-4">
                {highlights.map((item) => (
                  <Card key={item.title} className="bg-card border-border">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 px-6 lg:px-8 bg-card/50">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Réalisations récentes
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Découvrez mes derniers projets professionnels et scolaires
                </p>
              </div>
              <Button asChild variant="ghost">
                <Link href="/realisations">
                  Voir tout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Link key={project.id} href={`/realisations/${project.slug}`}>
                  <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            project.type === "Professionnel"
                              ? "bg-primary/20 text-primary"
                              : project.type === "Personnel"
                              ? "bg-accent/20 text-accent-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {project.type}
                        </span>
                        <span
                          className={`text-xs ${
                            project.status === "Terminé"
                              ? "text-green-500"
                              : project.status === "En cours"
                              ? "text-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {project.shortDescription}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Preview */}
        <section className="py-20 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Compétences clés
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Technologies et outils que je maîtrise
                </p>
              </div>
              <Button asChild variant="ghost">
                <Link href="/competences">
                  Voir toutes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {topSkills.map((skill) => (
                <Card
                  key={skill.id}
                  className="bg-card border-border text-center"
                >
                  <CardContent className="p-4">
                    <p className="font-medium text-foreground">{skill.name}</p>
                    <div className="mt-2 flex justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < skill.level ? "bg-primary" : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Experience */}
        <section className="py-20 px-6 lg:px-8 bg-card/50">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Education */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  Formation
                </h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="relative pl-6 border-l-2 border-primary/30"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                      <p className="text-sm text-primary font-medium">
                        {edu.period}
                      </p>
                      <h3 className="mt-1 font-semibold text-foreground">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.school}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  Expériences
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="relative pl-6 border-l-2 border-primary/30"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                      <p className="text-sm text-primary font-medium">
                        {exp.period}
                      </p>
                      <h3 className="mt-1 font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {exp.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground text-balance">
              Intéressé par mon profil ?
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              N&apos;hésitez pas à me contacter pour discuter de vos projets ou
              d&apos;opportunités de collaboration.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Me contacter</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/tableau-e5">Voir le tableau E5</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
