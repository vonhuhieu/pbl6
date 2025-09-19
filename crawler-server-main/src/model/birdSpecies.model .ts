import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BirdFamily } from "./birdFamily.model";
import { AbstractEntity } from "./abstractEntity.model";
import { ImageBird } from "./birdImage.model";

@Entity("bird_species")
export class BirdSpecies extends AbstractEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @ManyToOne(() => BirdFamily, {nullable: true})
  @JoinColumn({name: "family_id"})
  birdFamily: BirdFamily;
  
  @OneToMany(() => ImageBird, (imageBird) => imageBird.birdSpecies)
  imageBirds: ImageBird[];

  @Column({ type: "varchar", nullable: true })
  lifespan: string;
  @Column({ type: "varchar", nullable: true })
  size: string;
  @Column({ type: "varchar", nullable: true })
  imageUrl: string;
  @Column({ type: "varchar", nullable: true })
  description: string;
  @Column({ type: "varchar", nullable: true })
  color: string;
  @Column({ type: "varchar", nullable: true })
  weight: string;
  @Column({ type: "varchar", nullable: true })
  population: string;
  @Column({ type: "varchar", nullable: true })
  offspring: string;
  @Column({ type: "varchar", nullable: true })
  region: string;
}
