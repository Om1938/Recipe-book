const db = require("../config/db");
const constants = require("../constants");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  secret,
  collections: { USER },
} = require("../constants");
const { makeError } = require("../helpers/error");

const addUser = async (username, password) => {
  const dbo = await db;
  const users = dbo.collection(USER);

  if (!(await userExistsCheck(username))) {
    const result = await users.insertOne({
      username,
      password: await bcrypt.hash(password, 10),
    });
    if (result) return trimUser(result);
    throw makeError(new Error("Some Error Occured", 400));
  } else {
    throw makeError(new Error("User Already Exists"), 409);
  }
};

const login = async (username, password) => {
  try {
    const user = await validateUser(username, password);
    if (!user) {
      throw makeError(new Error("Invalid username/password"), 403);
    }
    return {
      token: getToken({ username }),
      message: "Login Successful",
    };
  } catch (error) {
    throw makeError(error, 403);
  }
};

const userExistsCheck = async (username) => {
  try {
    return !!(await getUser(username));
  } catch (error) {
    return false;
  }
};

const getUser = async (username) => {
  const dbo = await db;
  const users = dbo.collection(constants.collections.USER);
  let user = await users.findOne({ username });
  if (!user) {
    throw new Error("User Not Found");
  }
  return trimUser(user);
};

const validateUser = async (username, password) => {
  const dbo = await db;
  const users = dbo.collection(USER);
  let user = await users.findOne({ username });
  if (!user) {
    throw new Error("Invalid username/password");
  }
  console.log(user);
  if (await bcrypt.compare(password, user.password)) {
    return user;
  } else {
    throw new Error("Invalid username/password");
  }
};

const getToken = (data) => {
  return jsonwebtoken.sign(data, secret, { expiresIn: "10m" });
};

const trimUser = (user) => {
  const { password, ...otherFields } = user;
  return otherFields;
};

module.exports = {
  addUser,
  getUser,
  login,
};
