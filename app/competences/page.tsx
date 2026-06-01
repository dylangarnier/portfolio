import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContent } from "@/lib/content-store";

export const metadata = {
  title: "Compétences | Portfolio BTS SIO - GARNIER Dylan",
  description: "Découvrez mes compétences techniques en développement web.",
};

export const dynamic = "force-dynamic";

const categories = ["Frontend", "Backend", "Database", "DevOps", "Autres"] as const;

export default async function CompetencesPage() {
  const { skills } = await getContent();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold text-foreground">Compétences</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
              Technologies et outils que j&apos;ai acquis au cours de ma formation
              BTS SIO et de mes projets personnels.
            </p>
          </div>
        </section>

        {/* Skills by Category */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-12">
            {categories.map((category) => {
              const categorySkills = skills.filter((s) => s.category === category);
              if (categorySkills.length === 0) return null;

              return (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-foreground mb-6">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills.map((skill) => (
                      <Card key={skill.id} className="bg-card border-border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center justify-between">
                            {skill.name}
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i < skill.level ? "bg-primary" : "bg-border"
                                  }`}
                                />
                              ))}
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {skill.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
