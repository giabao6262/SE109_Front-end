import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Newspaper,
  Search,
  User,
  UserCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { isAuthenticated, isAdmin, currentUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-[#0F172A] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Newspaper className="h-8 w-8 text-[#F59E0B]" />
              <span className="text-xl font-bold">FootballNews</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-[#F59E0B] transition-colors">
              Home
            </Link>
            <Link
              to="/categories"
              className="hover:text-[#F59E0B] transition-colors"
            >
              Categories
            </Link>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="px-4 py-1 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </form>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="hover:text-[#F59E0B] transition-colors"
                  >
                    Admin
                  </Link>
                )}{" "}
                <div className="flex items-center space-x-2 group relative">
                  {currentUser?.profile_picture_url ? (
                    <img
                      src={`http://localhost:3000${currentUser?.profile_picture_url}`}
                      alt={currentUser.username}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-8 w-8" />
                  )}

                  <span>{currentUser?.username}</span>

                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                      <Link
                        to={isAdmin ? "/admin/settings" : "/update-profile"}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Update Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-gray-700">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block hover:text-[#F59E0B] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="block hover:text-[#F59E0B] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="px-4 py-2 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </form>

            {isAuthenticated ? (
              <div className="space-y-3 pt-2 border-t border-gray-700">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block hover:text-[#F59E0B] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}{" "}
                <div className="flex items-center space-x-2">
                  {" "}
                  {currentUser?.profile_picture_url ? (
                    <img
                      src={`http://localhost:3000${currentUser.profile_picture_url}`}
                      alt={currentUser.username}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-8 w-8" />
                  )}
                  <span>{currentUser?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-700">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 hover:text-[#F59E0B] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
