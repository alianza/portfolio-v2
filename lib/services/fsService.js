import path from 'path';
import { promises as fs } from 'fs';

export async function readFile(fileName, uri) {
  const filePath = path.join(uri, fileName);
  return await fs.readFile(filePath, 'utf8');
}
