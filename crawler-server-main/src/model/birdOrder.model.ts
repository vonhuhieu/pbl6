import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./abstractEntity.model";
import { BirdFamily } from "./birdFamily.model";

@Entity("bird_order")
export class BirdOrder extends AbstractEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @OneToMany(() => BirdFamily, (birdFamily) => birdFamily.birdOrder)
  birdFamilies: BirdFamily[];

  @Column({ type: "varchar", nullable: true })
  imageUrl: string;
  
  @Column({ type: "varchar", nullable: true })
  description: string;
}
