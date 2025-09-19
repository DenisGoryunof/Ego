
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  category: string;
  order: number;
}

export interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  services: ServiceItem[];
  about: {
    title: string;
    description: string;
    team: Array<{
      name: string;
      position: string;
      bio: string;
    }>;
  };
  gallery: GalleryItem[];
}

export interface AdminSession {
  isAuthenticated: boolean;
  lastLogin: number;
}
