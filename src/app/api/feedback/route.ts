import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

interface FeedbackData {
  regNo: string | null;
  name: string | null;
  block: string | null;
  room: string | null;
  messName: string | null;
  messType: string | null;
  category: string | null;
  feedbackType: string | null;
  comments: string | null;
  proofPath: string | null;
}

export async function POST(request: Request) {
  try {
    // Test database connection first
    try {
      await pool.getConnection();
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { success: false, error: 'Database connection failed. Please check your database configuration.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    
    // Handle file upload
    let proofPath: string | null = null;
    const proofFile = formData.get('proof') as File | null;
    
    if (proofFile && proofFile instanceof File) {
      try {
        const bytes = await proofFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Create unique filename
        const filename = `${Date.now()}-${proofFile.name}`;
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        
        // Create uploads directory if it doesn't exist
        if (!existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true });
        }
        
        const filepath = join(uploadDir, filename);
        await writeFile(filepath, buffer);
        proofPath = `/uploads/${filename}`;
        console.log('File uploaded successfully to:', filepath);
      } catch (fileError) {
        console.error('File upload error:', fileError);
        return NextResponse.json(
          { success: false, error: 'Failed to upload file' },
          { status: 500 }
        );
      }
    }

    // Extract and validate form data
    const feedbackData: FeedbackData = {
      regNo: formData.get('regNo') as string | null,
      name: formData.get('name') as string | null,
      block: formData.get('block') as string | null,
      room: formData.get('room') as string | null,
      messName: formData.get('messName') as string | null,
      messType: formData.get('messType') as string | null,
      category: formData.get('category') as string | null,
      feedbackType: formData.get('feedbackType') as string | null,
      comments: formData.get('comments') as string | null,
      proofPath
    };

    // Validate required fields
    const requiredFields = ['regNo', 'name', 'block', 'room', 'messName', 'messType', 'category', 'feedbackType', 'comments'] as const;
    for (const field of requiredFields) {
      if (!feedbackData[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    console.log('Inserting feedback data:', feedbackData);

    const [result] = await pool.execute(
      `INSERT INTO feed1 (
        regNo,
        name,
        block,
        room,
        messName,
        messType,
        category,
        feedbackType,
        comments,
        proof_path,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        feedbackData.regNo,
        feedbackData.name,
        feedbackData.block,
        feedbackData.room,
        feedbackData.messName,
        feedbackData.messType,
        feedbackData.category,
        feedbackData.feedbackType,
        feedbackData.comments,
        feedbackData.proofPath
      ]
    );

    console.log('Database insert successful:', result);
    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    console.error('Error submitting feedback:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to submit feedback';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM feed1 ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: rows });
  } catch (error: unknown) {
    console.error('Error fetching feedback:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch feedback';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
