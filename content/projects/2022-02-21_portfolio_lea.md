---
title: Portfolio Lea Shamaa
startDate: 2022-02-21
endDate: 2022-6-21
thumbnail: /assets/portfolio_lea.png
type: Personal
description: This project is a portfolio website for Lea Shamaa aimed at aiding
  her Journalistic career. The website features blog articles, portfolio items
  and past experiences. The website also has a contact form and about page. The
  project was made using Next.js & DecapCMS. The front-end features animations,
  effects, static rendering and dark-mode. On the back-end CMS the content of
  the website can be altered and added to.
---
As I was looking for new personal projects to pursue and my girlfriend was entering the journalistic world and needed an online presence where she could show-off her past experiences and projects. Much like the personal portfolio website you are reading this on right now but then in the context of journalism instead of software engineering.

The website needed be easy to manage in terms of adding new content, articles and basic customization. I continued to build on my go-to tech stack which includes Next.js as full-stack framework and DecapCMS (Formerly NetlfyCMS) as content management system hosted on Netlify. All styling was done using TailwindCSS and TailwindCSS Prose for the article styling. Content is saved from the CMS directly into the repository through automatic Pull-Requests after which new builds are triggered through Continuous Integration with Netlify as well as preview deployments for Drafted changes in the CMS.

- - -

## Technologies & Frameworks

<ul class="icon-list">
<li>Next.js <a href="https://nextjs.org/"><img src="/assets/nextjs.png" alt="icon"></a></li>
<li>TailwindCSS <a href="https://tailwindcss.com/"><img src="/assets/tailwindcss.png" alt="icon"></a></li>
<li>DecapCMS (Formerly Netlify CMS) <a href="https://decapcms.org/"><img src="/assets/decapcms.png" alt="icon"></a></li>
<li>Node.js <a href="https://nodejs.org/en"><img src="/assets/nodejs.png" alt="icon"></a></li>
<li>Sass <a href="https://sass-lang.com/"><img src="/assets/sass.png" alt="icon"></a></li>
<li>GitHub <a href="https://github.com/"><img src="/assets/github.png" alt="icon"></a></li>
<li>Netlify <a href="https://www.netlify.com/"><img src="/assets/netlify.png" alt="icon"></a></li>
<li>Progressive Web App <a href="#"><img src="/assets/pwa.png" alt="icon"></a></li>
<li>Markdown <a href="https://www.markdownguide.org/"><img src="/assets/markdown.png" alt="icon"></a></li>
</ul>

- - -

## Screens

<div class="images-grid">
<img src="/assets/portfolio_lea_1.png" />
<img src="/assets/portfolio_lea_2.png" />
<img src="/assets/portfolio_lea_3.png" />
<img src="/assets/portfolio_lea_4.png" />
</div>

- - -

## Summary

The goal of this personal portfolio website is for Lea to be able to have an online presence where she can link to her past publications online, create articles for professional experiences she had and also have a more free-form blog section where she can freely create diverse articles and assign them to different categories. Finally the website should be a welcome point for potential clients that want to work with Lea.

The website has already generated traffic and some potential leads for Lea's journalistic ventures which is amazing to see!

- - -

## Lighthouse Audit Score ![icon](/assets/lighthouse.png)

![Lighthouse score](/assets/lighthouse_portfolio-lea.png "Lighthouse score")

Note: *I don't know why the performance score is low here. The desktop lighthouse test gets a perfect 100 on that metric but I can't seem to find the large contentful paint they're talking about...*

- - -

<details >
<summary>Code Snippets</summary>
<div>

The following are some code snippets of components and back-end code for the portfolio website that are powerful, demonstrate good coding practices and that I'm proud of. The snippets demonstrate clean, concise and powerful code. *(Code has been compacted in some cases).*

**Home index**\
This code snippet is the homepage of the website showing the 3 most recent items from the 3 types of posts on the site. It statically retrieves the experiences, posts, articles and additional config for the homepage such as labels & links at build time of the application. This way static HTML is served at all times improving time to first paint and SEO!

```jsx
export const getStaticProps = async () => {

  const experiences = (await getExperiences({ preview: true })).slice(0, 3)

  const posts = (await getPosts({ preview: true })).slice(0, 3)

  const articles = (await getAllArticles(config.usernameMedium)).slice(0, 3)

  const homeContent = await getPage("home")

  return {
    props: {
      homeContent,
      experiences,
      posts,
      articles
    },
    revalidate: 60,
  }
}

const Home = ({ homeContent, experiences, posts, articles }) => {
  useNetlifyIdentityRedirectHook()

  return (
    <>
      <TypeWriter quotes={homeContent.quotes}/>

      <div className={`${utils.page} flex flex-col gap-12`}>
        <HomePreviewCollection
          title={homeContent.portfolioTitle}
          label={homeContent.portfolioLabel}
          link="/portfolio"
          content={articles.map((article) => <ArticleHomePreview key={article.title} article={article}/>)}
        />
        <hr className="-mb-4 -mt-10 mobile:hidden"/>
        <HomePreviewCollection
          title={homeContent.blogTitle}
          label={homeContent.blogLabel}
          link="/blog"
          content={posts.map((post) => <PostHomePreview key={post.id} post={post}/>)}
        />
        <hr className="-mb-4 -mt-10 mobile:hidden"/>
        <HomePreviewCollection
          title={homeContent.experiencesTitle}
          label={homeContent.experiencesLabel}
          link="/experiences"
          content={experiences.map((experience) => <ExperienceHomePreview key={experience.id} experience={experience}/>)}
        />
      </div>
    </>
  )
}

Home.withLayout = (page) => <Layout>{page}</Layout>
```

**PostService.js File**\
This code snippet showcases the PostService.js file. This service is responsible for loading the blog posts from the file system (since all content is saved as markdown files in the repository itself) and parsing them during build time of the application to facilitate static site generation. Blog posts can have a category assigned to them which will show in the UI.

```javascript
const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function getPosts(options = {}) {
  const fileNames = await fs.readdir(postsDirectory).catch(() => []);

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const post = await parsePost(fileName);

      return {
        id: fileName.replace('.md', ''),
        ...post,
        ...(options.preview && { content: '' }),
      };
    }),
  );

  for (const post of posts) {
    post.data.category = await configService.getCategory(post.data.category);
  }

  posts.sort((a, b) => (new Date(a.data.date) < new Date(b.data.date) ? 1 : -1));

  return posts;
}

export async function getCategories() {
  const posts = await getPosts();

  const categories = []; // [{ name: "category", count: 0, posts: [{ name: "post", date: "date" }] }]

  for (const post of posts) {
    const category = await configService.getCategory(post.data.category.name);

    if (category && !categories.find((c) => c.name === category.name)) {
      const relevantPosts = posts.filter((p) => p.data.category.name === category.name);
      category.count = relevantPosts.length;
      category.posts = relevantPosts.map((post) => ({
        name: post.data.title,
        date: post.data.date,
      }));
      categories.push(category);
    }
  }

  // Add remaining (unused) categories
  for (let category of await configService.getCategories()) {
    if (!categories.find((c) => c.name === category.name)) {
      category.count = 0;
      categories.push(category);
    }
  }

  // sort categories by newest post
  categories.sort((a, b) => {
    const aLatestPost = a?.posts?.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    const bLatestPost = b?.posts?.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    const aDate = new Date(aLatestPost?.date).getTime() || 0;
    const bDate = new Date(bLatestPost?.date).getTime() || 0;
    return aDate + bDate;
  });

  return categories;
}

export async function getPostIds() {
  const fileNames = await fs.readdir(postsDirectory).catch(() => []);
  return fileNames.map((fileName) => ({ postId: fileName.replace('.md', '') }));
}

export async function getPostsByCategory(categoryName) {
  const posts = await getPosts();
  return posts.filter((post) => post.data.category.name === categoryName);
}

export async function getPost(postId) {
  const post = await parsePost(`${postId}.md`);

  return {
    id: postId,
    ...post.data,
    content: post.content,
    category: await configService.getCategory(post.data.category),
  };
}

const parsePost = async (fileName) => {
  const filePath = path.join(postsDirectory, fileName);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const post = matter(fileContents, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
  });
  post.content = marked.parse(post.content) || '';

  return {
    id: fileName.replace('.md', ''),
    ...post,
  };
};
```

**\[PostId].jsx File**\
This file is responsible for the pages of blog posts to be statically generated according to all post files present in the file system according to the *PostService.js* file shown previously. It generates a static path for every post and renders the markdown content retrieved from the Id of the post.

```jsx
export const getStaticPaths = async () => {

  const postIds = await getPostIds()

  return {
    paths: postIds.map(({ postId }) => ({ params: { postId } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {

  const post = await getPost(params.postId)

  return {
    props: {
      post,
    },
  }
}

const Post = ({ post }) => {
  return (
    <>
      <Head item={post}/>
      <div className={`${utils.page} max-w-screen-desktop`}>
        <MdContent content={post}/>
      </div>
    </>
  )
}

Post.withLayout = (page) => <Layout>{page}</Layout>

export default Post

```






</div>
</details>

- - -

### Check out the project!

[<button>![icon](/assets/github.png) GitHub</button>](https://github.com/alianza/portfolio-lea)
[<button>![icon](/assets/portfolio_lea.png) Check out the site!</button>](https://leashamaa.nl/)