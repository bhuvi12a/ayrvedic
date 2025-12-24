import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// GET: Fetch single product by productId or name slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    
    const { slug } = await params;
    
    // Decode and convert slug back to name format
    const decodedSlug = decodeURIComponent(slug).replace(/-/g, ' ');
    
    // Try to find by productId first, then by name (case-insensitive)
    const product = await Product.findOne({
      $or: [
        { productId: slug },
        { name: { $regex: new RegExp(`^${decodedSlug}$`, 'i') } }
      ]
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
