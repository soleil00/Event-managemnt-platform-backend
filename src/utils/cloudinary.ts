import { env } from "./env";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: env.cloudinary_name,
  api_key: env.cloudinary_key,
  api_secret: env.cloudinary_secret,
});

export default cloudinary;
