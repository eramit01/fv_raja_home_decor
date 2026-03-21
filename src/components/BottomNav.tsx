import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiShoppingCart } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

export const BottomNav = () => {
  const location = useLocation();
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/cart', icon: FiShoppingCart, label: 'Cart', badge: cartItemCount },
    { path: isAuthenticated ? '/orders' : '/login', icon: FiUser, label: isAuthenticated ? 'Account' : 'Login' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isCart = item.label === 'Cart';

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center w-16 h-12 transition-all duration-300 ${isActive ? 'text-gray-900' : 'text-gray-400'
                }`}
            >
              <div className="relative">
                <Icon className={`${isActive ? 'text-2xl' : 'text-xl'} transition-all duration-300`} />

                {isCart && cartItemCount > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={cartItemCount}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                        duration: 0.2
                      }}
                      className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      {cartItemCount}
                    </motion.span>
                  </AnimatePresence>
                )}

                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
