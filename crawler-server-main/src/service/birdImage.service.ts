import { getTotalImagePerSpecies } from "./../controller/birdImage.controller";
import { In, IsNull, Not } from "typeorm";
import { NOT_FOUND } from "../constants/http";
import { MessageConstant } from "../constants/messageConstant";
import { AppDataSource } from "../database/datasource";
import { ImageBird } from "../model/birdImage.model";
import { BirdSpecies } from "../model/birdSpecies.model ";
import appAssert from "../utils/appAssert";
import axios from 'axios';
import * as fs from 'fs-extra';
import * as path from 'path';
import archiver from 'archiver';
import { BirdOrder } from "../model/birdOrder.model";
import { BirdFamily } from "../model/birdFamily.model";
const fetch = require('node-fetch');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const imageBirdRepository = AppDataSource.getRepository(ImageBird);
const birdSpeciesRepository = AppDataSource.getRepository(BirdSpecies);
export const getListImageFromBirdSpecies = async (birdSpeciesId: string) => {
  return await imageBirdRepository.find({
    where: {
      birdSpecies: { id: birdSpeciesId },
    },
    order: {
      createdAt: "ASC"
    }
  });
};

type BirdImagesRequest = {
  speciesId: string;
  urls: string[];
};

export const createBirdImages = async ({
  speciesId,
  urls,
}: BirdImagesRequest) => {
  const birdSpecies = await birdSpeciesRepository.findOneBy({ id: speciesId });
  appAssert(birdSpecies, NOT_FOUND, MessageConstant.BIRD_SPECIES_NOT_FOUND);
  const addedImages = [];
  for (const url of urls) {
    const imageBird = imageBirdRepository.create({
      url: url,
      birdSpecies: birdSpecies,
    });

    const savedImage = await imageBirdRepository.save(imageBird);

    // Lưu lại id và url của hình ảnh đã lưu
    addedImages.push({ id: savedImage.id, url: savedImage.url });
  }
  return addedImages;
};

export const deleteBirdImages = async (birdId: string) => {
  const imageBird = await imageBirdRepository.findOneBy({ id: birdId });
  appAssert(imageBird, NOT_FOUND, MessageConstant.BIRD_SPECIES_NOT_FOUND);
  imageBird.deletedAt = new Date();

  await imageBirdRepository.save(imageBird);
};
export const deleteAllBirdImages = async (imageIds: string[]) => {
  if (imageIds.length === 0) {
    throw new Error("No image IDs provided.");
  }

  const images = await imageBirdRepository.find({
    where: { id: In(imageIds), deletedAt: IsNull() }, // Lọc ra những hình ảnh chưa bị xóa
  }); 
  if (images.length === 0) {
    throw new Error("No images found for the provided IDs");
  }

  const currentDate = new Date();
  for (const image of images) {
    image.deletedAt = currentDate; 
    await imageBirdRepository.save(image); 
  }
  return { message: `${images.length} image(s) have been marked as deleted.` };
};

export const updateBirdImages = async ({
  birdId,
  url,
}: {
  birdId: string;
  url: string;
}) => {
  const birdImage = await imageBirdRepository.findOneBy({ id: birdId });
  appAssert(birdImage, NOT_FOUND, MessageConstant.BIRD_SPECIES_NOT_FOUND);

  birdImage.url = url;

  const savedImage = await imageBirdRepository.save(birdImage);
  return { id: savedImage.id, url: savedImage.url };
};

export const restoreBirdImages = async (birdId: string) => {
  const imageBird = await imageBirdRepository.findOneBy({ id: birdId });
  appAssert(imageBird, NOT_FOUND, MessageConstant.BIRD_SPECIES_NOT_FOUND);
  imageBird.deletedAt = undefined;

  await imageBirdRepository.save(imageBird);
};

export const getListTrashImageFromBirdSpecies = async () => {
  return await imageBirdRepository.query(
    "SELECT * FROM bird_image WHERE deleted_at IS NOT NULL"
  );
};

export async function fetchAllData() {
  const birdOrderRepository = AppDataSource.getRepository(BirdOrder);
  const birdFamilyRepository = AppDataSource.getRepository(BirdFamily);

  const orders = await birdOrderRepository.find({
    where: { deletedAt: IsNull() },
    relations: ["birdFamilies"],
  });

  const data = await Promise.all(
    orders.map(async (order: BirdOrder, orderIndex: number) => {
      const families = await birdFamilyRepository
          .createQueryBuilder("birdFamily")
          .leftJoinAndSelect("birdFamily.birdSpecies", "birdSpecies")
          .leftJoinAndSelect("birdSpecies.imageBirds", "imageBirds")
          .where("birdFamily.birdOrder.id = :orderId", { orderId: order.id })
          .andWhere("birdFamily.deletedAt IS NULL")
          .orderBy("imageBirds.createdAt", "ASC") 
          .getMany();

      return {
        order: `${orderIndex + 1}.${order.name.replace(/ /g, "_")}`,
        families: families
          .filter((family) => family.deletedAt === null) // Filter out deleted families
          .map((family, familyIndex) => ({
            family: `${orderIndex + 1}.${familyIndex + 1}.${family.name.replace(
              / /g,
              "_"
            )}`,
            species: family.birdSpecies
              .filter((species) => species.deletedAt === null) // Filter out deleted species
              .map((species, speciesIndex) => ({
                species: `${orderIndex + 1}.${familyIndex + 1}.${
                  speciesIndex + 1
                }.${species.name.replace(/ /g, "_")}`,
                images: species.imageBirds
                  .filter((image) => image.deletedAt === null) // Filter out deleted images
                  .map((image, imageIndex) => ({
                    url: image.url,
                    fileName: `${species.name.replace(/ /g, "_")}_${String(
                      imageIndex + 1
                    ).padStart(6, "0")}.jpg`,
                  })),
              })),
          })),
      };
    })
  );

  return data;
}

export const getAvgImagesSizeForAllSpecies = async () => {
  const allImages = await imageBirdRepository.find({
    select: ["url"],
    relations: ["birdSpecies"],
  });

  const avgSizes: {
    [key: string]: {
      totalWidth: number;
      totalHeight: number;
      count: number;
      name: string;
    };
  } = {};

  for (const item of allImages) {
    if (!item.birdSpecies) {
      continue;
    }
    const speciesId = item.birdSpecies.id;
    const speciesName = item.birdSpecies.name; // Lấy tên loài chim
    if (!avgSizes[speciesId]) {
      avgSizes[speciesId] = {
        totalWidth: 0,
        totalHeight: 0,
        count: 0,
        name: speciesName,
      };
    }

    const dimensions = await getImageDimensions(item.url);
    if (dimensions) {
      avgSizes[speciesId].totalWidth += dimensions.width;
      avgSizes[speciesId].totalHeight += dimensions.height;
      avgSizes[speciesId].count += 1;
    }
  }

  const result = Object.entries(avgSizes).map(
    ([speciesId, { totalWidth, totalHeight, count, name }]) => {
      const avgWidth = count > 0 ? Math.round(totalWidth / count) : 0;
      const avgHeight = count > 0 ? Math.round(totalHeight / count) : 0;
      return { speciesId, speciesName: name, avgWidth, avgHeight }; // Thêm speciesName vào kết quả
    }
  );

  return result;
};
async function getImageDimensions(url: string) {
  const axios = require("axios");
  const imageSize = require("image-size");
  try {
    // Tải ảnh từ URL và chuyển nội dung thành Buffer
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");

    // Lấy kích thước ảnh từ buffer
    const dimensions = imageSize(buffer);
    return dimensions;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Không thể lấy kích thước ảnh từ ${url}: ${error.message}`);
    } else {
      console.error(`Không thể lấy kích thước ảnh từ ${url}: ${String(error)}`);
    }
    return null;
  }
}


export const getTotalImageEachSpecies = async () => {
  const allImages = await imageBirdRepository.find({
    select: ["id"],
    relations: ["birdSpecies"],
  });

  const speciesImageCounts: { [key: string]: { count: number; name: string } } =
    {};

  for (const item of allImages) {
    if (!item.birdSpecies) {
      continue;
    }
    const speciesId = item.birdSpecies.id;
    const speciesName = item.birdSpecies.name; // Lấy tên loài chim

    if (!speciesImageCounts[speciesId]) {
      speciesImageCounts[speciesId] = { count: 0, name: speciesName };
    }

    speciesImageCounts[speciesId].count += 1;
  }

  const result = Object.entries(speciesImageCounts).map(
    ([speciesId, { count, name }]) => ({
      speciesId,
      name,
      count,
    })
  );

  return result;
};

export const totalImage = async () => {
  return await imageBirdRepository.count();
};
export const getImageSizeStatistics = async () => {
  const allImages = await imageBirdRepository.find({
    select: ["url"],
    relations: ["birdSpecies"],
  });

  const sizeStatistics: {
    [key: string]: { count: number; name: string };
  } = {};

  for (const item of allImages) {
    if (!item.birdSpecies) {
      continue;
    }

    const dimensions = await getImageDimensions(item.url);
    if (dimensions) {
      const sizeKey = `${dimensions.width}x${dimensions.height}`;
      const speciesName = item.birdSpecies.name; // Lấy tên loài chim

      if (!sizeStatistics[sizeKey]) {
        sizeStatistics[sizeKey] = { count: 0, name: speciesName };
      }

      sizeStatistics[sizeKey].count += 1;
    }
  }

  // Chuyển đổi thống kê từ object thành mảng để dễ xử lý hơn
  const result = Object.entries(sizeStatistics).map(
    ([size, { count, name }]) => {
      const [width, height] = size.split("x").map(Number);
      return { width, height, count, speciesName: name }; // Thêm tên loài chim vào kết quả
    }
  );

  return result;
};

async function downloadImageToZip(url: string, folder: string, fileName: string, archive: any, maxRetries = 5) {

  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, { timeout: 60000 });
      if (!response.ok) throw new Error(`Failed to fetch ${url}`);

      // Add image stream directly to ZIP without saving to disk
      archive.append(response.body, {
        name: path.join(folder, fileName.replace(/ /g, "_")),
      });

      // If successful, break out of the loop
      break;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} failed to download image ${fileName}:`);
      if (attempt >= maxRetries) {
        throw new Error(`Failed to download image ${fileName}`);
      }
      // Wait for a short period before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

export async function fetchAndDownloadImagesV2(res: any) {
  const data = await fetchAllData();
  const archive = archiver("zip");
  archive.pipe(res);

  let totalImages = 1;
  let speciesIndex = 1;

  // Prepare metadata content
  let imagesTxtContent = "";
  let classLabelsContent = "";
  let classesContent = "";
  let trainTestSplitContent = "";

  for (const order of data) {
    for (const family of order.families) {
      for (const species of family.species) {
        const folder = path.join(
          order.order.replace(/ /g, "_"),
          family.family.replace(/ /g, "_"),
          species.species.replace(/ /g, "_")
        );
        const trimmedSpeciesName = species.species
          .substring(6)
          .replace(/ /g, "_");
        // Update classes content
        classesContent += `${speciesIndex} ${trimmedSpeciesName}\n`;

        let index = 0;
        for (const image of species.images){
          try {
            const fileName = image.fileName.replace(/ /g, "_");
            await downloadImageToZip(image.url, folder, fileName, archive);
            
            // Update metadata if download is successful
            const tempFilePath = path.join(folder, fileName);
            console.log('tempFilePath', tempFilePath);
            imagesTxtContent += `${totalImages} ${tempFilePath}\n`;
            classLabelsContent += `${totalImages} ${speciesIndex}\n`;
        
            const sum = species.images.length;
            const totalTrainImages = Math.floor(sum * 0.7);
            const trainTestLabel = index < totalTrainImages ? 1 : 0;
            trainTestSplitContent += `${totalImages} ${trainTestLabel}\n`;
        
            totalImages++;
            index++;
          } catch (error) {
            console.error(`Error downloading image`);
            // Skip this image and continue with the next one
          }
        
        }
        // const downloadPromises = species.images.map(async (image: any) => {
         
        
        //   try {
        //     const fileName = image.fileName.replace(/ /g, "_");
        //     await downloadImageToZip(image.url, folder, fileName, archive);
            
        //     // Update metadata if download is successful
        //     const tempFilePath = path.join(folder, fileName);
        //     console.log('tempFilePath', tempFilePath);
        //     imagesTxtContent += `${totalImages} ${tempFilePath}\n`;
        //     classLabelsContent += `${totalImages} ${speciesIndex}\n`;
        
        //     const sum = species.images.length;
        //     const totalTrainImages = Math.floor(sum * 0.7);
        //     const trainTestLabel = index < totalTrainImages ? 1 : 0;
        //     trainTestSplitContent += `${totalImages} ${trainTestLabel}\n`;
        
        //     totalImages++;
        //     index++;
        //   } catch (error) {
        //     console.error(`Error downloading image`);
        //     // Skip this image and continue with the next one
        //   }
        // });
        // await Promise.all(downloadPromises);

        speciesIndex++;
      }
    }
  }

  // Append metadata files to the archive
  archive.append(imagesTxtContent, { name: "images.txt" });
  archive.append(classLabelsContent, { name: "image_class_labels.txt" });
  archive.append(classesContent, { name: "classes.txt" });
  archive.append(trainTestSplitContent, { name: "train_test_split.txt" });

  // Finalize the archive
  await archive.finalize();
}