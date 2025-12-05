'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const teamMembers = [
    {
      name: "Dr. B. Vikesh",
      role: "Ortho, Skin & Respiratory Specialist",
      bio: "Dr. Vikesh specializes in treating orthopedic conditions, skin disorders, and respiratory issues using traditional Ayurvedic approaches combined with modern therapeutic techniques.",
      education: "MD (S)",
      experience: "15+ years",
      specialties: ["Orthopedic Conditions", "Skin Disorders", "Respiratory Issues"],
      achievements: ["Treated 1000+ patients with chronic conditions", "Published research on respiratory treatments", "Guest speaker at national Ayurveda conferences"]
    },
    {
      name: "Dr. S. Thanikai Selvi",
      role: "Infertility & Gynecology Specialist",
      bio: "Dr. Selvi is an expert in women's health, specializing in infertility treatments and gynecological issues using holistic Ayurvedic therapies.",
      education: "MD (S)",
      experience: "12+ years",
      specialties: ["Infertility", "Gynecological Issues", "Women's Health"],
      achievements: ["Helped 200+ couples achieve pregnancy", "Developed specialized women's wellness programs", "Recognized for excellence in women's healthcare"]
    } 
  ];

  const values = [
    {
      title: "Authenticity",
      description: "We practice Traditional Siddha Ayurveda Clinic exactly as described in ancient texts, preserving the purity of this ancient science.",
      icon: "📜"
    },
    {
      title: "Personalization",
      description: "Every treatment plan is customized to your unique constitution (Prakriti) and specific health needs.",
      icon: "👤"
    },
    {
      title: "Holistic Approach",
      description: "We treat the whole person - mind, body, and spirit - addressing the root cause of imbalance.",
      icon: "🌿"
    },
    {
      title: "Sustainability",
      description: "We use ethically sourced, sustainable herbs and materials, respecting both nature and tradition.",
      icon: "♻️"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-emerald-900 to-teal-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590935214131-404a0274c6c7?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-300">Traditional Siddha Ayurveda</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            For over 25 years, we've been dedicated to bringing authentic Ayurvedic healing to our community with compassion and expertise.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
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
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">Traditional Siddha Ayurveda</h3>
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
                <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                  Our Journey
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4">
                  Founded in 1998, Traditional Siddha Ayurveda Clinic began as a small practice with a big vision: to make authentic Ayurvedic healing accessible to everyone.
                </p>
                <p className="text-gray-600">
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
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Guided by ancient wisdom, committed to modern wellness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide authentic Ayurvedic healing that restores balance and harmony to mind, body, and spirit. We are committed to personalized care that addresses the root cause of illness, not just symptoms, using time-tested natural therapies.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                <span className="text-2xl">🔮</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be a global leader in authentic Ayurvedic healthcare, integrating ancient wisdom with modern scientific understanding. We envision a world where Ayurveda is recognized as a complete system of medicine for holistic wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Traditional Siddha Ayurveda Clinic
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
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced practitioners are dedicated to helping you achieve optimal health
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-md hover:shadow-2xl hover:ring-4 hover:ring-emerald-200 transition-all duration-500 overflow-hidden ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold mr-4 flex-shrink-0">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-emerald-600">{member.role}</p>
                      <p className="text-sm text-gray-500 mt-1">{member.experience} experience</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Education:</p>
                    <p className="text-sm text-gray-600">{member.education}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Achievements:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {member.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Traditional Siddha Ayurveda
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the difference that authentic Ayurvedic care can make
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg hover:ring-4 hover:ring-emerald-200 transition-all duration-500">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Authentic Knowledge</h3>
              <p className="text-gray-600">
                Our practitioners are trained in traditional Ayurvedic texts and modern medical science, ensuring authentic and effective treatments.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg hover:ring-4 hover:ring-emerald-200 transition-all duration-500">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Natural Healing</h3>
              <p className="text-gray-600">
                We use only natural herbs, oils, and therapies that work in harmony with your body's innate healing abilities.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg hover:ring-4 hover:ring-emerald-200 transition-all duration-500">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Care</h3>
              <p className="text-gray-600">
                Every treatment plan is customized to your unique constitution and specific health needs for optimal results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Take the first step towards balanced health and wellness. Book your appointment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/Appointment" 
              className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Book Appointment
            </Link>
            <Link 
              href="/Contact" 
              className="px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white/10 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}