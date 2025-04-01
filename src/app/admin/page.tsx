"use client";

import { useState, useEffect } from 'react';
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

export default function AdminPage() {
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="mb-4">
        <ExportButton />
      </div>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Feedback Entries: {feedbackData.length}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4 border border-gray-300">ID</th>
                  <th className="py-2 px-4 border border-gray-300">Name</th>
                  <th className="py-2 px-4 border border-gray-300">Reg No</th>
                  <th className="py-2 px-4 border border-gray-300">Mess</th>
                  <th className="py-2 px-4 border border-gray-300">Type</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-700">No data available</td>
                  </tr>
                ) : (
                  feedbackData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border border-gray-300 text-gray-800">{item.id}</td>
                      <td className="py-2 px-4 border border-gray-300 text-gray-800">{item.name}</td>
                      <td className="py-2 px-4 border border-gray-300 text-gray-800">{item.regNo}</td>
                      <td className="py-2 px-4 border border-gray-300 text-gray-800">{item.messName}</td>
                      <td className="py-2 px-4 border border-gray-300 text-gray-800">{item.feedbackType}</td>
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
