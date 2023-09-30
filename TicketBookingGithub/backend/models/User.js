const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

// static method for registration

userSchema.statics.register = async function (email, username, password) {
  // Validation

  if (!email || !password || !username) {
    throw Error("All Fields must be filled");
  } else if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  const existsUserName = await this.findOne({ username });
  if (existsUserName) {
    throw Error("Username already in use");
  }
  const existsEmail = await this.findOne({ email });
  if (existsEmail) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, username });

  return user;
};

// static login method

userSchema.statics.login = async function (username, password) {
  if (!password || !username) {
    throw Error("All Fields must be filled");
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect Username");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
