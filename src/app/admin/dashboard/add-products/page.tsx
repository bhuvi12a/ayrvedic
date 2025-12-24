'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaImage, FaUpload, FaSearch } from 'react-icons/fa';

interface Product {
  _id: string;
  productId: string;
  name: string;
  title: string;
  description: string;
  keyFeatures: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function AddProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    keyFeatures: '',
    images: ['', '', '', ''],
  });
  const [uploadingImages, setUploadingImages] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.productId.toLowerCase().includes(query) ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (index: number, file: File) => {
    if (!file) return;

    const newUploadingState = [...uploadingImages];
    newUploadingState[index] = true;
    setUploadingImages(newUploadingState);

    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) {
        let errorMessage = `Server responded with ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // ignore parsing error
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data.success) {
        const newImages = [...formData.images];
        newImages[index] = data.url;
        setFormData(prev => ({
          ...prev,
          images: newImages,
        }));
      } else {
        alert(`Upload Failed: ${data.message || 'Unknown server error'}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      const resetUploadingState = [...uploadingImages];
      resetUploadingState[index] = false;
      setUploadingImages(resetUploadingState);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const keyFeaturesArray = formData.keyFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(f => f !== '');

    const filteredImages = formData.images.filter(img => img.trim() !== '');

    if (keyFeaturesArray.length === 0) {
      alert('Please add at least one key feature');
      return;
    }

    if (filteredImages.length === 0) {
      alert('Please add at least one image');
      return;
    }

    try {
      const url = '/api/admin/products';
      const method = editingProduct ? 'PATCH' : 'POST';

      const body = editingProduct
        ? {
          id: editingProduct._id,
          name: formData.name,
          title: formData.title,
          description: formData.description,
          keyFeatures: keyFeaturesArray,
          images: filteredImages,
        }
        : {
          name: formData.name,
          title: formData.title,
          description: formData.description,
          keyFeatures: keyFeaturesArray,
          images: filteredImages,
        };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        alert(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        setShowModal(false);
        resetForm();
        fetchProducts();
      } else {
        alert(data.message || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      title: product.title,
      description: product.description,
      keyFeatures: product.keyFeatures.join('\n'),
      images: [...product.images, '', '', '', ''].slice(0, 4),
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Product deleted successfully!');
        fetchProducts();
      } else {
        alert(data.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      description: '',
      keyFeatures: '',
      images: ['', '', '', ''],
    });
    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <p className="text-sm text-gray-600 mt-1">Create and manage your Ayurvedic products</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FaPlus /> Add New Product
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name, ID, title, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <FaImage className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchQuery ? 'No Products Found' : 'No Products Yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery ? 'Try adjusting your search query' : 'Start by adding your first product'}
            </p>
            <button
              onClick={openAddModal}
              className="px-6 py-3 bg-linear-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300"
            >
              <FaPlus className="inline mr-2" /> Add Product
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-linear-to-r from-emerald-500 to-teal-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Product ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Features</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          {product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaImage className="text-2xl text-gray-300" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {product.productId}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-emerald-600">{product.title}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs text-gray-600 max-w-xs line-clamp-2">{product.description}</p>
                      </td>
                      <td className="px-4 py-3">
                        <ul className="text-xs text-gray-600 space-y-1">
                          {product.keyFeatures.slice(0, 2).map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-emerald-500 mr-1">✓</span>
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                          {product.keyFeatures.length > 2 && (
                            <li className="text-emerald-600 font-medium italic">
                              +{product.keyFeatures.length - 2} more
                            </li>
                          )}
                        </ul>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300"
                            title="Edit Product"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300"
                            title="Delete Product"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 my-8">
            <div className="bg-linear-to-r from-green-500 to-blue-600 px-6 py-4 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Ashwagandha Capsules"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Natural Stress Relief & Energy Booster"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Product Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Detailed description of the product..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Key Features <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-500 mb-2">Enter each feature on a new line</p>
                  <textarea
                    name="keyFeatures"
                    value={formData.keyFeatures}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
                    placeholder="100% Natural Ingredients&#10;Boosts Immunity&#10;Improves Mental Clarity&#10;No Side Effects&#10;Clinically Tested"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Product Images (1-4 images) <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-500 mb-3">Upload images (max 10MB each)</p>
                  <div className="grid grid-cols-2 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="space-y-2">
                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition-colors">
                          {image ? (
                            <div className="relative">
                              <img
                                src={image}
                                alt={`Product ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = [...formData.images];
                                  newImages[index] = '';
                                  setFormData(prev => ({ ...prev, images: newImages }));
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center h-32 cursor-pointer">
                              {uploadingImages[index] ? (
                                <div className="text-center">
                                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent mb-2"></div>
                                  <p className="text-xs text-gray-500">Uploading...</p>
                                </div>
                              ) : (
                                <>
                                  <FaUpload className="text-3xl text-gray-400 mb-2" />
                                  <span className="text-sm text-gray-500">Upload Image {index + 1}</span>
                                  <span className="text-xs text-gray-400 mt-1">{index === 0 ? '(Required)' : '(Optional)'}</span>
                                </>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(index, file);
                                }}
                                className="hidden"
                                disabled={uploadingImages[index]}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImages.some(u => u)}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
