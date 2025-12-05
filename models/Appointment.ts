import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  name: string;
  email: string;
  phone: string;
  doctor: string;
  service: string;
  treatment?: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

const AppointmentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    doctor: {
      type: String,
      required: [true, 'Doctor is required'],
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
    },
    treatment: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
