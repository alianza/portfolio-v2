import path from 'path';
import { promises as fs } from 'fs';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { marked } from 'marked';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export async function getProjects() {
  const fileNames = await fs.readdir(projectsDirectory).catch(() => []);

  return await Promise.all(
    fileNames
      .map(async (fileName) => {
        const fileContents = await fs.readFile(path.join(projectsDirectory, fileName), 'utf8');
        const project = await matter(fileContents, {
          engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
        });
        project.content = marked.parse(project.content);

        return {
          id: fileName.replace('.md', ''),
          ...project,
        };
      })
      .reverse()
  );
}

export async function getProject(projectId) {
  const filePath = path.join(projectsDirectory, `${projectId}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const project = matter(fileContents, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
  });
  project.content = marked.parse(project.content);

  return {
    id: projectId,
    ...project.data,
    content: project.content,
  };
}
