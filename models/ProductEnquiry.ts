import mongoose, { Schema, Document } from 'mongoose';

export interface IProductEnquiry extends Document {
  productId: string;
  productName: string;
  name: string;
  email: string;
  mobile: string;
  message?: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

const ProductEnquirySchema: Schema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// Delete the cached model to ensure schema updates are applied
if (mongoose.models.ProductEnquiry) {
  delete mongoose.models.ProductEnquiry;
}

export default mongoose.model<IProductEnquiry>('ProductEnquiry', ProductEnquirySchema);
