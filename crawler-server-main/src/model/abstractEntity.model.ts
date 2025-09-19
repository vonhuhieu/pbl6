import {
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from "typeorm";
  
  export abstract class AbstractEntity {
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
  
    @DeleteDateColumn({
      type: "timestamp",
      nullable: true,
      default: null,
    })
    deletedAt?: Date;
  }
  