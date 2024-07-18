import { Schema, model, Document } from 'mongoose';
import { mapValues } from 'lodash';

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

const typeMapping = {
  string: String,
  'date-time': Date,
};

const hasRequired = (prop: any): prop is { required: boolean } =>
  'required' in prop;

const userSchemaFields = mapValues(
  userSchemaDefinition.properties,
  (prop, key) => {
    const mongooseType = typeMapping[prop.type] || String;

    const field: any = {
      type: mongooseType,
      required: hasRequired(prop) ? prop.required : false,
    };

    if (key === 'email') {
      field['unique'] = true;
    }

    if (key === 'createdAt' || key === 'updatedAt') {
      field['default'] = Date.now;
    }

    return field;
  }
);

userSchemaFields['_id'] = {
  type: Schema.Types.ObjectId,
  auto: true,
};

const userSchema = new Schema<IUser>(userSchemaFields);

// Create a Model.
export const User = model<IUser>('User', userSchema);
