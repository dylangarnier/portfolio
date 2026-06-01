import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { personalInfo } from "@/lib/data";

const footerLinks = [
  { name: "Accueil", href: "/" },
  { name: "Réalisations", href: "/realisations" },
  { name: "Compétences", href: "/competences" },
  { name: "Tableau E5", href: "/tableau-e5" },
  { name: "Veille", href: "/veille" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold text-foreground">
                Dylan
                <span className="text-primary">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {personalInfo.title}
              <br />
              Portfolio BTS SIO - Épreuve E5
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`mailto:${personalInfo.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {personalInfo.email}
                </Link>
              </li>
              <li>
                <Link
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
            {new Date().getFullYear()} GARNIER Dylan. Fait avec{" "}
            <Heart className="h-4 w-4 text-primary" /> pour le BTS SIO.
          </p>
        </div>
      </div>
    </footer>
  );
}
