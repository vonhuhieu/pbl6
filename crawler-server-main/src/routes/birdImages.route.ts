import { Router } from "express";
import {
  createBirdImagesHandler,
  deleteBirdImagesHandler,
  fetchAndDownloadImagesHandler,
  getAllImageSizeStatistics,
  getAvgImagesSize,
  getListBirdSpeciesImageHandler,
  getListBirdSpeciesTrashImageHandler,
  getTotalImage,
  getTotalImagePerSpecies,
  importFromCsvHandler,
  restoreBirdImagesHandler,
  updateBirdImagesHandler,
} from "../controller/birdImage.controller";
import { deleteAllBirdSpeciesHandler } from "../controller/birdSpecies.controller";

const birdRoutes = Router();

// prefix: /images
birdRoutes.get("/total-images", getTotalImage);
birdRoutes.get("/images-statistics", getAllImageSizeStatistics);
birdRoutes.get("/total-image-per-species", getTotalImagePerSpecies);
birdRoutes.post("/import", importFromCsvHandler);
birdRoutes.get("/bird/:speciesId", getListBirdSpeciesImageHandler);
birdRoutes.get("/image-size", getAvgImagesSize);
birdRoutes.get("/trash", getListBirdSpeciesTrashImageHandler);
birdRoutes.post("/bird/:speciesId", createBirdImagesHandler);
birdRoutes.patch("/bird/delete-all", deleteAllBirdSpeciesHandler);
birdRoutes.delete("/bird/:birdId", deleteBirdImagesHandler);
birdRoutes.patch("/bird/:birdId", updateBirdImagesHandler);
birdRoutes.patch("/bird/:birdId", deleteBirdImagesHandler);
birdRoutes.patch("/restore/bird/:birdId", restoreBirdImagesHandler);
birdRoutes.get("/download", fetchAndDownloadImagesHandler);

export default birdRoutes;
