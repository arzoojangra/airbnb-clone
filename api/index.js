require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("./models/User");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtKey = "airbnbCloneProjectByArzooJangra";

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL); //.env
// console.log(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

// Register API

app.post("/register", async (req, res) => {
  const { fName, lName, email, password } = req.body;

  try {
    const userData = await User.create({
      fName,
      lName,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userData);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Login API

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await User.findOne({
      email,
    });

    if (userData) {
      const passOK = bcrypt.compareSync(password, userData.password);

      if (passOK) {
        jwt.sign(
          { email: userData.email, id: userData._id },
          jwtKey,
          {},
          (err, token) => {
            if (err) {
              throw err;
            }
            res.cookie("token", token).json(userData);
          }
        );
      } else {
        res.status(422).json("pass not ok");
      }
    } else res.json("no user found");
  } catch (error) {
    res.status(422).json(error);
  }
});

// Fetch User API

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtKey, {}, async (err, user) => {
      if (err) {
        throw err;
      }
      const { fName, lName, email, _id } = await User.findById(user.id);
      res.json({ fName, lName, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.listen(4000);

// CziC5RjV7HPqLo3Y
// mongodb+srv://arzoojangra:CziC5RjV7HPqLo3Y@airbnb-clone.ecpyttj.mongodb.net/
