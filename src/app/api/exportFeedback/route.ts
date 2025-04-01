import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import * as XLSX from 'xlsx';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function GET() {
  try {
    // Fetch data from the feed1 table
    const [rows] = await pool.query('SELECT * FROM feed1 ORDER BY created_at DESC');
    
    // Convert data to Excel format
    const worksheet = XLSX.utils.json_to_sheet(rows as any[]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedback Data');
    
    // Create exports directory if it doesn't exist
    const exportDir = join(process.cwd(), 'public', 'exports');
    if (!existsSync(exportDir)) {
      mkdirSync(exportDir, { recursive: true });
    }
    
    // Generate a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `feedback_export_${timestamp}.xlsx`;
    const filepath = join(exportDir, filename);
    
    // Write the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    await writeFile(filepath, excelBuffer);
    
    // Return the URL to download the file
    const downloadUrl = `/exports/${filename}`;
    return NextResponse.json({ 
      success: true, 
      message: 'Excel export created successfully', 
      downloadUrl 
    });
  } catch (error: unknown) {
    console.error('Error exporting feedback data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to export feedback data';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
