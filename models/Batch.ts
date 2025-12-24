import mongoose, { Schema, Document } from 'mongoose';

export interface IBatchProduct {
  productId: string;
  productName: string;
  quantity: number;
  image?: string;
  buyingPrice?: number;
  sellingPrice?: number;
  modelName?: string;
  addedAt: Date;
}

export interface IBatch extends Document {
  batchName: string;
  products: IBatchProduct[];
  totalProducts: number;
  totalQuantity: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const BatchProductSchema: Schema = new Schema(
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
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: false,
    },
    buyingPrice: {
      type: Number,
      required: false,
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: false,
      min: 0,
    },
    modelName: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: { createdAt: 'addedAt' } }
);

const BatchSchema: Schema = new Schema(
  {
    batchName: {
      type: String,
      required: true,
      trim: true,
    },
    products: {
      type: [BatchProductSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for total products count
BatchSchema.virtual('totalProducts').get(function () {
  return this.products.length;
});

// Virtual for total quantity
BatchSchema.virtual('totalQuantity').get(function () {
  return this.products.reduce((total, product) => total + product.quantity, 0);
});

export default mongoose.models.Batch || mongoose.model<IBatch>('Batch', BatchSchema);