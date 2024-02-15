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
I wanted to take my personal projects to the next level as I'm starting to discover what general tech stack seems to suit me. Also using skills acquired during my project at Road.io (Formerly E-Flux) and implementing them to create a highly interactive progressive web application.

This project was a personal challenge and learning experience to build a full-stack web application in a domain I'm familiar with. The purpose of the application is for skateboarders to be able to track what tricks they've learned and log them in their personal dashboard. The goal was to gain experience building a full stack application featuring a rich and dynamic front-end with user Authentication and persisted storage with a Database powered by a back-end featuring an Api with all necessary endpoints to power the entire application. 

Firstly, to allow skateboarding tricks to be represented as data I had to dissect what components make up a skateboarding trick fundamentally. It turns out you can describe every flat-fround skateboarding trick in the following four components: Stance, Direction, Rotation and the trick name. 

Apart from flatground tricks there are also Grinds, Manuals and combos of each of those types of tricks that can be created. To allow users to keep track of their personal lists the application features 0Auth authentication via different providers like Google and GitHub. The application is built using the Next.js Full-Stack Javascript framework for the front and back-end of the app. 

The application features multiple pages, forms to add new tricks, Dynamic tables with CRUD functionalities. To power this on the back-end an Api is running responsible for all data retrieval and operations. All data is persisted in a headless MongoDB instance and the Mongoose is used for Object Data Modelling (ODM) and additional validations.

- - -

## Technologies & Frameworks

<ul class="icon-list">
<li>Next.js <a href="https://nextjs.org/"><img src="/assets/nextjs.png" alt="icon"></a></li>
<li>TailwindCSS <a href="https://tailwindcss.com/"><img src="/assets/tailwindcss.png" alt="icon"></a></li>
<li>Node.js <a href="https://nodejs.org/en"><img src="/assets/nodejs.png" alt="icon"></a></li>
<li>Sass <a href="https://sass-lang.com/"><img src="/assets/sass.png" alt="icon"></a></li>
<li>GitHub <a href="https://github.com/"><img src="/assets/github.png" alt="icon"></a></li>
<li>Netlify <a href="https://www.netlify.com/"><img src="/assets/netlify.png" alt="icon"></a></li>
<li>Progressive Web App <a href="#"><img src="/assets/pwa.png" alt="icon"></a></li>
<li>MongoDB <a href="https://www.mongodb.com/"><img src="/assets/mongodb.png" alt="icon"></a></li>
<li>Mongoose <a href="https://mongoosejs.com/"><img src="/assets/mongoose.png" alt="icon"></a></li>
<li>AuthJs <a href="https://authjs.dev/"><img src="/assets/authjs.webp" alt="icon"></a></li>
</ul>

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

- - -

## Additional Libraries

* [nextjs-progressbar](https://www.npmjs.com/package/nextjs-progressbar)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [react-transition-scroll](https://www.npmjs.com/package/react-transition-scroll)
* [react-toastify](https://www.npmjs.com/package/react-toastify)
* [heroicons](https://github.com/tailwindlabs/heroicons)
* [next-pwa](https://www.npmjs.com/package/next-pwa)

- - -

## Lighthouse Audit Score ![icon](/assets/lighthouse.png)

![Lighthouse Audit Score](/assets/lighthouse_tricks.png "Lighthouse Audit Score")

- - -

<details >
<summary>Code Snippets</summary>
<div>

The following are some code snippets of front and back-end code for the skateboarding tricks tracker web application that are powerful, demonstrate good coding practices and that I'm proud of. The snippets demonstrate clean, concise and powerful code. *(Code has been compacted in some cases).*

**Dashboard.jsx page**\
This code snippet demonstrates the Dashboard page code. The dashboard page features 4 tables where all the saved tricks for each type of trick (Flatground, Grind, Manual and Combo's) of the current logged in user are displayed. The page uses client-side fetching to retrieve the data to fill the tables with. The tables are from my react component library [`react-generic-table`](https://www.npmjs.com/package/react-generic-table). Also the delete action in handled in the component since it requires firing an Api call to the back-end of the application.

```jsx
export default function Index() {
  const [flatgroundTricks, setFlatgroundTricks] = useState(null);
  const [grinds, setGrinds] = useState(null);
  const [manuals, setManuals] = useState(null);
  const [combos, setCombos] = useState(null);

  useAsyncEffect(async () => {
    const fetchAndSetData = async (endpoint, setData) => {
      try {
        const { data } = await apiCall(endpoint, { method: 'GET' });
        setData(data);
      } catch (error) {
        toast.error(`Failed to fetch ${endpoint}: ${error.message}`);
      }
    };

    const trickTypesAndSetters = [
      ['flatgroundtricks', setFlatgroundTricks],
      ['grinds', setGrinds],
      ['manuals', setManuals],
      ['combos', setCombos],
    ];

    (() => trickTypesAndSetters.forEach(([endpoint, setData]) => fetchAndSetData(endpoint, setData)))();
  }, []);

  const handleActions = async (action, obj, entityType) => {
    const endpointSetterMap = {
      'flatground trick': ['flatgroundtricks', setFlatgroundTricks],
      grind: ['grinds', setGrinds],
      manual: ['manuals', setManuals],
      combo: ['combos', setCombos],
    };

    switch (action) {
      case 'delete':
        try {
          if (!confirm(`Are you sure you want to delete "${obj.trick}"?`)) return;
          const [endpoint, setData] = endpointSetterMap[entityType];
          if (!endpoint) return toast.error(`Failed to delete ${obj.trick}: Invalid entity type: ${entityType}`);
          await apiCall(endpoint, { method: 'DELETE', id: obj._id });
          const { data } = await apiCall(endpoint, { method: 'GET' });
          setData(data);
          toast.success(`Successfully deleted ${obj.trick}`);
        } catch (error) {
          toast.error(`Failed to delete ${obj.trick}: ${error.message}`);
        }
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <div>
        <h1 className="text-center text-5xl">Dashboard</h1>
        <p className="mt-3 text-center">This is a overview of all the tricks you've added to your account.</p>
      </div>
      <TransitionScroll hiddenStyle={hiddenStyle} baseStyle={baseStyle} className="flex flex-col">
        <LinkWithArrow label="Flatground Tricks" href="/flatgroundtricks" />
        <GenericTable
          objArray={flatgroundTricks}
          columns={['stance', 'direction', 'rotation', 'name', trickCol]}
          actions={getCommonActions('flatgroundtricks')}
          onAction={handleActions}
          entityName="flatground trick"
          newLink="/new-flatground-trick"
          showCount
        />
      </TransitionScroll>

      <TransitionScroll hiddenStyle={hiddenStyle} baseStyle={baseStyle} className="flex flex-col">
        <LinkWithArrow label="Grinds" href="/grinds" />
        <GenericTable
          objArray={grinds}
          columns={['stance', 'direction', 'name', trickCol]}
          actions={getCommonActions('grinds')}
          onAction={handleActions}
          entityName="grind"
          newLink="/new-grind"
          showCount
        />
      </TransitionScroll>

      <TransitionScroll hiddenStyle={hiddenStyle} baseStyle={baseStyle} className="flex flex-col">
        <LinkWithArrow label="Manuals" href="/manuals" />
        <GenericTable
          objArray={manuals}
          columns={[{ type: { className: 'text-sm font-bold' } }]}
          actions={getCommonActions('manuals')}
          onAction={handleActions}
          entityName="manual"
          newLink={'/new-manual'}
          showCount
        />
      </TransitionScroll>

      <TransitionScroll hiddenStyle={hiddenStyle} baseStyle={baseStyle} className="flex flex-col">
        <LinkWithArrow label="Combos" href="/combos" />
        <GenericTable
          objArray={combos}
          columns={[{ trick: { className: 'text-sm font-bold', alias: 'Combo name' } }]}
          actions={getCommonActions('combos')}
          onAction={handleActions}
          entityName="combo"
          newLink="/new-combo"
          showCount
        />
      </TransitionScroll>
    </div>
  );
}
```

**\[_id].js flatgroundTricks Api endpoint**\
This file resides in the Api folder of the application causing it to be treated as a back-end endpoint by the Next.js framework. This endpoint is responsible for handling functionality surrounding individual flatground tricks where the id is a query parameter in the url. This endpoint handles the retrieval of an individual flatground trick, updating the data of an existing flatground trick and deleting an existing flatground trick. There are checks in place for verifying the supplied ObjectId in the url, ensuring authentication and handlers for if a flatground trick cannot be found which communicates descriptive errors to the front-end.

```javascript
export default async function handler(req, res) {
  const {
    query: { _id },
    method,
  } = req;

  if (!isValidObjectId(_id)) return notFoundHandler(res, { entity: 'Flatground trick', _id });

  await dbConnect();
  const { authQuery } = await requireAuth(req, res);

  switch (method) {
    case 'GET':
      try {
        const flatgroundTrick = await FlatGroundTrick.findOne({ _id, ...authQuery }).lean();
        if (!flatgroundTrick) return notFoundHandler(res, { entity: 'Flatground trick', _id });
        const data = { ...flatgroundTrick, trick: getFullTrickName(flatgroundTrick) };
        res.status(200).json({ success: true, data });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PATCH':
      try {
        const flatgroundTrick = await FlatGroundTrick.findOneAndUpdate({ _id, ...authQuery }, req.body, { new: true });
        if (!flatgroundTrick) return notFoundHandler(res, { entity: 'Flatground trick', _id });
        const data = { ...flatgroundTrick.toObject(), trick: getFullTrickName(flatgroundTrick) };
        res.status(200).json({ success: true, data });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        await checkForUsedCombos(_id, 'Flatground Trick');
        const deletedTrick = await FlatGroundTrick.deleteOne({ _id, ...authQuery });
        if (!deletedTrick) return notFoundHandler(res, { entity: 'Flatground trick', _id });
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: `Unhandled request method: ${method}` });
      break;
  }
}
```

**FlatgroundTrick.js Mongoose Model**\
This file is the Mongoose Data Model for the Flatground Trick documents. Each flatground trick contains the properties to describe the trick itself (trick name, stance, direction and rotation), and some properties to identify the associated user (preffered stance and user id).

</div>
</details>

- - -

- - -

### Check out the project!

[<button>![icon](/assets/github.png) GitHub</button>](https://github.com/alianza/tricks)

[<button>![icon](/assets/tricks.jwvbremen.nl_1.png) Check out the site!</button>](https://leashamaa.nl/)

[<button>![icon](/assets/lighthouse.png) Lighthouse Audit</button>](/assets/lighthouse_tricks.html)

- - -
