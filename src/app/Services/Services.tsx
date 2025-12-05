'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
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
      description: "Complete detoxification and rejuvenation therapy using traditional Ayurvedic methods to eliminate toxins and restore balance.",
      fullDescription: "Panchakarma is the ultimate Ayurvedic detoxification therapy that involves five specialized procedures to purify the body. This comprehensive treatment removes accumulated toxins (ama), strengthens the immune system, and restores the body's natural balance. Our personalized Panchakarma programs include preparatory therapies, main purification procedures, and post-treatment rejuvenation protocols.",
      benefits: ["Deep detoxification", "Boosts immunity", "Restores dosha balance", "Rejuvenates tissues", "Improves digestion"],
      includes: ["Initial consultation", "Personalized treatment plan", "All herbal medicines", "Therapeutic meals", "Follow-up care"],
      process: ["Preparation (Snehana & Swedana)", "Main purification (Vamana, Virechana, etc.)", "Post-treatment (Samsarjana Krama)"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80"
    },
    {
      id: 2,
      title: "Herbal Medicine",
      category: "medicine",
      description: "Personalized herbal remedies tailored to your unique constitution and health concerns.",
      fullDescription: "Our herbal medicine consultations provide personalized treatment plans using authentic Ayurvedic herbs. After a detailed assessment of your constitution (Prakriti) and current imbalances (Vikriti), our experts create customized herbal formulations that address the root cause of your health issues. We use only high-quality, sustainably sourced herbs prepared according to traditional methods.",
      benefits: ["Natural healing", "No side effects", "Personalized treatment", "Addresses root cause", "Long-lasting results"],
      includes: ["Detailed health assessment", "Constitution analysis", "Custom herbal formulations", "Dosage instructions", "Progress monitoring"],
      process: ["Initial consultation", "Diagnosis", "Formulation preparation", "Treatment plan", "Follow-up appointments"],
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&q=80"
    },
    {
      id: 3,
      title: "Ayurvedic Massage",
      category: "therapy",
      description: "Therapeutic massages with medicated oils to relax, rejuvenate, and heal the body.",
      fullDescription: "Ayurvedic massage (Abhyanga) is a specialized therapy using warm, medicated oils tailored to your constitution. This treatment improves circulation, eliminates toxins, nourishes tissues, and calms the nervous system. Our expert therapists use traditional techniques and authentic herbal oils to provide deep relaxation and therapeutic benefits.",
      benefits: ["Relieves stress", "Improves circulation", "Nourishes skin", "Reduces pain", "Balances doshas"],
      includes: ["Constitution assessment", "Customized oil selection", "Full body massage", "Herbal steam (optional)", "Relaxation time"],
      process: ["Consultation", "Oil selection", "Massage therapy", "Herbal steam", "Rest period"],
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80"
    },
    {
      id: 4,
      title: "Diet & Nutrition",
      category: "lifestyle",
      description: "Customized dietary plans based on Ayurvedic principles for optimal health and digestion.",
      fullDescription: "Our Ayurvedic nutrition programs are designed to balance your unique constitution and address specific health concerns. We provide personalized dietary guidelines that consider your dosha, current imbalances, digestive strength, and seasonal factors. Our approach focuses on food as medicine, using the six tastes and proper food combinations to restore health.",
      benefits: ["Optimal digestion", "Balanced nutrition", "Weight management", "Increased energy", "Improved immunity"],
      includes: ["Dietary assessment", "Constitution analysis", "Personalized diet plan", "Recipe suggestions", "Progress tracking"],
      process: ["Initial consultation", "Assessment", "Diet plan creation", "Education", "Follow-up support"],
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80"
    },
    {
      id: 5,
      title: "Stress Management",
      category: "wellness",
      description: "Natural techniques to manage stress and improve mental well-being using Ayurvedic wisdom.",
      fullDescription: "Our stress management programs combine Ayurvedic wisdom with modern techniques to help you cope with the demands of modern life. We offer personalized solutions including herbal remedies, lifestyle modifications, breathing techniques, meditation, and therapeutic treatments to address stress at its root cause and restore balance to your nervous system.",
      benefits: ["Reduces anxiety", "Improves sleep", "Enhances focus", "Balances emotions", "Increases resilience"],
      includes: ["Stress assessment", "Personalized plan", "Herbal recommendations", "Therapeutic treatments", "Lifestyle guidance"],
      process: ["Initial assessment", "Plan creation", "Treatment sessions", "Education", "Ongoing support"],
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80"
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-emerald-900 to-teal-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-300">Ayurvedic Services</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Experience authentic Ayurvedic treatments designed to restore balance and promote natural healing.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Healing Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our range of traditional Ayurvedic services addresses all aspects of health and wellness.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
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
                className={`group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Content Container */}
                <div className="p-6 relative">
                  {/* Category Badge */}
                  <div className="absolute -top-3 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="inline-block px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-medium shadow-lg">
                      {categories.find(c => c.id === service.category)?.name}
                    </span>
                  </div>
                  
                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-emerald-600">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-gray-600 text-sm leading-relaxed transition-all duration-300 group-hover:text-gray-700">
                    {service.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Signature Treatments</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the depth and authenticity of our Ayurvedic therapies
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:-translate-y-1 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left Side - Content */}
                  <div className="p-8 md:p-12 relative">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                        {categories.find(c => c.id === service.category)?.name}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-emerald-600">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.fullDescription}</p>
                    
                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-3">Key Benefits:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center transform transition-all duration-300 group-hover:translate-x-1">
                            <svg className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 transition-colors duration-300 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Visual */}
                  <div className="relative h-full min-h-[400px] overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-teal-600/80 flex items-center justify-center transition-all duration-500 group-hover:from-emerald-700/90 group-hover:to-teal-700/90">
                      <div className="text-center text-white p-6 transform transition-all duration-500 group-hover:scale-105">
                        <div className="text-4xl mb-4 transition-transform duration-500 group-hover:scale-110">
                          {service.category === 'detox' && '🌿'}
                          {service.category === 'medicine' && '🌱'}
                          {service.category === 'therapy' && '💆‍♀️'}
                          {service.category === 'lifestyle' && '🥗'}
                          {service.category === 'wellness' && '🧘‍♂️'}
                        </div>
                        <h4 className="text-2xl font-bold mb-2">{service.title}</h4>
                        <p className="text-emerald-100">Ancient Wisdom for Modern Wellness</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Treatment Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our systematic approach to Ayurvedic healing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { step: 1, title: "Consultation", desc: "Detailed health assessment" },
              { step: 2, title: "Diagnosis", desc: "Identify root causes" },
              { step: 3, title: "Planning", desc: "Personalized treatment" },
              { step: 4, title: "Treatment", desc: "Therapeutic procedures" },
              { step: 5, title: "Follow-up", desc: "Monitor progress" }
            ].map((item, index) => (
              <div 
                key={index}
                className={`group text-center transform transition-all duration-500 hover:-translate-y-2 cursor-pointer ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-emerald-600 group-hover:shadow-lg">
                  <span className="text-xl font-bold text-emerald-600 transition-colors duration-300 group-hover:text-white">{item.step}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-emerald-600">{item.title}</h3>
                <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Take the first step towards balanced health and wellness. Book your consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/Appointment" 
              className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book Appointment
            </Link>
            <Link 
              href="/Contact" 
              className="px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}