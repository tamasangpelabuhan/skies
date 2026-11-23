/**
 * Review Utilities: Name Masking & Profanity Filter
 * Menjaga privasi nama pembeli dan menyaring kata-kata tidak pantas/senonoh.
 */

// Daftar kata kasar / kotor / tidak pantas (Bahasa Indonesia & Inggris)
const PROFANITY_LIST = [
  // Bahasa Indonesia
  'anjing', 'anjir', 'anjay', 'asu', 'babi', 'bangsat', 'bajingan',
  'kontol', 'memek', 'ngentot', 'entot', 'jancuk', 'jancok', 'jembut',
  'pepek', 'peler', 'itil', 'pantek', 'lonte', 'perek', 'pelacur',
  'bego', 'tolol', 'goblok', 'idiot', 'bodoh', 'kampret', 'tai', 'taik',
  'berak', 'modar', 'sialan', 'setan', 'iblis', 'ngatain',

  // Bahasa Inggris
  'fuck', 'fucking', 'fucker', 'shit', 'bitch', 'asshole', 'bastard',
  'dick', 'pussy', 'cock', 'cunt', 'porn', 'nsfw', 'whore', 'slut',
];

/**
 * Menyensor kata-kata tidak senonoh / tidak pantas menjadi asterisks (****)
 */
export function filterProfanity(text: string): string {
  if (!text) return '';
  let cleaned = text;

  for (const word of PROFANITY_LIST) {
    // Regex case-insensitive dengan word boundary atau substring
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    cleaned = cleaned.replace(regex, '*'.repeat(Math.max(3, word.length)));
  }

  return cleaned;
}

/**
 * Menyensor nama pelanggan untuk menjaga privasi
 * Contoh:
 * - "Nadia Safira" -> "Nadia S.***"
 * - "Rizky Pratama" -> "Rizky P.***"
 * - "Budi" -> "B***i"
 * - "F" -> "F***"
 */
export function maskCustomerName(name: string): string {
  if (!name || !name.trim()) return 'Pelanggan S.***';

  const clean = name.trim();
  const parts = clean.split(/\s+/);

  if (parts.length === 1) {
    const single = parts[0];
    if (single.length <= 2) return `${single}***`;
    return `${single[0]}***${single[single.length - 1]}`;
  }

  // Format: [Nama Depan] [Inisial Belakang].***
  const firstName = parts[0];
  const lastInitial = parts[1][0].toUpperCase();
  return `${firstName} ${lastInitial}.***`;
}
