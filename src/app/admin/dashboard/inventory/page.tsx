'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaPlus, FaBox, FaExclamationTriangle, FaClock, FaCheck, 
  FaEye, FaEdit, FaTrash, FaSpinner, FaWarehouse, FaChartBar,
  FaBoxOpen, FaTimesCircle
} from 'react-icons/fa';

interface Batch {
  _id: string;
  batchName: string;
  products: Array<{
    productId: string;
    productName: string;
    quantity: number;
  }>;
  totalProducts: number;
  totalQuantity: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  totalBatches: number;
  totalProducts: number;
  totalQuantity: number;
  activeBatches: number;
  completedBatches: number;
}

export default function InventoryDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [editBatchName, setEditBatchName] = useState('');
  const [editBatchStatus, setEditBatchStatus] = useState<'active' | 'completed' | 'cancelled'>('active');

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [filter]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const timestamp = new Date().getTime();
      const [statsRes, batchesRes] = await Promise.all([
        fetch(`/api/admin/inventory/stats?t=${timestamp}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
        }),
        fetch(`/api/admin/inventory?${getFilterParams()}&t=${timestamp}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
        }),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (batchesRes.ok) {
        const batchesData = await batchesRes.json();
        setBatches(batchesData);
      }

      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getFilterParams = () => {
    const params = new URLSearchParams();
    if (filter === 'active') params.append('status', 'active');
    else if (filter === 'completed') params.append('status', 'completed');
    return params.toString();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this batch?')) return;

    try {
      const response = await fetch(`/api/admin/inventory?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      } else {
        setError('Failed to delete batch');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleEditBatch = (batch: Batch) => {
    setEditingBatch(batch);
    setEditBatchName(batch.batchName);
    setEditBatchStatus(batch.status);
  };

  const handleSaveEdit = async () => {
    if (!editingBatch) return;

    try {
      const response = await fetch('/api/admin/inventory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingBatch._id,
          batchName: editBatchName,
          status: editBatchStatus,
        }),
      });

      if (response.ok) {
        fetchData();
        setEditingBatch(null);
      } else {
        setError('Failed to update batch');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const filteredBatches = batches.filter((batch) =>
    batch.batchName && batch.batchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isExpired = (date: string) => new Date(date) < new Date();
  const daysUntilExpiry = (date: string) => {
    const days = Math.ceil(
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, days);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Manage your product batches and stock levels</p>
        </div>
        <Link href="/admin/dashboard/add-inventory">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all">
            <FaPlus className="text-lg" />
            <span className="font-semibold">Create New Batch</span>
          </button>
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
          <FaExclamationTriangle className="text-lg mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-bold uppercase tracking-wide">Total Batches</p>
                <p className="text-4xl font-bold text-blue-900 mt-3">{stats.totalBatches}</p>
              </div>
              <FaBox className="text-5xl text-blue-300 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg border-l-4 border-green-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-bold uppercase tracking-wide">Total Products</p>
                <p className="text-4xl font-bold text-green-900 mt-3">{stats.totalProducts}</p>
              </div>
              <FaBoxOpen className="text-5xl text-green-300 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-bold uppercase tracking-wide">Total Quantity</p>
                <p className="text-4xl font-bold text-purple-900 mt-3">{stats.totalQuantity}</p>
              </div>
              <FaWarehouse className="text-5xl text-purple-300 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg shadow-lg border-l-4 border-emerald-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-700 text-sm font-bold uppercase tracking-wide">Active Batches</p>
                <p className="text-4xl font-bold text-emerald-900 mt-3">{stats.activeBatches}</p>
              </div>
              <FaCheck className="text-5xl text-emerald-300 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-lg border-l-4 border-orange-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-bold uppercase tracking-wide">Completed</p>
                <p className="text-4xl font-bold text-orange-900 mt-3">{stats.completedBatches}</p>
              </div>
              <FaTimesCircle className="text-5xl text-orange-300 opacity-50" />
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by product name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 flex items-center justify-center">
              <FaSpinner className="text-4xl text-green-600 animate-spin" />
            </div>
          ) : filteredBatches.length === 0 ? (
            <div className="p-12 text-center">
              <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No batches found</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Batch Name</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Products</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Total Quantity</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Created</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBatches.map((batch) => (
                  <tr key={batch._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{batch.batchName || 'Unnamed Batch'}</p>
                        <p className="text-sm text-gray-600">ID: {batch._id.slice(-8)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg font-bold text-lg bg-blue-100 text-blue-700">
                        {batch.products.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg font-bold text-lg bg-green-100 text-green-700">
                        {batch.products.reduce((sum, product) => sum + product.quantity, 0)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          batch.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : batch.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {batch.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      {new Date(batch.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/dashboard/inventory/${batch._id}`}>
                          <button
                            title="View Details"
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <FaEye className="text-lg" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleEditBatch(batch)}
                          title="Edit Batch"
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(batch._id)}
                          title="Delete"
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Batch Modal */}
      {editingBatch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <h2 className="text-2xl font-bold">Edit Batch</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Batch Name</label>
                <input
                  type="text"
                  value={editBatchName}
                  onChange={(e) => setEditBatchName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={editBatchStatus}
                  onChange={(e) => setEditBatchStatus(e.target.value as 'active' | 'completed' | 'cancelled')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingBatch(null)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
