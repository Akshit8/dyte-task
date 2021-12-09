import faker from "faker";
import { ObjectId } from "mongodb";
import { URL, URLDocument, User, UserDocument } from "../src/models";
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

export const createNewURL = async (): Promise<URLDocument> => {
  const user = await createNewUser();
  const url = new URL({
    code: faker.random.alphaNumeric(5),
    url: faker.internet.url(),
    owner: user._id
  });
  await url.save();
  return url;
};
