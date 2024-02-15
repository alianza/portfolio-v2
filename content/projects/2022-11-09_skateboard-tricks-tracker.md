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
<li>AuthJs <a href="https://authjs.dev/"><img src="/assets/authJs.webp" alt="icon"></a></li>
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
This file is the Mongoose Data Model for the Flatground Trick documents. Each flatground trick contains the properties to describe the trick itself (trick name, stance, direction and rotation), and some properties to identify the associated user (preferred stance and user id). Also there are some custom validators to ensure some business logic on the server-side as well as to make sure no duplicate tricks are created a unique index is created on each field including userId so across users duplicate tricks can be created.

```javascript
const FlatgroundTrickSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this trick'],
      enum: FLATGROUND_TRICKS_ENUM,
    },
    preferred_stance: {
      type: String,
      required: [true, 'Please provide your preferred stance'],
      enum: PREFFERED_STANCES_ENUM,
    },
    stance: {
      type: String,
      required: [true, "Please provide the tricks' stance"],
      enum: STANCES_ENUM,
    },
    direction: {
      type: String,
      enum: ['none', 'frontside', 'backside'],
      validate: {
        validator: function (value) {
          return this.rotation === 0 || value !== 'none';
        },
        message: 'Must specify a direction if there is a rotation',
      },
    },
    rotation: {
      type: Number,
      enum: [0, 180, 360, 540, 720],
      validate: {
        validator: function (value) {
          return this.direction === 'none' || value !== 0;
        },
        message: 'Must specify a rotation if there is a direction',
      },
    },
    userId: {
      type: Number,
      required: [true, 'Authentication error. Please log in again.'],
    },
  },
  { timestamps: true },
);

FlatgroundTrickSchema.index({ userId: 1, name: 1, stance: 1, direction: 1, rotation: 1 }, { unique: true });

export default mongoose.models.FlatgroundTrick || mongoose.model('FlatgroundTrick', FlatgroundTrickSchema);
```

**ServerUtils.js File**\
This file contains a collection of server-side oriented functions used throughout the back-end of the application. Like checking if a trick is used in an existing Combo, keeping it from being able to be deleted. Or requiring authentication to access a server-side resource and immediately supplying a query to make sure only user owned documents are retrieved. As wel as additional wrapper functions around the MongoDB querying methods aiding in retrieving certain document types and facilitating data serialization in order to allow documents to be used for statically pre-rendering web pages.

```javascript
export const checkForUsedCombos = async (_id, trickType) => {
  const combos = await Combo.countDocuments({ 'trickArray.trick': _id });

  if (combos) throw new Error(`This ${trickType} is used in ${combos} combo${sOrNoS(combos.length)}`);
};

export async function requireAuth(req, res) {
  let session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const authQuery = { userId: parseInt(session.user.id) };
  return { authQuery, session };
}

export function notFoundHandler(res, { entity, _id, id = _id, label }) {
  return res.status(400).json({ success: false, error: label || `${entity} with id ${id} not found.` });
}

/**
 * Perform an operation on a model and serialize the result
 * @param model {mongoose.Model}
 * @param operation {function}
 * @param query {object}
 * @param options {object}
 * @param populateFields {string[]}
 * @returns {{}}
 */
export default async function findAndSerializeDoc(
  model,
  operation,
  query = {},
  { args = [], populateFields = [] } = {},
) {
  const result = await findDoc(model, operation, query, { args, populateFields });
  return serialize(result);
}

/**
 * Find a document and optionally populate fields
 * @param model {mongoose.Model} - Mongoose model
 * @param operation {function} - Mongoose operation to perform
 * @param query {object} - Query to pass to the operation
 * @param args {array} - Array of arguments to pass to the operation (e.g. sort, limit, etc.)
 * @param populateFields {string[]} - Array of fields to populate
 * @param fullDoc=false {boolean} - Return the full mongo document or a lean js object
 * @returns {Promise<*>} - The result of the operation
 */
const findDoc = async (model, operation, query = {}, { args = [], populateFields = [], fullDoc = false }) => {
  let find = operation.bind(model)(query, ...args);

  if (!fullDoc) find = find.lean();

  if (populateFields.length) populateFields.forEach((field) => (find = find.populate(field)));

  return find.exec();
};

/**
 * Get a trick type and populate the name
 * @param model {mongoose.Model}
 * @param operation {function}
 * @param query {object}
 * @param args {object}
 * @returns {object}
 */
export async function getTricks(model, operation, query = {}, args = []) {
  const tricks = await findDoc(model, operation, query, { ...args });

  if (!tricks) return null;

  const returnTrick = (trick) => ({ ...trick, trick: getFullName(trick, model.collection.collectionName) });
  const data = Array.isArray(tricks) ? tricks.map(returnTrick) : returnTrick(tricks);

  return serialize(data);
}

/**
 * Get a combo and populate the name of every trick in the combo and the name of the combo itself
 * @param model {mongoose.Model}
 * @param operation {function}
 * @param query {object}
 * @param args {array}
 * @returns {object} - The combo
 */
export async function getCombos(model, operation, query = {}, args = []) {
  let combos = await findDoc(model, operation, query, { args, populateFields: ['trickArray.trick'] });

  if (!combos) return null;

  combos = Array.isArray(combos) ? combos.map(populateComboTrickName) : populateComboTrickName(combos); // Populate every trick name in the combo
  combos = Array.isArray(combos) ? combos.map(populateComboName) : populateComboName(combos); // Populate every combo name
  return serialize(combos);
}

/**
 * Gets a profile or creates one if it doesn't exist and returns it
 * @param query {object} - Query to find the profile
 * @returns {Promise<Profile>} - The profile
 */
export const ensureProfile = async (query) => await Profile.findOneAndUpdate(query, {}, { new: true, upsert: true });

/**
 * Serialize an object by parsing it to JSON and then back to an object
 * @param obj
 * @returns {object}
 */
const serialize = (obj) => JSON.parse(JSON.stringify(obj));
```

**FlatgroundTrickForm.jsx File**\
This file contains the form responsible for creating new flatground tricks and editing existing flatground tricks. The same form is used for both functionalities ensuring the same interface is always displayed ensuring user experience consistency and improving maintainability.

```jsx
const FlatgroundTrickForm = ({ flatgroundTrick, newFlatgroundTrick = true }) => {
  const router = useRouter();
  const closeAfterAdd = useCloseOnUrlParam('closeAfterAdd');

  const [fullTrickName, setFullTrickName] = useState(null);
  const [trickNameRef] = useAutoAnimate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: flatgroundTrick.name,
    preferred_stance: flatgroundTrick.preferred_stance,
    stance: flatgroundTrick.stance,
    direction: flatgroundTrick.direction,
    rotation: flatgroundTrick.rotation,
  });

  const { name, preferred_stance, stance, direction, rotation } = form;

  useAsyncEffect(async () => {
    if (!newFlatgroundTrick) return;
    const { data } = await apiCall('profiles/mine/preferred_stance'); // Set the preferred stance to the user's preferred stance
    setForm((oldForm) => ({ ...oldForm, preferred_stance: data.preferred_stance }));
  }, []);

  useEffect(() => {
    setFullTrickName(getFullTrickName(form));
  }, [form]);

  const patchData = async (form) => {
    try {
      const { _id } = router.query;
      await apiCall('flatgroundtricks', { _id, method: 'PATCH', data: form });
      await router.back();
    } catch (error) {
      toast.error(`Failed to update flatground trick: ${error.message}`);
    }
  };

  const postData = async (form) => {
    try {
      await apiCall('flatgroundtricks', { method: 'POST', data: form });
      await router.back();
      closeAfterAdd();
    } catch (error) {
      toast.error(`Failed to add flatground trick: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { target } = e;
    let { value, name } = target;

    if (target.type === 'checkbox') {
      value = target.checked;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    newFlatgroundTrick ? await postData(form) : await patchData(form);
    setLoading(false);
  };

  return (
    <TransitionScroll hiddenStyle={hiddenStyle} baseStyle={baseStyle}>
      <form onSubmit={handleSubmit} className={`${styles.form} max-w-xl`}>
        <h1 className="text-3xl">{newFlatgroundTrick ? 'New Flatground Trick' : 'Edit Flatground Trick'}</h1>
        <label>
          Preferred stance
          <select name={VN({ preferred_stance })} value={preferred_stance} onChange={handleChange} required>
            <option value="regular">Regular</option>
            <option value="goofy">Goofy</option>
          </select>
        </label>
        <div className="flex justify-between gap-1">
          <label>
            Stance
            <select name={VN({ stance })} value={stance} onChange={handleChange} required>
              <option value="regular">-</option>
              <option value="fakie">Fakie</option>
              <option value="switch">Switch</option>
              <option value="nollie">Nollie</option>
            </select>
          </label>

          <label>
            Direction
            <select name={VN({ direction })} value={direction} onChange={handleChange}>
              <option value="none">-</option>
              <option value="frontside">Frontside</option>
              <option value="backside">Backside</option>
            </select>
          </label>

          <label>
            Rotation
            <select name={VN({ rotation })} value={rotation} onChange={handleChange} required>
              <option value={0}>-</option>
              <option value={180}>180</option>
              <option value={360}>360</option>
              <option value={540}>540</option>
              <option value={720}>720</option>
            </select>
          </label>

          <label>
            Name
            <select name={VN({ name })} value={name} onChange={handleChange} required>
              {FLATGROUND_TRICKS_ENUM.map((trick) => (
                <option key={trick} value={trick}>
                  {capitalize(trick)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="my-4">
          Full trick name:{' '}
          <b ref={trickNameRef}>
            {fullTrickName?.split('').map((letter, index) => (
              <span key={index} className="inline-block whitespace-pre">
                {letter}
              </span>
            ))}
          </b>
        </p>
        <LoaderButton isLoading={loading} />
      </form>
    </TransitionScroll>
  );
};
```

</div>
</details>

- - -

### Check out the project!

[<button>![icon](/assets/github.png) GitHub</button>](https://github.com/alianza/tricks)

[<button>![icon](/assets/tricks.jwvbremen.nl_1.png) Check out the site!</button>](https://tricks.jwvbremen.nl/)

[<button>![icon](/assets/lighthouse.png) Lighthouse Audit</button>](/assets/lighthouse_tricks.html)

- - -
