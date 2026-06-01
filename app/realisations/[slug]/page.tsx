import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectGallery } from "@/components/project-gallery";
import { getContent } from "@/lib/content-store";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  FileText,
  Calendar,
  Target,
  Wrench,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const { projects } = await getContent();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { projects } = await getContent();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Projet non trouvé" };
  }

  return {
    title: `${project.title} | Portfolio BTS SIO - GARNIER Dylan`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { projects } = await getContent();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Back Button */}
        <section className="px-6 lg:px-8 py-4">
          <div className="mx-auto max-w-7xl">
            <Button asChild variant="ghost" size="sm">
              <Link href="/realisations">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux réalisations
              </Link>
            </Button>
          </div>
        </section>

        {/* Project Header */}
        <section className="px-6 lg:px-8 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  project.type === "Professionnel"
                    ? "bg-primary/20 text-primary"
                    : project.type === "Personnel"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {project.type}
              </span>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  project.status === "Terminé"
                    ? "bg-green-500/20 text-green-500"
                    : project.status === "En cours"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {project.status}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-foreground text-balance">
              {project.title}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground max-w-3xl text-pretty">
              {project.fullDescription}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              {project.demoUrl && (
                <Button asChild>
                  <Link href={project.demoUrl} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Voir la démo
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline">
                  <Link href={project.githubUrl} target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    Code source
                  </Link>
                </Button>
              )}
              {project.documentationUrl && (
                <Button asChild variant="outline">
                  <Link href={project.documentationUrl} target="_blank">
                    <FileText className="mr-2 h-4 w-4" />
                    Documentation
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Project Image & Gallery */}
        <section className="px-6 lg:px-8 py-8">
          <div className="mx-auto max-w-7xl">
            {/* Main Image */}
            {project.image && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Aperçu du projet
                </h2>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-secondary/50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Gallery - toujours affichée */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Captures d&apos;écran et preuves
              </h2>
              <ProjectGallery
                projectTitle={project.title}
                projectSlug={project.slug}
                placeholderCount={project.gallery?.length || 4}
              />
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="px-6 lg:px-8 py-12 bg-card/50">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Context */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Contexte
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.context}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Période :</span>
                      <span className="text-foreground font-medium">
                        {project.startDate}
                        {project.endDate && ` - ${project.endDate}`}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Objectives */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Objectifs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            {objective}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Competences Bloc 1 - argumentées (preuve + explication) */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Compétences mobilisées (Bloc 1 BTS SIO) — argument &amp; preuve
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {project.competencesDetaillees && project.competencesDetaillees.length > 0 ? (
                      <div className="space-y-4">
                        {project.competencesDetaillees.map((comp, index) => (
                          <div
                            key={index}
                            className="rounded-lg border border-border bg-secondary/30 p-4"
                          >
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-bold shrink-0">
                                {comp.code}
                              </span>
                              <span className="font-semibold text-foreground">
                                {comp.intitule}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              <span className="font-medium text-foreground">Argument : </span>
                              {comp.argumentaire}
                            </p>
                            <p className="mt-2 text-sm text-foreground/90 flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span>
                                <span className="font-medium">Preuve : </span>
                                <span className="text-muted-foreground">{comp.preuve}</span>
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {project.competences.map((competence, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-muted-foreground"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            {competence}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Technologies */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      Technologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Info */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Informations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium text-foreground">
                        {project.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Statut</p>
                      <p className="font-medium text-foreground">
                        {project.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Période</p>
                      <p className="font-medium text-foreground">
                        {project.startDate}
                        {project.endDate && ` - ${project.endDate}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Screenshots</p>
                      <p className="font-medium text-foreground">
                        {project.gallery.length} emplacements configurés
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Guide pour ajouter des screenshots */}
                <Card className="bg-amber-500/5 border-amber-500/20">
                  <CardHeader>
                    <CardTitle className="text-amber-500 text-sm flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Ajouter vos screenshots
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>Pour ajouter vos captures d&apos;écran :</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Préparez vos images en format PNG/JPG</li>
                      <li>Nommez-les screenshot-1.png, screenshot-2.png, etc.</li>
                      <li>Placez-les dans le dossier correspondant :</li>
                    </ol>
                    <code className="block mt-2 p-2 bg-secondary rounded text-xs break-all">
                      public/gallery/{project.slug}/
                    </code>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Other Projects */}
        <section className="px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Autres réalisations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.id !== project.id)
                .slice(0, 3)
                .map((otherProject) => (
                  <Link
                    key={otherProject.id}
                    href={`/realisations/${otherProject.slug}`}
                  >
                    <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors group">
                      <CardContent className="p-6">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            otherProject.type === "Professionnel"
                              ? "bg-primary/20 text-primary"
                              : otherProject.type === "Personnel"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {otherProject.type}
                        </span>
                        <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {otherProject.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {otherProject.shortDescription}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
