import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Verify JWT token
function verifyToken(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    if (!token) {
      return { isValid: false };
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    return { isValid: true, user: decoded };
  } catch (error) {
    return { isValid: false };
  }
}

// POST: Upload image to Cloudinary
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const verification = verifyToken(request);
    if (!verification.isValid) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json(
        { success: false, message: 'No image data provided' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'ayurvedik-products',
      resource_type: 'image',
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
