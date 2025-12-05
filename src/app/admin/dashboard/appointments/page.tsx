'use client';

import { useState, useEffect } from 'react';
import { FaCalendarCheck, FaClock, FaUser, FaEnvelope, FaPhone, FaConciergeBell, FaSpinner } from 'react-icons/fa';

interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  doctor: string;
  service: string;
  treatment?: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/admin/appointments');
      const data = await response.json();
      
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/appointments', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setAppointments(appointments.map(app => 
          app._id === id ? { ...app, status: newStatus as any } : app
        ));
        if (selectedAppointment && selectedAppointment._id === id) {
          setSelectedAppointment({ ...selectedAppointment, status: newStatus as any });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const filteredAppointments = statusFilter === 'all' 
    ? appointments 
    : appointments.filter(app => app.status === statusFilter);

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

  const serviceNames: { [key: string]: string } = {
    respiratory: 'Respiratory Disorders',
    ortho: 'Ortho & Joint Problems',
    skin: 'Skin Diseases',
    gynaecology: 'Gynaecology Disorders',
    paediatric: 'Paediatric Problems',
    infertility: 'Infertility & Sexual Problems',
    neurological: 'Neurological Disorders',
    lifestyle: 'Life Style Disorders',
    obesity: 'Obesity',
  };

  const doctorNames: { [key: string]: string } = {
    'dr-vikesh': 'Dr. B. Vikesh',
    'dr-selvi': 'Dr. S. Thanikai Selvi',
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <FaCalendarCheck className="text-green-600" />
          Appointments Management
        </h1>
        <p className="text-gray-600">View and manage all appointment bookings</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-linear-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
              <FaCalendarCheck className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FaClock className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Confirmed</p>
              <p className="text-3xl font-bold text-blue-600">{stats.confirmed}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaCalendarCheck className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaCalendarCheck className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 mb-6 flex gap-2">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((filter) => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              statusFilter === filter
                ? 'bg-linear-to-r from-green-500 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Appointments ({filteredAppointments.length})
            </h2>
          </div>
          
          <div className="overflow-y-auto max-h-[600px]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <FaSpinner className="animate-spin text-4xl text-green-600" />
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <FaCalendarCheck className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No appointments found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    onClick={() => setSelectedAppointment(appointment)}
                    className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                      selectedAppointment?._id === appointment._id ? 'bg-green-50 border-l-4 border-green-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        <h3 className="font-semibold text-gray-800">{appointment.name}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(appointment.status)}`}>
                        {appointment.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="ml-6 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        <span>{doctorNames[appointment.doctor] || appointment.doctor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarCheck className="text-gray-400" />
                        <span>{appointment.date} at {appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaConciergeBell className="text-gray-400" />
                        <span>{serviceNames[appointment.service] || appointment.service}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Appointment Details */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Appointment Details</h2>
          </div>
          
          {selectedAppointment ? (
            <div className="p-6">
              <div className="space-y-6">
                {/* Status Update */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedAppointment._id, status)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedAppointment.status === status
                            ? 'bg-linear-to-r from-green-500 to-blue-600 text-white shadow-md'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Patient Information */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaUser className="text-green-600" />
                    Patient Information
                  </h3>
                  <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <FaUser className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Name</p>
                        <p className="font-medium text-gray-800">{selectedAppointment.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Email</p>
                        <p className="font-medium text-gray-800">{selectedAppointment.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Phone</p>
                        <p className="font-medium text-gray-800">{selectedAppointment.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appointment Information */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaCalendarCheck className="text-green-600" />
                    Appointment Information
                  </h3>
                  <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <FaUser className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Doctor</p>
                        <p className="font-medium text-gray-800">{doctorNames[selectedAppointment.doctor] || selectedAppointment.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaConciergeBell className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Service</p>
                        <p className="font-medium text-gray-800">{serviceNames[selectedAppointment.service] || selectedAppointment.service}</p>
                      </div>
                    </div>
                    {selectedAppointment.treatment && (
                      <div className="flex items-center gap-3">
                        <FaConciergeBell className="text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-600">Treatment</p>
                          <p className="font-medium text-gray-800">{selectedAppointment.treatment}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <FaCalendarCheck className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Date</p>
                        <p className="font-medium text-gray-800">{selectedAppointment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaClock className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Time</p>
                        <p className="font-medium text-gray-800">{selectedAppointment.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                {selectedAppointment.message && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Additional Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{selectedAppointment.message}</p>
                    </div>
                  </div>
                )}

                {/* Booking Date */}
                <div className="text-xs text-gray-500 pt-4 border-t border-gray-200">
                  Booked on: {new Date(selectedAppointment.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <FaCalendarCheck className="text-6xl mb-4" />
              <p className="text-lg">Select an appointment to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
