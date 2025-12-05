import mongoose, { Schema, model, models } from 'mongoose';

export interface IContactEnquiry {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'resolved';
  createdAt: Date;
}

const ContactEnquirySchema = new Schema<IContactEnquiry>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'resolved'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

export const ContactEnquiry = models.ContactEnquiry || model<IContactEnquiry>('ContactEnquiry', ContactEnquirySchema);
