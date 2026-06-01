"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface ProjectImageProps {
  slug: string;
  fallbackImage: string;
  title: string;
  className?: string;
  priority?: boolean;
}

export function ProjectImage({ slug, fallbackImage, title, className = "", priority = false }: ProjectImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(`/api/project-image/${slug}`);
        const data = await response.json();
        
        if (data.url) {
          setImageUrl(data.url);
        }
      } catch (err) {
        console.error("Error fetching project image:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchImage();
  }, [slug]);

  const finalUrl = imageUrl || fallbackImage;
  const hasImage = finalUrl && !finalUrl.includes("placeholder");

  if (loading) {
    return (
      <div className={`bg-muted animate-pulse flex items-center justify-center ${className}`}>
        <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
      </div>
    );
  }

  if (!hasImage || error) {
    return (
      <div className={`bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <ImageIcon className="h-12 w-12 text-primary/40 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Aperçu à venir</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={finalUrl}
      alt={title}
      fill
      className={`object-cover transition-transform duration-300 group-hover:scale-105 ${className}`}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
