'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ServicesSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const services = [
    {
      id: 1,
      title: "Panchakarma",
      category: "detox",
      description: "Complete detoxification and rejuvenation therapy using traditional Ayurvedic methods",
      icon: "🌿",
      benefits: ["Removes toxins", "Boosts immunity", "Restores balance"],
      duration: "7-21 days",
      price: "From $150"
    },
    {
      id: 2,
      title: "Herbal Medicine",
      category: "medicine",
      description: "Personalized herbal remedies tailored to your unique constitution",
      icon: "🌱",
      benefits: ["Natural healing", "No side effects", "Personalized"],
      duration: "Ongoing",
      price: "From $50"
    },
    {
      id: 3,
      title: "Ayurvedic Massage",
      category: "therapy",
      description: "Therapeutic massages with medicated oils to relax and rejuvenate",
      icon: "💆‍♀️",
      benefits: ["Relieves stress", "Improves circulation", "Reduces pain"],
      duration: "60-90 mins",
      price: "From $80"
    },
    {
      id: 4,
      title: "Diet & Nutrition",
      category: "lifestyle",
      description: "Customized dietary plans based on Ayurvedic principles",
      icon: "🥗",
      benefits: ["Optimal digestion", "Balanced nutrition", "Weight management"],
      duration: "Ongoing",
      price: "From $75"
    },
    {
      id: 6,
      title: "Stress Management",
      category: "wellness",
      description: "Natural techniques to manage stress and improve mental well-being",
      icon: "🌸",
      benefits: ["Reduces anxiety", "Improves sleep", "Enhances focus"],
      duration: "60 mins",
      price: "From $60"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'detox', name: 'Detox' },
    { id: 'medicine', name: 'Medicine' },
    { id: 'therapy', name: 'Therapy' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'wellness', name: 'Wellness' }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Our Treatments
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Ayurvedic Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our range of traditional treatments designed to restore balance and promote natural healing.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredServices.map((service, index) => (
            <div 
              key={service.id}
              className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group ${isMounted ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-6 md:p-8">
                {/* Service Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="text-3xl md:text-4xl mr-4">{service.icon}</div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{service.title}</h3>
                      <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                        {categories.find(c => c.id === service.category)?.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service Description */}
                <p className="text-gray-600 mb-6">{service.description}</p>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service Details */}
              
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        
      </div>
    </section>
  );
}