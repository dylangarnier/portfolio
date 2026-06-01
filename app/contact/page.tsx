import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { personalInfo } from "@/lib/data";
import { Mail, MapPin, Phone, Github, Linkedin, Send } from "lucide-react";

export const metadata = {
  title: "Contact | Portfolio BTS SIO - GARNIER Dylan",
  description: "Contactez-moi pour discuter de vos projets ou opportunités.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold text-foreground">Contact</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
              Vous avez un projet en tête ou souhaitez discuter d&apos;une opportunité ?
              N&apos;hésitez pas à me contacter.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Informations de contact
                  </h2>
                  <div className="space-y-4">
                    <Card className="bg-card border-border">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <Link
                            href={`mailto:${personalInfo.email}`}
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {personalInfo.email}
                          </Link>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Localisation</p>
                          <p className="font-medium text-foreground">{personalInfo.location}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Téléphone</p>
                          <p className="font-medium text-foreground">{personalInfo.phone}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Retrouvez-moi sur
                  </h3>
                  <div className="flex gap-4">
                    <Button asChild variant="outline" size="lg">
                      <Link href={personalInfo.github} target="_blank">
                        <Github className="h-5 w-5 mr-2" />
                        GitHub
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href={personalInfo.linkedin} target="_blank">
                        <Linkedin className="h-5 w-5 mr-2" />
                        LinkedIn
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Envoyez-moi un message
                    </h2>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input id="firstName" placeholder="Votre prénom" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom</Label>
                          <Input id="lastName" placeholder="Votre nom" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="votre@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet</Label>
                        <Input id="subject" placeholder="Sujet de votre message" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Votre message..."
                          rows={5}
                        />
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer le message
                      </Button>
                    </form>
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
