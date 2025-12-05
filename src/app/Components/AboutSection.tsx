'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AboutSection() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);


  const values = [
    {
      title: "Authenticity",
      description: "We practice Traditional Siddha Ayurveda Clinic exactly as described in ancient texts",
      icon: "📜"
    },
    {
      title: "Personalization",
      description: "Every treatment plan is customized to your unique constitution",
      icon: "👤"
    },
    {
      title: "Holistic Approach",
      description: "We treat the whole person, not just symptoms",
      icon: "🌿"
    },
    {
      title: "Sustainability",
      description: "We use ethically sourced, sustainable herbs and materials",
      icon: "♻️"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            About Our Clinic
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tradition Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Modern Wellness</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            For over 25 years, Tradition Ayurvedik Clinic has been dedicated to bringing authentic Ayurvedic healing to our community.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-20">
          <div className={`order-2 lg:order-1 ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} transition-all duration-1000`}>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-200 to-teal-300 rounded-3xl p-1 shadow-xl">
                <div className="bg-white rounded-3xl p-2">
                  <div className="aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-200 h-full flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6">
                          <span className="text-white text-4xl font-bold">T</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Tradition Ayurvedik</h3>
                        <p className="text-gray-600">Est. 1998</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-amber-400/20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-emerald-400/20 blur-xl"></div>
            </div>
          </div>
          
          <div className={`order-1 lg:order-2 ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-1000 delay-300`}>
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-600 mb-4">
                Founded in 1998 by Dr. Ananya Sharma, Tradition Ayurvedik Clinic began as a small practice with a big vision: to make authentic Ayurvedic healing accessible to everyone.
              </p>
              <p className="text-gray-600 mb-6">
                What started as a single-room practice has grown into a comprehensive wellness center, but our commitment to traditional Ayurvedic principles remains unchanged. We combine ancient wisdom with modern understanding to provide holistic care that addresses the root cause of imbalance.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">5000+ Happy Clients</h4>
                  <p className="text-gray-600">Transforming lives through Ayurvedic wisdom</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">15+ Expert Practitioners</h4>
                  <p className="text-gray-600">Highly trained in Traditional Siddha Ayurveda Clinic</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">25+ Years of Excellence</h4>
                  <p className="text-gray-600">Dedicated to holistic wellness</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-10 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Tradition Ayurvedik Clinic
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center hover:shadow-md transition-all duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}