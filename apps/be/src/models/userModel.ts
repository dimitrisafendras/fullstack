import { Schema, model, Document } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
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

export const UserSchema = {
  type: 'object',
  required: ['name', 'email', 'password'],
  properties: {
    name: {
      type: 'string',
      example: 'John Doe',
    },
    email: {
      type: 'string',
      example: 'john.doe@example.com',
    },
    password: {
      type: 'string',
      example: 'password123',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: '2020-01-01T00:00:00.000Z',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2020-01-01T00:00:00.000Z',
    },
  },
};
