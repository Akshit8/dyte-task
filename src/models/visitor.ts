import { Document, model, Model, Schema } from "mongoose";

export interface VisitorDocument extends Document {
  ip: string;
  code: string;
  city: string;
  country: string;
  createdAt?: Schema.Types.Date;
  updatedAt?: Schema.Types.Date;
}

interface VisitorModel extends Model<VisitorDocument> {}

const visitorSchema = new Schema<VisitorDocument, VisitorModel>(
  {
    ip: { type: String, required: true },
    code: { type: String, required: true },
    city: { type: String },
    country: { type: String }
  },
  {
    timestamps: true
  }
);

visitorSchema.index({ ip: 1, code: 1 }, { unique: true });

visitorSchema.methods.toJSON = function () {
  const visitor: any = this.toObject();

  delete visitor.__v;
  delete visitor.createdAt;
  delete visitor.updatedAt;

  return visitor;
};

export const Visitor = model<VisitorDocument, VisitorModel>("visitors", visitorSchema);
