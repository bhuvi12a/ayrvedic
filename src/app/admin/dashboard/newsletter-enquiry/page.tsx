'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaNewspaper, FaEnvelope, FaSpinner, FaCheckCircle, FaBan, FaCalendar } from 'react-icons/fa';

interface NewsletterEnquiry {
  _id: string;
  email: string;
  status: 'subscribed' | 'unsubscribed';
  createdAt: string;
}

export default function NewsletterEnquiryPage() {
  const [enquiries, setEnquiries] = useState<NewsletterEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'subscribed' | 'unsubscribed'>('all');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/admin/newsletter-enquiries');
      const data = await response.json();
      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'subscribed' | 'unsubscribed') => {
    try {
      const response = await fetch('/api/admin/newsletter-enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();
      if (data.success) {
        fetchEnquiries();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    if (filter === 'all') return true;
    return enquiry.status === filter;
  });

  const stats = {
    total: enquiries.length,
    subscribed: enquiries.filter((e) => e.status === 'subscribed').length,
    unsubscribed: enquiries.filter((e) => e.status === 'unsubscribed').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Newsletter Enquiries</h1>
        <p className="text-gray-600">Manage newsletter subscriptions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Subscribers</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
              </div>
              <FaNewspaper className="text-4xl text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.subscribed}</p>
              </div>
              <FaCheckCircle className="text-4xl text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Unsubscribed</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{stats.unsubscribed}</p>
              </div>
              <FaBan className="text-4xl text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-lg border border-gray-200 w-fit">
        <Button
          onClick={() => setFilter('all')}
          className={`${
            filter === 'all'
              ? 'bg-gray-700 text-white'
              : 'bg-transparent text-gray-700 hover:bg-gray-100'
          }`}
        >
          All ({stats.total})
        </Button>
        <Button
          onClick={() => setFilter('subscribed')}
          className={`${
            filter === 'subscribed'
              ? 'bg-green-600 text-white'
              : 'bg-transparent text-gray-700 hover:bg-gray-100'
          }`}
        >
          Subscribed ({stats.subscribed})
        </Button>
        <Button
          onClick={() => setFilter('unsubscribed')}
          className={`${
            filter === 'unsubscribed'
              ? 'bg-red-600 text-white'
              : 'bg-transparent text-gray-700 hover:bg-gray-100'
          }`}
        >
          Unsubscribed ({stats.unsubscribed})
        </Button>
      </div>

      {/* Enquiries Table */}
      {filteredEnquiries.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FaNewspaper className="text-6xl text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg">No newsletter subscribers yet</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Subscribers List</CardTitle>
            <CardDescription className="text-gray-600">
              Showing {filteredEnquiries.length} of {stats.total} subscribers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredEnquiries.map((enquiry) => (
                <div
                  key={enquiry._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FaEnvelope className="text-gray-500" />
                      <span className="text-gray-800 font-medium">{enquiry.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCalendar className="text-xs" />
                      <span>Subscribed on {formatDate(enquiry.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        enquiry.status === 'subscribed'
                          ? 'bg-green-50 text-green-700 border-green-300'
                          : 'bg-red-50 text-red-700 border-red-300'
                      }`}
                    >
                      {enquiry.status.toUpperCase()}
                    </span>

                    {enquiry.status === 'subscribed' ? (
                      <Button
                        onClick={() => updateStatus(enquiry._id, 'unsubscribed')}
                        className="bg-red-50 hover:bg-red-100 border border-red-300 text-red-700"
                        size="sm"
                      >
                        <FaBan className="mr-2" />
                        Unsubscribe
                      </Button>
                    ) : (
                      <Button
                        onClick={() => updateStatus(enquiry._id, 'subscribed')}
                        className="bg-green-50 hover:bg-green-100 border border-green-300 text-green-700"
                        size="sm"
                      >
                        <FaCheckCircle className="mr-2" />
                        Resubscribe
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
