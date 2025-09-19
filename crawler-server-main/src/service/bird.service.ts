import { countBirdInfomation } from "../repository/bird.repository"

export const countInfomation = async () => {
    const  result = await countBirdInfomation();

    return {
        countOrder: result[0].count_order,
        countFamily: result[0].count_family,
        countSpecies: result[0].count_species
    }
}