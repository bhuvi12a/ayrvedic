'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BookAppointmentPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doctor: '',
    service: '',
    treatment: '',
    date: '',
    time: '',
    message: ''
  });
  // const [availableSlots, setAvailableSlots] = useState<string[]>([]); // Removed availableSlots
  const [selectedDate, setSelectedDate] = useState('');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Doctor list from About page
  const doctors = [
    {
      id: 'dr-vikesh',
      name: "Dr. B. Vikesh",
      role: "Ortho, Skin & Respiratory Specialist",
      specialties: ["Orthopedic Conditions", "Skin Disorders", "Respiratory Issues"]
    },
    {
      id: 'dr-selvi',
      name: "Dr. S. Thanikai Selvi",
      role: "Infertility & Gynecology Specialist",
      specialties: ["Infertility", "Gynecological Issues", "Women's Health"]
    }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const services = [
    { id: 'respiratory', name: 'Respiratory Disorders', description: 'Treatment for breathing and lung issues' },
    { id: 'ortho', name: 'Ortho & Joint Problems', description: 'Joint pain and orthopedic care' },
    { id: 'skin', name: 'Skin Diseases', description: 'Ayurvedic skin treatments' },
    { id: 'gynaecology', name: 'Gynaecology Disorders', description: 'Women\'s health and wellness' },
    { id: 'paediatric', name: 'Paediatric Problems', description: 'Child health and care' },
    { id: 'infertility', name: 'Infertility & Sexual Problems', description: 'Fertility and reproductive health' },
    { id: 'neurological', name: 'Neurological Disorders', description: 'Nervous system treatments' },
    { id: 'lifestyle', name: 'Life Style Disorders', description: 'Diabetes, BP, stress management' },
    { id: 'obesity', name: 'Obesity', description: 'Weight management programs' }
  ];

  const treatments = [
    { id: 'varmam-yoga', name: 'Varmam & Yoga', service: 'general' },
    { id: 'weight-loss', name: 'Weight Loss Program', service: 'obesity' },
    { id: 'spa-therapy', name: 'SPA Therapy', service: 'general' },
    { id: 'panchakarma', name: 'Panchakarma Therapy', service: 'general' },
    { id: 'steam-therapy', name: 'Steam Therapy', service: 'general' },
    { id: 'herbal-massage', name: 'Herbal Massage', service: 'general' },
    { id: 'udwarthana', name: 'Udwarthana', service: 'obesity' },
    { id: 'vasthi', name: 'Vasthi', service: 'general' },
    { id: 'acupuncture', name: 'Acupuncture', service: 'general' },
    { id: 'kaya-karpam', name: 'Kaya Karpam', service: 'general' }
  ];

  // const timeSlots = [ ... ]; // Removed timeSlots logic

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    setFormData({ ...formData, date });

    // Simulate available slots (in real app, this would come from API)
    // if (date) {
    //   setAvailableSlots(timeSlots);
    // } else {
    //   setAvailableSlots([]);
    // }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          doctor: formData.doctor,
          service: formData.service,
          treatment: formData.treatment,
          date: formData.date,
          time: formData.time,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessModal(true);
        setStep(3); // Move to confirmation step
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    // Validate step 1 - Personal Information
    if (step === 1) {
      if (!formData.name.trim() || !formData.phone.trim()) {
        alert('Please fill in all required personal information fields (Name, Phone)');
        return;
      }
      // Email validation (only if email is provided)
      if (formData.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          alert('Please enter a valid email address');
          return;
        }
      }
      // Phone validation (basic)
      const phoneRegex = /^[0-9\-\+\(\)\s]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        alert('Please enter a valid phone number');
        return;
      }
      setStep(step + 1);
    } else if (step === 2) {
      // Submit the appointment when moving from step 2 to step 3
      await handleSubmit(new Event('submit') as any);
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getSelectedServiceName = () => {
    const service = services.find(s => s.id === formData.service);
    return service ? service.name : '';
  };

  const getSelectedTreatmentName = () => {
    const treatment = treatments.find(t => t.id === formData.treatment);
    return treatment ? treatment.name : '';
  };

  const getSelectedDoctorName = () => {
    const doctor = doctors.find(d => d.id === formData.doctor);
    return doctor ? doctor.name : '';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-[scale-in_0.3s_ease-out]">
            {/* Success Icon */}
            <div className="pt-8 pb-4 flex justify-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-8 pb-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Appointment Booked Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your appointment has been scheduled. We'll send you a confirmation email shortly.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-linear-to-br from-emerald-900 to-teal-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Book <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-amber-300">Appointment</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Schedule your consultation with our expert Ayurvedic practitioners
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= stepNumber
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                    }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-1 mx-2 ${step > stepNumber ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-8 text-sm">
              <span className={step >= 1 ? 'text-emerald-600 font-medium' : 'text-gray-500'}>
                Personal Info
              </span>
              <span className={step >= 2 ? 'text-emerald-600 font-medium' : 'text-gray-500'}>
                Select Service
              </span>
              <span className={step >= 3 ? 'text-emerald-600 font-medium' : 'text-gray-500'}>
                Confirm
              </span>
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className={`bg-white rounded-2xl shadow-lg p-8 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000`}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Personal Information</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Additional Information</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                    placeholder="Any specific health concerns or requirements..."
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Next: Select Service
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Service Selection */}
          {step === 2 && (
            <div className={`bg-white rounded-2xl shadow-lg p-8 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000`}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Select Doctor & Service</h2>

              <div className="space-y-8">
                {/* Doctor Selection */}
                <div>
                  <label className="block text-gray-700 font-medium mb-4">Select Your Doctor *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctors.map((doctor) => (
                      <label
                        key={doctor.id}
                        className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${formData.doctor === doctor.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                          }`}
                      >
                        <div className="flex items-start">
                          <input
                            type="radio"
                            name="doctor"
                            value={doctor.id}
                            checked={formData.doctor === doctor.id}
                            onChange={handleChange}
                            className="mr-3 text-emerald-500 mt-1"
                          />
                          <div>
                            <div className="font-bold text-gray-900">{doctor.name}</div>
                            <div className="text-sm text-emerald-600 font-medium mb-2">{doctor.role}</div>
                            <div className="text-xs text-gray-600">
                              {doctor.specialties.join(', ')}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-gray-700 font-medium mb-4">Select Service *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${formData.service === service.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                          }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="service"
                            value={service.id}
                            checked={formData.service === service.id}
                            onChange={handleChange}
                            className="mr-3 text-emerald-500"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-600">{service.description}</div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Treatment Selection (if Panchakarma is selected) */}
                {formData.service && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-4">Select Treatment Method *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {treatments.map((treatment) => (
                        <label
                          key={treatment.id}
                          className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${formData.treatment === treatment.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                            }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="treatment"
                              value={treatment.id}
                              checked={formData.treatment === treatment.id}
                              onChange={handleChange}
                              className="mr-3 text-emerald-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{treatment.name}</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date Selection */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                  />
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-4">
                      Preferred Time * <span className="text-sm text-gray-500 font-normal">(9:00 AM - 10:00 PM)</span>
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      min="09:00"
                      max="22:00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                    />
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.doctor || !formData.service || !formData.date || !formData.time || isSubmitting}
                  className={`px-8 py-3 font-medium rounded-lg transition-all duration-300 shadow-md ${formData.doctor && formData.service && formData.date && formData.time && !isSubmitting
                    ? 'bg-linear-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  {isSubmitting ? 'Booking Appointment...' : 'Review Appointment'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className={`bg-white rounded-2xl shadow-lg p-8 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000`}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-600">Your appointment has been successfully booked.</p>
              </div>

              {/* Appointment Details */}
              <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Appointment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-gray-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium text-gray-900">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium text-gray-900">{getSelectedDoctorName()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium text-gray-900">{getSelectedServiceName()}</span>
                  </div>
                  {formData.treatment && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Treatment:</span>
                      <span className="font-medium text-gray-900">{getSelectedTreatmentName()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-900">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium text-gray-900">{formData.time}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What's Next?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    You will receive a confirmation email shortly
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Please arrive 15 minutes before your appointment
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Bring any relevant medical records or test results
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="px-8 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg text-center"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-linear-to-r from-emerald-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help with Booking?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Our friendly staff is available to assist you with scheduling your appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1234567890"
              className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Call Us Now
            </a>
            <Link
              href="/contact"
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