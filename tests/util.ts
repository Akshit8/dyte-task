import faker from "faker";
import { ObjectId } from "mongodb";
import { User, UserDocument } from "../src/models";
import { JWTUtility } from "../src/utils";

export const createNewUser = async (pswd?: string): Promise<UserDocument> => {
  const email = faker.internet.email();
  const password = pswd || faker.random.alphaNumeric(6);
  const user = new User({ email, password });
  await user.save();
  return user;
};

export const getAuthToken = async (valid: boolean): Promise<string> => {
  const jwt = new JWTUtility();
  if (valid) {
    const user = await createNewUser();
    const token = await jwt.signToken({ id: user._id });
    return token;
  } else {
    const id = new ObjectId();
    return await jwt.signToken({ id: id.toString() });
  }
};
