import { MongoError } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";
import { APIError } from "../errors";
import { SHORT_URL_LENGTH } from "../config";
import { generate } from "randomstring";

export interface URLDocument extends Document {
  code: string;
  url: string;
  owner: Schema.Types.ObjectId;
  createdAt?: Schema.Types.Date;
  updatedAt?: Schema.Types.Date;
}

interface URLModel extends Model<URLDocument> {
  saveURL(url: string, owner: string): Promise<URLDocument>;
}

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

urlSchema.statics.saveURL = async (
  url: string,
  owner: string
): Promise<URLDocument> => {
  let flag = true;
  let code = generate(SHORT_URL_LENGTH);
  let newURL: URLDocument = new URL({ code, url, owner });
  while (flag) {
    try {
      await newURL.save();
      flag = false;
    } catch (e) {
      if ((e as MongoError).code === 11000) {
        code = generate(SHORT_URL_LENGTH);
        newURL = new URL({ code, url, owner });
      } else {
        // if unknow error occurs while saving
        // throw internal server error.
        throw new APIError();
      }
    }
  }

  return newURL;
};

export const URL = model<URLDocument, URLModel>("urls", urlSchema);
