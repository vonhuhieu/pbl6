import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BirdSpecies } from "./birdSpecies.model ";
import { AbstractEntity } from "./abstractEntity.model";

@Entity("bird_image")
export class ImageBird extends AbstractEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "text", nullable: false})
    url: string;

    @ManyToOne(() => BirdSpecies, {nullable: false})
    @JoinColumn({name: "species_id"})
    birdSpecies: BirdSpecies;
}