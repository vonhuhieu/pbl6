import { IsNull } from "typeorm";
import { NOT_FOUND } from "../constants/http";
import { MessageConstant } from "../constants/messageConstant";
import { AppDataSource } from "../database/datasource";
import { BirdOrder } from "../model/birdOrder.model";
import appAssert from "../utils/appAssert";

const birdOrderRepository = AppDataSource.getRepository(BirdOrder);

export const getListBirdOrder = async () => {
  return birdOrderRepository.findBy({ deletedAt: IsNull() });
};

export const getBirdOrderById = async (id: string) => {
  const birdOrder = await birdOrderRepository.findOneBy({ id });
  appAssert(birdOrder, NOT_FOUND, MessageConstant.BIRD_ORDER_NOT_FOUND);
  return birdOrder;
};

export const createBirdOrder = async (
  name: string,
  imageUrl: string,
  description?: string
) => {
  const newBirdOrder = birdOrderRepository.create({
    name,
    imageUrl,
    description,
  });
  return birdOrderRepository.save(newBirdOrder);
};

export const updateBirdOrder = async (
  id: string,
  name: string,
  imageUrl: string,
  description?: string
) => {
  const birdOrder = await birdOrderRepository.findOneBy({ id });
  appAssert(birdOrder, NOT_FOUND, MessageConstant.BIRD_ORDER_NOT_FOUND);

  birdOrder.name = name;
  birdOrder.updatedAt = new Date();
  birdOrder.imageUrl = imageUrl;
  if (description) {
    birdOrder.description = description;
  }
  return birdOrderRepository.save(birdOrder);
};

export const deleteBirdOrder = async (birdOrderId: string) => {
  const birdOrder = await birdOrderRepository.findOneBy({ id: birdOrderId });
  appAssert(birdOrder, NOT_FOUND, MessageConstant.BIRD_ORDER_NOT_FOUND);

  birdOrder.deletedAt = new Date();

  return await birdOrderRepository.save(birdOrder);
};

export const totalOrder = async () => {
  return await birdOrderRepository.count();
};
export const getOrderWithFamilies = async () => {
  const orders = await birdOrderRepository.find({
    relations: ["birdFamilies"],
  });

  const response = orders.map((order) => ({
    id: order.id,
    name: order.name,
    familyCount: order.birdFamilies.length,
  }));

  return response;
};

