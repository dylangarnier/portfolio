import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fichesVeille, veilleCategories } from "@/lib/data";
import { getContent } from "@/lib/content-store";
import { ExternalLink, Calendar, Tag, BookOpen, Rss, Shield, Code, Bug, Newspaper } from "lucide-react";

export const metadata = {
  title: "Veille Technologique | Portfolio BTS SIO - GARNIER Dylan",
  description: "Ma veille technologique sur les tendances du développement web.",
};

export const dynamic = "force-dynamic";

export default async function VeillePage() {
  const { veilleArticles } = await getContent();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold text-foreground">Veille Technologique</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
              Ma veille technologique sur les dernières tendances et innovations
              dans le domaine du développement web et de l&apos;informatique.
            </p>
          </div>
        </section>

        {/* Sources Feedly */}
        <section className="py-12 px-6 lg:px-8 bg-card/50">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-8">
              <Rss className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Mes sources de veille</h2>
            </div>
            
            {veilleCategories.map((category) => (
              <div key={category.id} className="mb-8">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.sources.map((source) => {
                    const IconComponent = source.icon === "shield" ? Shield 
                      : source.icon === "code" ? Code 
                      : source.icon === "bug" ? Bug 
                      : source.icon === "newspaper" ? Newspaper 
                      : Rss;
                    
                    return (
                      <Card key={source.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base">{source.name}</CardTitle>
                              <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                                source.category === "Sécurité" 
                                  ? "bg-red-500/20 text-red-400"
                                  : source.category === "PHP"
                                  ? "bg-purple-500/20 text-purple-400"
                                  : "bg-secondary text-secondary-foreground"
                              }`}>
                                {source.category}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{source.description}</p>
                          <div className="flex gap-2">
                            <Link
                              href={source.url}
                              target="_blank"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                            >
                              Visiter le site
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                            <Link
                              href={source.feedUrl}
                              target="_blank"
                              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                            >
                              <Rss className="h-3 w-3" />
                              RSS
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fiches de veille */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Fiches de veille</h2>
            </div>
            
            <div className="grid gap-6">
              {fichesVeille.map((fiche) => (
                <Card key={fiche.id} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{fiche.sujet}</CardTitle>
                        <p className="text-muted-foreground mt-1">{fiche.problematique}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full ${
                        fiche.status === "Terminée" 
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}>
                        {fiche.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Pourquoi ce sujet ?</p>
                      <p className="text-sm text-muted-foreground">{fiche.pourquoi}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Sources utilisées</p>
                      <div className="flex flex-wrap gap-2">
                        {fiche.sources.map((source, index) => (
                          <Link
                            key={index}
                            href={source.url}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-secondary/80 transition-colors"
                          >
                            {source.nom}
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Synthèse</p>
                      <p className="text-sm text-muted-foreground">{fiche.synthese}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Impact sur mes projets</p>
                      <p className="text-sm text-muted-foreground">{fiche.impact}</p>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Période : {fiche.dateDebut} {fiche.dateFin && `- ${fiche.dateFin}`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">Articles récents</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {veilleArticles.map((article) => (
                <Card key={article.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        article.category === "Web" 
                          ? "bg-blue-500/20 text-blue-400"
                          : article.category === "IA"
                          ? "bg-purple-500/20 text-purple-400"
                          : article.category === "Sécurité"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-secondary text-secondary-foreground"
                      }`}>
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{article.summary}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      <div className="flex flex-wrap gap-1">
                        {article.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={article.sourceUrl}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Lire sur {article.source}
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
