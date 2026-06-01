import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  Briefcase,
  Code,
  Languages,
  Heart,
  MapPin,
  Mail,
  Phone,
  Download,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function CVPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary border-4 border-primary/20">
                DG
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Dylan GARNIER
                </h1>
                <p className="text-xl text-primary mb-4">
                  Etudiant BTS SIO option SLAM
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Merignac, France
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    dydygrnr@gmail.com
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    07 83 64 30 24
                  </span>
                </div>
                <div className="mt-6">
                  <Link
                    href="https://blobs.vusercontent.net/blob/CV%20Dylan%20GARNIER%20%282%29-2sdUO5MJ4iay0tuvaKQsYtS2Ijb5yS.pdf"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Telecharger le CV (PDF)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl grid gap-8">
            {/* Formation */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Formation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm text-primary font-medium">2024 - 2025</span>
                  </div>
                  <h3 className="font-semibold text-foreground">BTS SIO option SLAM</h3>
                  <p className="text-muted-foreground">Lycee Gustave Eiffel, Bordeaux</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Solutions Logicielles et Applications Metiers - Developpement d&apos;applications
                  </p>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/60" />
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm text-primary font-medium">2023 - 2024</span>
                  </div>
                  <h3 className="font-semibold text-foreground">Terminale STMG</h3>
                  <p className="text-muted-foreground">Lycee Fernand Daguin, Merignac</p>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/40" />
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm text-primary font-medium">Juin 2024</span>
                  </div>
                  <h3 className="font-semibold text-foreground">Baccalaureat Technologique STMG</h3>
                  <p className="text-muted-foreground">Obtention du diplome</p>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Experience Professionnelle
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <div className="mb-1 flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-primary font-medium">Nov 2019 - Juil. 2020</span>
                  </div>
                  <h3 className="font-semibold text-foreground">Tekkie Uni - Cours en ligne</h3>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                    <li>Developpement d&apos;applications</li>
                    <li>Creation de jeux</li>
                    <li>Codage de logiciels</li>
                  </ul>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/60" />
                  <div className="mb-1 flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-primary font-medium">Janvier 2020</span>
                  </div>
                  <h3 className="font-semibold text-foreground">Stage - Urban Soccer</h3>
                  <p className="text-muted-foreground">Merignac, France</p>
                  <p className="text-sm text-muted-foreground mt-1">Stage de 1ere STMG</p>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/40" />
                  <div className="mb-1 flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-primary font-medium">Octobre 2017</span>
                  </div>
                  <h3 className="font-semibold text-foreground">Stage - Conseil Departemental de la Gironde</h3>
                  <p className="text-muted-foreground">Cellule audiovisuelle</p>
                  <p className="text-sm text-muted-foreground mt-1">Participation a des missions audiovisuelles</p>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/20" />
                  <div className="mb-1 flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-primary font-medium">Mai 2023</span>
                  </div>
                  <h3 className="font-semibold text-foreground">Atelier de programmation - Orange</h3>
                  <p className="text-muted-foreground">Les Eyquems, Merignac</p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                    <li>Programmation de robot</li>
                    <li>Creation de jeux sur Scratch</li>
                    <li>Test et mise en marche de Thymio 2</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Two columns for skills and languages */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Competences */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Code className="h-5 w-5 text-primary" />
                    Competences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Developpement Web</h4>
                      <div className="flex flex-wrap gap-2">
                        {["HTML", "CSS", "PHP"].map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Outils de developpement</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Visual Studio", "IntelliJ", "VS Code"].map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Bureautique</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Word", "Excel", "PowerPoint"].map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Systemes</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                          Commandes Linux
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Langues et Interets */}
              <div className="space-y-8">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Languages className="h-5 w-5 text-primary" />
                      Langues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Francais</span>
                        <span className="text-sm text-muted-foreground">Langue maternelle</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Anglais</span>
                        <span className="text-sm text-muted-foreground">Niveau scolaire</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Heart className="h-5 w-5 text-primary" />
                      Centres d&apos;interet
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["Boxe", "Sport", "Voyage"].map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
