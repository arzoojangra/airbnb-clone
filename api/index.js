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
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");
const mime = require("mime-types");

const Responses = require("./response");

const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtKey = "airbnbCloneProjectByArzooJangra";
const bucket = "arzoo-airbnb-clone";

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

app.get("/api/test", (req, res) => {
  res.json("test ok");
});

// Upload to S3 function

async function uploadToS3(path, mimeType, originalname){
  const client = new S3Client({
    region: 'ap-south-1',
    credentials:{
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];

  const newFileName = Date.now() + "." + ext;
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body: fs.readFileSync(path),
    Key:newFileName,
    ContentType:mimeType,
    ACL: 'public-read',
  }));

  return `https://${bucket}.s3.amazonaws.com/${newFileName}`
}

// Register API

app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
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

app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
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

app.get("/api/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
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
    Responses.returnResponse(res,201,"Unauthorized access!",false);
  }
});

// Logout API

app.post("/api/logout", (req, res) => {
  res.cookie("token", "");
  Responses.returnResponse(res,200,"User logged out!",true);
});

// Upload image using a link

app.post("/api/upload-by-link", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  try {
    await imageDownloader.image({
      url: link,
      dest: "/tmp/" + newName,
    });
    const url = await uploadToS3(
      "/tmp/" + newName,
      mime.lookup("/tmp/" + newName),
      newName
    );
    Responses.returnResponse(res, 200, "Photo uploaded!", true, url);
  } catch (error) {
    console.log(error);
    Responses.returnResponse(res, 203, "Invalid link!", false);
  }
});

// Upload image

const photosMiddleware = multer({ dest: "/tmp" });

app.post("/api/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, mimetype } = req.files[i];
    console.log(req.files[i]);

    if (!mimetype.includes("image")) {
      Responses.returnResponse(res, 203, "Invalid file!", false);
      return;
    }

    const url = await uploadToS3(path, mimetype, originalname);
    uploadedFiles.push(url);
  }

  Responses.returnResponse(res, 200, "File uploaded!", true, uploadedFiles);
});

// add new place

app.post("/api/addPlace", (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
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

app.get("/api/fetchUserPlaces", (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
  const { token } = req.cookies;

  jwt.verify(token, jwtKey, {}, async (err, userData) => {
    if (err) throw err;

    const { id } = userData;

    res.json(await Place.find({ owner: id }));
  });
});

// fetch particular place

app.get("/api/fetchPlace/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
  const { id } = req.params;

  res.json(await Place.findById(id));
});

// update particular place

app.put("/api/updatePlace", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
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

app.get("/api/fetchPlaces", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
  res.json(await Place.find());
});

// book a place

app.post("/api/booking", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
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

app.get("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
  const { token } = req.cookies;

  jwt.verify(token, jwtKey, {}, async (err, userData) => {
    if (err) throw err;

    const { id } = userData;

    res.json(await Booking.find({ person: id }).populate("place"));
  });
});

// get booking details

app.get("/api/fetchBooking/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
  const { id } = req.params;

  res.json(await Booking.findById(id).populate("place"));
});

// search for places

app.post("/api/fetch/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); //.env
  try {
    const { place, minPrice, maxPrice, numberOfGuests } = req.body;

    const valueArray = [];
    if (place) {
      valueArray.push({ address: { $regex: place } });
    }

    if (minPrice) {
      if (maxPrice) {
        valueArray.push({ price: { $gte: minPrice, $lte: maxPrice } });
      } else {
        valueArray.push({ price: { $gte: minPrice } });
      }
    } else if (maxPrice) {
      if (minPrice) {
        valueArray.push({ price: { $gte: minPrice, $lte: maxPrice } });
      } else {
        valueArray.push({ price: { $lte: maxPrice } });
      }
    }

    if (numberOfGuests) {
      valueArray.push({ maxGuests: { $gte: numberOfGuests } });
    }

    var query = { $and: valueArray };

    if (!place && !minPrice && !maxPrice && !numberOfGuests) {
      query = {};
    }
    const searchResult = await Place.find(query);
    Responses.returnResponse(res,200,"Search successful!.",true,searchResult);
  } catch (error) {
    Responses.returnResponse(res,201,"Something went wrong! Please try again later.",false);
  }
});

app.listen(4000, () => {
  console.log("App started...");
});

// For restarting app
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("App restarted...");
});