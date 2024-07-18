import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchemaDefinition = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};

const userSchemaFields = Object.keys(userSchemaDefinition.properties).reduce(
  (acc, key) => {
    const type = userSchemaDefinition.properties[key].type;
    const required = userSchemaDefinition.properties[key].required || false;
    let mongooseType;

    switch (type) {
      case 'string':
        mongooseType = String;
        break;
      case 'date-time':
        mongooseType = Date;
        break;
      default:
        mongooseType = String;
        break;
    }

    acc[key] = {
      type: mongooseType,
      required: required,
    };

    if (key === 'email') {
      acc[key].unique = true;
    }

    if (key === 'createdAt' || key === 'updatedAt') {
      acc[key].default = Date.now;
    }

    return acc;
  },
  {}
);

userSchemaFields['_id'] = {
  type: Schema.Types.ObjectId,
  auto: true,
};

const userSchema = new Schema<IUser>(userSchemaFields);

// Create a Model.
export const User = model<IUser>('User', userSchema);
