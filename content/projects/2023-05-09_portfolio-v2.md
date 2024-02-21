---
title: Portfolio v2
startDate: 2023-05-09
endDate: 2023-07-09
thumbnail: /assets/portfolio-v2.png
type: Personal
description: This project is a rework of my original personal portfolio website
  reimagined with a more modern and robust stack featuring a CMS and static site
  generation resulting much better performance and a way smoother user and
  administrative experience!
---
This project was a rework of my original personal portfolio website which was built using vanilla JavaScript (No Frameworks) which served as introduction to me as a professional software engineer and as a person. The original portfolio website was not so easy to maintain and adding new projects to it was a chore. Taking inspiration from other projects I've completed since and the tech-stacks I've used there I decided to use a similar stack to realize version 2 of my personal portfolio website.

I decided that the website should have very good performance, editing contant should be easy and accessible, and it should support many convenience features like custom widgets in the content editor, preview mode in the CMS, high compatibility and support for modern features such as dark mode, static site generation and smooth animations.

- - -

## Technologies & Frameworks

<ul class="icon-list">
<li>Next.js <a href="https://nextjs.org/"><img src="/assets/nextjs.png" alt="icon"></a></li>
<li>TailwindCSS <a href="https://tailwindcss.com/"><img src="/assets/tailwindcss.png" alt="icon"></a></li>
<li>Node.js <a href="https://nodejs.org/en"><img src="/assets/nodejs.png" alt="icon"></a></li>
<li>Sass <a href="https://sass-lang.com/"><img src="/assets/sass.png" alt="icon"></a></li>
<li>GitHub <a href="https://github.com/"><img src="/assets/github.png" alt="icon"></a></li>
<li>Netlify <a href="https://www.netlify.com/"><img src="/assets/netlify.png" alt="icon"></a></li>
<li>Markdown <a href="https://www.markdownguide.org/"><img src="/assets/markdown.png" alt="icon"></a></li>
<li>Decap CMS <a href="https://decapcms.org/"><img src="/assets/decapcms.png" alt="icon"></a></li>
</ul>

- - -

## Screens

<div class="images-grid">
<img src="/assets/portfolio-v2_1.png" />
<img src="/assets/portfolio-v2_2.png" />
<img src="/assets/portfolio-v2_3.png" />
<img src="/assets/portfolio-v2_4.png" />
<img src="/assets/portfolio-v2_5.png" />
<img src="/assets/portfolio-v2_6.png" />
</div>

- - -

## Summary

The goal of this project was to rework my personal portfolio website to be more modern and robust. I wanted to use a modern tech-stack to facilitate a better user experience and a better administrative experience. I decided to use Next.js for the front-end and TailwindCSS for the styling. I also decided to use a CMS to facilitate easy content editing and to support modern features like dark mode and static site generation. I chose Decap CMS for this purpose. I also wanted to make sure the website was hosted on a platform that supported modern features and had good performance. I chose Netlify for this purpose. The website is now much easier to maintain and adding new projects to it is a breeze.

- - -

## Additional Libraries

* [nextjs-progressbar](https://www.npmjs.com/package/nextjs-progressbar)
* [gray-matter](https://www.npmjs.com/package/gray-matter)
* [js-yaml](https://www.npmjs.com/package/js-yaml)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [react-transition-scroll](https://www.npmjs.com/package/react-transition-scroll)
* [marked](https://www.npmjs.com/package/marked)
* [marked-highlight](https://www.npmjs.com/package/marked-highlight)
* [prettier](https://www.npmjs.com/package/prettier)
* [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss)
* [prop-types](https://www.npmjs.com/package/prop-types)

- - -

## Lighthouse Audit Score ![icon](/assets/lighthouse.png)

![Lighthouse Audit Score](/assets/lighthouse_portfolio-v2.png "Lighthouse Audit Score")

- - -

<details >
<summary>Code Snippets</summary>
<div>

The following are some code snippets of front and back-end code for the skateboarding tricks tracker web application that are powerful, demonstrate good coding practices and that I'm proud of. The snippets demonstrate clean, concise and powerful code. *(Code has been compacted in some cases).*

**Index.jsx page**\
The code snippet below demonstrates the home index page of the website. It uses the `getStaticProps` function to fetch the projects and intros from the CMS through the filesystem services and then passes them as props to the `Home` component. The \`Home\` component then renders the appropriate components to display the application.

```jsx
export async function getStaticProps() {
  const projects = await getProjects({ content: false });
  const intros = await getIntros();

  return {
    props: {
      projects,
      intros,
    },
  };
}

function Home({ projects, intros }) {
  useNetlifyIdentityRedirect();

  return (
    <>
      <CoverVideo />

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-12 p-4 sm:px-12">
        <section className="w-full">
          <AboutMe intros={intros} />
        </section>

        <section className="w-full">
          <Projects projects={projects} />
        </section>

        <section className="w-full">
          <Contact />
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page) => <Layout>{page}</Layout>;
```

**ProjectsService.jsx File**
The code snippet below demonstrates the back-end code for the projects service. It uses the `fs` and `gray-matter` libraries to read the project markdown files from the file system and parse them into JavaScript objects. 

The projects service contains functions for fetching all projects, fetching a single project by id and fetching all project ids. The `getProjects` function fetches all projects and sorts them by start date. The `getProjectIds` function fetches all project ids and the `getProject` function fetches a single project by id.

```jsx
const projectsUri = path.join(process.cwd(), 'content/projects');

async function parseProject(fileName, options = { content: true }) {
  const fileContents = await readFile(fileName, projectsUri);

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
  const fileNames = (await fs.readdir(projectsUri).catch(() => [])).reverse();

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
  const fileNames = await fs.readdir(projectsUri).catch(() => []);
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
```

**MdContent.jsx Component**
The code snippet below demonstrates the `MdContent` component which is used to render the markdown content of the website. It uses a number of custom hooks to listen for dark mode changes, animate the tags, zoom images, handle external links, highlight code, update the last updated GitHub repository date and resolves the years since date tags. It then renders the markdown content using the `dangerouslySetInnerHTML` prop.

```jsx
const MdContent = ({ content: { title, date, startDate, endDate, thumbnail, content }, noDate }) => {
  const darkMode = useDarkMode();
  useDetailTagsAnimation(contentId);
  useImageZoom(contentId);
  useExternalLinks(contentId);
  useCodeHighlightStyles(darkMode);
  useGithubLastUpdated(contentId);
  useYearsSinceDateTags();

  if (!content) {
    content = `<h1>Article for ${title} not written yet...</h1>
    <p>Check back later!</p>`;
  }

  return (
    <article className={contentStyles.content}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className={contentStyles.mainTitle}>{title}</h1>
      </div>
      <div className={contentStyles.metaData}>
        {!noDate && date && <time className="m-0">{date}</time>}
        {startDate && <StartEndDateLabel startDate={startDate} endDate={endDate} />}
      </div>
      {thumbnail && (
        <Image
          width={700}
          height={700}
          className={contentStyles.thumbnail}
          alt={`${title} thumbnail`}
          src={thumbnail}
          placeholder="blur"
          blurDataURL={`/_next/image?url=${thumbnail}&w=16&q=1`}
        />
      )}
      <div id={contentId} className={contentStyles.markdown} dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};
```

**Decap CMS Configuration File**
The code snippet below demonstrates the configuration file for the Decap CMS. It configures a number of properties to facilitate correct CMS configuration such as the backend, the site url, the display url, the media folder, the public folder, the publishing mode, the logo url and the collections.

The collections property is an array of objects that represent the collections in the CMS. Each collection object has a name, a label, a delete property, an editor object and a files array. The files array contains objects that represent the files in the collection. Each file object has a name, a label, a file, a description and a fields array. The fields array contains objects that represent the fields in the file. Each field object has a label, a name, a widget and other properties. Together they represent the fields in the file and so the properties of the objects in the collection.

The `local_backend` property is set to the value of the `CMS_LOCAL_BACKEND` environment variable or `false` if the environment variable is not set. This property is used to determine if the CMS should use a local backend or not during development.

```yaml

backend:
  name: git-gateway
  branch: main
  repo: alianza/portfolio-v2

local_backend: ${CMS_LOCAL_BACKEND:-false}
site_url: https://jwvbremen.nl/
display_url: https://jwvbremen.nl/
media_folder: public/assets
public_folder: /assets
publish_mode: editorial_workflow
logo_url: https://jwvbremen.nl/admin/cms_img.jpg

collections:
  - name: "config"
    label: "Config"
    delete: false
    editor:
      preview: false
    files:
      - name: "config"
        label: "Site Config"
        file: "content/config.json"
        description: "General site settings"
        fields:
          - { label: "Site heading", name: "siteHeading", widget: "string" }
          - { label: "Site title", name: "siteTitle", widget: "string", hint: "The title of the site (Also tab bar)" }
          - { label: "Site description", name: "siteDescription", widget: "text", hint: "Used for meta description" }
          - label: "Online accounts"
            name: "accounts"
            label_singular: "Online account"
            widget: "list"
            summary: "{{fields.name}}"
            fields:
              - { label: "Social media name", name: "name", widget: "string" }
              - { label: "Url", name: "url", widget: "string" }
              - { label: "Icon", name: "icon", widget: "image", required: false }
          - label: 'Introductions'
            name: 'introductions'
            label_singular: 'Introduction'
            widget: 'list'
            allow_add: false
            min: 3
            max: 3
            summary: '{{fields.title}}'
            fields:
              - { label: 'Title', name: 'title', widget: 'string' }
              - { label: 'Media', name: 'media', widget: 'image' }
              - { label: 'Body', name: 'body', widget: 'markdown', editor_components: ['years-since-date'] }

  - label: 'Projects'
    name: 'projects'
    label_singular: 'Project'
    folder: 'content/projects'
    create: true
    slug: '{{startDate}}_{{slug}}'
    fields:
      - { label: 'Title', name: 'title', widget: 'string' }
      - { label: 'Start Date', name: 'startDate', widget: 'datetime', format: "YYYY-MM-DD", date_format: "YYYY-MM-DD", time_format: false }
      - { label: 'End Date', name: 'endDate', widget: 'datetime', format: "YYYY-MM-DD", date_format: "YYYY-MM-DD", time_format: false, required: false, default: "", hint: "Leave empty if still working (present)" }
      - { label: 'Featured Image', name: 'thumbnail', widget: 'image' }
      - { label: 'Type', name: 'type', widget: 'select', options: ['Personal', 'Professional', "Academic"], default: 'Professional', required: false }
      - { label: 'Description', name: 'description', widget: 'text', required: false }
      - { label: 'Body', name: 'body', widget: 'markdown', required: false }


```

</div>
</details>

- - -

### Check out the project!

[<button>![icon](/assets/github.png) GitHub</button>](https://github.com/alianza/portfolio-v2)
[<button>![icon](/assets/portfolio-v2.png) Check out the site!</button>](https://jwvbremen.nl/)
[<button>![icon](/assets/lighthouse.png) Lighthouse Audit</button>](/assets/lighthouse_portfolio-v2.html)

- - -
