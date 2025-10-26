import { Router } from "express";
import {
  createBirdSpeciesHandler,
  deleteBirdSpeciesHandler,
  getBirdSpeciesByIdHandler,
  getListBirdSpeciesHandler,
  getRandomTenSpeciesFromDifferntFamilies,
  getTotalSpecies,
  getTotalSpeciesPerFamily,
  updateBirdSpeciesHandler,
  getBirdSpeciesByNameHandler,
  getRelatedSpeciesByNameHandler
} from "../controller/birdSpecies.controller";

const birdSpeciesRoutes = Router();
birdSpeciesRoutes.get("/total-species", getTotalSpecies);
birdSpeciesRoutes.get(
  "/total-species-per-family/:id",
  getTotalSpeciesPerFamily
);

birdSpeciesRoutes.get("/search", getBirdSpeciesByNameHandler);
birdSpeciesRoutes.get("/related", getRelatedSpeciesByNameHandler);

birdSpeciesRoutes.get("/:familyId", getListBirdSpeciesHandler);
birdSpeciesRoutes.get("/detail/:id", getBirdSpeciesByIdHandler);
birdSpeciesRoutes.post("/:familyId", createBirdSpeciesHandler);
birdSpeciesRoutes.patch("/:id", updateBirdSpeciesHandler);
birdSpeciesRoutes.get("/:id", updateBirdSpeciesHandler);
birdSpeciesRoutes.delete("/:id", deleteBirdSpeciesHandler);
birdSpeciesRoutes.get(
  "/random-species/:id",
  getRandomTenSpeciesFromDifferntFamilies
);
export default birdSpeciesRoutes;
