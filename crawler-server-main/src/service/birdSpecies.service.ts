import { IsNull, Not, ILike } from "typeorm";
import { NOT_FOUND } from "../constants/http";
import { MessageConstant } from "../constants/messageConstant";
import { AppDataSource } from "../database/datasource";
import { BirdFamily } from "../model/birdFamily.model";
import { BirdOrder } from "../model/birdOrder.model";
import { BirdSpecies } from "../model/birdSpecies.model ";
import appAssert from "../utils/appAssert";

const birdSpeciesRepository = AppDataSource.getRepository(BirdSpecies);
const birdFamilyRepository = AppDataSource.getRepository(BirdFamily);
const birdOrderRepository = AppDataSource.getRepository(BirdOrder);

export const getListBirdSpecies = async (familyId: string) => {
  const birdFamily = await birdFamilyRepository.findOneBy({ id: familyId });
  appAssert(birdFamily, NOT_FOUND, MessageConstant.BIRD_FAMILY_NOT_FOUND);

  return await birdSpeciesRepository.find({
    where: { birdFamily: { id: familyId }, deletedAt: IsNull() },
  });
};

export const createBirdSpecies = async (
  familyId: string,
  data: Partial<BirdSpecies>
) => {
  const birdFamily = await birdFamilyRepository.findOneBy({
    id: familyId,
  });
  console.log("birdFamiliesdw", birdFamily, "id", data.birdFamily?.id);
  appAssert(birdFamily, NOT_FOUND, MessageConstant.BIRD_FAMILY_NOT_FOUND);

  const newBirdSpecies = birdSpeciesRepository.create({
    ...data,
    birdFamily: birdFamily,
  });
  console.log("birdnew", newBirdSpecies);
  return await birdSpeciesRepository.save(newBirdSpecies);
};

export const getBirdSpeciesById = async (id: string) => {
  const birdSpecies = await birdSpeciesRepository.findOneBy({ id });
  console.log("birdSpecies123124", birdSpecies);
  appAssert(birdSpecies, NOT_FOUND, MessageConstant.BIRD_SPECIES_NOT_FOUND);

  return birdSpecies;
};

export const updateBirdSpecies = async (
  id: string,
  data: Partial<BirdSpecies>
) => {
  const birdSpecies = await birdSpeciesRepository.findOneBy({ id });
  appAssert(birdSpecies, NOT_FOUND, MessageConstant.BIRD_SPECIES_NOT_FOUND);

  if (data.birdFamily) {
    const birdFamily = await birdFamilyRepository.findOneBy({
      id: data.birdFamily.id,
    });
    appAssert(birdFamily, NOT_FOUND, MessageConstant.BIRD_FAMILY_NOT_FOUND);
    birdSpecies.birdFamily = birdFamily;
  }

  Object.assign(birdSpecies, data);
  return await birdSpeciesRepository.save(birdSpecies);
};

export const deleteBirdSpecies = async (id: string) => {
  const birdSpecies = await birdSpeciesRepository.findOneBy({ id });
  appAssert(birdSpecies, NOT_FOUND, MessageConstant.BIRD_SPECIES_NOT_FOUND);

  return await birdSpeciesRepository.remove(birdSpecies);
};
export const getRandomBirdSpeciesFromDifferentFamilies = async (
  speciesId: string
) => {
  const birdSpecies = await birdSpeciesRepository.findOne({
    where: { id: speciesId },
    relations: ["birdFamily"],
  });

  appAssert(birdSpecies, NOT_FOUND, MessageConstant.BIRD_SPECIES_NOT_FOUND);

  const similarSpecies = await birdSpeciesRepository.find({
    where: {
      birdFamily: { id: birdSpecies.birdFamily.id },
      id: Not(speciesId),
    },
  });

  const randomSpecies = similarSpecies
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  return randomSpecies;
};
export const totalSpecies = async () => {
  return await birdSpeciesRepository.count();
};
export const getTotalSpeciesPerFamilyId = async (familyId: string) => {
  const birdFamily = await birdFamilyRepository.findOneBy({ id: familyId });
  appAssert(birdFamily, NOT_FOUND, MessageConstant.BIRD_FAMILY_NOT_FOUND);

  const speciesCount = await birdSpeciesRepository.count({
    where: {
      birdFamily: { id: familyId },
    },
  });

  return {
    total: speciesCount,
    birdFamilyName: birdFamily.name,
  };
};

export const getBirdSpeciesByName = async (name: string) => {
  const species = await birdSpeciesRepository.find({
    where: {
      name: ILike(`%${name}%`),
      deletedAt: IsNull(),
    },
    relations: ["imageBirds"],
  });

  appAssert(
    species && species.length > 0,
    NOT_FOUND,
    MessageConstant.BIRD_SPECIES_NOT_FOUND
  );

  return species;
};