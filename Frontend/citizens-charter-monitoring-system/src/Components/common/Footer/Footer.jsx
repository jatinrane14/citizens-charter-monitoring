import React from 'react'

function Footer() {
    const FOOTER_LINKS = ["Privacy Policy", "Terms of Use", "Contact", "Help"];
  return (
    <footer className="bg-gray-950 border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-1 14H5V8h14v10zm-7-7a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500">
            © 2026 Department of Posts, Government of India. All rights reserved.
          </p>
        </div>
        <div className="flex gap-5 flex-wrap justify-center">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors no-underline"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer
