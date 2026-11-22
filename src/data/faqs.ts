export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'Berapa lama pesanan diproses?',
    answer: 'Waktu proses mengikuti keterangan pada produk. Setelah pembayaran terkonfirmasi, kamu bisa memantau statusnya di Pesanan.',
  },
  {
    question: 'Apa metode pembayaran yang tersedia?',
    answer: 'Kami menerima QRIS (semua e-wallet: GoPay, OVO, DANA, ShopeePay, LinkAja) serta transfer bank langsung (BCA, Mandiri, BRI, BNI).',
  },
  {
    question: 'Bagaimana akun dikirim?',
    answer: 'Informasi akun beserta panduan login akan dikirimkan langsung ke WhatsApp dan email kamu yang terdaftar saat checkout, serta otomatis tampil di halaman Pesanan.',
  },
  {
    question: 'Apakah ada garansi jika akun bermasalah?',
    answer: 'Ya! Semua produk di Skies by Nas memiliki garansi penuh (Full Warranty). Jika ada kendala, hubungi admin melalui WhatsApp dengan menyebutkan nomor pesanan.',
  },
];
