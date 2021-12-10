import { URL, User } from "../models";

export const addFixtures = async () => {
  const user = await User.findOne({ email: "user1@mail.com" });
  if (!user) {
    const newUser = new User({
      email: "user1@mail.com",
      password: "test123"
    });
    await newUser.save();
    const url = await URL.findOne({ code: "gha" });
    if (!url) {
      const newURL = new URL({
        code: "gha",
        url: "https://github.com/Akshit8",
        owner: newUser._id
      });
      await newURL.save();
    }
  }
};
