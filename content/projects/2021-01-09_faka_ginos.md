---
title: Team Rockstars IT
startDate: 2021-03-10
endDate: 2021-03-25
thumbnail: /assets/hubble_ultra_deep_field.jpg
description: Faka My first real cool job at a real company making bog moneys adrerie.
---
a [React Component](https://react.dev/learn/your-first-component) exported from a `.js`, `.jsx`, `.ts`, or `.tsx` file in the `pages` directory. Each page is associated with a route based on its file name.

**Example**: If you create `pages/about.js` that exports a React component like below, it will be accessible at `/about`.

## [Index routes](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#index-routes)

The router will automatically route files named `index` to the root of the directory.

* `pages/index.js` → `/`
* `pages/blog/index.js` → `/blog`

## [Nested routes](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#nested-routes)

The router supports nested files. If you create a nested folder structure, files will automatically be routed in the same way still.

* `pages/blog/first-post.js` → `/blog/first-post`
* `pages/dashboard/settings/username.js` → `/dashboard/settings/username`

## [Pages with Dynamic Routes](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#pages-with-dynamic-routes)

Next.js supports pages with dynamic routes. For example, if you create a file called `pages/posts/[id].js`, then it will be accessible at `posts/1`, `posts/2`, etc.

> To learn more about dynamic routing, check the [Dynamic Routing documentation](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes).

## [Layout Pattern](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#layout-pattern)

The React model allows us to deconstruct a [page](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts) into a series of components. Many of these components are often reused between pages. For example, you might have the same navigation bar and footer on every page.

components/layout.js

## [Examples](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#examples)

### [Single Shared Layout with Custom App](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#single-shared-layout-with-custom-app)

If you only have one layout for your entire application, you can create a [Custom App](https://nextjs.org/docs/pages/building-your-application/routing/custom-app) and wrap your application with the layout. Since the `<Layout />` component is re-used when changing pages, its component state will be preserved (e.g. input values).

pages/_app.js

### [Per-Page Layouts](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#per-page-layouts)

If you need multiple layouts, you can add a property `getLayout` to your page, allowing you to return a React component for the layout. This allows you to define the layout on a *per-page basis*. Since we're returning a function, we can have complex nested layouts if desired.

pages/index.js

pages/_app.js

When navigating between pages, we want to *persist* page state (input values, scroll position, etc.) for a Single-Page Application (SPA) experience.

This layout pattern enables state persistence because the React component tree is maintained between page transitions. With the component tree, React can understand which elements have changed to preserve state.

> **Note**: This process is called [reconciliation](https://react.dev/learn/preserving-and-resetting-state), which is how React understands which elements have changed.

### [With TypeScript as you should](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript)

When using TypeScript, you must first create a new type for your pages which includes a `getLayout` function. Then, you must create a new type for your `AppProps` which overrides the `Component` property to use the previously created type.

pages/index.tsx

pages/_app.tsx

```javascript
 if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
```

### [Data Fetching](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#data-fetching)

Inside your layout, you can fetch data on the client-side using `useEffect` or a library like [SWR](https://swr.vercel.app/). Because this file is not a [Page](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts), you cannot use `getStaticProps` or `getServerSideProps` currently.

components/layout.js g

<details>
<summary>Expand me!</summary>
<div>

# Hello!

```javascript
 if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
```









</div>
</details>

Hello, loose image:

![Faka](/assets/schermafbeelding-2023-05-15-165328.png "Title")

<div class="images-grid">
<img src="/assets/schermafbeelding-2023-05-09-130751.png" />
<img src="/assets/hubble_ultra_deep_field.jpg" />
<img src="/assets/schermafbeelding-2023-05-09-144144.png" />
</div>

<video playsinline controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></video>