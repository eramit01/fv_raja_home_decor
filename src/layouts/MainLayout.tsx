import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// import { useSelector } from 'react-redux';
import { Header } from '../components/Header';
import { CheckoutHeader } from '../components/CheckoutHeader';
import { BottomNav } from '../components/BottomNav';
import { CategorySection } from '../components/CategorySection';

import { CartDrawer } from '../components/CartDrawer';
// import { RootState } from '../store';

import { categoryService, Category } from '../services/category.service';

import { AnnouncementBar } from '../components/AnnouncementBar';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

export const MainLayout = () => {
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  // const { isCartOpen } = useSelector((state: RootState) => state.cart); -> Unused

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        if (response?.data?.categories) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories in MainLayout', error);
      }
    };
    fetchCategories();
  }, []);

  // Hide category section and bottom nav on specific pages
  const isCheckoutPage = location.pathname === '/checkout';
  const isBulkEnquiryPage = location.pathname === '/bulk-enquiry';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // Routes where CategorySection should be hidden
  const hiddenCategoryRoutes = ['/profile', '/orders', '/wishlist', '/bulk-enquiry', '/login', '/about'];
  const isHiddenCategoryRoute = hiddenCategoryRoutes.some(path =>
    location.pathname === path || location.pathname.startsWith('/orders/') || location.pathname.startsWith('/tracking/')
  );

  const isProductPage = location.pathname.startsWith('/product/');
  const showBottomNav = !isCheckoutPage && !isProductPage;

  return (
    <div className={`min-h-screen bg-gray-50 ${showBottomNav ? 'pb-16' : ''} md:pb-0`}>

      {isCheckoutPage ? (
        <CheckoutHeader />
      ) : isBulkEnquiryPage ? null : (
        <>
          {/* Announcement Bar */}
          <AnnouncementBar />

          {/* Header - Internal responsive logic handles visibility */}
          <Header />

          {/* Global categories bar - hide on checkout, account, and enquiry pages */}
          {categories.length > 0 && !isHiddenCategoryRoute && (
            <div className="bg-white mt-1 md:mt-2">
              <div className="container mx-auto px-4">
                <CategorySection categories={categories} />
              </div>
            </div>
          )}
        </>
      )}

      <main>
        <Outlet />
      </main>

      {/* Footer - Hide on checkout entirely, hide on mobile for auth pages */}
      {!isCheckoutPage && (
        <div className={isAuthPage ? "hidden md:block" : ""}>
          <Footer />
        </div>
      )}

      {/* Mobile bottom navigation */}
      {showBottomNav && <BottomNav />}

      {/* <WhatsAppButton /> */}

      {/* Global Cart Drawer */}
      <CartDrawer />
    </div>
  );
};
