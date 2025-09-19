import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { BirdOrder } from "../model/birdOrder.model";
import { BirdFamily } from "../model/birdFamily.model";
import { BirdSpecies } from "../model/birdSpecies.model ";
import { ImageBird } from "../model/birdImage.model";
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } from "../constants/env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: true,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  // entities: [__dirname + "/**/*.entity.{ts,js}"],
  namingStrategy: new SnakeNamingStrategy(),
  entities: [BirdOrder, BirdFamily, BirdSpecies, ImageBird],
  migrations: [],
  subscribers: [],
});
