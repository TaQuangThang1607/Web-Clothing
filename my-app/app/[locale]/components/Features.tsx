'use client';

import { useTranslations } from 'next-intl';

export default function Features() {
  const t = useTranslations('Features');

  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded-full mx-auto mb-5">
              <i className="fas fa-car-side fa-2x"></i>
            </div>
            <h5 className="text-black font-semibold">{t('freeShippingTitle')}</h5>
            <p className="text-sm text-gray-600">{t('freeShippingDesc')}</p>
          </div>

          {/* Feature 2 */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded-full mx-auto mb-5">
              <i className="fas fa-user-shield fa-2x"></i>
            </div>
            <h5 className="text-black font-semibold">{t('securePaymentTitle')}</h5>
            <p className="text-sm text-gray-600">{t('securePaymentDesc')}</p>
          </div>

          {/* Feature 3 */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded-full mx-auto mb-5">
              <i className="fas fa-exchange-alt fa-2x"></i>
            </div>
            <h5 className="text-black font-semibold">{t('returnPolicyTitle')}</h5>
            <p className="text-sm text-gray-600">{t('returnPolicyDesc')}</p>
          </div>

          {/* Feature 4 */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded-full mx-auto mb-5">
              <i className="fas fa-phone-alt fa-2x"></i>
            </div>
            <h5 className="text-black font-semibold">{t('supportTitle')}</h5>
            <p className="text-sm text-gray-600">{t('supportDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}