'use client'

export default function Featurs() {
  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded-full mx-auto mb-5">
              <i className="fas fa-car-side fa-2x"></i>
            </div>
            <h5 className="text-black font-semibold">Free Shipping</h5>
            <p className="text-sm text-gray-600">Free on order over $300</p>
          </div>

          {/* Feature 2 */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded-full mx-auto mb-5">
              <i className="fas fa-user-shield fa-2x"></i>
            </div>
            <h5 className="text-black font-semibold">Security Payment</h5>
            <p className="text-sm text-gray-600">100% security payment</p>
          </div>

          {/* Feature 3 */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded-full mx-auto mb-5">
              <i className="fas fa-exchange-alt fa-2x"></i>
            </div>
            <h5 className="text-black font-semibold">30 Day Return</h5>
            <p className="text-sm text-gray-600">30 day money guarantee</p>
          </div>

          {/* Feature 4 */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded-full mx-auto mb-5">
              <i className="fas fa-phone-alt fa-2x"></i>
            </div>
            <h5 className="text-black font-semibold">24/7 Support</h5>
            <p className="text-sm text-gray-600">Support every time fast</p>
          </div>
        </div>
      </div>
    </div>
  );
}
