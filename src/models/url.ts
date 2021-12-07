import { Document, model, Model, Schema } from "mongoose";

interface URLDocument extends Document {
  code: string;
  url: string;
  owner: Schema.Types.ObjectId;
  createdAt?: Schema.Types.Date;
  updatedAt?: Schema.Types.Date;
}

interface URLModel extends Model<URLDocument> {}

const urlSchema = new Schema<URLDocument, URLModel>(
  {
    code: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: "User" }
  },
  {
    timestamps: true
  }
);

urlSchema.methods.toJSON = function () {
  const url = this.toObject();

  delete url.__v;
  delete url.createdAt;
  delete url.updatedAt;

  return url;
};

export const URL = model<URLDocument, URLModel>("urls", urlSchema);
