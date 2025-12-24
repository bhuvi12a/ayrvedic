'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '../../../public/logo.jpeg';

// Logo component that can be reused in both desktop and mobile views
const Logo = ({ size = 24, className = "" }) => (
  <Image 
    src={logo} 
    alt="Traditional Siddha Ayurveda Clinic Logo" 
    width={size} 
    height={size} 
    className={className}
  />
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const firstMenuItemRef = useRef(null);
  const lastMenuItemRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      isMenuOpen &&
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(event.target as Node) &&
      buttonRef.current &&
      !(buttonRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
      buttonRef.current?.focus();
    }
  }, [isMenuOpen]);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMenuOpen && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [isMenuOpen]);

  // Handle tab key in mobile menu for focus trapping
  const handleTabKey = useCallback((event: KeyboardEvent) => {
    if (!isMenuOpen) return;
    
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstMenuItemRef.current) {
          event.preventDefault();
          lastMenuItemRef.current?.focus();
        }
      } else {
        if (document.activeElement === lastMenuItemRef.current) {
          event.preventDefault();
          firstMenuItemRef.current?.focus();
        }
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [handleScroll]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('keydown', handleTabKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [handleClickOutside, handleEscapeKey, handleTabKey]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'About', href: '/About', icon: '👤' },
    { name: 'Services', href: '/Services', icon: '🌿' },
    { name: 'Treatments', href: '/Treatments', icon: '💆‍♀️' },
    { name: 'Products', href: '/Products', icon: '📦' },
    { name: 'Contact', href: '/Contact', icon: '📞' },
  ];

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white p-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 md:py-3' 
            : 'bg-transparent py-2 md:py-4'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center" aria-label="Traditional Siddha Ayurveda Clinic Home">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mr-2 sm:mr-3 md:mr-3 shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                    <Logo size={20} className="relative z-10" />
                  </div>
                  <span className="font-bold text-sm sm:text-base md:text-base lg:text-lg text-gray-800 hidden sm:block">Traditional Siddha Ayurveda Clinic</span>
                  <span className="font-bold text-xs sm:text-sm md:text-xs text-gray-800 sm:hidden">TSAC</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <div className="flex items-center bg-gray-100 bg-opacity-50 backdrop-blur-sm rounded-full p-1 border border-white/30 shadow-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base ${
                      pathname === link.href
                        ? 'bg-white text-emerald-600 shadow-sm'
                        : 'text-gray-700 hover:bg-white/50'
                    }`}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/Appointment"
                className="ml-1 sm:ml-2 lg:ml-3 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center text-xs sm:text-sm lg:text-base"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Book Now</span>
                <span className="sm:hidden">Book</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
                {!isMenuOpen ? (
                  <svg className="block h-5 w-5 sm:h-6 sm:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-5 w-5 sm:h-6 sm:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Responsive Design */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`fixed top-0 left-0 w-full h-full bg-gradient-to-b from-white to-emerald-50 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ height: '100vh' }}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md">
              <div className="flex items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center mr-3 sm:mr-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                  <Logo size={28} className="relative z-10" />
                </div>
                <span className="font-bold text-lg sm:text-xl">Traditional Siddha Ayurveda Clinic</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Menu Content */}
            <div className="flex-1 overflow-y-auto py-4 sm:py-5">
              <div className="px-4 sm:px-5">
                {/* Navigation Links with Responsive Design */}
                <div className="mb-5 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Explore Our Services</h2>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {navLinks.map((link, index) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        ref={index === 0 ? firstMenuItemRef : index === navLinks.length - 1 ? lastMenuItemRef : undefined}
                        className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                          pathname === link.href
                            ? 'bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-300 shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-100'
                        }`}
                        aria-current={pathname === link.href ? 'page' : undefined}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-3xl sm:text-4xl mb-2 sm:mb-3">{link.icon}</span>
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Responsive Appointment Button */}
                <div className="mb-6 sm:mb-7">
                  <Link
                    href="/Appointment"
                    className="block w-full px-5 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl sm:rounded-2xl font-bold text-center shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center text-base sm:text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Appointment
                  </Link>
                </div>
                
                {/* Responsive Contact Information */}
                {/* <div className="mb-6 sm:mb-7">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Get in Touch</h2>
                  <div className="space-y-3 sm:space-y-4">
                    <a href="tel:+15551234567" className="flex items-center p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-emerald-100 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-emerald-200 transition-colors">
                        <svg className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm sm:text-base text-gray-500">Phone</p>
                        <p className="font-medium text-gray-800 text-base sm:text-lg">+1 (555) 123-4567</p>
                      </div>
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    <a href="mailto:info@ayurvedik.com" className="flex items-center p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-emerald-100 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-emerald-200 transition-colors">
                        <svg className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm sm:text-base text-gray-500">Email</p>
                        <p className="font-medium text-gray-800 text-base sm:text-lg">info@tsac.com</p>
                      </div>
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div> */}
                
                Responsive Opening Hours
                <div className="mb-6 sm:mb-7">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Opening Hours</h2>
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm">
                    <div className="flex justify-between items-center mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100">
                      <span className="text-gray-600 text-sm sm:text-base">Monday - Sunday</span>
                      <span className="font-medium text-gray-800 text-base sm:text-lg">9:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Saturday</span>
                      <span className="font-medium text-gray-800 text-base sm:text-lg">10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Responsive Mobile Menu Footer */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-emerald-100">
              <div className="flex justify-center space-x-6 sm:space-x-8 mb-4 sm:mb-5">
                <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors transform hover:scale-110">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors transform hover:scale-110">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors transform hover:scale-110">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
              <p className="text-center text-gray-600 text-sm sm:text-base">
                © {new Date().getFullYear()} Traditional Siddha Ayurveda Clinic
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;