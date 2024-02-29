import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnection from "./src/config/db.js";
import userRouter from "./src/routes/user.route.js";
import adminRouter from "./src/routes/admin.route.js";
import candidateRouter from "./src/routes/candidate.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/candidate", candidateRouter);

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log("PORT is running at " + PORT);
    });
  })
  .catch(() => {
    console.log("Fail to connect port");
  });
