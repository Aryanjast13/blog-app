import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import mainRouter from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL as string,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", mainRouter);

// not found
app.use(notFound);

// error handler
app.use(errorHandler);

app.listen(PORT, () => console.log("server is running "));
