import { ProductReview } from '../types/review';
import { Product } from '../types/product';
import { maskCustomerName, filterProfanity } from '../lib/review-utils';

export const BASE_REVIEWS: ProductReview[] = [
  {
    id: 'rev_netflix_1',
    productId: 'netflix',
    productName: 'Netflix Premium',
    customerName: maskCustomerName('Nadia Safira'),
    rating: 5,
    comment: filterProfanity('Prosesnya super cepat 5 menit langsung dikasih email & profil private. Garansi aman!'),
    createdAt: '21 Nov 2026',
    verified: true,
  },
  {
    id: 'rev_netflix_2',
    productId: 'netflix',
    productName: 'Netflix Premium',
    customerName: maskCustomerName('Rizky Pratama'),
    rating: 5,
    comment: filterProfanity('Kualitas 4K Ultra HD lancar jaya, no screen limit. Langganan kedua kali di Skies by Nas.'),
    createdAt: '19 Nov 2026',
    verified: true,
  },
  {
    id: 'rev_spotify_1',
    productId: 'spotify',
    productName: 'Spotify Premium',
    customerName: maskCustomerName('Budi Santoso'),
    rating: 5,
    comment: filterProfanity('Bisa pakai akun lama, playlist & lagu favorit tidak hilang. Adminnya ramah banget.'),
    createdAt: '22 Nov 2026',
    verified: true,
  },
  {
    id: 'rev_spotify_2',
    productId: 'spotify',
    productName: 'Spotify Premium',
    customerName: maskCustomerName('Alya Maharani'),
    rating: 5,
    comment: filterProfanity('Langganan musik jadi hemat banget dibanding beli resmi. Sangat recommended.'),
    createdAt: '20 Nov 2026',
    verified: true,
  },
  {
    id: 'rev_canva_1',
    productId: 'canva',
    productName: 'Canva Pro',
    customerName: maskCustomerName('Dimas Anggara'),
    rating: 5,
    comment: filterProfanity('Langsung join tim resmi, semua font & elemen pro kebuka. Sangat bantu kerjaan kantor.'),
    createdAt: '22 Nov 2026',
    verified: true,
  },
  {
    id: 'rev_canva_2',
    productId: 'canva',
    productName: 'Canva Pro',
    customerName: maskCustomerName('Siti Nurhaliza'),
    rating: 5,
    comment: filterProfanity('Mantap garansi 30 hari beneran dipandu admin. Respon kilat!'),
    createdAt: '18 Nov 2026',
    verified: true,
  },
  {
    id: 'rev_youtube_1',
    productId: 'youtube',
    productName: 'YouTube Premium',
    customerName: maskCustomerName('Farhan Danu'),
    rating: 5,
    comment: filterProfanity('Nonton video tanpa iklan sama sekali dan YouTube Music aktif. Mantap Skies by Nas!'),
    createdAt: '21 Nov 2026',
    verified: true,
  },
  {
    id: 'rev_youtube_2',
    productId: 'youtube',
    productName: 'YouTube Premium',
    customerName: maskCustomerName('Indah Permata'),
    rating: 5,
    comment: filterProfanity('Proses aktivasi gampang tinggal klik link invite dari admin. Makasih banyak!'),
    createdAt: '17 Nov 2026',
    verified: true,
  },
];

/**
 * Menghasilkan ulasan dummy otomatis untuk setiap produk baru/lama yang belum memiliki ulasan,
 * sehingga memenuhi syarat: setiap apps punya 2 ulasan dummy dan 3 rating.
 */
export function ensureProductReviews(products: Product[], existingReviews: ProductReview[]): ProductReview[] {
  const reviewsByProduct = new Map<string, ProductReview[]>();

  for (const rev of existingReviews) {
    const list = reviewsByProduct.get(rev.productId) || [];
    list.push(rev);
    reviewsByProduct.set(rev.productId, list);
  }

  const generated: ProductReview[] = [...existingReviews];

  const dummyReviewTemplates = [
    {
      name: 'Aldi R.',
      comment: 'Pelayanan cepat dan ramah, akun langsung aktif tanpa kendala. Garansi resmi terpercaya!',
      rating: 5,
    },
    {
      name: 'Mega P.',
      comment: 'Harga sangat terjangkau untuk pelajar. Sudah langganan berkali-kali selalu puas!',
      rating: 5,
    },
  ];

  for (const prod of products) {
    const pId = prod.id || prod.slug;
    const currentList = reviewsByProduct.get(pId) || [];

    if (currentList.length === 0) {
      // Buat 2 dummy review untuk produk ini
      dummyReviewTemplates.forEach((t, index) => {
        const newRev: ProductReview = {
          id: `rev_auto_${pId}_${index + 1}`,
          productId: pId,
          productName: prod.name,
          customerName: maskCustomerName(t.name),
          rating: t.rating,
          comment: filterProfanity(t.comment),
          createdAt: 'Baru saja',
          verified: true,
        };
        generated.push(newRev);
      });
    }
  }

  return generated;
}
