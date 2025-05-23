export default function FooterPage() {
  return (
    <footer className="py-10 border-t text-gray-700 text-sm bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            {
              title: 'Info',
              links: ['Track Your Order', 'Our Blog', 'Privacy policy', 'Shipping', 'Contact Us', 'Help', 'Community'],
            },
            {
              title: 'About',
              links: ['History', 'Our Team', 'Services', 'Company', 'Manufacture', 'Wholesale', 'Retail'],
            },
            {
              title: 'Women Shoes',
              links: ['Track Your Order', 'Our Blog', 'Privacy policy', 'Shipping', 'Contact Us', 'Help', 'Community'],
            },
            {
              title: 'Popular',
              links: ['Prices Drop', 'New Products', 'Best Sales', 'Stores', 'Login', 'Cart'],
            },
            {
              title: 'Mens Collection',
              links: ['Delivery', 'About Us', 'Shoes', 'Contact Us'],
            },
          ].map((section, index) => (
            <div key={index}>
              <h5 className="text-base font-semibold mb-2">{section.title}</h5>
              <ul className="space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get In Touch */}
          <div>
            <h5 className="text-base font-semibold mb-3">Get In Touch</h5>
            <div className="space-y-1">
              <p>Stylish Online Store, 123 Main Street, Toulouse - France.</p>
              <p>Call us: (+33) 800 456 789-987</p>
              <p>
                <a href="mailto:contact@yourwebsite.com" className="text-blue-600 hover:underline font-semibold">
                  contact@yourwebsite.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-xs text-gray-500">
          <p>© Copyright Stylish 2023.</p>
          <p className="text-right">
            Free HTML by{' '}
            <a href="https://templatesjungle.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              TemplatesJungle
            </a>{' '}
            – Distributed by{' '}
            <a href="https://themewagon.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              ThemeWagon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
