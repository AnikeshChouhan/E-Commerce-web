import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dhnbfcilk",
  api_key: "595324278193833",
  api_secret: "YBjJuunJvEaMjmIofY6UKr3fTCA",
});

const storage = new multer.memoryStorage();

export async function ImageUploadUtils(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error + " From cloudinary.js");
  }
}
export const upload = multer({ storage });
