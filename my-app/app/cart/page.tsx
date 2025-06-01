'use client';
import Link from 'next/link';
import { useCart } from '../context/CartContextType';

const API_BASE_URL ='http://localhost:8080';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + (item.product.price || 0) * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <Link href="/products">
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md">
              Continue Shopping
            </button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart ({totalItems} items)</h1>
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center border rounded-lg p-4 shadow-sm"
            >
              <img
                src={item.product.imageUrl?.startsWith('http') ? item.product.imageUrl : `${API_BASE_URL}${item.product.imageUrl || '/placeholder-product.png'}`}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-product.png';
                }}
              />
              <div className="ml-4 flex-grow">
                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                <p className="text-gray-600">${item.product.price?.toFixed(2) || 'N/A'}</p>
                <h2 className="text-lg "> Size: {item.product.size}</h2>
                <h2 className="text-lg ">Brand: {item.product.brand}</h2>

                
                
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="font-bold">${((item.product.price || 0) * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700"
          >
            Clear Cart
          </button>
          <div>
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}