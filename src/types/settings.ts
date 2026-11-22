export interface StoreSettings {
  name: string;
  sinceYear: string;
  status: 'Buka / Online' | 'Istirahat' | 'Tutup';
  tagline: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  operationalHours: string;
  instagram?: string;
  overallRating?: number;
  totalReviews?: number;
}
