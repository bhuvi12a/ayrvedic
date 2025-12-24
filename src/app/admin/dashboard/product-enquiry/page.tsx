'use client';

import { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaBox, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';

interface Enquiry {
  _id: string;
  productId: string;
  productName: string;
  name: string;
  email: string;
  mobile: string;
  message?: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export default function ProductEnquiryPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    filterEnquiries();
  }, [searchQuery, statusFilter, enquiries]);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/admin/enquiries');
      const data = await response.json();
      if (data.success) {
        setEnquiries(data.enquiries);
        setFilteredEnquiries(data.enquiries);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEnquiries = () => {
    let filtered = enquiries;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(enq => enq.status === statusFilter);
    }

    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(enq =>
        enq.name.toLowerCase().includes(query) ||
        enq.email.toLowerCase().includes(query) ||
        enq.mobile.includes(query) ||
        enq.productName.toLowerCase().includes(query) ||
        enq.productId.toLowerCase().includes(query)
      );
    }

    setFilteredEnquiries(filtered);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setEnquiries(prev =>
          prev.map(enq => enq._id === id ? { ...enq, status: newStatus as any } : enq)
        );
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const response = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setEnquiries(prev => prev.filter(enq => enq._id !== id));
        alert('Enquiry deleted successfully');
      } else {
        alert(data.message || 'Failed to delete enquiry');
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      alert('Failed to delete enquiry');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Product Enquiries</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage customer enquiries for products ({enquiries.length} total)
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, mobile, product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Status Filter */}
          <div className="md:w-48 relative">
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading enquiries...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <FaEnvelope className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchQuery || statusFilter !== 'all' ? 'No Enquiries Found' : 'No Enquiries Yet'}
            </h3>
            <p className="text-gray-500">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Customer enquiries will appear here'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-linear-to-r from-emerald-500 to-teal-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Contact</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Message</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-xs text-gray-600">{formatDate(enquiry.createdAt)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          <FaBox className="text-emerald-600 mt-1" />
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{enquiry.productName}</p>
                            <p className="text-xs text-gray-500">ID: {enquiry.productId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-sm text-gray-900">{enquiry.name}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <FaEnvelope className="text-emerald-600" />
                            <a href={`mailto:${enquiry.email}`} className="hover:text-emerald-600">
                              {enquiry.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <FaPhone className="text-emerald-600" />
                            <a href={`tel:${enquiry.mobile}`} className="hover:text-emerald-600">
                              {enquiry.mobile}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs text-gray-600 max-w-xs line-clamp-2">
                          {enquiry.message || '-'}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                            enquiry.status
                          )} border-0 cursor-pointer`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleDelete(enquiry._id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300"
                            title="Delete Enquiry"
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
    </div>
  );
}
