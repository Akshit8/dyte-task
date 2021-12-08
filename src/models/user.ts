import { compare, hash } from "bcryptjs";
import { Document, model, Model, Schema } from "mongoose";
import { PASSWORD_SALT_ROUNDS } from "../config";
import { BadRequestError } from "../errors";

export interface UserDocument extends Document {
  email: string;
  password: string;
  createdAt: Schema.Types.Date;
  updatedAt: Schema.Types.Date;
}

interface UserModel extends Model<UserDocument> {
  findByCredentials(email: string, password: string): Promise<UserDocument>;
}

const userSchema = new Schema<UserDocument, UserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

userSchema.virtual("urls", {
  ref: "urls",
  localField: "_id",
  foreignField: "owner"
});

userSchema.methods.toJSON = function () {
  const user: any = this.toObject();

  delete user.__v;
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;

  // delete virtual populated fields
  delete user.id;

  return user;
};

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
): Promise<UserDocument> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("invalid email or password");
  }
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new BadRequestError("invalid email or password");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, +PASSWORD_SALT_ROUNDS);
  }
  next();
});

export const User = model<UserDocument, UserModel>("users", userSchema);
