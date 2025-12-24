'use client';
import { useState, useEffect } from 'react';

export default function TestimonialsSection() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Yoga Instructor",
      content: "The Panchakarma treatment completely transformed my energy levels. I feel rejuvenated and balanced. The practitioners are incredibly knowledgeable and caring.",
      rating: 5
    },
    {
      name: "Raj Patel",
      role: "Software Engineer",
      content: "My chronic back pain is gone after just a few sessions of Ayurvedic massage and herbal treatments. This clinic truly understands holistic healing.",
      rating: 5
    },
    {
      name: "Anita Desai",
      role: "Retired Teacher",
      content: "The stress management techniques have helped me find peace and improve my sleep quality significantly. I wish I had discovered Ayurveda sooner!",
      rating: 4
    },
    {
      name: "Vikram Singh",
      role: "Business Owner",
      content: "The personalized diet plan has improved my digestion and overall health. The team's attention to detail and genuine care is exceptional.",
      rating: 5
    },
    {
      name: "Meera Reddy",
      role: "Homemaker",
      content: "After years of trying different treatments, the herbal remedies here finally helped with my skin condition. Natural and effective!",
      rating: 5
    },
    {
      name: "Arjun Kumar",
      role: "Athlete",
      content: "The yoga and meditation sessions have enhanced my performance and recovery. The perfect complement to my training regimen.",
      rating: 4
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Patients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from those who have transformed their health through authentic Ayurvedic treatments.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Testimonial Content */}
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
              
              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-emerald-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-emerald-100">Patient Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5000+</div>
              <div className="text-emerald-100">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8/5</div>
              <div className="text-emerald-100">Average Rating</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Health?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands who have experienced the healing power of Ayurveda at our clinic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/Appointment" 
              className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg"
            >
              Book Your Appointment
            </a>
            <a 
              href="/Contact" 
              className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}