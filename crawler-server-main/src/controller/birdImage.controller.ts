import { z } from "zod";
import {
  createBirdImages,
  deleteBirdImages,
  fetchAndDownloadImagesV2,
  getAvgImagesSizeForAllSpecies,
  getImageSizeStatistics,
  getListImageFromBirdSpecies,
  getListTrashImageFromBirdSpecies,
  getTotalImageEachSpecies,
  restoreBirdImages,
  totalImage,
  updateBirdImages,
} from "../service/birdImage.service";
import { importFromCsv } from "../service/importFromCsv";
import catchErrors from "../utils/catchErrors";
import { OK } from "./../constants/http";

export const importFromCsvHandler = catchErrors(async (req, res) => {
  await importFromCsv();
  return res
    .status(200)
    .json({ message: "Imported data from CSV file sucessfully" });
});

export const getListBirdSpeciesImageHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.speciesId);
  const response = await getListImageFromBirdSpecies(id);
  return res.status(200).json(response);
});
export const getAvgImagesSize = catchErrors(async (req, res) => {
  const tempt = await getAvgImagesSizeForAllSpecies();
  return res.status(200).json(tempt);
});
export const getTotalImagePerSpecies = catchErrors(async (req, res) => {
  const tempt = await getTotalImageEachSpecies();
  return res.status(200).json(tempt);
});
export const createBirdImagesHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.speciesId);
  const urls = z.array(z.string()).parse(req.body.urls);

  return res.status(OK).json(await createBirdImages({ speciesId: id, urls }));
});

export const deleteBirdImagesHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.birdId);
  await deleteBirdImages(id);
  return res.status(OK).json({ message: "Delete bird image successfully" });
});

export const updateBirdImagesHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.birdId);
  const url = z.string().parse(req.body.url);

  return res.status(OK).json(await updateBirdImages({ birdId: id, url }));
});

export const restoreBirdImagesHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.birdId);
  await restoreBirdImages(id);
  return res.status(OK).json({ message: "Restore bird image successfully" });
});

export const getListBirdSpeciesTrashImageHandler = catchErrors(
  async (req, res) => {
    const response = await getListTrashImageFromBirdSpecies();
    return res.status(200).json(response);
  }
);

export const fetchAndDownloadImagesHandler = catchErrors(async (req, res) => {
  res.setHeader("Content-Disposition", 'attachment; filename="images73-cleannedV2.4.zip"');
  res.setHeader("Content-Type", "application/zip");

  try {
    await fetchAndDownloadImagesV2(res); // Replace `data` with your actual dataset
  } catch (err) {
    console.error("Error streaming ZIP:", err);

    if (!res.headersSent) {
      res.status(500).json({ message: "Error downloading file" });
    }
  }
    // Set up the response headers for a downloadable ZIP file
  //   res.setHeader('Content-Disposition', 'attachment; filename="images73-cleanedv2.zip"');
  //   res.setHeader('Content-Type', 'application/zip');
  
  //   try {
  //     // Stream the ZIP directly to the response
  //     await fetchAndDownloadImages(res);
  //     // Do not send any more responses after this point
  //   } catch (err) {
  //     console.error('Error streaming ZIP:', err);
  //     // Handle the error response
  //     if (!res.headersSent) { // Check if headers have been sent
  //       res.status(500).json({ message: 'Error downloading file' });
  //     }
  //   }
  }
);
export const getTotalImage = catchErrors(async (req, res) => {
  const response = await totalImage();
  return res.status(200).json(response);
});
export const getAllImageSizeStatistics = catchErrors(async (req, res) => {
  const response = await getImageSizeStatistics();
  return res.status(200).json(response);
});