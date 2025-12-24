import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// POST: Upload image to Cloudinary
export async function POST(request: NextRequest) {
  try {
    console.log('Upload request received');

    // Check Env Vars
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET) {
      const missing = [];
      if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) missing.push('CLOUD_NAME');
      if (!process.env.CLOUDINARY_API_KEY) missing.push('API_KEY');
      if (!process.env.CLOUDINARY_API_SECRET) missing.push('API_SECRET');

      console.error(`Missing ENV vars: ${missing.join(', ')}`);
      return NextResponse.json(
        { success: false, message: `Server Misconfiguration: Missing ${missing.join(', ')}` },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.error('No file provided in body');
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    console.log(`File received: ${file.name}, Size: ${file.size}, Type: ${file.type}`);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

    console.log('Starting Cloudinary upload...');

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: 'ayurvedik-products',
      resource_type: 'image',
    });

    console.log(`Upload successful: ${uploadResponse.secure_url}`);

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to upload image' },
      { status: 500 }
    );
  }
}
