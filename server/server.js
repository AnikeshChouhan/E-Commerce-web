import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// const promise = mongoose.connect(
//   "mongodb+srv://ecommerceproject558:ecommerceproject558@ecommerce.gsxb2.mongodb.net/"
// );
// promise
//   .then(() => {
//     console.log("Connected to Database");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//  Better way to Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};
connectToDatabase();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "expires",
      "paragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.listen(PORT, () => {
  console.log("Server is Running on " + PORT);
});
