import { CustomerOrder } from '../types/order';

export function buildAdminDeliveryWhatsAppUrl(
  order: CustomerOrder,
  creds: {
    email: string;
    password: string;
    profileName?: string;
    pin?: string;
    message?: string;
  }
): string {
  const rawNumber = order.customerWhatsapp.replace(/\D/g, '');
  const cleanNumber = rawNumber.startsWith('0') ? '62' + rawNumber.slice(1) : rawNumber;
  const itemsText = order.items.map((i) => `${i.productName} (${i.variantName})`).join(', ');

  const text = `Halo kak *${order.customerName}*! 👋\n\nPesanan kamu *#${order.invoiceNumber}* di *Skies by Nas* sudah SELESAI diproses!\n\n🔑 *DETAIL AKUN KAMU:*\n- Produk: ${itemsText}\n- Email / Akun: ${creds.email}\n- Password: ${creds.password}\n${creds.profileName ? `- Profil: ${creds.profileName}\n` : ''}${creds.pin ? `- PIN: ${creds.pin}\n` : ''}\nCatatan: ${creds.message || 'Informasi akun sudah aktif.'}\n\nTerima kasih sudah belanja di Skies by Nas! 🙏`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}
