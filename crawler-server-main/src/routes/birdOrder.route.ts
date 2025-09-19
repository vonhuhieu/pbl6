import { Router } from "express";
import {
  getListBirdOrderHandler,
  createBirdOrderHandler,
  updateBirdOrderHandler,
  deleteBirdOrderHandler,
  getBirdOrderByIdHandler,
  getTotalOrder,
  getOrderWithFamiliesHandler,
} from "../controller/birdOrder.controller";
import { getBirdOrderById } from "../service/birdOrder.service";

const birdOrderRoutes = Router();

// prefix: /order
birdOrderRoutes.get("/orders-with-families", getOrderWithFamiliesHandler);

birdOrderRoutes.get("/total-orders", getTotalOrder);

birdOrderRoutes.get("/", getListBirdOrderHandler);

birdOrderRoutes.get("/:id", getBirdOrderByIdHandler);

birdOrderRoutes.post("/", createBirdOrderHandler);

birdOrderRoutes.patch("/:id", updateBirdOrderHandler);

birdOrderRoutes.delete("/:id", deleteBirdOrderHandler);


export default birdOrderRoutes;
