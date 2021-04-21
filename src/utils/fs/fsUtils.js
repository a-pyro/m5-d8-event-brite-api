import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { readJSON, writeJSON, writeFile } = fs;

const allData = join(dirname(fileURLToPath(import.meta.url)), '../../data');

const productsFiles = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../public/img/products'
);

export const fetchAttendees = async () =>
  await readJSON(join(allData, 'attendees.json'));

export const writeAttendees = async (content) =>
  await writeJSON(join(allData, 'attendees.json'), content);
