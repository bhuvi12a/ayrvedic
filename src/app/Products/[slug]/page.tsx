'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaCheck, FaShoppingCart, FaTimes } from 'react-icons/fa';
import Navbar from '@/app/Components/Navbar';
import Footer from '@/app/Components/Footer';

interface Product {
  _id: string;
  productId: string;
  name: string;
  title: string;
  description: string;
  keyFeatures: string[];
  images: string[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });

  useEffect(() => {
    setIsMounted(true);
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${slug}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquiryFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEnquiryForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.productId,
          productName: product.name,
          ...enquiryForm,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowEnquiryModal(false);
        setShowSuccessMessage(true);
        setEnquiryForm({
          name: '',
          email: '',
          mobile: '',
          message: '',
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        alert(data.message || 'Failed to submit enquiry');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-teal-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-teal-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link
              href="/Products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
            >
              <FaArrowLeft /> Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 pt-20">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="text-gray-500 hover:text-emerald-600 transition-colors"
              >
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href="/Products"
                className="text-gray-500 hover:text-emerald-600 transition-colors"
              >
                Products
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-emerald-600 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-all duration-1000`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Column - Images */}
              <div className="p-8 md:p-12 bg-gradient-to-br from-emerald-50 to-teal-50">
                {/* Main Image */}
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-xl mb-6">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6 bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm bg-opacity-90">
                    ⭐ Premium Quality
                  </div>
                </div>

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-2xl overflow-hidden border-3 transition-all duration-300 transform hover:scale-105 ${
                          selectedImage === index
                            ? 'border-emerald-500 shadow-xl scale-105 ring-4 ring-emerald-200'
                            : 'border-gray-200 hover:border-emerald-300 shadow-md'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div className="p-8 md:p-12 flex flex-col">
                {/* Product Header */}
                <div className="mb-6">
                  <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    🌿 100% Natural
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-xl text-emerald-600 font-semibold">
                    {product.title}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">📝</span> About This Product
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✨</span> Key Benefits
                  </h2>
                  <div className="grid gap-3">
                    {product.keyFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="shrink-0 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5 shadow-md">
                          <FaCheck className="text-white text-xs" />
                        </div>
                        <span className="flex-1 text-gray-800 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-auto space-y-4">
                  <button
                    onClick={() => setShowEnquiryModal(true)}
                    className="flex items-center justify-center gap-3 w-full px-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                  >
                    <FaShoppingCart className="text-xl" /> Inquire Now
                  </button>
                  <p className="text-sm text-gray-500 text-center">
                    💬 Contact us for pricing and availability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              🌟 Expert Consultation Available
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Need Help Choosing the <br />
              <span className="text-emerald-200">Perfect Product?</span>
            </h2>
            <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
              Our certified Ayurvedic experts are here to guide you towards the best products for your unique health needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/Contact"
                className="group px-10 py-5 bg-white text-emerald-700 font-bold rounded-2xl hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">📞</span>
                <span>Contact Us</span>
              </Link>
              <Link
                href="/Appointment"
                className="group px-10 py-5 bg-transparent text-white font-bold rounded-2xl border-3 border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3"
              >
                <span className="text-2xl">📅</span>
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-5 rounded-t-3xl flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Product Enquiry</h2>
                <p className="text-emerald-50 text-sm">We'll get back to you soon!</p>
              </div>
              <button
                onClick={() => setShowEnquiryModal(false)}
                className="text-white hover:text-gray-200 transition-colors bg-white/20 rounded-full p-2 hover:bg-white/30"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleEnquirySubmit} className="p-6 space-y-6">
              {/* Product Info */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border-2 border-emerald-100">
                <p className="text-xs text-gray-600 mb-3 font-semibold uppercase tracking-wide">Enquiry for:</p>
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-emerald-600 font-semibold">{product.title}</p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={enquiryForm.name}
                  onChange={handleEnquiryFormChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={enquiryForm.email}
                  onChange={handleEnquiryFormChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={enquiryForm.mobile}
                  onChange={handleEnquiryFormChange}
                  required
                  pattern="[0-9]{10,15}"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="Enter your mobile number"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={enquiryForm.message}
                  onChange={handleEnquiryFormChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none transition-all duration-300"
                  placeholder="Any specific questions or requirements..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEnquiryModal(false)}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:border-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    '✉️ Send Enquiry'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Message Popup */}
      {showSuccessMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform animate-bounce-in">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">
                Your enquiry has been submitted successfully. Our team will contact you soon.
              </p>
              
              {/* Close Button */}
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
