import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import {
  getListBirdOrder,
  getBirdOrderById,
  createBirdOrder,
  updateBirdOrder,
  deleteBirdOrder,
  totalOrder,
  getOrderWithFamilies,
} from "../service/birdOrder.service";

// Lấy danh sách tất cả BirdOrders
export const getListBirdOrderHandler = catchErrors(async (req, res) => {
  const response = await getListBirdOrder();
  return res.status(200).json(response);
});
export const getBirdOrderByIdHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.id);
  const response = await getBirdOrderById(id);
  return res.status(200).json(response);
});

// Tạo mới một BirdOrder
export const createBirdOrderHandler = catchErrors(async (req, res) => {
  const schema = z.object({
    name: z.string(),
    imageUrl: z.string(),
    description: z.string().optional(),
  });
  const { name, imageUrl, description } = schema.parse(req.body);

  const response = await createBirdOrder(
    name,
    imageUrl,
    description
  );
  return res.status(201).json(response);
});

// Cập nhật BirdOrder theo ID
export const updateBirdOrderHandler = catchErrors(async (req, res) => {
  const schema = z.object({
    name: z.string(),
    imageUrl: z.string(),
    description: z.string().optional(),
  });
  const id = z.string().parse(req.params.id);
  const { name, imageUrl, description } = schema.parse(req.body);
  const response = await updateBirdOrder(
    id,
    name,
    imageUrl,
    description
  );
  return res.status(200).json(response);
});

// Xóa BirdOrder theo ID
export const deleteBirdOrderHandler = catchErrors(async (req, res) => {
  const id = z.string().parse(req.params.id);
  const response = await deleteBirdOrder(id);
  return res.status(200).json(response);
});
export const getTotalOrder = catchErrors(async (req, res) => {
  const response = await totalOrder();
  return res.status(200).json(response);
});
export const getOrderWithFamiliesHandler = catchErrors(async (req, res) => {
  const response = await getOrderWithFamilies();
  return res.status(200).json(response);
});