---
title: Skateboard Tricks Tracker
startDate: 2022-11-09
endDate: 2023-05-09
thumbnail: /assets/tricks.jwvbremen.nl.png
type: Personal
description: This projects demonstrates using authentication and an external
  database for a highly interactive progressive web application. It is a
  full-stack Next.js project featuring multiple pages, an Api with middleware
  and mutliple OAuth services to sign in with and persistent data in a NoSql
  database.
---
I wanted to take my personal projects to the next level as I'm starting to discover what general tech stack seems to suit me. Also using skills aquired during my project at Road.io (Formerly E-Flux) and implementing them to create a highly interactive progressive web application.

This project was a personal challenge and learning experience to build a full-stack web application in a domain I'm familiar with. The purpose of the application is for skateboarders to be able to track what tricks they've learned and log them in their personal dashboard. The goal was to gain experience building a full stack application featuring a rich and dynamic front-end with user Authentication and persisted storage with a Database powered by a back-end featuring an Api with all necessary endpoints to power the entire application. Firstly, to allow skateboarding tricks to be represented as data I had to dissect what components make up a skateboarding trick fundamentally. It turns out you can describe every flat-fround skateboarding trick in the following four components: Stance, Direction, Rotation and the trick name. 

Apart from flatground tricks there are also Grinds, Manuals and combos of each of those types of tricks that can be created. To allow users to keep track of their personal lists the application features 0Auth authentication via different providers like Google and GitHub. The application is built using the Next.js Full-Stack Javascript framework for the front and back-end of the app. 

The application features multiple pages, forms to add new tricks, Dynamic tables with CRUD funcationalities. To power this on the back-end an Api is running responsible for all data retrieval and operations. All data is persisted in a headless MongoDB instance and the Mongoose is used for Object Data Modelling (ODM) and additional validations.

- - -

## Screens

<div class="images-grid">
<img src="/assets/react-generic-table.png" />
<img src="/assets/tricks.jwvbremen.nl_2.png" />
<img src="/assets/tricks.jwvbremen.nl_3.png" />
<img src="/assets/tricks.jwvbremen.nl_4.png" />
</div>

- - -

To enhance the user experience the application also works as a native app and is installable on the users device (Progressive Web Application). The app also has a simple and easy to use user interface fully styled with TailwindCSS. No UI libraries were used. Though I used my own [`react-transition-scroll`](https://www.jwvbremen.nl/projects/2022-09-11_react-transition-scroll-library) library for adding pleasant animations when elements are scrolled into the viewport.

Most effort though has been put into the Developer Experience as the code has been written as modularly and readable as possible. I have not opted to use TypeScript since the benefits don't outweigh the disatvantages to me as using JavaScript with JSDoc annotations got me 90% there. I personally really enjoy working in this (type of) codebase.
