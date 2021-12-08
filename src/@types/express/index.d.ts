/* eslint-disable no-unused-vars */
import { UserDocument } from "../../models";

declare global {
  namespace Express {
    interface Request {
      currentUser: UserDocument;
    }
  }
}
