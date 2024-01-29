import path from 'path';
import { promises as fs } from 'fs';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { ensureMarkedInstance } from '@/lib/services/markedService';
import { readFile } from '@/lib/services/fsService';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

async function parseProject(fileName, options = { content: true }) {
  const fileContents = await readFile(fileName);

  const project = matter(fileContents, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
  });

  if (options.content) {
    const marked = ensureMarkedInstance();
    project.content = marked.parse(project.content) || '';
  } else {
    delete project.content;
  }

  project.id = fileName.replace('.md', '');

  return project;
}

export async function getProjects(options = { content: true, limit: 0 }) {
  const fileNames = (await fs.readdir(projectsDirectory).catch(() => [])).reverse();

  const projects = await Promise.all(fileNames.map(async (fileName) => await parseProject(fileName, options)));

  projects.sort((a, b) => {
    if (a.data.startDate > b.data.startDate) return -1;
    if (a.data.startDate < b.data.startDate) return 1;
    return 0;
  });

  if (options.limit > 0) {
    return projects.slice(0, options.limit);
  }

  return projects;
}

export async function getProjectIds() {
  const fileNames = await fs.readdir(projectsDirectory).catch(() => []);

  return fileNames.map((fileName) => fileName.replace('.md', ''));
}

export async function getProject(projectId, options = { content: true }) {
  const fileName = `${projectId}.md`;
  const project = await parseProject(fileName, options);

  return {
    ...project,
    ...project.data,
    content: project.content,
  };
}
