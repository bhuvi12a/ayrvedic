import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Batch from '@/models/Batch';

// GET - Fetch all batches or filter by status
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const id = searchParams.get('id'); // For fetching single batch

    let filter: any = {};

    if (status) filter.status = status;
    if (id) filter._id = id;

    const batches = await Batch.find(filter).sort({
      createdAt: -1,
    });

    if (id && batches.length === 0) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    if (id) {
      return NextResponse.json(batches[0], { status: 200 });
    }

    return NextResponse.json(batches, { status: 200 });
  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch batches' },
      { status: 500 }
    );
  }
}

// POST - Create new batch
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const { batchName } = body;

    if (!batchName || typeof batchName !== 'string' || batchName.trim().length === 0) {
      return NextResponse.json(
        { error: 'Batch name is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Check if batch name already exists
    const existingBatch = await Batch.findOne({ batchName: batchName.trim() });
    if (existingBatch) {
      return NextResponse.json(
        { error: 'Batch name already exists' },
        { status: 400 }
      );
    }

    const batch = new Batch({
      batchName: batchName.trim(),
      products: [],
      status: 'active',
    });

    await batch.save();

    return NextResponse.json(batch, { status: 201 });
  } catch (error) {
    console.error('Error creating batch:', error);
    return NextResponse.json(
      { error: 'Failed to create batch' },
      { status: 500 }
    );
  }
}

// PUT - Update batch status
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const { id, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Batch ID is required' },
        { status: 400 }
      );
    }

    const batch = await Batch.findByIdAndUpdate(
      id,
      {
        ...(status && { status }),
        ...(body.batchName && { batchName: body.batchName }),
      },
      { new: true }
    );

    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(batch, { status: 200 });
  } catch (error) {
    console.error('Error updating batch:', error);
    return NextResponse.json(
      { error: 'Failed to update batch' },
      { status: 500 }
    );
  }
}

// DELETE - Remove batch
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Batch ID is required' },
        { status: 400 }
      );
    }

    const batch = await Batch.findByIdAndDelete(id);

    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Batch deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting batch:', error);
    return NextResponse.json(
      { error: 'Failed to delete batch' },
      { status: 500 }
    );
  }
}
