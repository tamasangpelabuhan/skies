/**
 * Mengompresi file gambar di browser secara otomatis menggunakan HTML5 Canvas.
 * Menghasilkan Data URL WebP/JPEG ringan (~15-30 KB) yang dapat disimpan
 * langsung di dalam dokumen Cloud Firestore tanpa membutuhkan Firebase Storage (bebas biaya Blaze).
 */
export function compressImageFile(
  file: File,
  maxDimension = 360,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Kompres ke format WebP berkualitas tinggi namun sangat ringan
        const dataUrl = canvas.toDataURL('image/webp', quality);
        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
