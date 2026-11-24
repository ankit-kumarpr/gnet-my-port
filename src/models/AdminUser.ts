import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminUserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "superadmin" | "admin" | "editor";
  isActive: boolean;
  lastLogin?: Date;
  failedLoginAttempts: number;
  lockUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "editor"],
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    lastLogin: {
      type: Date,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const AdminUser: Model<IAdminUserDocument> =
  mongoose.models.AdminUser || mongoose.model<IAdminUserDocument>("AdminUser", AdminUserSchema);
