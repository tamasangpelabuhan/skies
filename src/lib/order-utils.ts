import { CartItem } from '../types/cart';
import { CustomerOrder } from '../types/order';
import { StoreSettings } from '../types/settings';
import { STORE_INFO } from '../data/store-info';

export function generateInvoiceNumber(): string {
  const randomSeq = Math.floor(100 + Math.random() * 900);
  return `TD-281105-${randomSeq}`;
}

export function formatCurrentDate(): string {
  return new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatWarrantyExpiry(days = 30): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function buildWhatsAppOrderUrl(
  order: CustomerOrder,
  checkoutItems: CartItem[],
  settings?: StoreSettings
): string {
  const storeName = settings?.name || STORE_INFO.name;
  const storeWa = settings?.whatsappNumber || STORE_INFO.whatsappNumber;

  let itemsText = '';
  checkoutItems.forEach((item, idx) => {
    itemsText += `${idx + 1}. *${item.product.name}*\n   - Paket: ${item.variant.name} (${item.variant.duration})\n   - Jumlah: ${item.quantity}x\n   - Harga: Rp${(item.variant.price * item.quantity).toLocaleString('id-ID')}\n\n`;
  });

  const message =
    `Halo Admin *${storeName}*! 👋\nSaya mau konfirmasi order aplikasi premium:\n\n` +
    `🧾 *No. Invoice:* #${order.invoiceNumber}\n` +
    `📅 *Tanggal:* ${order.createdAt}\n` +
    `👤 *Nama:* ${order.customerName}\n` +
    `📱 *No. WA:* ${order.customerWhatsapp}\n` +
    (order.customerEmail ? `📧 *Email Invite:* ${order.customerEmail}\n` : '') +
    (order.customerNotes ? `📝 *Catatan:* ${order.customerNotes}\n` : '') +
    `\n🛒 *RINCIAN PESANAN:*\n${itemsText}` +
    `💳 *Metode Pembayaran:* ${order.paymentMethod}\n` +
    `💰 *TOTAL PEMBAYARAN:* *Rp${order.totalAmount.toLocaleString('id-ID')}*\n\n` +
    `Mohon info no rekening/QRIS untuk transfer dan proses akunnya ya min. Terima kasih! 🙏`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${storeWa}?text=${encodedMessage}`;
}
