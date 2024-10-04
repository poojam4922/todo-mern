import express, { Request, Response } from "express";
import { router } from "./src/routes/todoRoutes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/db/config";
import cors from "cors";
const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
app.use("/todo", router);


// app.use(ErrorHandler)
// Connect to database

app.listen(port, (): void => {
  console.log(`Server is running at http://localhost:${port}`);
});
