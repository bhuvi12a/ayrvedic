import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
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

// GET: Fetch all products
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
    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products,
      products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST: Create new product
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
    const { name, title, description, keyFeatures, images } = body;

    // Validate required fields
    if (!name || !title || !description || !keyFeatures || !images) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate key features array
    if (!Array.isArray(keyFeatures) || keyFeatures.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one key feature is required' },
        { status: 400 }
      );
    }

    // Validate images array
    if (!Array.isArray(images) || images.length < 1 || images.length > 4) {
      return NextResponse.json(
        { success: false, message: 'Between 1 and 4 images are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Create new product (productId will be auto-generated)
    const product = await Product.create({
      name,
      title,
      description,
      keyFeatures,
      images,
    });

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// PATCH: Update product
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
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE: Delete product
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
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
