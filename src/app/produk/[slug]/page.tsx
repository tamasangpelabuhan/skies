import { ProductDetailView } from '../../../components/ProductDetailView';
import { PRODUCTS } from '../../../data/products';
import type { Metadata } from 'next';

export function generateStaticParams() {
  if (PRODUCTS.length === 0) {
    return [{ slug: '_preview' }];
  }
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  return {
    title: product ? `${product.name} Murah & Bergaransi — Skies by Nas` : 'Detail Produk — Skies by Nas',
    description: product?.description || 'Aplikasi premium legal dan bergaransi.',
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailView slug={slug} />;
}
