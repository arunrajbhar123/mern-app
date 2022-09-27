const express = require("express");
const cors = require('cors')
const SignupRouter = require("./routes/signup.route");
const connection = require("./config/db");
const LoginRoute = require("./routes/login.route");
const ProfileRouter = require("./routes/profile.route");
const PasswordReset = require("./routes/reset.password");
const UserDataRouter = require("./routes/user.data.route");
const AdminRouter=require("./routes/admin.route");
const AuthGoogleRouter=require("./routes/auth.google");
const app = express();
app.use(express.json());
require("dotenv").config();
app.use(cors())
app.get("/", (req, res) => {
  res.send("Hi, Arun");
});
app.use("/signup", SignupRouter);
app.use("/login", LoginRoute);
app.use("/profile", ProfileRouter);
app.use("/data", UserDataRouter);
app.use('/admin',AdminRouter);
app.use("/auth",AuthGoogleRouter);
app.use('/reset',PasswordReset);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("db connected");
  } catch (err) {
    console.log("db disconncted");
  }
  console.log("server is runnig on the port of:", process.env.PORT);
});
