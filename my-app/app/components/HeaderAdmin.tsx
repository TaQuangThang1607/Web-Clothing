'use client'
export default function HeaderAdmin() {
  return (
    <nav className="bg-gray-900 text-white flex items-center justify-between px-4 py-2">
      {/* Navbar Brand */}
      <a href="/" className="text-lg font-semibold">
        Start Bootstrap
      </a>

      {/* Sidebar Toggle */}
      <button className="text-white text-xl lg:hidden mr-4" id="sidebarToggle">
        <i className="fas fa-bars"></i>
      </button>

      {/* Navbar Search */}
      <form className="hidden md:block ml-auto mr-4">
        <div className="flex items-center border border-gray-600 rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            className="px-3 py-1 bg-gray-800 text-white focus:outline-none"
          />
          <button
            type="button"
            id="btnNavbarSearch"
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>

      {/* Navbar Dropdown */}
      <div className="relative">
        <button
          className="focus:outline-none"
          id="navbarDropdown"
          type="button"
        >
          <i className="fas fa-user fa-fw text-xl"></i>
        </button>
        {/* Dropdown (ẩn mặc định, có thể dùng state hoặc plugin để bật) */}
        <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded hidden group-hover:block z-50">
          <li>
            <a className="block px-4 py-2 hover:bg-gray-100" href="#!">
              Settings
            </a>
          </li>
          <li>
            <a className="block px-4 py-2 hover:bg-gray-100" href="#!">
              Activity Log
            </a>
          </li>
          <li>
            <hr className="border-t" />
          </li>
          <li>
            <a className="block px-4 py-2 hover:bg-gray-100" href="#!">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
