import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ProductEnquiry from '@/models/ProductEnquiry';

// POST: Create new product enquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, productName, name, email, mobile, message } = body;

    // Validate required fields
    if (!productId || !productName || !name || !email || !mobile) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate mobile number (basic validation)
    const mobileRegex = /^[0-9]{10,15}$/;
    if (!mobileRegex.test(mobile.replace(/[\s-]/g, ''))) {
      return NextResponse.json(
        { success: false, message: 'Invalid mobile number' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Create new enquiry
    const enquiry = await ProductEnquiry.create({
      productId,
      productName,
      name,
      email,
      mobile,
      message: message || '',
      status: 'new',
    });

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully',
      enquiry,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}
