import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BirdOrder } from "./birdOrder.model";
import { AbstractEntity } from "./abstractEntity.model";
import { ImageBird } from "./birdImage.model";
import { BirdSpecies } from "./birdSpecies.model ";


@Entity("bird_family")
export class BirdFamily extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({type: "varchar", nullable: false})
    name: string;
    
    @ManyToOne(() => BirdOrder, {nullable: false})
    @JoinColumn({name: "order_id"})
    birdOrder: BirdOrder;

    @OneToMany(() => BirdSpecies, (imageBird) => imageBird.birdFamily)
    birdSpecies: BirdSpecies[];
}
