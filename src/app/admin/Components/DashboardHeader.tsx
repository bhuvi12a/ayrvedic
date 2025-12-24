'use client';

import { useEffect, useState } from 'react';
import { FaClock, FaCalendar, FaUserCircle, FaDatabase, FaServer, FaCheckCircle, FaTimesCircle, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface StatusData {
  server: string;
  database: string;
}

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function DashboardHeader({ sidebarOpen, onToggleSidebar }: DashboardHeaderProps) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState<StatusData>({ server: 'checking...', database: 'checking...' });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/admin/status');
        const data = await response.json();
        if (data.success) {
          setStatus(data.data);
        }
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm fixed top-0 right-0 z-40 left-0 lg:left-64 transition-all duration-300">
      <div className="px-3 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Toggle Sidebar"
          >
            <FaBars className="text-lg sm:text-xl text-gray-700" />
          </button>

          {/* Date & Time - Hidden on mobile */}
          <div className="hidden lg:flex gap-3 xl:gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <FaCalendar className="text-green-600 text-sm" />
              <span className="text-xs xl:text-sm font-medium">{formatDate(currentTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaClock className="text-blue-600 text-sm" />
              <span className="text-xs xl:text-sm font-mono font-medium">{formatTime(currentTime)}</span>
            </div>
          </div>

          {/* Admin Info */}
          <div className="flex items-center gap-2 sm:gap-3 bg-linear-to-r from-green-50 to-blue-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-green-200">
            <FaUserCircle className="text-lg sm:text-xl text-green-600 flex-shrink-0" />
            <div className="hidden sm:block">
              <p className="text-xs sm:text-sm font-semibold text-gray-800"></p>
              <p className="text-xs text-gray-600">Admin</p>
            </div>
          </div>

          {/* Status & Logout */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Server Status - Hidden on mobile & tablet */}
            <div className="hidden xl:flex items-center gap-2 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-200">
              <FaServer className="text-gray-600 text-xs" />
              <span className="text-xs text-gray-600">Server:</span>
              {status.server === 'online' ? (
                <div className="flex items-center gap-1">
                  <FaCheckCircle className="text-green-600 text-xs" />
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <FaTimesCircle className="text-red-600 text-xs" />
                  <span className="text-xs text-red-600 font-medium">Offline</span>
                </div>
              )}
            </div>

            {/* Database Status - Hidden on mobile & tablet */}
            <div className="hidden xl:flex items-center gap-2 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-200">
              <FaDatabase className="text-gray-600 text-xs" />
              <span className="text-xs text-gray-600">DB:</span>
              {status.database === 'connected' ? (
                <div className="flex items-center gap-1">
                  <FaCheckCircle className="text-green-600 text-xs" />
                  <span className="text-xs text-green-600 font-medium">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <FaTimesCircle className="text-red-600 text-xs" />
                  <span className="text-xs text-red-600 font-medium">Disconnected</span>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 sm:gap-2 bg-red-50 hover:bg-red-100 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-red-200 transition-colors"
            >
              <FaSignOutAlt className="text-red-600 text-sm" />
              <span className="hidden md:inline text-xs sm:text-sm text-red-600 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
