// components/gallery/photo-gallery.tsx

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GalleryPhoto } from "@/types/gallery";

interface Props {
  photos: GalleryPhoto[];
}

export default function PhotoGallery({ photos }: Props) {
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3 xl:columns-4">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelected(photo)}
            className="group relative block w-full overflow-hidden rounded-3xl bg-zinc-900"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width ?? 1200}
              height={photo.height ?? 1600}
              className="h-auto w-full rounded-3xl object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-lg font-semibold text-white">
                {photo.title}
              </h3>

              {photo.description && (
                <p className="mt-1 text-sm text-zinc-300">
                  {photo.description}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
          onClick={() => setSelected(null)}
        >
          <div className="max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1600}
              height={2000}
              className="max-h-[85vh] w-auto rounded-3xl object-contain"
            />

            <div className="mt-5 text-center">
              <h2 className="text-2xl font-semibold text-white">
                {selected.title}
              </h2>

              {selected.description && (
                <p className="mt-2 text-zinc-400">{selected.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
