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

const Responses = require("./response");

const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");

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

app.get("/test", (req, res) => {
  res.json("test ok");
});

// Register API

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      Responses.returnResponse(res,203,"This email already exists! Try using another email or login to continue.",false);
    } else {
      const userData = await User.create({
        fname,
        lname,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      if (!userData._id) {
        Responses.returnResponse(res, 201, "Unable to create user!", false);
      } else
        Responses.returnResponse(res,200,"User created successfully!",true,userData);
    }
  } catch (error) {
    console.log(error);
    Responses.returnResponse(res,201,"Something went wrong! Please try again later.",false);
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
              Responses.returnResponse(res,201,"Something went wrong! Please try again later.",false);
            }
            res.cookie("token", token);
            Responses.returnResponse(res,200,"Login successful!",true,userData);
          }
        );
      } else {
        Responses.returnResponse(res, 203, "Invalid password!", false);
      }
    } else Responses.returnResponse(res, 201, "User not found!", false);
  } catch (error) {
    Responses.returnResponse(res,201,"Something went wrong! Please try again later.",false);
  }
});

// Fetch User API

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtKey, {}, async (err, user) => {
      if (err) {
        Responses.returnResponse(res,201,"Something went wrong! Please try again later.",false);
      }
      const { fName, lName, email, _id } = await User.findById(user.id);
      Responses.returnResponse(res,200,"User fetched!",true,{fName, lName, email, _id});
    });
  } else {
    Responses.returnResponse(res,201,"Unuthorized access!",false);
  }
});

// Logout API

app.post("/logout", (req, res) => {
  res.cookie("token", "");
  Responses.returnResponse(res,200,"User logged out!",true);
});

// Upload image using a link

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  try {
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });

    res.json(newName);
  } catch (error) {
    res.json("Invalid link!");
  }
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

app.post("/addPlace", (req, res) => {
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
    price,
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
      price,
    });

    res.json(addedPlace);
  });
});

// fetch all places added by a particular user

app.get("/fetchUserPlaces", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtKey, {}, async (err, userData) => {
    if (err) throw err;

    const { id } = userData;

    res.json(await Place.find({ owner: id }));
  });
});

// fetch particular place

app.get("/fetchPlace/:id", async (req, res) => {
  const { id } = req.params;

  res.json(await Place.findById(id));
});

// update particular place

app.put("/updatePlace", async (req, res) => {
  const { token } = req.cookies;

  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtKey, {}, async (err, userData) => {
    if (err) throw err;

    const placeData = await Place.findById(id);

    if (userData.id == placeData.owner.toString()) {
      placeData.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });

      placeData.save();
      res.json("save ok");
    }
  });
});

// fetch all places

app.get("/fetchPlaces", async (req, res) => {
  res.json(await Place.find());
});

// book a place

app.post("/booking", async (req, res) => {
  const { token } = req.cookies;

  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  jwt.verify(token, jwtKey, {}, async (err, userData) => {
    if (err) Responses.returnResponse(res,203,"Please login with valid credentials!",false);

    const { id } = userData;
    try {
      const bookingInfo = await Booking.create({
        place,
        person: id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price,
      });
      if(bookingInfo._id){
        Responses.returnResponse(res,200,"Booking successful!",true,bookingInfo);
      }else{
        Responses.returnResponse(res,201,"Booking can not be done!",false);
      }
    } catch (error) {
      Responses.returnResponse(res,201,"Something went wrong! Please try again later.",false);
    }
  });
});

// get particular user's bookings

app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtKey, {}, async (err, userData) => {
    if (err) throw err;

    const { id } = userData;

    res.json(await Booking.find({ person: id }).populate("place"));
  });
});

// get booking details

app.get("/fetchBooking/:id", async (req, res) => {
  const { id } = req.params;

  res.json(await Booking.findById(id).populate("place"));
});

app.listen(4000, () => {
  console.log("App started...");
});

// For restarting app
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("App restarted...");
});