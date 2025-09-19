import { AppDataSource } from "../database/datasource";

export const countBirdInfomation = async () => {
	return await AppDataSource.query(`select 
	(select count(*) from bird_order bo where bo.deleted_at IS NULL) as count_order,
	(select count(*) from bird_family bf where bf.deleted_at IS NULL) as count_family,
	(select count(*) from bird_species bs where bs.deleted_at IS NULL) as count_species`);
}