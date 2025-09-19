import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import {
  deleteBirdFamily,
  getListBirdFamily,
  getBirdFamilyById,
  createBirdFamily,
  updateBirdFamily,
  totalFamily,
  getTotalFamiliesByOrderId,
  getFamiliesWithSpecies,
} from "../service/birdFamily.service";

export const getListBirdFamilyHandler = catchErrors(async (req, res) => {
  const orderId = z.string().parse(req.params.orderId);
  const response = await getListBirdFamily(orderId);
  return res.status(200).json(response);
});

export const getBirdFamilyByIdHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.id);
  const response = await getBirdFamilyById(id);
  return res.status(200).json(response);
});

export const createBirdFamilyHandler = catchErrors(async (req, res) => {
  const schema = z.object({
    name: z.string(),
  });
  const orderId = z.string().parse(req.params.orderId);
  const { name } = schema.parse(req.body);
  const response = await createBirdFamily(name, orderId);
  return res.status(201).json(response);
});

export const updateBirdFamilyHandler = catchErrors(async (req, res) => {
  const schema = z.object({
    name: z.string(),
  });
  const id = z.string().parse(req.params.id);
  const orderId = z.string().parse(req.params.orderId);
  const { name } = schema.parse(req.body);
  const response = await updateBirdFamily(id, name, orderId);
  return res.status(200).json(response);
});

export const deleteBirdFamilyHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.id);

  const response = await deleteBirdFamily(id);
  return res.status(200).json(response);
});
export const getTotalFamily = catchErrors(async (req, res) => {
  const response = await totalFamily();
  return res.status(200).json(response);
});
export const getTotalFamilyPerOrderId = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.orderId);

  const response = await getTotalFamiliesByOrderId(id);
  return res.status(200).json(response);
});
export const getFamiliesWithSpeciesHandler = catchErrors(async (req, res) => {
  const response = await getFamiliesWithSpecies();
  return res.status(200).json(response);
});
