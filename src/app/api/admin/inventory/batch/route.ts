import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Batch from '@/models/Batch';

// GET - Fetch batch details (not used currently)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const batchId = searchParams.get('batchId');

    if (!batchId) {
      return NextResponse.json(
        { error: 'Batch ID is required' },
        { status: 400 }
      );
    }

    const batch = await Batch.findById(batchId);

    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(batch, { status: 200 });
  } catch (error) {
    console.error('Error fetching batch:', error);
    return NextResponse.json(
      { error: 'Failed to fetch batch' },
      { status: 500 }
    );
  }
}

// POST - Add product to batch
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log('POST /api/admin/inventory/batch - Request body:', JSON.stringify(body, null, 2));

    const { 
      batchId, 
      productId, 
      productName, 
      quantity,
      image,
      buyingPrice,
      sellingPrice,
      modelName
    } = body;

    console.log('Extracted fields:', {
      batchId,
      productId,
      productName,
      quantity,
      image,
      buyingPrice,
      sellingPrice,
      modelName,
    });

    if (!batchId || !productId || !productName || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const batch = await Batch.findById(batchId);

    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Check if product already exists in batch
    const existingProduct = batch.products.find(
      (p: { productId: string; }) => p.productId === productId
    );

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product already exists in this batch' },
        { status: 400 }
      );
    }

    // Create product object with all fields
    const newProduct: any = {
      productId: productId.trim(),
      productName: productName.trim(),
      quantity: parseInt(quantity),
    };

    // Add optional fields if they have actual values (not null, undefined, empty strings, or 0)
    if (image && image !== null && image !== undefined) {
      newProduct.image = String(image).trim();
      console.log('✓ Added image:', newProduct.image);
    }
    
    if (buyingPrice && buyingPrice !== null && buyingPrice !== undefined) {
      const buyingPriceNum = typeof buyingPrice === 'string' ? parseFloat(buyingPrice) : buyingPrice;
      if (!isNaN(buyingPriceNum) && buyingPriceNum > 0) {
        newProduct.buyingPrice = buyingPriceNum;
        console.log('✓ Added buyingPrice:', newProduct.buyingPrice);
      }
    }
    
    if (sellingPrice && sellingPrice !== null && sellingPrice !== undefined) {
      const sellingPriceNum = typeof sellingPrice === 'string' ? parseFloat(sellingPrice) : sellingPrice;
      if (!isNaN(sellingPriceNum) && sellingPriceNum > 0) {
        newProduct.sellingPrice = sellingPriceNum;
        console.log('✓ Added sellingPrice:', newProduct.sellingPrice);
      }
    }
    
    if (modelName && modelName !== null && modelName !== undefined) {
      newProduct.modelName = String(modelName).trim();
      console.log('✓ Added modelName:', newProduct.modelName);
    }

    console.log('Product object to be saved:', JSON.stringify(newProduct, null, 2));
    batch.products.push(newProduct);

    const updatedBatch = await batch.save();
    console.log('Batch saved. Products in batch:', JSON.stringify(updatedBatch.products, null, 2));

    return NextResponse.json(updatedBatch, { status: 201 });
  } catch (error) {
    console.error('Error adding product to batch:', error);
    return NextResponse.json(
      { error: 'Failed to add product to batch' },
      { status: 500 }
    );
  }
}

// PUT - Update batch (mark items as used)
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const { inventoryId, batchNumber, usedQuantity } = body;

    if (!inventoryId || !batchNumber || usedQuantity === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const inventory = await StoreInventory.findById(inventoryId);

    if (!inventory) {
      return NextResponse.json(
        { error: 'Inventory not found' },
        { status: 404 }
      );
    }

    const batch = inventory.batches.find((b: { batchNumber: any; }) => b.batchNumber === batchNumber);

    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    const availableQuantity = batch.quantity - batch.usedQuantity;

    if (usedQuantity > availableQuantity) {
      return NextResponse.json(
        {
          error: `Cannot use ${usedQuantity} items. Only ${availableQuantity} items available in this batch.`,
        },
        { status: 400 }
      );
    }

    batch.usedQuantity += usedQuantity;
    batch.updatedAt = new Date();

    await inventory.save();

    return NextResponse.json({ batch, inventory }, { status: 200 });
  } catch (error) {
    console.error('Error updating batch:', error);
    return NextResponse.json(
      { error: 'Failed to update batch' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a product from a batch
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const batchId = searchParams.get('inventoryId'); // Note: frontend uses inventoryId for batchId
    const productId = searchParams.get('batchNumber'); // Note: frontend uses batchNumber for productId

    if (!batchId || !productId) {
      return NextResponse.json(
        { error: 'Batch ID and Product ID are required' },
        { status: 400 }
      );
    }

    const batch = await Batch.findById(batchId);

    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    const productIndex = batch.products.findIndex(
      (p: { productId: string; }) => p.productId === productId
    );

    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found in batch' },
        { status: 404 }
      );
    }

    batch.products.splice(productIndex, 1);
    await batch.save();

    return NextResponse.json(
      { message: 'Product removed from batch successfully', batch },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing product from batch:', error);
    return NextResponse.json(
      { error: 'Failed to remove product from batch' },
      { status: 500 }
    );
  }
}
