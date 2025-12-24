'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

interface Product {
  _id: string;
  productId: string;
  name: string;
  title: string;
  description: string;
  keyFeatures: string[];
  images: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 flex flex-col">
      {/* Add the Navbar here */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-12 md:py-24 bg-linear-to-br from-emerald-900 to-teal-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-amber-300">Products</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Discover our range of authentic Ayurvedic products crafted with natural ingredients
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Products Available</h3>
              <p className="text-gray-500">Please check back later for new products.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className={`bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Product Image */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      New
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-emerald-600 font-medium mb-3">{product.title}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{product.description}</p>

                    {/* Key Features */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Key Benefits:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {product.keyFeatures.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-emerald-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                        {product.keyFeatures.length > 3 && (
                          <li className="text-emerald-600 font-medium italic text-xs">
                            +{product.keyFeatures.length - 3} more benefits
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/Products/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}
                      className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg group"
                    >
                      <FaEye className="group-hover:scale-110 transition-transform" />
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-linear-to-r from-emerald-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
            Need Help Choosing the Right Product?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Our Ayurvedic experts are here to guide you towards the best products for your health needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/Contact"
              className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/Appointment"
              className="px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white/10 transition-colors duration-300"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Add the Footer here */}
      <Footer />
    </div>
  );
}