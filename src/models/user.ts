import { Document, model, Model, Schema } from "mongoose";
import { NotFoundError } from "../errors";

interface UserDocument extends Document {
  email: string;
  password?: string;
  createdAt?: Schema.Types.Date;
  updatedAt?: Schema.Types.Date;
}

interface UserModel extends Model<UserDocument> {
  findUserById(userID: string): Promise<UserDocument>;
}

const userSchema = new Schema<UserDocument, UserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

userSchema.virtual("urls", {
  ref: "URL",
  localField: "_id",
  foreignField: "owner"
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.__v;
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

export const User = model<UserDocument, UserModel>("users", userSchema);
