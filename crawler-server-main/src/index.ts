import cors from "cors";
import express from "express";
import "reflect-metadata";
import { SERVER_PORT } from "./constants/env";
import { OK } from "./constants/http";
import errorHandler from "./middleware/errorHandler";
import { AppDataSource } from "./database/datasource";
import { camelCaseMiddleware, snakeCaseMiddleware } from "./middleware/snakeCase";
import birdRoutes from "./routes/birdImages.route";
import birdSpeciesRoutes from "./routes/birdSpecies.route";
import birdOrderRoute from "./routes/birdOrder.route";
import birdFamilyRoutes from "./routes/birdFamily.route";
import birdOrderRoutes from "./routes/birdOrder.route";
import infoRoutes from "./routes/info.route";

// Tạo ứng dụng Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(camelCaseMiddleware);
app.use(snakeCaseMiddleware);
// Khởi tạo kết nối tới cơ sở dữ liệu

const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Kết nối thành công tới cơ sở dữ liệu PostgreSQL");
  } catch (error) {
    console.error("Lỗi khi kết nối tới cơ sở dữ liệu PostgreSQL:", error);
    process.exit(1);
  }
};


app.get("/", (req, res) => {
  res.status(OK).json({ status: "healthy" });
});
// auth routes
app.use("/images", birdRoutes);
app.use("/bird-species", birdSpeciesRoutes)
app.use("/family", birdFamilyRoutes);
app.use("/order", birdOrderRoutes);
app.use("/info", infoRoutes);
app.use(errorHandler);

// Khởi động server
const startServer = () => {
  app.listen(SERVER_PORT, () => {
    console.log("Server is listening on port " + SERVER_PORT);
  });
};

// Khởi động ứng dụng
const runApp = async () => {
  await initializeDatabase();
  startServer();
};

runApp();
