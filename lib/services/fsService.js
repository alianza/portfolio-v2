import path from 'path';
import { promises as fs } from 'fs';

export async function readFile(fileName) {
  const filePath = path.join(projectsDirectory, fileName);
  return await fs.readFile(filePath, 'utf8');
}
