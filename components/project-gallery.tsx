"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageIcon, Upload, X, Loader2, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface GalleryImage {
  url: string;
  pathname: string;
  filename: string;
  uploadedAt: string;
  size: number;
}

interface ProjectGalleryProps {
  projectTitle: string;
  projectSlug: string;
  placeholderCount?: number;
}

export function ProjectGallery({ projectTitle, projectSlug, placeholderCount = 4 }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mapper le slug du projet vers le nom du dossier de galerie
  const getGalleryFolder = (slug: string): string => {
    const mapping: Record<string, string> = {
      "site-dynamique-m2l": "m2l-dynamique",
      "stage-ferme-laroche": "ferme-laroche",
      "site-statique-reservation-m2l": "m2l-statique",
      "gsb-gestion-frais": "gsb",
      "aux-claviers-citoyens": "claviers-citoyens",
      "vivonsexpo-exposition": "vivonsexpo",
    };
    return mapping[slug] || slug;
  };

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const folder = getGalleryFolder(projectSlug);
        const response = await fetch(`/api/gallery/${folder}`);
        if (response.ok) {
          const data = await response.json();
          setImages(data.images || []);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [projectSlug]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Chargement de la galerie...</span>
      </div>
    );
  }

  // Si aucune image n'est uploadée, afficher les placeholders
  if (images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: placeholderCount }).map((_, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-amber-500/50 bg-amber-500/5"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Upload className="h-6 w-6 text-amber-500" />
                </div>
                <p className="text-sm font-medium text-foreground text-center">
                  Screenshot {index + 1}
                </p>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  Emplacement réservé
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-secondary/50 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Pour ajouter des screenshots :</span>{" "}
            Rendez-vous sur la{" "}
            <Link href="/admin" className="text-primary hover:underline inline-flex items-center gap-1">
              page admin
              <ExternalLink className="h-3 w-3" />
            </Link>
            , onglet &quot;Preuves / Screenshots&quot;, et sélectionnez le dossier &quot;Galerie - {projectTitle}&quot;.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div
            key={img.url}
            className="relative aspect-video rounded-lg overflow-hidden border border-border bg-secondary/50 hover:border-primary/50 cursor-pointer group"
            onClick={() => setSelectedImage(img.url)}
          >
            <Image
              src={img.url}
              alt={`${projectTitle} - Screenshot ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      {/* Dialog pour l'image agrandie */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {projectTitle} - Image agrandie
          </DialogTitle>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          {selectedImage && (
            <div className="relative aspect-video w-full">
              <Image
                src={selectedImage}
                alt={`${projectTitle} - Image agrandie`}
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Composant placeholder pour montrer les emplacements vides
export function GalleryPlaceholder({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/30 bg-muted/20"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ImageIcon className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">
              Screenshot {index + 1}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
