'use client';
import { useState, useEffect } from 'react';

export default function DoctorsSection() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const doctors = [
    {
      name: "Dr. B. Vikesh",
      title: "MD (S)",
      specialization: "Ortho, Skin & Respiratory Problems"
    },
    {
      name: "Dr. S. Thanikai Selvi",
      title: "MD (S)",
      specialization: "Specialist In Infertility & Gynaecology Problems"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Expert Care Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Doctors Team</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our experienced medical professionals dedicated to providing authentic Ayurvedic care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {doctors.map((doctor, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 hover:shadow-md transition-all duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Doctor Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              {/* Doctor Info */}
              <div className="text-center">
                <h4 className="font-bold text-gray-900 text-lg mb-1">{doctor.name}</h4>
                <p className="text-emerald-600 font-medium mb-3">{doctor.title}</p>
                <p className="text-gray-600 text-sm">{doctor.specialization}</p>
                
                {/* This line is now displayed for all doctors */}
                <p className="text-amber-600 text-xs mt-2 font-medium">By Appointment Only</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
            Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
}