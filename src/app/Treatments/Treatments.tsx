'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TreatmentsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const treatments = [
    {
      id: 1,
      title: "Respiratory Disorders",
      category: "disorders",
      description: "Comprehensive treatment for breathing and respiratory system issues.",
      fullDescription: "Our specialized treatment for respiratory disorders combines ancient Ayurvedic wisdom with modern understanding of respiratory health. We address conditions like asthma, bronchitis, allergies, sinusitis, and chronic cough through personalized herbal medicines, breathing exercises, and therapeutic procedures. The treatment focuses on strengthening respiratory system, clearing airways, and improving lung capacity.",
      benefits: ["Improves breathing", "Clears airways", "Strengthens lungs", "Reduces allergies", "Treats chronic cough"],
      bestFor: "Asthma, bronchitis, sinusitis, allergies",
      preparation: "Initial consultation and diagnosis",
      includes: ["Herbal medicines", "Breathing exercises", "Steam therapy", "Dietary guidance", "Follow-up consultations"]
    },
    {
      id: 2,
      title: "Ortho & Joint Problems",
      category: "disorders",
      description: "Expert care for joint pain, arthritis, and orthopedic conditions.",
      fullDescription: "Our orthopedic and joint treatment program addresses various musculoskeletal conditions including arthritis, joint pain, stiffness, and mobility issues. Using specialized Ayurvedic therapies like Janu Basti, Kati Basti, and therapeutic massages, we help reduce inflammation, improve joint flexibility, and restore natural movement. The treatment is complemented with internal medications and lifestyle modifications.",
      benefits: ["Reduces joint pain", "Improves mobility", "Treats arthritis", "Strengthens bones", "Reduces inflammation"],
      bestFor: "Arthritis, joint pain, stiffness, back pain",
      preparation: "X-rays and medical history review",
      includes: ["Specialized therapies", "Herbal medicines", "Oil treatments", "Exercise guidance", "Pain management"]
    },
    {
      id: 3,
      title: "Skin Diseases",
      category: "disorders",
      description: "Natural Ayurvedic treatments for various skin conditions.",
      fullDescription: "Our skin treatment program offers holistic solutions for various skin disorders including eczema, psoriasis, acne, pigmentation, and chronic skin conditions. Through blood purification, detoxification, and specialized herbal applications, we address the root cause of skin problems. The treatment includes internal medications, external applications, and dietary modifications for lasting results.",
      benefits: ["Clears skin", "Reduces inflammation", "Treats chronic conditions", "Improves complexion", "Natural healing"],
      bestFor: "Eczema, psoriasis, acne, pigmentation",
      preparation: "Skin assessment and blood tests",
      includes: ["Blood purification", "Herbal applications", "Internal medicines", "Dietary plan", "Skin care guidance"]
    },
    {
      id: 4,
      title: "Gynaecology Disorders",
      category: "disorders",
      description: "Specialized women's health and wellness treatments.",
      fullDescription: "Our gynecological treatment program addresses various women's health issues including menstrual disorders, PCOS, hormonal imbalances, infertility, and menopausal symptoms. Using time-tested Ayurvedic formulations and therapies, we help restore hormonal balance, regulate menstrual cycles, and improve overall reproductive health. The treatment is personalized based on individual needs and constitution.",
      benefits: ["Regulates cycles", "Balances hormones", "Treats PCOS", "Improves fertility", "Reduces symptoms"],
      bestFor: "Menstrual disorders, PCOS, hormonal issues",
      preparation: "Complete medical history and tests",
      includes: ["Herbal medicines", "Hormonal therapy", "Diet plan", "Lifestyle counseling", "Regular monitoring"]
    },
    {
      id: 5,
      title: "Paediatric Problems",
      category: "disorders",
      description: "Gentle and effective treatments for children's health issues.",
      fullDescription: "Our pediatric care program provides safe and gentle Ayurvedic treatments for various childhood conditions including digestive disorders, respiratory issues, growth problems, behavioral concerns, and immunity issues. We use mild herbal formulations specially designed for children, combined with dietary guidance and lifestyle recommendations to ensure optimal growth and development.",
      benefits: ["Safe for children", "Boosts immunity", "Improves growth", "Treats digestion", "Natural healing"],
      bestFor: "Digestive issues, immunity, growth problems",
      preparation: "Parental consultation",
      includes: ["Child-safe medicines", "Dietary guidance", "Growth monitoring", "Immunity boosters", "Parental counseling"]
    },
    {
      id: 6,
      title: "Infertility & Sexual Problems",
      category: "disorders",
      description: "Comprehensive fertility and reproductive health treatments.",
      fullDescription: "Our fertility and sexual health program offers holistic solutions for both male and female infertility, low libido, erectile dysfunction, and other reproductive health concerns. Using specialized Ayurvedic formulations, Vajikarana therapy, and lifestyle modifications, we help improve reproductive health, enhance vitality, and increase chances of conception naturally.",
      benefits: ["Improves fertility", "Enhances vitality", "Treats dysfunction", "Balances hormones", "Natural conception"],
      bestFor: "Infertility, low libido, reproductive issues",
      preparation: "Complete fertility assessment",
      includes: ["Specialized medicines", "Vajikarana therapy", "Counseling", "Diet plan", "Regular monitoring"]
    },
    {
      id: 7,
      title: "Neurological Disorders",
      category: "disorders",
      description: "Expert treatment for nervous system and brain-related conditions.",
      fullDescription: "Our neurological treatment program addresses various conditions including paralysis, Parkinson's, neuropathy, headaches, migraines, and memory disorders. Using specialized Ayurvedic therapies like Shirodhara, Nasya, and Neuro-rejuvenation techniques, combined with powerful herbal medicines, we help improve neurological function, reduce symptoms, and enhance quality of life.",
      benefits: ["Improves brain function", "Reduces symptoms", "Treats paralysis", "Relieves headaches", "Enhances memory"],
      bestFor: "Paralysis, neuropathy, headaches, memory issues",
      preparation: "Neurological assessment",
      includes: ["Specialized therapies", "Brain tonics", "Physical therapy", "Dietary plan", "Regular monitoring"]
    },
    {
      id: 8,
      title: "Life Style Disorders",
      category: "disorders",
      description: "Treatment for diabetes, hypertension, stress, and modern lifestyle conditions.",
      fullDescription: "Our lifestyle disorder management program addresses modern health challenges including diabetes, hypertension, high cholesterol, stress, and metabolic syndrome. Through personalized diet plans, herbal medicines, stress management techniques, and lifestyle modifications, we help restore metabolic balance, control blood sugar and pressure levels, and prevent complications.",
      benefits: ["Controls diabetes", "Reduces BP", "Manages stress", "Lowers cholesterol", "Prevents complications"],
      bestFor: "Diabetes, hypertension, stress, cholesterol",
      preparation: "Complete health screening",
      includes: ["Herbal medicines", "Diet plan", "Exercise guidance", "Stress management", "Regular monitoring"]
    },
    {
      id: 9,
      title: "Obesity",
      category: "disorders",
      description: "Comprehensive weight management and obesity treatment program.",
      fullDescription: "Our obesity treatment program offers a holistic approach to weight management combining detoxification, metabolism enhancement, and sustainable lifestyle changes. Through specialized treatments like Udwarthana, Lekhana Basti, customized diet plans, and herbal medicines, we help achieve healthy weight loss, improve metabolism, and maintain long-term results without side effects.",
      benefits: ["Natural weight loss", "Improves metabolism", "Reduces fat", "Increases energy", "Long-term results"],
      bestFor: "Obesity, weight management, metabolic issues",
      preparation: "Weight and body composition analysis",
      includes: ["Weight loss program", "Herbal medicines", "Diet plan", "Exercise guidance", "Regular monitoring"]
    },
    {
      id: 10,
      title: "Varmam Therapy",
      category: "methods",
      description: "Ancient pressure point therapy combined with for holistic wellness.",
      fullDescription: "Varmam therapy is an ancient Tamil healing art that works on vital energy points (Marma points) in the body. Combined with therapeutic  practices, this treatment helps in pain management, energy balancing, and overall wellness. Our expert practitioners use precise techniques to stimulate these points, promoting natural healing, improving circulation, and restoring energy flow.",
      benefits: ["Relieves pain", "Balances energy", "Improves flexibility", "Enhances vitality", "Stress relief"],
      bestFor: "Pain management, energy balance, flexibility",
      preparation: "Physical assessment",
      includes: ["Varmam therapy", "sessions", "Breathing exercises", "Meditation", "Self-care guidance"]
    },
    {
      id: 11,
      title: "Weight Loss Program",
      category: "methods",
      description: "Specialized program for natural and sustainable weight reduction.",
      fullDescription: "Our comprehensive weight loss program combines Ayurvedic principles with modern understanding of metabolism and nutrition. Through specialized treatments like Udwarthana (powder massage), detoxification therapies, customized herbal medicines, and personalized diet plans, we help achieve healthy weight loss while improving overall health and vitality.",
      benefits: ["Natural weight loss", "Fat reduction", "Improved metabolism", "Increased energy", "Body toning"],
      bestFor: "Weight loss, body toning, metabolism",
      preparation: "Body composition analysis",
      includes: ["Udwarthana", "Detox therapies", "Herbal medicines", "Diet plan", "Exercise program"]
    },
    {
      id: 12,
      title: "Panchakarma Therapy",
      category: "methods",
      description: "Complete detoxification and rejuvenation program.",
      fullDescription: "Panchakarma is the ultimate Ayurvedic detoxification and rejuvenation program consisting of five main therapeutic procedures. This comprehensive treatment eliminates deep-rooted toxins, balances doshas, strengthens digestion, and rejuvenates tissues. Our authentic Panchakarma program is tailored to individual needs and supervised by experienced practitioners.",
      benefits: ["Complete detox", "Balances doshas", "Rejuvenates body", "Improves immunity", "Enhances vitality"],
      bestFor: "Complete detoxification, chronic conditions",
      preparation: "Pre-panchakarma consultation and preparation",
      includes: ["All five procedures", "Herbal medicines", "Special diet", "Accommodation", "Post-care"]
    },
    {
      id: 13,
      title: "Steam Therapy",
      category: "methods",
      description: "Therapeutic herbal steam for detoxification and pain relief.",
      fullDescription: "Our steam therapy uses specially prepared herbal decoctions to create therapeutic steam that opens body channels, induces sweating, and helps eliminate toxins. This treatment is particularly effective for joint pain, muscle stiffness, respiratory issues, and skin conditions. The warm herbal steam penetrates deep into tissues, providing both therapeutic and relaxation benefits.",
      benefits: ["Eliminates toxins", "Relieves pain", "Opens channels", "Improves circulation", "Softens skin"],
      bestFor: "Joint pain, detoxification, respiratory issues",
      preparation: "Oil massage recommended",
      includes: ["Herbal steam", "Cool down", "Herbal tea", "Rest time", "Guidance"]
    },
    {
      id: 14,
      title: "Herbal Massage",
      category: "methods",
      description: "Traditional Ayurvedic massage with medicated herbal oils.",
      fullDescription: "Our herbal massage therapy uses specially prepared medicated oils selected based on your constitution and health condition. The therapeutic massage techniques combined with warm herbal oils help improve circulation, nourish tissues, eliminate toxins, calm the nervous system, and provide deep relaxation. Regular sessions enhance overall health and vitality.",
      benefits: ["Improves circulation", "Nourishes skin", "Relieves stress", "Eliminates toxins", "Enhances vitality"],
      bestFor: "Relaxation, pain relief, skin nourishment",
      preparation: "Selection of appropriate oils",
      includes: ["Full body massage", "Medicated oils", "Steam (optional)", "Herbal tea", "Rest time"]
    },
    {
      id: 15,
      title: "Udwarthana",
      category: "methods",
      description: "Herbal powder massage for weight loss and skin toning.",
      fullDescription: "Udwarthana is a unique Ayurvedic treatment involving vigorous massage with specially prepared herbal powders. This powerful therapy helps break down cellulite, reduce excess fat, improve skin tone and texture, enhance blood circulation, and promote weight loss. The upward strokes stimulate lymphatic drainage and leave skin smooth and glowing.",
      benefits: ["Reduces fat", "Improves skin tone", "Breaks cellulite", "Enhances circulation", "Promotes weight loss"],
      bestFor: "Weight loss, cellulite, skin toning",
      preparation: "Body assessment",
      includes: ["Powder massage", "Steam therapy", "Herbal bath", "Moisturization", "Dietary advice"]
    },
    {
      id: 16,
      title: "Vasthi",
      category: "methods",
      description: "Therapeutic medicated enema for internal cleansing.",
      fullDescription: "Vasthi is one of the most important Panchakarma procedures involving therapeutic enema with medicated oils or herbal decoctions. This treatment is highly effective for Vata disorders, joint problems, neurological conditions, and digestive issues. Vasthi nourishes the body from within, strengthens the colon, and helps eliminate deep-seated toxins.",
      benefits: ["Cleanses colon", "Treats Vata disorders", "Nourishes tissues", "Relieves constipation", "Strengthens nervous system"],
      bestFor: "Vata disorders, joint pain, constipation",
      preparation: "Pre-treatment oleation",
      includes: ["Medicated enema", "Herbal medicines", "Special diet", "Post-care", "Follow-up"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Treatments' },
    { id: 'disorders', name: 'Special Treatments' },
    { id: 'methods', name: 'Treatment Methods' }
  ];

  const filteredTreatments = activeCategory === 'all'
    ? treatments
    : treatments.filter(treatment => treatment.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-emerald-900 to-teal-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Ayurvedic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-300">Treatments</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Experience authentic Ayurvedic treatments designed to restore balance and promote natural healing.
          </p>
        </div>
      </section>

      {/* Treatments Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Therapeutic Procedures</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Authentic Ayurvedic treatments performed by experienced practitioners
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${activeCategory === category.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTreatments.map((treatment, index) => (
              <div
                key={treatment.id}
                className={`group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Background gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                <div className="relative z-10 p-6">
                  {/* Treatment Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium mb-2 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                        {categories.find(c => c.id === treatment.category)?.name}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-emerald-600">
                        {treatment.title}
                      </h3>
                    </div>
                  </div>

                  {/* Treatment Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed transition-all duration-300 group-hover:text-gray-700">
                    {treatment.description}
                  </p>

                  {/* Extended Description */}
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed transition-all duration-300 group-hover:text-gray-600">
                    {treatment.fullDescription.substring(0, 180)}...
                  </p>

                  {/* Best For */}
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide transition-colors duration-300 group-hover:text-emerald-800">Best For:</span>
                    <p className="text-sm text-gray-600 mt-1 transition-all duration-300 group-hover:text-gray-700">
                      {treatment.bestFor}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Treatment Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our systematic approach to Ayurvedic treatments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { step: 1, title: "Consultation", desc: "Detailed health assessment" },
              { step: 2, title: "Diagnosis", desc: "Identify imbalances" },
              { step: 3, title: "Preparation", desc: "Body purification" },
              { step: 4, title: "Treatment", desc: "Therapeutic procedure" },
              { step: 5, title: "Aftercare", desc: "Recovery & maintenance" }
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
            Ready to Experience Authentic Ayurvedic Treatments?
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