"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import ExportButton from '../components/ExportButton';

interface FeedbackItem {
  id: number;
  regNo: string;
  name: string;
  messName: string;
  feedbackType: string;
  category: string;
  comments: string;
  created_at: string;
}

interface FilterOptions {
  hostelType: string;
  regNoPrefix: string;
  feedbackType: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export default function AdminPage() {
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    hostelType: '',
    regNoPrefix: '',
    feedbackType: '',
    dateRange: {
      start: '',
      end: ''
    }
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const router = useRouter();
  const { user, isAuthenticated, logout, deleteAccount } = useAuth();

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role !== 'admin') {
      router.push('/');
      return;
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/feedback');
        const result = await response.json();
        
        if (result.success) {
          setFeedbackData(result.data);
        } else {
          setError(result.error || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Get unique hostel types and registration number prefixes
  const uniqueHostelTypes = Array.from(new Set(feedbackData.map(item => item.messName)));
  const uniqueRegNoPrefixes = Array.from(
    new Set(
      feedbackData
        .map(item => item.regNo.substring(0, 2))
        .filter(prefix => /^\d+$/.test(prefix))
    )
  );
  const uniqueFeedbackTypes = Array.from(new Set(feedbackData.map(item => item.feedbackType)));

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterOptions(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [name]: value
      }
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Apply filters to the export URL
  const getFilteredExportUrl = () => {
    let url = '/api/exportFeedback?';
    const params = [];
    
    if (filterOptions.hostelType) {
      params.push(`hostelType=${encodeURIComponent(filterOptions.hostelType)}`);
    }
    
    if (filterOptions.regNoPrefix) {
      params.push(`regNoPrefix=${encodeURIComponent(filterOptions.regNoPrefix)}`);
    }
    
    if (filterOptions.feedbackType) {
      params.push(`feedbackType=${encodeURIComponent(filterOptions.feedbackType)}`);
    }
    
    if (filterOptions.dateRange.start) {
      params.push(`startDate=${encodeURIComponent(filterOptions.dateRange.start)}`);
    }
    
    if (filterOptions.dateRange.end) {
      params.push(`endDate=${encodeURIComponent(filterOptions.dateRange.end)}`);
    }
    
    return url + params.join('&');
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Logout
          </button>
          <button
            onClick={deleteAccount}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Export Data</h2>
          <button
            onClick={toggleFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Hostel Type
              </label>
              <select
                name="hostelType"
                value={filterOptions.hostelType}
                onChange={handleFilterChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              >
                <option value="">All Hostels</option>
                {uniqueHostelTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Registration Number Prefix
              </label>
              <select
                name="regNoPrefix"
                value={filterOptions.regNoPrefix}
                onChange={handleFilterChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              >
                <option value="">All Years</option>
                {uniqueRegNoPrefixes.map((prefix) => (
                  <option key={prefix} value={prefix}>
                    {prefix} (20{prefix})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Feedback Type
              </label>
              <select
                name="feedbackType"
                value={filterOptions.feedbackType}
                onChange={handleFilterChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              >
                <option value="">All Types</option>
                {uniqueFeedbackTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="start"
                value={filterOptions.dateRange.start}
                onChange={handleDateChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Date
              </label>
              <input
                type="date"
                name="end"
                value={filterOptions.dateRange.end}
                onChange={handleDateChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        )}
        
        <ExportButton customUrl={getFilteredExportUrl()} />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">
            Feedback Entries: {feedbackData.length}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Reg No</th>
                  <th className="py-3 px-4 text-left">Mess</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-gray-700">No data available</td>
                  </tr>
                ) : (
                  feedbackData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100 border-b">
                      <td className="py-3 px-4 text-gray-800">{item.id}</td>
                      <td className="py-3 px-4 text-gray-800">{item.name}</td>
                      <td className="py-3 px-4 text-gray-800">{item.regNo}</td>
                      <td className="py-3 px-4 text-gray-800">{item.messName}</td>
                      <td className="py-3 px-4 text-gray-800">{item.feedbackType}</td>
                      <td className="py-3 px-4 text-gray-800">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-2"
                          onClick={() => alert(`Details for feedback #${item.id}: ${item.comments}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
