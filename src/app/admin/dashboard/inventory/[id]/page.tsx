'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaTrash, FaSpinner, FaBox, FaEdit, FaEye } from 'react-icons/fa';

interface Product {
  productId: string;
  productName: string;
  quantity: number;
  image?: string;
  buyingPrice?: number;
  sellingPrice?: number;
  modelName?: string;
  _id?: string;
}

interface BatchDetail {
  _id: string;
  batchName: string;
  products: Product[];
  totalProducts: number;
  totalQuantity: number;
  status: string;
}

export default function BatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const batchId = params.id as string;

  const [batch, setBatch] = useState<BatchDetail | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    quantity: '',
    image: '',
    buyingPrice: '',
    sellingPrice: '',
    modelName: '',
    imageFile: null as File | null,
  });

  const [editFormData, setEditFormData] = useState({
    productId: '',
    productName: '',
    quantity: '',
    image: '',
    buyingPrice: '',
    sellingPrice: '',
    modelName: '',
    imageFile: null as File | null,
  });

  useEffect(() => {
    fetchBatchDetails();
  }, []);

  const fetchBatchDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/inventory?id=${batchId}`);

      if (response.ok) {
        const data = await response.json();
        console.log('Batch data received from API:', data);
        const batchItem = Array.isArray(data) ? data[0] : data;
        setBatch(batchItem);
        // Set products from the batch's products array
        if (batchItem?.products) {
          console.log('Products from batch:', batchItem.products);
          setProducts(batchItem.products);
        } else {
          console.log('No products found in batch');
          setProducts([]);
        }
      } else {
        setError('Failed to fetch batch details');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError('');

      if (!formData.productId || !formData.productName || !formData.quantity) {
        setError('Please enter product ID, name and quantity');
        return;
      }

      let imageUrl = formData.image;

      // Upload image to Cloudinary if a file is selected
      if (formData.imageFile) {
        console.log('Uploading image file:', formData.imageFile.name);
        const formDataUpload = new FormData();
        formDataUpload.append('file', formData.imageFile);

        const uploadResponse = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formDataUpload,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          console.log('Image uploaded successfully:', uploadData.url);
          imageUrl = uploadData.url;
        } else {
          const errorData = await uploadResponse.json();
          console.error('Upload failed:', errorData);
          setError('Failed to upload image: ' + (errorData.message || 'Unknown error'));
          return;
        }
      }

      console.log('Adding product with data:', {
        batchId,
        productId: formData.productId,
        productName: formData.productName,
        quantity: formData.quantity,
        image: imageUrl,
        buyingPrice: formData.buyingPrice,
        sellingPrice: formData.sellingPrice,
        modelName: formData.modelName,
      });

      const payload = {
        batchId: batchId,
        productId: formData.productId.trim(),
        productName: formData.productName.trim(),
        quantity: parseInt(formData.quantity),
        image: imageUrl && imageUrl.trim() ? imageUrl.trim() : null,
        buyingPrice: formData.buyingPrice && formData.buyingPrice.trim() ? parseFloat(formData.buyingPrice) : null,
        sellingPrice: formData.sellingPrice && formData.sellingPrice.trim() ? parseFloat(formData.sellingPrice) : null,
        modelName: formData.modelName && formData.modelName.trim() ? formData.modelName.trim() : null,
      };

      console.log('Final payload being sent to API:', payload);

      const response = await fetch('/api/admin/inventory/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Product added successfully');
        const responseData = await response.json();
        console.log('API response after adding product:', responseData);
        setFormData({ 
          productId: '', 
          productName: '', 
          quantity: '',
          image: '',
          buyingPrice: '',
          sellingPrice: '',
          modelName: '',
          imageFile: null,
        });
        setShowAddForm(false);
        // Refresh batch details to get updated products
        await fetchBatchDetails();
      } else {
        const errorData = await response.json();
        console.error('Failed to add product:', errorData);
        setError(errorData.error || 'Failed to add product');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to remove this product from the batch?')) return;

    try {
      const response = await fetch(
        `/api/admin/inventory/batch?inventoryId=${batchId}&batchNumber=${productId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        fetchBatchDetails();
      } else {
        setError('Failed to remove product');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setEditFormData({
      productId: product.productId,
      productName: product.productName,
      quantity: String(product.quantity),
      image: product.image || '',
      buyingPrice: product.buyingPrice ? String(product.buyingPrice) : '',
      sellingPrice: product.sellingPrice ? String(product.sellingPrice) : '',
      modelName: product.modelName || '',
      imageFile: null,
    });
  };

  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProduct) return;

    try {
      setError('');

      let imageUrl = editFormData.image;

      // Upload image to Cloudinary if a file is selected
      if (editFormData.imageFile) {
        console.log('Uploading image file:', editFormData.imageFile.name);
        const formDataUpload = new FormData();
        formDataUpload.append('file', editFormData.imageFile);

        const uploadResponse = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formDataUpload,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          console.log('Image uploaded successfully:', uploadData.url);
          imageUrl = uploadData.url;
        } else {
          const errorData = await uploadResponse.json();
          console.error('Upload failed:', errorData);
          setError('Failed to upload image: ' + (errorData.message || 'Unknown error'));
          return;
        }
      }

      // Delete old product from batch
      await fetch(
        `/api/admin/inventory/batch?inventoryId=${batchId}&batchNumber=${editingProduct.productId}`,
        { method: 'DELETE' }
      );

      // Add updated product
      const payload = {
        batchId: batchId,
        productId: editFormData.productId.trim(),
        productName: editFormData.productName.trim(),
        quantity: parseInt(editFormData.quantity),
        image: imageUrl && imageUrl.trim() ? imageUrl.trim() : null,
        buyingPrice: editFormData.buyingPrice && editFormData.buyingPrice.trim() ? parseFloat(editFormData.buyingPrice) : null,
        sellingPrice: editFormData.sellingPrice && editFormData.sellingPrice.trim() ? parseFloat(editFormData.sellingPrice) : null,
        modelName: editFormData.modelName && editFormData.modelName.trim() ? editFormData.modelName.trim() : null,
      };

      const response = await fetch('/api/admin/inventory/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setEditingProduct(null);
        await fetchBatchDetails();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update product');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="text-4xl text-green-600 animate-spin" />
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Batch not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/inventory">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FaArrowLeft className="text-xl text-gray-600" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{batch.batchName}</h1>
          <p className="text-gray-600 mt-1">Manage products in this batch</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
          <FaBox className="text-lg mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-medium">Total Products</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium">Total Stock</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {products.reduce((sum, p) => sum + (p.quantity || 0), 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-medium">Batch ID</p>
          <p className="text-lg font-bold text-gray-900 mt-2 truncate">{batch._id}</p>
        </div>
      </div>

      {/* Add Product Section */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all"
        >
          <FaPlus />
          Add Product to Batch
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Add Product</h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Product ID *
                </label>
                <input
                  type="text"
                  value={formData.productId}
                  onChange={(e) =>
                    setFormData({ ...formData, productId: e.target.value })
                  }
                  placeholder="e.g., PROD-001"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) =>
                    setFormData({ ...formData, productName: e.target.value })
                  }
                  placeholder="e.g., Ayurvedic Oil"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Model Name
                </label>
                <input
                  type="text"
                  value={formData.modelName}
                  onChange={(e) =>
                    setFormData({ ...formData, modelName: e.target.value })
                  }
                  placeholder="e.g., Premium 500ml"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  placeholder="e.g., 100"
                  min="1"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Buying Price
                </label>
                <input
                  type="number"
                  value={formData.buyingPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, buyingPrice: e.target.value })
                  }
                  placeholder="e.g., 50.00"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Selling Price
                </label>
                <input
                  type="number"
                  value={formData.sellingPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, sellingPrice: e.target.value })
                  }
                  placeholder="e.g., 75.00"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData({ ...formData, imageFile: file });
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {formData.image && (
                  <p className="text-sm text-gray-600 mt-1">Current image will be replaced</p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({ 
                    productId: '', 
                    productName: '', 
                    quantity: '',
                    image: '',
                    buyingPrice: '',
                    sellingPrice: '',
                    modelName: '',
                    imageFile: null,
                  });
                  setError('');
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Products in Batch</h2>
        </div>

        {products.length === 0 ? (
          <div className="p-12 text-center">
            <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No products in this batch yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Model
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    Buying Price
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    Selling Price
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.productName}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">{product.productName}</p>
                          <p className="text-sm text-gray-600">{product.productId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{product.modelName || '-'}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-700">
                        {product.buyingPrice ? `$${product.buyingPrice}` : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-700">
                        {product.sellingPrice ? `$${product.sellingPrice}` : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View details"
                        >
                          <FaEye className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.productId)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete product"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl font-bold">Product Details</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-xl sm:text-2xl hover:opacity-75 transition-opacity"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Product Image */}
              {selectedProduct.image && (
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">Product Image</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50 p-2 sm:p-4">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.productName}
                      className="w-full h-auto max-h-60 sm:max-h-80 object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">Product ID</label>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-900 break-all">{selectedProduct.productId}</p>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">Product Name</label>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-900 break-words">{selectedProduct.productName}</p>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">Model Name</label>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-900 break-words">{selectedProduct.modelName || '-'}</p>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">Quantity</label>
                  <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                    <p className="text-blue-900 font-semibold text-base sm:text-lg">{selectedProduct.quantity}</p>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">Buying Price</label>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-900">
                      {selectedProduct.buyingPrice ? `$${selectedProduct.buyingPrice.toFixed(2)}` : '-'}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">Selling Price</label>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-900">
                      {selectedProduct.sellingPrice ? `$${selectedProduct.sellingPrice.toFixed(2)}` : '-'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profit Margin (if both prices are available) */}
              {selectedProduct.buyingPrice && selectedProduct.sellingPrice && (
                <div className="space-y-2 bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                  <label className="block text-xs sm:text-sm font-semibold text-green-700">Profit Margin</label>
                  <div>
                    <p className="text-green-900 font-semibold text-base sm:text-lg">
                      ${(selectedProduct.sellingPrice - selectedProduct.buyingPrice).toFixed(2)}
                      <span className="text-xs sm:text-sm ml-2">
                        ({(((selectedProduct.sellingPrice - selectedProduct.buyingPrice) / selectedProduct.buyingPrice) * 100).toFixed(1)}%)
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* JSON View for debugging */}
              <div className="space-y-2 bg-gray-900 p-3 sm:p-4 rounded-lg">
                <label className="block text-xs sm:text-sm font-semibold text-gray-300">Raw Data (JSON)</label>
                <pre className="text-gray-300 text-[10px] sm:text-xs overflow-x-auto whitespace-pre-wrap break-words font-mono">
                  {JSON.stringify(selectedProduct, null, 2)}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full px-3 sm:px-4 py-2 text-xs sm:text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl font-bold">Edit Product</h2>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="text-xl sm:text-2xl hover:opacity-75 transition-opacity"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveEditProduct} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Product ID *</label>
                  <input
                    type="text"
                    value={editFormData.productId}
                    onChange={(e) => setEditFormData({ ...editFormData, productId: e.target.value })}
                    placeholder="e.g., PROD-001"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={editFormData.productName}
                    onChange={(e) => setEditFormData({ ...editFormData, productName: e.target.value })}
                    placeholder="e.g., Ayurvedic Oil"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Model Name</label>
                  <input
                    type="text"
                    value={editFormData.modelName}
                    onChange={(e) => setEditFormData({ ...editFormData, modelName: e.target.value })}
                    placeholder="e.g., Premium 500ml"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Stock Quantity *</label>
                  <input
                    type="number"
                    value={editFormData.quantity}
                    onChange={(e) => setEditFormData({ ...editFormData, quantity: e.target.value })}
                    placeholder="e.g., 100"
                    min="1"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Buying Price</label>
                  <input
                    type="number"
                    value={editFormData.buyingPrice}
                    onChange={(e) => setEditFormData({ ...editFormData, buyingPrice: e.target.value })}
                    placeholder="e.g., 50.00"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Selling Price</label>
                  <input
                    type="number"
                    value={editFormData.sellingPrice}
                    onChange={(e) => setEditFormData({ ...editFormData, sellingPrice: e.target.value })}
                    placeholder="e.g., 75.00"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Product Image</label>
                  {editFormData.image && (
                    <div className="mb-3 border border-gray-300 rounded-lg p-2 bg-gray-50">
                      <img src={editFormData.image} alt="Preview" className="w-full h-32 object-cover rounded" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setEditFormData({ ...editFormData, imageFile: file });
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}    </div>
  );
}