export default function DashboardAdmin() {
  return (
    <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Static Navigation</h1>
          <nav className="text-sm text-gray-600 mb-4">
            <ol className="flex space-x-2">
              <li>
                <a href="index.html" className="text-blue-600 hover:underline">Dashboard</a>
              </li>
              <li>/</li>
              <li className="text-gray-800">Static Navigation</li>
            </ol>
          </nav>

          <div className="bg-white shadow rounded mb-4">
            <div className="p-4">
              <p className="mb-0">
                This page is an example of using static navigation. By removing the
                <code className="bg-gray-200 text-red-600 px-1 mx-1 rounded text-sm">.sb-nav-fixed</code>
                class from the
                <code className="bg-gray-200 text-red-600 px-1 mx-1 rounded text-sm">body</code>
                , the top navigation and side navigation will become static on scroll. Scroll down this page to see an example.
              </p>
            </div>
          </div>

          <div style={{ height: '100vh' }}></div>

          <div className="bg-white shadow rounded">
            <div className="p-4">
              When scrolling, the navigation stays at the top of the page. This is the end of the static navigation demo.
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between text-sm text-gray-600">
          <div>&copy; Your Website 2023</div>
          <div className="space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>&middot;</span>
            <a href="#" className="hover:underline">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
