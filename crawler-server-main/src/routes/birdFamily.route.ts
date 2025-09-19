import { Router } from "express";
import {
  getListBirdFamilyHandler,
  getBirdFamilyByIdHandler,
  createBirdFamilyHandler,
  updateBirdFamilyHandler,
  deleteBirdFamilyHandler,
  getTotalFamily,
  getTotalFamilyPerOrderId,
  getFamiliesWithSpeciesHandler,
} from "../controller/birdFamily.controller";

const birdFamilyRoutes = Router();

// prefix: /family
birdFamilyRoutes.get("/families-with-species", getFamiliesWithSpeciesHandler);

birdFamilyRoutes.get("/total-families", getTotalFamily);

birdFamilyRoutes.get(
  "/total-families-per-order/:orderId",
  getTotalFamilyPerOrderId
);

birdFamilyRoutes.get("/list/:orderId", getListBirdFamilyHandler);

birdFamilyRoutes.get("/:id", getBirdFamilyByIdHandler);

birdFamilyRoutes.post("/:orderId", createBirdFamilyHandler);

birdFamilyRoutes.patch("/:id/orderId/:orderId", updateBirdFamilyHandler);

birdFamilyRoutes.delete("/:id", deleteBirdFamilyHandler);

export default birdFamilyRoutes;
