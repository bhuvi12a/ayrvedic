'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    try {
      const response = await fetch('/api/admin/newsletter-enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessModal(true);
        setEmail('');
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/About" },
        { name: "Services", href: "/Services" },
        { name: "Treatments", href: "/Treatments" },
        { name: "Products", href: "/Products" },
        { name: "Contact", href: "/Contact" },
      ]
    },
    {
      title: "Our Services",
      links: [
        { name: "Panchakarma", href: "/Services" },
        { name: "Herbal Consultations", href: "/Services" },
        { name: "Ayurvedic Massage", href: "/Services" },
        { name: "Diet & Nutrition", href: "/Services" },
      ]
    },
    {
      title: "Contact Info",
      links: [
        { name: "38 VT Towers, Tank street", href: "#" },
        { name: "Hosur 635109, Krishnagiri District", href: "#" },
        { name: "Phone: 7904136051", href: "tel:7904136051" }, // Updated phone number
        { name: "Email: tsachosur@gmail.com", href: "mailto:tsachosur@gmail.com" },
      ]
    }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1FVXgwzHwd/?mibextid=wwXIfr",
      icon: <FaFacebookF className="w-5 h-5" />
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/tsac_hosur?igsh=MThlNjRyNjhzZHQwMA%3D%3D&utm_source=qr",
      icon: <FaInstagram className="w-5 h-5" />
    },
    // { 
    //   name: "Twitter", 
    //   href: "#", 
    //   icon: (
    //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //       <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    //     </svg>
    //   )
    // },
    // { 
    //   name: "YouTube", 
    //   href: "#", 
    //   icon: (
    //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //       <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    //     </svg>
    //   )
    // },
  ];

  return (
    <>
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
                Subscribed Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for subscribing! You'll receive our latest updates and wellness tips.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center mr-3">
                  <span className="text-emerald-900 font-bold text-lg">T</span>
                </div>
                <span className="font-bold text-xl">Traditional Siddha Ayurveda</span>
              </div>
              <p className="text-emerald-100 mb-6 max-w-xs">
                Bringing ancient Ayurvedic wisdom to modern wellness. Your journey to holistic health starts here.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                    className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center hover:bg-emerald-700 transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold mb-4 text-emerald-300">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-emerald-100 hover:text-white transition-colors duration-300 flex items-start"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 pt-8 border-t border-emerald-800">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-lg font-semibold text-emerald-300 mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-emerald-100 max-w-md">
                  Get latest Ayurvedic tips, health insights, and exclusive offers.
                </p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <div className="relative flex-1 lg:flex-initial">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    disabled={isSubscribing}
                    className="px-4 py-3 pr-10 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full lg:w-80 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium px-6 py-3 rounded-r-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-emerald-800 text-center text-emerald-200 text-sm">
            <p>&copy; {currentYear} Traditional Siddha Ayurveda Clinic. All rights reserved.</p>

          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;