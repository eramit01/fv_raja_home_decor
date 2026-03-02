import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FiShoppingCart, FiUser, FiHeart, FiSearch, FiShoppingBag } from 'react-icons/fi';
import { SearchBar } from './SearchBar';
import { useWishlist } from '../context/WishlistContext';
import { authService } from '../services/auth.service';
import { logout } from '../store/slices/authSlice';
import { clearCart, closeCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';

export const Header = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');

  const dispatch = useDispatch();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent, query: string) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/category/search?q=${encodeURIComponent(query)}`);
      setMobileSearchQuery(''); // Clear mobile search after submit
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      dispatch(clearCart());
      dispatch(closeCart());
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Mobile Layout */}
        <div className="md:hidden py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center group">
              <img src="/banners/Logo/logo2.png" alt="Raja Home Decor" className="h-16 w-auto object-contain" />
            </Link>

            {/* Bulk Inquiry Button */}
            <button
              onClick={() => navigate('/bulk-enquiry')}
              className="bg-accent hover:bg-accent-hover text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95"
            >
              Bulk Order
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={(e) => handleSearch(e, mobileSearchQuery)} className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-700 text-sm bg-gray-50 transition-all placeholder:text-gray-400"
            />
          </form>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-8 py-4">
          {/* Left - Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <img src="/banners/Logo/logo2.png" alt="Raja Home Decor" className="h-20 w-auto object-contain" />
          </Link>

          {/* Center - Search */}
          <div className="flex-1 max-w-2xl px-4">
            <SearchBar />
          </div>

          {/* Right - Account, Cart, Bulk Inquiry */}
          <div className="flex items-center gap-8 whitespace-nowrap">
            {/* Account - Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setShowUserMenu(true)}
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <Link
                to={isAuthenticated ? "/profile" : "/login"}
                className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors group py-2"
              >
                <FiUser className="text-xl group-hover:stroke-2" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-xs text-gray-400 font-normal">
                    {isAuthenticated ? `Hi, ${user?.name?.split(' ')[0] || 'User'}` : 'Welcome'}
                  </span>
                  <span className="text-sm font-medium">
                    {isAuthenticated ? 'My Account' : 'Login / Sign Up'}
                  </span>
                </div>
              </Link>

              {/* Dropdown Menu */}
              {isAuthenticated && (
                <div className="absolute right-0 top-full w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.phone}</p>
                    </div>

                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                      Wishlist
                    </Link>

                    <div className="border-t border-gray-50 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            {isAuthenticated && (
              <Link
                to="/cart"
                className="relative flex items-center gap-2 text-gray-700 hover:text-black transition-colors group"
              >
                <FiShoppingCart className="text-xl group-hover:stroke-2" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
                    {cartItemCount}
                  </span>
                )}
                <span className="text-sm font-medium">Cart</span>
              </Link>
            )}

            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                to="/wishlist"
                className="relative flex items-center gap-2 text-gray-700 hover:text-black transition-colors group"
              >
                <FiHeart className="text-xl group-hover:stroke-2" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
                    {wishlistCount}
                  </span>
                )}
                <span className="text-sm font-medium">Wishlist</span>
              </Link>
            )}

            {/* Bulk Inquiry CTA */}
            <button
              onClick={() => navigate('/bulk-enquiry')}
              className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-lg hover:shadow-accent/30 flex items-center gap-2"
            >
              <FiShoppingBag className="w-4 h-4" />
              Bulk Inquiry
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
