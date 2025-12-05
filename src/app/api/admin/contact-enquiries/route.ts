import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect, { checkDatabaseConnection } from '@/lib/mongodb';
import { ContactEnquiry } from '@/models/ContactEnquiry';

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
    const enquiries = await ContactEnquiry.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, data: enquiries },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching contact enquiries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    await dbConnect();
    const enquiry = await ContactEnquiry.create({
      name,
      email,
      phone,
      message,
      status: 'new'
    });

    return NextResponse.json(
      { success: true, data: enquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create enquiry' },
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
    const enquiry = await ContactEnquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json(
      { success: true, data: enquiry },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating contact enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update enquiry' },
      { status: 500 }
    );
  }
}
