import express from "express";
import cors from "cors";
import homeRoute from "../routes/home.routes";
import appRoutes from "../routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", homeRoute);
app.use("/api/v1", appRoutes);

export default app;
