'use client'
import UserActions from './UserActions';
import DesktopNavigation from './DesktopNavigation';
import MobileSearch from './Mobile/MobileSearch';
import MobileMenu from './Mobile/MobileMenu';
import { useLocale } from 'next-intl';
import { Logo } from './Logo';
import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {

  const language = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(true);

  // Handle Scroll Behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50 && !isScrolled) {
        setIsScrolled(true);
        setIsSearchOpen(false);
      } else if (scrollPosition <= 50 && isScrolled) {
        setIsScrolled(false);
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]); // Added dependency on isScrolled

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="w-full sticky top-0 z-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Main Navbar */}
      <nav className={`bg-white border-b-2 border-red-600 shadow-lg transition-all duration-300 ${isScrolled ? 'py-1' : 'py-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center">
              {/*  Unified Menu - Hidden on Desktop */}
              <div className="lg:hidden mr-2 rtl:mr-0 rtl:ml-2">
                <MobileMenu />
              </div>

              {/* Logo */}
              <Logo />
            </div>

            {/* DesktopNavigation - Visible on Desktop */}
            <DesktopNavigation />

            {/* Right Section */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">

              {/* Search Toggle Icon - Visible when scrolled */}
              <div className={`transition-all duration-300 transform ${isScrolled ? 'opacity-100 scale-100 w-auto' : 'opacity-0 scale-0 w-0 overflow-hidden'}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="text-gray-700 hover:text-red-600 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-full"
                >
                  {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                </Button>
              </div>

              <UserActions />
            </div>
          </div>
        </div>

        {/* Global Search - Collapsible */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isSearchOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="relative">
            {/* Close Button for Manual Closing when at top? Optional, but good UX if user wants to hide it manually */}
            {/* But user req is about scrolling. Let's keep it simple. */}
            <MobileSearch />
          </div>
        </div>
      </nav>


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