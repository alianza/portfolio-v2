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
This project was a rework of my original personal portfolio website which was built using vanilla JavaScript (No Frameworks) which served as introduction to me as a professional software engineer and as a person. The original portfolio website was not so easy to maintain and adding new projects to is was a chore. Taking inspiration from other projects I've completed since and the tech-stacks I've used there I decided to use a similar stack to realize version 2 of my personal portfolio website.

I decided that the website should have very good performance, editing contant should be easy and accessible and it should support many convenient features like custom widgets in the content editor, preview mode in the CMS, high compatibility and support for modern features such as dark mode, static site generation and smooth animations.

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

To enhance the user experience the application also works as a native app and is installable on the users device (Progressive Web Application). The app also has a simple and easy to use user interface fully styled with TailwindCSS. No UI libraries were used. Though I used my own [`react-transition-scroll`](https://www.jwvbremen.nl/projects/2022-09-11_react-transition-scroll-library) library for adding pleasant animations when elements are scrolled into the viewport.

Most effort though has been put into the Developer Experience as the code has been written as modularly and readable as possible. I have not opted to use TypeScript since the benefits don't outweigh the disatvantages to me as using JavaScript with JSDoc annotations got me 90% there. I personally really enjoy working in this (type of) codebase.

- - -

## Additional Libraries

* [nextjs-progressbar](https://www.npmjs.com/package/nextjs-progressbar)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [react-transition-scroll](https://www.npmjs.com/package/react-transition-scroll)
* [react-generic-table](https://www.npmjs.com/package/react-generic-table)
* [react-toastify](https://www.npmjs.com/package/react-toastify)
* [heroicons](https://github.com/tailwindlabs/heroicons)
* [next-pwa](https://www.npmjs.com/package/next-pwa)

- - -

## Lighthouse Audit Score ![icon](/assets/lighthouse.png)

![Lighthouse Audit Score](/assets/lighthouse_portfolio-v2.png "Lighthouse Audit Score")

- - -

<details >
<summary>Code Snippets</summary>
<div>

The following are some code snippets of front and back-end code for the skateboarding tricks tracker web application that are powerful, demonstrate good coding practices and that I'm proud of. The snippets demonstrate clean, concise and powerful code. *(Code has been compacted in some cases).*

**Dashboard.jsx page**\
This code snippet demonstrates the Dashboard page code. The dashboard page features 4 tables where all the saved tricks for each type of trick (Flatground, Grind, Manual and Combo's) of the current logged in user are displayed. The page uses client-side fetching to retrieve the data to fill the tables with. The tables are from my react component library [`react-generic-table`](https://www.npmjs.com/package/react-generic-table). Also the delete action in handled in the component since it requires firing an Api call to the back-end of the application.

```jsx

```

**\[_id].js flatgroundTricks Api endpoint**\
This file resides in the Api folder of the application causing it to be treated as a back-end endpoint by the Next.js framework. This endpoint is responsible for handling functionality surrounding individual flatground tricks where the id is a query parameter in the url. This endpoint handles the retrieval of an individual flatground trick, updating the data of an existing flatground trick and deleting an existing flatground trick. There are checks in place for verifying the supplied ObjectId in the url, ensuring authentication and handlers for if a flatground trick cannot be found which communicates descriptive errors to the front-end.

```javascript

```

**FlatgroundTrick.js Mongoose Model**\
This file is the Mongoose Data Model for the Flatground Trick documents. Each flatground trick contains the properties to describe the trick itself (trick name, stance, direction and rotation), and some properties to identify the associated user (preferred stance and user id). Also there are some custom validators to ensure some business logic on the server-side as well as to make sure no duplicate tricks are created a unique index is created on each field including userId so across users duplicate tricks can be created.

```javascript

```

**ServerUtils.js File**\
This file contains a collection of server-side oriented functions used throughout the back-end of the application. Like checking if a trick is used in an existing Combo, keeping it from being able to be deleted. Or requiring authentication to access a server-side resource and immediately supplying a query to make sure only user owned documents are retrieved. As wel as additional wrapper functions around the MongoDB querying methods aiding in retrieving certain document types and facilitating data serialization in order to allow documents to be used for statically pre-rendering web pages.

```javascript

```

**FlatgroundTrickForm.jsx File**\
This file contains the form responsible for creating new flatground tricks and editing existing flatground tricks. The same form is used for both functionalities ensuring the same interface is always displayed ensuring user experience consistency and improving maintainability.

```jsx

```

</div>
</details>

- - -

### Check out the project!

[<button>![icon](/assets/github.png) GitHub</button>](https://github.com/alianza/portfolio-v2)
[<button>![icon](/assets/portfolio-v2.png) Check out the site!</button>](https://jwvbremen.nl/)
[<button>![icon](/assets/lighthouse.png) Lighthouse Audit</button>](/assets/lighthouse_portfolio-v2.html)

- - -
