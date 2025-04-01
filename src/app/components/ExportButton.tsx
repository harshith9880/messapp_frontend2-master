"use client";

import { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';

const ExportButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/exportFeedback');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to export data');
      }
      
      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = data.downloadUrl;
      link.download = data.downloadUrl.split('/').pop() || 'feedback_export.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (err) {
      console.error('Export error:', err);
      setError(err instanceof Error ? err.message : 'Failed to export data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleExport}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
      >
        <FaFileExcel />
        {isLoading ? 'Exporting...' : 'Export to Excel'}
      </button>
      
      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default ExportButton;
