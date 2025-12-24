'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import logo from '../../../public/logo.jpeg'

interface HeroSectionProps {
  logoSrc?: string;
}

export default function HeroSection({ logoSrc }: HeroSectionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-start md:items-center pt-28 pb-12 md:pt-0 md:pb-0 bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwNzhiNzMiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOTEzOSAxLjc5MDg2MS00IDQtNCBoMTZjMi4yMDkxMzkgMCA0IDEuNzkwODYxIDQgNHYxNmMwIDIuMjA5MTM5LTEuNzkwODYxIDQtNCA0aC0xNmMtMi4yMDkxMzkgMC00LTEuNzkwODYxLTQtNHYtMTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      {/* Decorative elements - adjusted for mobile */}
      <div className="absolute top-24 md:top-10 right-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-emerald-200/20 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-teal-200/20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text Content */}
          <div className={`space-y-6 md:space-y-8 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000`}>
            <div>
              <span className="inline-block px-3 py-1 md:px-4 md:py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
                Traditional Siddha Ayurveda Clinic
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Your Journey to <span className="text-emerald-600">Holistic Wellness</span> Begins Here
              </h1>
            </div>

            <p className="text-base md:text-lg text-gray-600 max-w-lg">
              Experience the ancient wisdom of Ayurveda combined with modern wellness practices. Our personalized treatments help restore balance and harmony to your mind, body, and spirit.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <Link
                href="/Appointment"
                className="px-6 py-3 md:px-8 md:py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                Book Consultation
                <svg className="ml-2 w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/Services"
                className="px-6 py-3 md:px-8 md:py-3 bg-white text-emerald-600 font-medium rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors duration-300 flex items-center justify-center"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust indicators - adjusted for mobile */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-4 md:pt-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm md:text-base">Certified Practitioners</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm md:text-base">Natural Treatments</span>
              </div>
            </div>
          </div>

          {/* Visual Content - adjusted for mobile */}
          <div className={`relative ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-1000 delay-300`}>
            <div className="relative">
              {/* Main image card - Logo container */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center p-4 md:p-8">
                  <div className="text-center">
                    {/* Logo container without background - original size */}
                    <div className="inline-block mb-4 md:mb-6">
                      <Image
                        src={logoSrc || logo}
                        alt="Tradition Ayurvedik Logo"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-auto max-w-full"
                        style={{ maxHeight: '150px' }}
                        priority
                      />
                    </div>
                    <p className="text-gray-600 text-sm md:text-base">Your Path to Balanced Living</p>
                  </div>
                </div>
              </div>

              {/* Floating cards - adjusted for mobile */}
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl md:rounded-2xl shadow-lg p-3 md:p-4 transform rotate-6">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl mb-1">🌿</div>
                    <p className="text-xs md:text-sm font-medium text-gray-700">Natural Healing</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl md:rounded-2xl shadow-lg p-3 md:p-4 transform -rotate-6">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl mb-1">🧘‍♀️</div>
                    <p className="text-xs md:text-sm font-medium text-gray-700">Mind & Body</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements - adjusted for mobile */}
              <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-6 h-6 md:w-8 md:h-8 rounded-full bg-emerald-400"></div>
              <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 rounded-full bg-teal-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - adjusted for mobile */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 md:w-8 md:h-12 rounded-full border-2 border-emerald-300 flex justify-center p-1">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}