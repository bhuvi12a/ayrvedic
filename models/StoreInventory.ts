import mongoose, { Schema, Document } from 'mongoose';

export interface IBatch {
  batchNumber: string;
  manufacturingDate: Date;
  expiryDate: Date;
  quantity: number;
  usedQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStoreInventory extends Document {
  productId: string;
  productName: string;
  batches: IBatch[];
  totalStock: number;
  lowStockThreshold: number;
  location: string;
  status: 'active' | 'inactive' | 'discontinued';
  createdAt: Date;
  updatedAt: Date;
}

const BatchSchema: Schema = new Schema(
  {
    batchNumber: {
      type: String,
      required: true,
      unique: true,
    },
    manufacturingDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    usedQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const StoreInventorySchema: Schema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    batches: {
      type: [BatchSchema],
      default: [],
    },
    totalStock: {
      type: Number,
      default: 0,
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: 0,
    },
    location: {
      type: String,
      trim: true,
      default: 'Main Store',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'discontinued'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Calculate total stock before saving
StoreInventorySchema.pre<IStoreInventory>('save', function (next) {
  this.totalStock = this.batches.reduce(
    (sum: number, batch: { quantity: number; usedQuantity: number; }) => sum + (batch.quantity - batch.usedQuantity),
    0
  );
  next();
});

// Index for efficient queries
StoreInventorySchema.index({ productId: 1 });
StoreInventorySchema.index({ status: 1 });
StoreInventorySchema.index({ 'batches.expiryDate': 1 });

export default mongoose.models.StoreInventory ||
  mongoose.model<IStoreInventory>('StoreInventory', StoreInventorySchema);
