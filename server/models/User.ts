import mongoose, { Document, Schema } from 'mongoose';

// Define the TypeScript interface for the User
export interface IUser extends Document {
  _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
  field: string;
  githubId?: string;
  projects: mongoose.Types.ObjectId[];  // Array of ObjectIds, referencing 'Project' model
  following: mongoose.Types.ObjectId[];  // Array of ObjectIds, referencing 'User' model
  followers: mongoose.Types.ObjectId[];  // Array of ObjectIds, referencing 'User' model
}

// Define the schema for User model
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  field: { type: String, required: true },
  githubId: { type: String }, // Optional field for GitHub ID
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Export the model, typing it as `IUser`
export const User = mongoose.model<IUser>('User', userSchema);
