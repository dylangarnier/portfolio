"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/data";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "CV", href: "/cv" },
  { name: "Réalisations", href: "/realisations" },
  { name: "Compétences", href: "/competences" },
  { name: "Tableau E5", href: "/tableau-e5" },
  { name: "Veille", href: "/veille" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-foreground">
              Dylan
              <span className="text-primary">.</span>
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop social links */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href={`mailto:${personalInfo.email}`}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="sr-only">Email</span>
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-xl font-bold text-foreground">
                  Dylan
                  <span className="text-primary">.</span>
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                        pathname === item.href
                          ? "text-primary bg-secondary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <div className="flex gap-x-4">
                    <Link
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-6 w-6" />
                    </Link>
                    <Link
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                    </Link>
                    <Link
                      href={`mailto:${personalInfo.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
