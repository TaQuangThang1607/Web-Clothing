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
            <h5 className="text-black font-semibold">Miễn phí vận chuyển</h5>
            <p className="text-sm text-gray-600">Miễn phí cho đơn hàng trên 2.000.000 VND</p>
          </div>

          {/* Feature 2 */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded-full mx-auto mb-5">
              <i className="fas fa-user-shield fa-2x"></i>
            </div>
            <h5 className="text-black font-semibold">Thanh toán bảo mật</h5>
            <p className="text-sm text-gray-600">100% Thanh toán bảo mật</p>
          </div>

          {/* Feature 3 */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded-full mx-auto mb-5">
              <i className="fas fa-exchange-alt fa-2x"></i>
            </div>
            <h5 className="text-black font-semibold">Trả hàng trong vòng 30 ngày</h5>
            <p className="text-sm text-gray-600">Đảm bảo hoàn tiền trong 30 ngày</p>
          </div>

          {/* Feature 4 */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded-full mx-auto mb-5">
              <i className="fas fa-phone-alt fa-2x"></i>
            </div>
            <h5 className="text-black font-semibold">Hỗ trợ 24/7</h5>
            <p className="text-sm text-gray-600">Hỗ trợ mọi lúc nhanh chóng</p>
          </div>
        </div>
      </div>
    </div>
  );
}
