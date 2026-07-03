import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
        Quick Links
      </h3>

      <nav className="flex flex-col gap-3 text-sm">
        <Link to="/" className="hover:text-[#DC2626]">
          Home
        </Link>
        <Link to="/trending" className="hover:text-[#DC2626]">
          Trending
        </Link>
        <Link to="/latest" className="hover:text-[#DC2626]">
          Latest
        </Link>
        <Link to="/contact" className="hover:text-[#DC2626]">
          Contact
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;