'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaEnvelope, FaNewspaper, FaUsers, FaChartLine, FaCalendarCheck, FaBoxOpen, FaClipboardList } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    contactEnquiries: 0,
    newsletterSubscribers: 0,
    appointments: 0,
    products: 0,
    productEnquiries: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contactRes, newsletterRes, appointmentsRes, productsRes, productEnquiriesRes] = await Promise.all([
          fetch('/api/admin/contact-enquiries'),
          fetch('/api/admin/newsletter-enquiries'),
          fetch('/api/admin/appointments'),
          fetch('/api/admin/products'),
          fetch('/api/admin/enquiries'),
        ]);

        const contactData = await contactRes.json();
        const newsletterData = await newsletterRes.json();
        const appointmentsData = await appointmentsRes.json();
        const productsData = await productsRes.json();
        const productEnquiriesData = await productEnquiriesRes.json();

        console.log('📊 Dashboard Stats Debug:');
        console.log('Contact Enquiries:', contactData);
        console.log('Newsletter:', newsletterData);
        console.log('Appointments:', appointmentsData);
        console.log('Products:', productsData);
        console.log('Product Enquiries:', productEnquiriesData);

        setStats({
          contactEnquiries: contactData.success ? (contactData.data?.length || 0) : 0,
          newsletterSubscribers: newsletterData.success ? (newsletterData.data?.length || 0) : 0,
          appointments: appointmentsData.success ? (appointmentsData.appointments?.length || 0) : 0,
          products: productsData.success ? (productsData.data?.length || 0) : 0,
          productEnquiries: productEnquiriesData.success ? (productEnquiriesData.data?.length || 0) : 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    
    // Refresh stats every 30 seconds for real-time updates
    const interval = setInterval(fetchStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'Contact Enquiries',
      value: stats.contactEnquiries,
      icon: FaEnvelope,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.newsletterSubscribers,
      icon: FaNewspaper,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Appointments',
      value: stats.appointments,
      icon: FaCalendarCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Products',
      value: stats.products,
      icon: FaBoxOpen,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      title: 'Product Enquiries',
      value: stats.productEnquiries,
      icon: FaClipboardList,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
  ];

  // Prepare chart data
  const barChartData = [
    { name: 'Contact Enquiries', value: stats.contactEnquiries, fill: '#3b82f6' },
    { name: 'Newsletter', value: stats.newsletterSubscribers, fill: '#22c55e' },
    { name: 'Appointments', value: stats.appointments, fill: '#a855f7' },
    { name: 'Products', value: stats.products, fill: '#10b981' },
    { name: 'Product Enquiries', value: stats.productEnquiries, fill: '#14b8a6' },
  ];

  const pieChartData = [
    { name: 'Contact Enquiries', value: stats.contactEnquiries, color: '#3b82f6' },
    { name: 'Newsletter', value: stats.newsletterSubscribers, color: '#22c55e' },
    { name: 'Appointments', value: stats.appointments, color: '#a855f7' },
    { name: 'Product Enquiries', value: stats.productEnquiries, color: '#14b8a6' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Dashboard Overview</h1>
        <p className="text-sm sm:text-base text-gray-600">Welcome back, Moin! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className={`bg-white border ${stat.borderColor} hover:shadow-xl transition-all duration-200 ${stat.bgColor}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">
                  {stat.title}
                </CardTitle>
                <Icon className={`text-xl sm:text-2xl ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Enquiry Management */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-gray-800">Enquiry Management</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600">
              Manage customer enquiries and communications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <a
              href="/admin/dashboard/contact-enquiry"
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
            >
              <FaEnvelope className="text-blue-600 text-lg sm:text-xl shrink-0" />
              <div>
                <p className="text-gray-800 font-medium text-sm sm:text-base">View Contact Enquiries</p>
                <p className="text-gray-600 text-xs sm:text-sm">Manage customer messages</p>
              </div>
            </a>
            <a
              href="/admin/dashboard/newsletter-enquiry"
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors"
            >
              <FaNewspaper className="text-green-600 text-lg sm:text-xl shrink-0" />
              <div>
                <p className="text-gray-800 font-medium text-sm sm:text-base">View Newsletter Subscribers</p>
                <p className="text-gray-600 text-xs sm:text-sm">Manage your mailing list</p>
              </div>
            </a>
            <a
              href="/admin/dashboard/appointments"
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors"
            >
              <FaCalendarCheck className="text-purple-600 text-lg sm:text-xl shrink-0" />
              <div>
                <p className="text-gray-800 font-medium text-sm sm:text-base">View Appointments</p>
                <p className="text-gray-600 text-xs sm:text-sm">Manage bookings and schedules</p>
              </div>
            </a>
          </CardContent>
        </Card>

        {/* Product Management */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-gray-800">Product Management</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600">
              Manage products and product enquiries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <a
              href="/admin/dashboard/add-products"
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
            >
              <FaBoxOpen className="text-emerald-600 text-lg sm:text-xl shrink-0" />
              <div>
                <p className="text-gray-800 font-medium text-sm sm:text-base">Manage Products</p>
                <p className="text-gray-600 text-xs sm:text-sm">Add, edit, or delete products</p>
              </div>
            </a>
            <a
              href="/admin/dashboard/product-enquiry"
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors"
            >
              <FaClipboardList className="text-teal-600 text-lg sm:text-xl shrink-0" />
              <div>
                <p className="text-gray-800 font-medium text-sm sm:text-base">View Product Enquiries</p>
                <p className="text-gray-600 text-xs sm:text-sm">Manage customer product queries</p>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-gray-800">System Information</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600">
              Current system status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-xs sm:text-sm text-gray-600">Admin</span>
              <span className="text-xs sm:text-sm text-gray-800 font-medium">Moin</span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-xs sm:text-sm text-gray-600">Role</span>
              <span className="text-xs sm:text-sm text-gray-800 font-medium">Administrator</span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-xs sm:text-sm text-gray-600">Last Login</span>
              <span className="text-xs sm:text-sm text-gray-800 font-medium">Today</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Bar Chart */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-gray-800">Statistics Overview</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600">
              Total counts across all categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100} 
                  tick={{ fontSize: 10 }}
                  className="sm:text-xs"
                />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-gray-800">Distribution Chart</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600">
              Enquiries and interactions breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => {
                    const percentage = percent ? (percent * 100).toFixed(0) : 0;
                    return window.innerWidth < 640 
                      ? `${percentage}%` 
                      : `${name}: ${percentage}%`;
                  }}
                  outerRadius={window.innerWidth < 640 ? 60 : 80}
                  fill="#8884d8"
                  dataKey="value"
                  style={{ fontSize: '10px' }}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
