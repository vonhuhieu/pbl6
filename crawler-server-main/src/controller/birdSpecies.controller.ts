import { z } from "zod";
import {
  createBirdSpecies,
  deleteBirdSpecies,
  getBirdSpeciesById,
  getListBirdSpecies,
  getRandomBirdSpeciesFromDifferentFamilies,
  getTotalSpeciesPerFamilyId,
  totalSpecies,
  updateBirdSpecies,
  getBirdSpeciesByName,
  getRelatedSpeciesByName
} from "../service/birdSpecies.service";
import catchErrors from "../utils/catchErrors";
import { deleteAllBirdImages } from "../service/birdImage.service";

// Lấy danh sách BirdSpecies theo Family ID
export const getListBirdSpeciesHandler = catchErrors(async (req, res) => {
  const familyId = z.string().parse(req.params.familyId);
  const response = await getListBirdSpecies(familyId);
  return res.status(200).json(response);
});
export const getBirdSpeciesByIdHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.id);
  console.log("response12312", id);
  const response = await getBirdSpeciesById(id);
  console.log("response12312", response);
  return res.status(200).json(response);
});
// Tạo mới một BirdSpecies
export const createBirdSpeciesHandler = catchErrors(async (req, res) => {
  const schema = z.object({
    name: z.string(),
    lifespan: z.string(),
    size: z.string(),
    imageUrl: z.string(),
    description: z.string(),
    color: z.string(),
    weight: z.string(),
    population: z.string(),
    offspring: z.string(),
    region: z.string(),
  });
  const familyId = z.string().parse(req.params.familyId);
  const birdData = schema.parse(req.body);
  const response = await createBirdSpecies(familyId, birdData);
  return res.status(201).json(response);
});

// Cập nhật một BirdSpecies theo ID
export const updateBirdSpeciesHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.id);
  const schema = z.object({
    name: z.string().optional(),
    lifespan: z.string().optional(),
    size: z.string().optional(),
    imageUrl: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    weight: z.string().optional(),
    population: z.string().optional(),
    offspring: z.string().optional(),
  });
  const updatedData = schema.parse(req.body);
  const response = await updateBirdSpecies(id, updatedData);
  return res.status(200).json(response);
});

export const deleteBirdSpeciesHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.id);
  const response = await deleteBirdSpecies(id);
  return res.status(200).json(response);
});
export const deleteAllBirdSpeciesHandler = catchErrors(async (req, res) => {
  const body = z
    .object({
      ids: z.array(z.string().uuid()),
    })
    .parse(req.body);

  const { ids } = body;
  const response = await deleteAllBirdImages(ids);
  return res.status(200).json(response);
});
export const getRandomTenSpeciesFromDifferntFamilies = catchErrors(
  async (req, res) => {
    const id = z.string().parse(req.params.id);
    const response = await getRandomBirdSpeciesFromDifferentFamilies(id);
    return res.status(200).json(response);
  }
);
export const getTotalSpecies = catchErrors(async (req, res) => {
  const response = await totalSpecies();
  return res.status(200).json(response);
});
export const getTotalSpeciesPerFamily = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.id);
  const response = await getTotalSpeciesPerFamilyId(id);
  return res.status(200).json(response);
});

export const getBirdSpeciesByNameHandler = catchErrors(async (req, res) => {
  const name = z.string().parse(req.query.name)
  const response = await getBirdSpeciesByName(name)
  return res.status(200).json(response)
})

export const getRelatedSpeciesByNameHandler = catchErrors(async (req, res) => {
  const name = z.string().parse(req.query.name);
  const response = await getRelatedSpeciesByName(name);
  return res.status(200).json(response);
});