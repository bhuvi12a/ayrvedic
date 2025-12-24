'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaEnvelope, FaPhone, FaUser, FaSpinner, FaCheckCircle, FaEye, FaBan } from 'react-icons/fa';

interface ContactEnquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'resolved';
  createdAt: string;
}

export default function ContactEnquiryPage() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/admin/contact-enquiries');
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

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/contact-enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();
      if (data.success) {
        fetchEnquiries();
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry(data.data);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'read':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'resolved':
        return 'bg-green-50 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Enquiries</h1>
          <p className="text-gray-600">Manage customer contact requests</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <span className="text-gray-600 text-sm">Total: </span>
          <span className="text-gray-800 font-bold text-lg">{enquiries.length}</span>
        </div>
      </div>

      {enquiries.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FaEnvelope className="text-6xl text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg">No contact enquiries yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enquiries List */}
          <div className="space-y-4">
            {enquiries.map((enquiry) => (
              <Card
                key={enquiry._id}
                className={`bg-white border-gray-200 hover:border-green-300 transition-all cursor-pointer ${
                  selectedEnquiry?._id === enquiry._id ? 'ring-2 ring-green-500 border-green-500' : ''
                }`}
                onClick={() => setSelectedEnquiry(enquiry)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-gray-800 text-lg flex items-center gap-2">
                        <FaUser className="text-gray-500" />
                        {enquiry.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-1">
                        {formatDate(enquiry.createdAt)}
                      </CardDescription>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        enquiry.status
                      )}`}
                    >
                      {enquiry.status.toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaEnvelope />
                      <span>{enquiry.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPhone />
                      <span>{enquiry.phone}</span>
                    </div>
                    <p className="text-gray-600 mt-3 line-clamp-2">{enquiry.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enquiry Details */}
          <div className="lg:sticky lg:top-6 h-fit">
            {selectedEnquiry ? (
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-800">Enquiry Details</CardTitle>
                  <CardDescription className="text-gray-600">
                    Full enquiry information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <label className="text-gray-600 text-xs uppercase">Name</label>
                      <p className="text-gray-800 font-medium mt-1">{selectedEnquiry.name}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <label className="text-gray-600 text-xs uppercase">Email</label>
                      <p className="text-gray-800 font-medium mt-1">{selectedEnquiry.email}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <label className="text-gray-600 text-xs uppercase">Phone</label>
                      <p className="text-gray-800 font-medium mt-1">{selectedEnquiry.phone}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <label className="text-gray-600 text-xs uppercase">Message</label>
                      <p className="text-gray-800 mt-1 whitespace-pre-wrap">{selectedEnquiry.message}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <label className="text-gray-600 text-xs uppercase">Received</label>
                      <p className="text-gray-800 font-medium mt-1">
                        {formatDate(selectedEnquiry.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-gray-700 text-sm font-medium">Update Status</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        onClick={() => updateStatus(selectedEnquiry._id, 'new')}
                        className={`${
                          selectedEnquiry.status === 'new'
                            ? 'bg-blue-600 hover:bg-blue-700 border-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700'
                        } border`}
                        disabled={selectedEnquiry.status === 'new'}
                      >
                        <FaBan className="mr-2" />
                        New
                      </Button>
                      <Button
                        onClick={() => updateStatus(selectedEnquiry._id, 'read')}
                        className={`${
                          selectedEnquiry.status === 'read'
                            ? 'bg-yellow-600 hover:bg-yellow-700 border-yellow-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700'
                        } border`}
                        disabled={selectedEnquiry.status === 'read'}
                      >
                        <FaEye className="mr-2" />
                        Read
                      </Button>
                      <Button
                        onClick={() => updateStatus(selectedEnquiry._id, 'resolved')}
                        className={`${
                          selectedEnquiry.status === 'resolved'
                            ? 'bg-green-600 hover:bg-green-700 border-green-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700'
                        } border`}
                        disabled={selectedEnquiry.status === 'resolved'}
                      >
                        <FaCheckCircle className="mr-2" />
                        Resolved
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border-gray-200">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FaEnvelope className="text-6xl text-gray-300 mb-4" />
                  <p className="text-gray-600">Select an enquiry to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
