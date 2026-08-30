'use client';

import { useState } from 'react';
import { TrendingUp, Eye, Users, Clock } from 'lucide-react';

interface AnalyticsDashboardProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function AnalyticsDashboard({ isVisible, onToggle }: AnalyticsDashboardProps) {
  const [analytics] = useState({
    pageViews: Math.floor(Math.random() * 10000) + 5000,
    uniqueVisitors: Math.floor(Math.random() * 3000) + 1500,
    averageSessionTime: Math.floor(Math.random() * 180) + 120,
    bounceRate: Math.floor(Math.random() * 30) + 20,
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Analytics Dashboard
          </h2>
          <button
            type="button"
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close dashboard"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Page Views</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {analytics.pageViews.toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Unique Visitors</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {analytics.uniqueVisitors.toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Session</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatTime(analytics.averageSessionTime)}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Bounce Rate</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {analytics.bounceRate}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}