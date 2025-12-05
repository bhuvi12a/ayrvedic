import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import { NewsletterEnquiry } from '@/models/NewsletterEnquiry';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function verifyToken(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) return null;
  
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const enquiries = await NewsletterEnquiry.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, data: enquiries },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching newsletter enquiries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch newsletter enquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    await dbConnect();
    const enquiry = await NewsletterEnquiry.create({
      email,
      status: 'subscribed'
    });

    return NextResponse.json(
      { success: true, data: enquiry },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Email already subscribed' },
        { status: 400 }
      );
    }
    console.error('Error creating newsletter enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    await dbConnect();
    const enquiry = await NewsletterEnquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json(
      { success: true, data: enquiry },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating newsletter enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update enquiry' },
      { status: 500 }
    );
  }
}
