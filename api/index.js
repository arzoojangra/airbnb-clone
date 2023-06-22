require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const User = require("./models/User");
const Place = require("./models/Place");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtKey = "airbnbCloneProjectByArzooJangra";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

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

// Logout API

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// Upload image using a link

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  res.json(newName);
});

// Upload image

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;

    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }

  res.json(uploadedFiles);
});

// add new place

app.post("/addPlace", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  jwt.verify(token, jwtKey, {}, async (err, userData) => {
    if (err) throw err;

    const addedPlace = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });

    res.json(addedPlace);
  });
});

app.listen(4000);

// CziC5RjV7HPqLo3Y
// mongodb+srv://arzoojangra:CziC5RjV7HPqLo3Y@airbnb-clone.ecpyttj.mongodb.net/
