import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  productId: string;
  name: string;
  title: string;
  description: string;
  keyFeatures: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    productId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    keyFeatures: {
      type: [String],
      required: true,
      validate: {
        validator: function(arr: string[]) {
          return arr.length > 0;
        },
        message: 'At least one key feature is required',
      },
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function(arr: string[]) {
          return arr.length >= 1 && arr.length <= 4;
        },
        message: 'Between 1 and 4 images are required',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique product ID before saving
ProductSchema.pre('save', async function (next) {
  if (!this.productId) {
    const count = await mongoose.models.Product.countDocuments();
    this.productId = `PROD-${Date.now()}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Delete the cached model to ensure schema updates are applied
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

export default mongoose.model<IProduct>('Product', ProductSchema);
