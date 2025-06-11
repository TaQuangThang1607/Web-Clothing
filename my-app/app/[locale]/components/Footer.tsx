export default function FooterPage() {
  return (
    <footer className="py-10 border-t text-gray-700 text-sm bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            {
              title: 'Thông tin',
              links: [
                'Theo dõi đơn hàng',
                'Blog thời trang',
                'Chính sách bảo mật',
                'Vận chuyển & Giao hàng',
                'Liên hệ',
                'Hướng dẫn mua hàng',
                'Cộng đồng khách hàng',
              ],
            },
            {
              title: 'Về chúng tôi',
              links: ['Lịch sử phát triển', 'Đội ngũ', 'Dịch vụ', 'Giới thiệu', 'Nhà sản xuất', 'Bán sỉ', 'Bán lẻ'],
            },
            {
              title: 'Giày nữ',
              links: [
                'Sneaker nữ',
                'Boots nữ',
                'Giày cao gót',
                'Giày thể thao',
                'Sản phẩm bán chạy',
                'Hàng mới về',
                'Khuyến mãi',
              ],
            },
            {
              title: 'Phổ biến',
              links: ['Giảm giá', 'Sản phẩm mới', 'Bán chạy', 'Hệ thống cửa hàng', 'Đăng nhập', 'Giỏ hàng'],
            },
            {
              title: 'Giày nam',
              links: ['Giày thể thao', 'Giày lười', 'Giày da', 'Sandal nam'],
            },
          ].map((section, index) => (
            <div key={index}>
              <h5 className="text-base font-semibold mb-2">{section.title}</h5>
              <ul className="space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-blue-600 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Liên hệ */}
          <div>
            <h5 className="text-base font-semibold mb-3">Liên hệ</h5>
            <div className="space-y-1 text-sm">
              <p>Stylish Shoe Store, 123 Đường Chính, Quận 1, TP. HCM</p>
              <p>Gọi ngay: 0123 456 789</p>
              <p>
                <a href="mailto:lienhe@giaydep.vn" className="text-blue-600 hover:underline font-semibold">
                  lienhe@giaydep.vn
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Chân trang */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-xs text-gray-500">
          <p>© Bản quyền thuộc về Stylish Shoes 2025.</p>
          <p className="text-right">
            Mẫu giao diện từ{' '}
            <a
              href="https://templatesjungle.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              TemplatesJungle
            </a>{' '}
            – Phân phối bởi{' '}
            <a
              href="https://themewagon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              ThemeWagon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
