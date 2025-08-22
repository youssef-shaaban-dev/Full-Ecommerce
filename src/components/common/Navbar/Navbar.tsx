'use client'
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import DesktopNavigation from './DesktopNavigation';
import SearchBar from './SearchBar';
import UserActions from './UserActions';
import MobileSearch from './Mobile/MobileSearch';
import MobileMenu from './Mobile/MobileMenu';
import { useLocale } from 'next-intl';

export default function Navbar() {

  const language = useLocale();

  const categories = [
    { id: 1, name: 'عروض اليوم', href: '/deals' },
    { id: 2, name: 'خدمة العملاء', href: '/support' },
    { id: 3, name: 'سجل الطلبات', href: '/orders' },
    { id: 4, name: 'بطاقات الهدايا', href: '/gift-cards' }
  ];


  return (
    <div className="w-full" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Main Navbar */}
      <nav className="bg-white border-b-2 border-red-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Logo />

            {/* DesktopNavigation */}
            <DesktopNavigation />

            {/*  Mobile Menu */}
            <MobileMenu />

            {/* SearchBar */}
            <SearchBar />

            {/* Right Section */}
            <UserActions />
          </div>
        </div>

        {/* MobileSearch */}
        <MobileSearch />
      </nav>

      {/* Secondary Navigation - Desktop Only */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 font-medium"
                  asChild
                >
                  <a href={category.href}>{category.name}</a>
                </Button>
              ))}
            </div>

            <div className="text-gray-600 text-sm font-medium">
              {language === 'ar' ? '🚚 شحن مجاني للطلبات أكثر من 200 ريال' : '🚚 Free shipping on orders over $50'}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-scale {
          animation: fadeInScale 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}