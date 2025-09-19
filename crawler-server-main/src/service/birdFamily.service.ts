import { IsNull } from "typeorm";
import { NOT_FOUND } from "../constants/http";
import { MessageConstant } from "../constants/messageConstant";
import { AppDataSource } from "../database/datasource";
import { BirdFamily } from "../model/birdFamily.model";
import { BirdOrder } from "../model/birdOrder.model";
import appAssert from "../utils/appAssert";

const birdFamilyRepository = AppDataSource.getRepository(BirdFamily);
const birdOrderRepository = AppDataSource.getRepository(BirdOrder);

export const getListBirdFamily = async (orderId: string) => {
  const birdOrder = await birdOrderRepository.findOneBy({ id: orderId });
  appAssert(birdOrder, NOT_FOUND, MessageConstant.BIRD_ORDER_NOT_FOUND);
  return birdFamilyRepository.find({
    where: {
      birdOrder: { id: orderId },
      deletedAt: IsNull(),
    },
  });
};

export const getBirdFamilyById = async (id: string) => {
  const birdFamily = await birdFamilyRepository.findOneBy({ id });
  appAssert(birdFamily, NOT_FOUND, MessageConstant.BIRD_FAMILY_NOT_FOUND);
  return birdFamily;
};

export const createBirdFamily = async (name: string, orderId: string) => {
  const birdOrder = await birdOrderRepository.findOneBy({ id: orderId });
  appAssert(birdOrder, NOT_FOUND, MessageConstant.BIRD_ORDER_NOT_FOUND);

  const newBirdFamily = birdFamilyRepository.create({
    name,
    birdOrder: birdOrder,
  });
  return birdFamilyRepository.save(newBirdFamily);
};

export const updateBirdFamily = async (
  id: string,
  name: string,
  orderId: string
) => {
  const birdFamily = await birdFamilyRepository.findOneBy({ id });
  appAssert(birdFamily, NOT_FOUND, MessageConstant.BIRD_FAMILY_NOT_FOUND);

  const birdOrder = await birdOrderRepository.findOneBy({ id: orderId });
  appAssert(birdOrder, NOT_FOUND, MessageConstant.BIRD_ORDER_NOT_FOUND);

  birdFamily.name = name;
  birdFamily.birdOrder = birdOrder;

  return birdFamilyRepository.save(birdFamily);
};

export const deleteBirdFamily = async (id: string) => {
  const birdFamily = await birdFamilyRepository.findOneBy({ id });
  appAssert(birdFamily, NOT_FOUND, MessageConstant.BIRD_FAMILY_NOT_FOUND);

  return await birdFamilyRepository.remove(birdFamily);
};
export const totalFamily = async () => {
  return await birdFamilyRepository.count();
};
export const getTotalFamiliesByOrderId = async (orderId: string) => {
  const birdOrder = await birdOrderRepository.findOneBy({ id: orderId });
  appAssert(birdOrder, NOT_FOUND, MessageConstant.BIRD_ORDER_NOT_FOUND);

  const families = await birdFamilyRepository.find({
    where: {
      birdOrder: { id: orderId },
    },
    select: ["id", "name"],
  });

  return {
    total: families.length,
    birdOrderName: birdOrder.name,
  };
};
export const getFamiliesWithSpecies = async () => {
  const families = await birdFamilyRepository.find({
    relations: ["birdSpecies"],
  });

  const response = families.map((family) => ({
    id: family.id,
    name: family.name,
    speciesCount: family.birdSpecies.length,
  }));

  return response;
};

