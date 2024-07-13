//FIXME: clean this up
import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchema = new Schema<IUser>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Static method to find a user by email
userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

// Create a Model.
export const User = model<IUser>('User', userSchema);
