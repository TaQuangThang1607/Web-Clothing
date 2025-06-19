
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCartApi, clearCartApi, CartDetail } from '../services/client/CartService';
import { createOrderApi, OrderInput } from '../services/client/OrderService';
import FooterPage from '../components/Footer';
import Header from '../components/Header';
import { useLocale, useTranslations } from 'next-intl';

const API_BASE_URL = 'http://localhost:8080';

export default function OrderPage() {
  const [cart, setCart] = useState<CartDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<OrderInput>({
    receiverName: '',
    receiverAddress: '',
    receiverPhone: '',
    receiverNote: '',
    paymentMethod: 'CASH',
    items: [],
  });
  const [formErrors, setFormErrors] = useState<{
    receiverName?: string;
    receiverAddress?: string;
    receiverPhone?: string;
  }>({});
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('OrderPage');

  const formatPrice = (price: number) => {
    if (locale === 'vi') {
      return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) + ' VND';
    }
    const exchangeRate = 26100; // 1 USD = 26.100 VND
    const priceInUSD = price / exchangeRate;
    return '$' + priceInUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Tải giỏ hàng khi component mount
  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartItems = await getCartApi();
      if (cartItems.length === 0) {
        setError(t('cartEmpty'));
        toast.error(t('cartEmpty'));
      } else {
        setCart(cartItems);
        setFormData((prev) => ({
          ...prev,
          items: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size || '',
            color: item.brand || '',
          })),
        }));
        setError(null);
      }
    } catch (err: any) {
      setError(t('fetchCartError'));
      toast.error(t('fetchCartError'));
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi input trong form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Xóa lỗi khi người dùng bắt đầu nhập
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Hàm validate form
  const validateForm = (): boolean => {
    const errors: { receiverName?: string; receiverAddress?: string; receiverPhone?: string } = {};
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!formData.receiverName.trim()) {
      errors.receiverName = t('nameRequired');
    } else if (formData.receiverName.trim().length < 2) {
      errors.receiverName = t('nameMinLength');
    }

    if (!formData.receiverAddress.trim()) {
      errors.receiverAddress = t('addressRequired');
    } else if (formData.receiverAddress.trim().length < 5) {
      errors.receiverAddress = t('addressMinLength');
    }

    if (!formData.receiverPhone.trim()) {
      errors.receiverPhone = t('phoneRequired');
    } else if (!phoneRegex.test(formData.receiverPhone.trim())) {
      errors.receiverPhone = t('phoneInvalid');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Xử lý gửi form để tạo đơn hàng
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(t('invalidForm')); 
      return;
    }
    if (formData.items.length === 0) {
      toast.error(t('emptyCartOrder')); 
      return;
    }
    try {
      const order = await createOrderApi(formData);
      await clearCartApi();
      setCart([]);
      toast.success(t('orderSuccess', { orderCode: order.orderCode })); 
      router.push('/history');
    } catch (err: any) {
      toast.error(t('orderError'));
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Đang tải...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Lỗi</h1>
        <p className="text-red-500 text-lg">{error}</p>
        <Link href="/products">
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md">
            Tiếp tục mua sắm
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('checkout')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phần hiển thị giỏ hàng */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {t('cartItems', { totalItems })}
            </h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={
                      item.productImageUrl?.startsWith('http')
                        ? item.productImageUrl
                        : `${API_BASE_URL}${item.productImageUrl || '/placeholder-product.png'}`
                    }
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-product.png';
                    }}
                  />
                  <div className="ml-4 flex-grow">
                    <h2 className="text-lg font-semibold">{item.productName}</h2>
                    <p className="text-gray-600">{formatPrice(item.price)}</p>
                    <p className="text-lg">{t('size')}: {item.size || 'N/A'}</p>
                    <p className="text-lg">{t('brand')}: {item.brand || 'N/A'}</p>
                    <p className="text-lg">{t('quantity')}: {item.quantity}</p>
                  </div>
                  <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xl font-bold">
              {t('total')}: {formatPrice(totalPrice)}
            </p>
          </div>

          {/* Phần form nhập thông tin giao hàng */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">{t('shippingInfo')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700">
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="receiverName"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border rounded-md p-2 ${
                    formErrors.receiverName ? 'border-red-500' : ''
                  }`}
                />
                {formErrors.receiverName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.receiverName}</p>
                )}
              </div>
              <div>
                <label htmlFor="receiverAddress" className="block text-sm font-medium text-gray-700">
                  {t('address')}
                </label>
                <input
                  type="text"
                  id="receiverAddress"
                  name="receiverAddress"
                  value={formData.receiverAddress}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border rounded-md p-2 ${
                    formErrors.receiverAddress ? 'border-red-500' : ''
                  }`}
                />
                {formErrors.receiverAddress && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.receiverAddress}</p>
                )}
              </div>
              <div>
                <label htmlFor="receiverPhone" className="block text-sm font-medium text-gray-700">
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  id="receiverPhone"
                  name="receiverPhone"
                  value={formData.receiverPhone}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border rounded-md p-2 ${
                    formErrors.receiverPhone ? 'border-red-500' : ''
                  }`}
                  pattern="^\+?[1-9]\d{1,14}$"
                />
                {formErrors.receiverPhone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.receiverPhone}</p>
                )}
              </div>
              <div>
                <label htmlFor="receiverNote" className="block text-sm font-medium text-gray-700">
                  {t('note')}
                </label>
                <textarea
                  id="receiverNote"
                  name="receiverNote"
                  value={formData.receiverNote}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                  {t('paymentMethod')}
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-md p-2"
                >
                  <option value="CASH">{t('cash')}</option>
                  <option value="CARD">{t('card')}</option>
                  <option value="TRANSFER">{t('transfer')}</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md"
                disabled={loading}
              >
                {t('complete')}
              </button>
            </form>
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
}