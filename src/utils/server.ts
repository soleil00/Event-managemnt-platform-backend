import express from "express";
import cors from "cors";
import homeRoute from "../routes/homeRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", homeRoute);

export default app;
