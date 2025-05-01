import { Link, useLocation } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Lucide icons, very clean
import Profile from "./Profile";
import { useAuth } from "./hooks/useAuth";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
        >
          Blogify
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link
            to="/"
            className={`hover:text-blue-500 transition-colors ${
              location.pathname === "/"
                ? "text-blue-600 underline underline-offset-4"
                : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/posts"
            className={`hover:text-blue-500 transition-colors ${
              location.pathname === "/posts"
                ? "text-blue-600 underline underline-offset-4"
                : ""
            }`}
          >
            Posts
          </Link>

          {isAuthenticated && (
            <Link
              to="/posts/create"
              className={`hover:text-blue-500 transition-colors ${
                location.pathname === "/posts/create"
                  ? "text-blue-600 underline underline-offset-4"
                  : ""
              }`}
            >
              Create Post
            </Link>
          )}

          {isAuthenticated ? (
            <Profile />
          ) : (
            <Link
              to="/auth/login"
              className="hover:text-blue-500 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 text-gray-700 font-medium">
          <Link
            to="/"
            className={`hover:text-blue-500 transition-colors ${
              location.pathname === "/"
                ? "text-blue-600 underline underline-offset-4"
                : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/posts"
            className={`hover:text-blue-500 transition-colors ${
              location.pathname === "/posts"
                ? "text-blue-600 underline underline-offset-4"
                : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Posts
          </Link>

          {isAuthenticated && (
            <Link
              to="/posts/create"
              className={`hover:text-blue-500 transition-colors ${
                location.pathname === "/posts/create"
                  ? "text-blue-600 underline underline-offset-4"
                  : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Create Post
            </Link>
          )}

          {isAuthenticated ? (
            <Profile />
          ) : (
            <Link
              to="/auth/login"
              className="hover:text-blue-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
