import { AppDataSource } from '../database/datasource';
import fs from 'fs';
import csv from 'csv-parser';
import { BirdSpecies } from '../model/birdSpecies.model ';
import { ImageBird } from '../model/birdImage.model';

function normalizeName(name: string) {
  return name.replace(/[_\s]/g, '').toLowerCase();
}

export const importFromCsv = () => {
  const birdSpeciesRepository = AppDataSource.getRepository(BirdSpecies);
  const imageBirdRepository = AppDataSource.getRepository(ImageBird);
  fs.createReadStream('./filtered_bird_data.csv')
    .pipe(csv())
    .on('data', async (row: any) => {
      const speciesName = normalizeName(row['Species Name']);
      const imageUrl = row['Image URL'];
      try {
        let birdSpecies = await birdSpeciesRepository
          .createQueryBuilder('birdSpecies')
          .where("LOWER(REPLACE(birdSpecies.name, ' ', '')) = :name", { name: speciesName })
          .getOne();
        if (birdSpecies) {

        const imageBird = imageBirdRepository.create({
          url: imageUrl,
          birdSpecies: birdSpecies,
        });

        await imageBirdRepository.save(imageBird);

        console.log(`Inserted image for species ${speciesName}`);
      }
      } catch (err) {
        console.error('Error inserting data:', err);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
};
