import type { Metadata } from 'next';
import Carousel from './components/Carousel';
import Featurs from './components/Featurs';
import ProductsByIdsView from './components/ProductsByIdsView';

export const metadata: Metadata = {
  title: 'Trang chủ - Cửa hàng giày trực tuyến',
  description: 'Khám phá bộ sưu tập giày chất lượng cao tại cửa hàng trực tuyến của chúng tôi.',
  openGraph: {
    title: 'Trang chủ - Cửa hàng giày trực tuyến',
    description: 'Khám phá bộ sưu tập giày chất lượng cao tại cửa hàng trực tuyến của chúng tôi.',
    url: 'https://your-site.com',
    type: 'website',
  },
};
// app/page.tsx
export default function Home() {
  return (
    <main className="bg-white">
      <Carousel />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Featurs />
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductsByIdsView />
      </section>
    </main>
  );
}