import path from 'path';
import { promises as fs } from 'fs';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { ensureMarkedInstance } from '@/lib/services/markedService';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

async function parseProject(fileName) {
  const filePath = path.join(projectsDirectory, fileName);
  const fileContents = await fs.readFile(filePath, 'utf8');

  const project = await matter(fileContents, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
  });

  const marked = ensureMarkedInstance();

  project.content = marked.parse(project.content);
  project.id = fileName.replace('.md', '');

  return project;
}

export async function getProjects() {
  const fileNames = await fs.readdir(projectsDirectory).catch(() => []);

  return await Promise.all(fileNames.map(async (fileName) => await parseProject(fileName)).reverse());
}

export async function getProject(projectId) {
  const fileName = `${projectId}.md`;
  const project = await parseProject(fileName);

  return {
    ...project,
    ...project.data,
    content: project.content,
  };
}

export async function getProjectIds() {
  const fileNames = await fs.readdir(projectsDirectory).catch(() => []);

  return fileNames.map((fileName) => fileName.replace('.md', ''));
}
