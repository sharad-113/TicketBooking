const User = require("../models/User");
const jwt = require("jsonwebtoken");

// create Token Function

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    // create token

    const token = createToken(user._id);
    let newUser;
    if (user.tickets.length > 0) {
      newUser = await user.populate({
        path: "tickets",
        populate: {
          path: "busId",
        },
      });
    } else {
      newUser = user;
    }
    return res.status(200).json({
      user: {
        _id: user._id,
        username,
        email: user.email,
        tickets: newUser.tickets,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// register user
const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.register(email, username, password);
    // create token

    const token = createToken(user._id);

    return res.status(200).json({
      user: {
        _id: user._id,
        username,
        email,
        tickets: user.tickets,
      },
      token,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
