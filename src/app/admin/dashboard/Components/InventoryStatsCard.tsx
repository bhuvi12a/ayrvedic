'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  totalProducts: number;
  totalStock: number;
  lowStockItems: number;
  expiredBatches: number;
  expiringBatches: number;
  totalBatches: number;
  byLocation: Record<string, number>;
}

export default function InventoryStatsCard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin-token');

      const response = await fetch('/api/admin/inventory/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return <div className="p-4 bg-gray-100 rounded-lg">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Link href="/admin/dashboard/inventory">
        <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow cursor-pointer hover:shadow-lg transition">
          <h3 className="text-sm font-semibold opacity-90">Total Products</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalProducts}</p>
        </div>
      </Link>

      <Link href="/admin/dashboard/inventory?filter=low">
        <div className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow cursor-pointer hover:shadow-lg transition">
          <h3 className="text-sm font-semibold opacity-90">Total Stock Units</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalStock}</p>
        </div>
      </Link>

      <Link href="/admin/dashboard/inventory?low=true">
        <div className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow cursor-pointer hover:shadow-lg transition">
          <h3 className="text-sm font-semibold opacity-90">Low Stock Items</h3>
          <p className="text-4xl font-bold mt-2">{stats.lowStockItems}</p>
        </div>
      </Link>

      <div className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg shadow">
        <h3 className="text-sm font-semibold opacity-90">Expired Batches</h3>
        <p className="text-4xl font-bold mt-2">{stats.expiredBatches}</p>
      </div>

      <div className="p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg shadow">
        <h3 className="text-sm font-semibold opacity-90">Expiring Soon (30 days)</h3>
        <p className="text-4xl font-bold mt-2">{stats.expiringBatches}</p>
      </div>

      <div className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow">
        <h3 className="text-sm font-semibold opacity-90">Total Batches</h3>
        <p className="text-4xl font-bold mt-2">{stats.totalBatches}</p>
      </div>
    </div>
  );
}
