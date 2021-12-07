import { Document, model, Model, Schema } from "mongoose";
import { NotFoundError } from "../errors";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

interface UserDocument extends Document {
  email: String;
  password: String;
}

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;

  return user;
};

userSchema.statics.findUserById = async (userID: string): Promise<UserDocument> => {
  const user = await User.findById(userID);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

interface UserModel extends Model<UserDocument> {
  findUserById(userID: string): Promise<UserDocument>;
}

export const User = model<UserDocument, UserModel>("users", userSchema);
