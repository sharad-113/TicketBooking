require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const busRoutes = require("./routes/busRoutes");
const requireAuth = require("./middleware/requireAuth");

const dbUrl = "mongodb://127.0.0.1:27017/ticketBooking";

//  process.env.DATABASE_URI ||

const corsOptions = require("./config/corsOptions");

console.log(process.env.NODE_ENV);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api/v1/user", authRoutes);
app.use("/api/v1", ticketRoutes);
app.use("/api/v1", busRoutes);

// // To send the updated user
// app.get("/api/v1/users/:userId", requireAuth, async (req, res) => {
//   const { userId } = req.params;
//   if (!userId) return res.status(401).json({ error: "Unauthorized user" });
//   const user = await User.findById(userId);
//   if (!user) {
//     return res.status(400).json({ error: "No user exists" });
//   }
//   const { authorization } = req.headers;
//   const token = authorization.split(" ")[1];
//   return res.status(200).json({
//     user: {
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       tickets: user.tickets,
//     },
//     token,
//   });
// });

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to the database ticketBooking");
  app.listen(PORT, () => {
    console.log("Listening to Port Number " + PORT);
  });
}
main().catch((err) => console.log(err));
