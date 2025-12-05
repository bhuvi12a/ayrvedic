'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const services = [
    {
      id: 1,
      title: "Panchakarma",
      category: "detox",
      description: "Complete detoxification and rejuvenation therapy",
      icon: "🌿"
    },
    {
      id: 2,
      title: "Herbal Medicine",
      category: "medicine",
      description: "Personalized herbal remedies for your constitution",
      icon: "🌱"
    },
    {
      id: 3,
      title: "Ayurvedic Massage",
      category: "therapy",
      description: "Therapeutic massages with medicated oils",
      icon: "💆‍♀️"
    },
    {
      id: 4,
      title: "Diet & Nutrition",
      category: "lifestyle",
      description: "Customized dietary plans for optimal health",
      icon: "🥗"
    },
    {
      id: 6,
      title: "Stress Management",
      category: "wellness",
      description: "Natural techniques to combat modern stress",
      icon: "🌸"
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(service => service.category === activeTab);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-teal-800/80 to-emerald-700/70"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590935214131-404a0274c6c7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-emerald-400/20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-teal-400/20 blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-amber-400/20 blur-xl animate-pulse"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className={`transition-all duration-1000 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-300">Ancient Wisdom</span> for Modern Wellness
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-3xl mx-auto">
              Experience authentic Ayurvedic treatments that balance mind, body, and spirit. Your journey to holistic health begins here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/appointment" 
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <span className="flex items-center">
                  Book Appointment
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "25+", label: "Years Experience", icon: "📅" },
              { number: "5000+", label: "Happy Clients", icon: "😊" },
              { number: "15+", label: "Expert Practitioners", icon: "👨‍⚕️" },
              { number: "98%", label: "Satisfaction Rate", icon: "⭐" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Split Design */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${isMounted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-200 to-teal-300 rounded-3xl p-1 shadow-xl">
                  <div className="bg-white rounded-3xl p-2">
                    <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-br from-emerald-100 to-teal-200 h-full flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6">
                            <span className="text-white text-4xl font-bold">T</span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">Tradition Ayurvedik</h3>
                          <p className="text-gray-600">Your Path to Balanced Living</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-amber-400/20 blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-emerald-400/20 blur-xl"></div>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isMounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="mb-6">
                <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                  The Science of Life
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ancient Wisdom for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Modern Wellness</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Ayurveda is a 5,000-year-old system of natural healing that has its origins in the Vedic culture of India. Our clinic combines traditional practices with modern understanding to provide holistic care.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Holistic Approach", desc: "Treating the whole person, not just symptoms" },
                  { title: "Personalized Care", desc: "Customized to your unique constitution" },
                  { title: "Natural Healing", desc: "Using only natural herbs and therapies" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/about" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Discover Our Approach
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Interactive Tabs */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'detox', label: 'Detox' },
              { id: 'medicine', label: 'Medicine' },
              { id: 'therapy', label: 'Therapy' },
              { id: 'lifestyle', label: 'Lifestyle' },
              { id: 'wellness', label: 'Wellness' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-emerald-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div 
                key={service.id}
                className={`bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-6 p-4 w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-2xl group-hover:bg-emerald-100 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  href={`/services/${service.title.toLowerCase().replace(' ', '-')}`} 
                  className="inline-flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors duration-300"
                >
                  Learn More
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Testimonials Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Patients Say</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from those who have transformed their health through Ayurveda.
            </p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out">
                {[
                  {
                    name: "Priya Sharma",
                    role: "Yoga Instructor",
                    content: "The Panchakarma treatment completely transformed my energy levels. I feel rejuvenated and balanced.",
                    rating: 5
                  },
                  {
                    name: "Raj Patel",
                    role: "Software Engineer",
                    content: "My chronic back pain is gone after just a few sessions of Ayurvedic massage and herbal treatments.",
                    rating: 5
                  },
                  {
                    name: "Anita Desai",
                    role: "Retired Teacher",
                    content: "The stress management techniques have helped me find peace and improve my sleep quality significantly.",
                    rating: 4
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 italic text-lg">"{testimonial.content}"</p>
                      <div>
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-emerald-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2].map((index) => (
                <button 
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-emerald-500' : 'bg-gray-300'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dosha Quiz Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 bg-emerald-800 text-emerald-200 rounded-full text-sm font-medium mb-4">
            Discover Your Constitution
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What's Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-300">Dosha Type</span>?
          </h2>
          <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto">
            Take our quick quiz to discover your unique mind-body constitution and get personalized wellness recommendations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Vata",
                description: "Air & Space - Creative, energetic, and quick-thinking",
                color: "from-blue-400 to-cyan-400"
              },
              {
                title: "Pitta",
                description: "Fire & Water - Passionate, intelligent, and goal-oriented",
                color: "from-red-400 to-orange-400"
              },
              {
                title: "Kapha",
                description: "Earth & Water - Calm, stable, and nurturing",
                color: "from-green-400 to-emerald-400"
              }
            ].map((dosha, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${dosha.color} rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                <h3 className="text-2xl font-bold mb-3">{dosha.title}</h3>
                <p className="text-white/90">{dosha.description}</p>
              </div>
            ))}
          </div>
          
          <Link 
            href="/dosha-quiz" 
            className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 inline-block"
          >
            Take the Dosha Quiz
          </Link>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Our Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Ayurvedic Insights</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest articles on Ayurvedic practices and wellness tips.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Power of Ayurvedic Detox",
                excerpt: "Discover how Panchakarma can help eliminate toxins and rejuvenate your body.",
                date: "May 15, 2023",
                readTime: "5 min read"
              },
              {
                title: "Balancing Your Doshas for Better Health",
                excerpt: "Learn about the three doshas and how to keep them in balance for optimal wellness.",
                date: "April 28, 2023",
                readTime: "7 min read"
              },
              {
                title: "Ayurvedic Herbs for Immunity",
                excerpt: "Explore powerful Ayurvedic herbs that can boost your immune system naturally.",
                date: "April 10, 2023",
                readTime: "6 min read"
              }
            ].map((post, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="h-48 bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center relative overflow-hidden">
                  <span className="text-white text-2xl font-bold z-10">{post.title}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">{post.title}</h3>
                  <p className="text-gray-600 mb-6">{post.excerpt}</p>
                  <Link 
                    href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="inline-flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors duration-300"
                  >
                    Read More
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              View All Articles
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Our Clinic</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or ready to book an appointment? Reach out to our team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Our Location</h4>
                      <p className="text-gray-600">123 Wellness Street, Ayurville, AV 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                      <p className="text-gray-600">(123) 456-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Email</h4>
                      <p className="text-gray-600">info@ayurvedik.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Opening Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-amber-400/10 blur-xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Begin Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-white">Ayurvedic Journey</span>?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Take the first step towards balanced health and wellness. Book your consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointment" 
              className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 inline-block"
            >
              Book Your Appointment
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white/10 transition-all duration-300 inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}