// types/gallery.ts

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}
