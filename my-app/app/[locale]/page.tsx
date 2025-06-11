import type { Metadata } from 'next';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Featurs from './components/Featurs';
import ProductsByIdsView from './components/ProductsByIdsView';
import FooterPage from './components/Footer';

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
  const t = useTranslations('HomePage');
  return (
    <main className="bg-white">
      <Header />
      <h1>{t('title')}</h1>
      <Carousel />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Featurs />
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductsByIdsView />
      </section>
      <FooterPage />
    </main>
  );
}