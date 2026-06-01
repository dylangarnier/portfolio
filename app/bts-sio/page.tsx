import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { personalInfo, parcoursBTS, lycee } from "@/lib/data";
import { GraduationCap, Building2, Calendar, MapPin, ArrowRight, Target, BookOpen } from "lucide-react";

export const metadata = {
  title: "BTS SIO | Portfolio - GARNIER Dylan",
  description: "Présentation du BTS SIO SLAM au Lycée Gustave Eiffel de Bordeaux.",
};

export default function BTSSIOPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">BTS SIO</h1>
            </div>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl text-pretty">
              Le BTS Services Informatiques aux Organisations est un diplôme de niveau Bac+2 
              qui forme les professionnels de l&apos;informatique aux métiers du développement 
              et de l&apos;administration de systèmes.
            </p>
          </div>
        </section>

        {/* Options SLAM / SISR */}
        <section className="py-12 px-6 lg:px-8 bg-card/50">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">Les deux options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SLAM */}
              <Card className="bg-card border-border border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-bold">
                      Option choisie
                    </span>
                  </div>
                  <CardTitle className="text-xl mt-2">SLAM</CardTitle>
                  <CardDescription>Solutions Logicielles et Applications Métiers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Cette option forme aux métiers du développement d&apos;applications : 
                    sites web, applications mobiles, logiciels métiers...
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Compétences développées :</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Développement web (PHP, JavaScript, HTML/CSS)</li>
                      <li>• Bases de données (MySQL, SQL)</li>
                      <li>• Programmation orientée objet</li>
                      <li>• Frameworks et librairies modernes</li>
                      <li>• Gestion de projets informatiques</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* SISR */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl">SISR</CardTitle>
                  <CardDescription>Solutions d&apos;Infrastructure, Systèmes et Réseaux</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Cette option forme aux métiers de l&apos;administration de systèmes et réseaux : 
                    gestion de serveurs, sécurité, maintenance...
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Compétences développées :</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Administration de serveurs (Windows, Linux)</li>
                      <li>• Configuration de réseaux</li>
                      <li>• Sécurité des systèmes d&apos;information</li>
                      <li>• Virtualisation et cloud</li>
                      <li>• Support et maintenance</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Lycée */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">Mon établissement</h2>
            
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{lycee.nom}</h3>
                        <p className="text-muted-foreground">{lycee.ville}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{lycee.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{lycee.adresse}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mon parcours */}
        <section className="py-12 px-6 lg:px-8 bg-card/50">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">Mon parcours</h2>
            
            <div className="space-y-6">
              {parcoursBTS.map((item) => (
                <Card key={item.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{item.annee}</h3>
                          <span className={`text-xs px-2.5 py-1 rounded-full ${
                            item.status === "En cours" 
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-green-500/20 text-green-500"
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.points.map((point, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                            >
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Épreuves */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">Épreuves de l&apos;examen</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">E4 - Support et mise à disposition</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Épreuve pratique sur poste portant sur la gestion du patrimoine informatique, 
                    la résolution d&apos;incidents et le support utilisateurs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">E5 - Administration des systèmes</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Épreuve orale basée sur un dossier présentant les compétences acquises 
                    lors des situations professionnelles.
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/tableau-e5">
                      Voir mon tableau E5
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
