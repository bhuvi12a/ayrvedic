import mongoose, { Schema, model, models } from 'mongoose';

export interface INewsletterEnquiry {
  _id?: string;
  email: string;
  status: 'subscribed' | 'unsubscribed';
  createdAt: Date;
}

const NewsletterEnquirySchema = new Schema<INewsletterEnquiry>({
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ['subscribed', 'unsubscribed'], default: 'subscribed' },
  createdAt: { type: Date, default: Date.now }
});

export const NewsletterEnquiry = models.NewsletterEnquiry || model<INewsletterEnquiry>('NewsletterEnquiry', NewsletterEnquirySchema);
