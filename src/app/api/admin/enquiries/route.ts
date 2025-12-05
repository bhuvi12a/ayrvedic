import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ProductEnquiry from '@/models/ProductEnquiry';
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

// GET: Fetch all enquiries
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const verification = verifyToken(request);
    if (!verification.isValid) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const enquiries = await ProductEnquiry.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: enquiries,
      enquiries,
      count: enquiries.length,
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}

// PATCH: Update enquiry status
export async function PATCH(request: NextRequest) {
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
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Enquiry ID and status are required' },
        { status: 400 }
      );
    }

    if (!['new', 'contacted', 'resolved'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }

    await dbConnect();

    const enquiry = await ProductEnquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: 'Enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry status updated successfully',
      enquiry,
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update enquiry' },
      { status: 500 }
    );
  }
}

// DELETE: Delete enquiry
export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const verification = verifyToken(request);
    if (!verification.isValid) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Enquiry ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const enquiry = await ProductEnquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: 'Enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete enquiry' },
      { status: 500 }
    );
  }
}
