import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Batch from '@/models/Batch';

// GET - Fetch batch statistics
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const batches = await Batch.find({});

    const stats = {
      totalBatches: batches.length,
      totalProducts: 0,
      totalQuantity: 0,
      activeBatches: 0,
      completedBatches: 0,
    };

    batches.forEach((batch) => {
      stats.totalProducts += batch.products.length;
      stats.totalQuantity += batch.products.reduce((sum, product) => sum + product.quantity, 0);
      
      if (batch.status === 'active') {
        stats.activeBatches++;
      } else if (batch.status === 'completed') {
        stats.completedBatches++;
      }
    });

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Error fetching batch statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch batch statistics' },
      { status: 500 }
    );
  }
}
