import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT,
  db_url: process.env.MONGODB_URL as string,
  cloudinary_name: process.env.CLOUD_NAME as string,
  cloudinary_key: process.env.CLOUD_KEY as string,
  cloudinary_secret: process.env.CLOUD_SECRET as string,
  jwt_secret: process.env.JWT_SECRET as string,
};
