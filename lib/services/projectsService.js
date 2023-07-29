import path from 'path';
import { promises as fs } from 'fs';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { ensureMarkedInstance } from '@/lib/services/markedService';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

async function parseProject(fileName, options = { content: true }) {
  // options = setDefaultOptions({ content: true }, options);
  const fileContents = await readProject(fileName);

  const project = matter(fileContents, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
  });

  if (options.content) {
    const marked = ensureMarkedInstance();
    project.content = marked.parse(project.content);
  } else {
    delete project.content;
  }

  project.id = fileName.replace('.md', '');

  return project;
}

function setDefaultOptions(defaultOptions, options) {
  return Object.assign(defaultOptions, options);
}

export async function getProjects(options = { content: true, limit: 0 }) {
  // options = setDefaultOptions({ content: true, limit: 0 }, options);

  const fileNames = (await fs.readdir(projectsDirectory).catch(() => [])).reverse();

  const projects = await Promise.all(fileNames.map(async (fileName) => await parseProject(fileName, options)));

  projects.sort((a, b) => new Date(a.data.startDate) + new Date(b.data.startDate));

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

async function readProject(fileName) {
  const filePath = path.join(projectsDirectory, fileName);
  return await fs.readFile(filePath, 'utf8');
}
