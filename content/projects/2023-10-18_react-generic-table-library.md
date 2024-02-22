---
title: React Generic Table Library
startDate: 2023-10-18
endDate: 2024-01-18
thumbnail: /assets/react-generic-table.png
type: Personal
description: This project was my second attempt at creating a React library.
  This time I wanted to create a generic table component library that could be
  used to render feature rich but simple to use tables in react with built-in
  animations, out-of-the-box sorting, support for actions in an action column
  and more. The library was built using React and TailwindCss so it's
  lightweight!
---
During development of my Skateboarding Tricks Tracker Web Application I found myself in need of a table component that could be used to display the tricks in a table. I wanted to be able to sort the table by different columns, have a column with actions and be able to add animations to the table.

After realizing the tables in the Skateboarding Tricks Tracker Web Application could be reused in other projects I decided to extract the table component and the functionality onto a standalone NPM React Component library. This was my second public library that I ever created and released. The NPM page is accessible [here](https://www.npmjs.com/package/react-generic-table)!

- - -

## Technologies & Frameworks

<ul class="icon-list">
<li>React.js <a href="https://react.dev/"><img src="/assets/react.png" alt="icon"></a></li>
<li>TailwindCSS <a href="https://tailwindcss.com/"><img src="/assets/tailwindcss.png" alt="icon"></a></li>
<li>Node.js <a href="https://nodejs.org/en"><img src="/assets/nodejs.png" alt="icon"></a></li>
<li>Sass <a href="https://sass-lang.com/"><img src="/assets/sass.png" alt="icon"></a></li>
<li>GitHub <a href="https://github.com/"><img src="/assets/github.png" alt="icon"></a></li>
<li>NPM <a href="https://www.npmjs.com/"><img src="/assets/npm.png" alt="icon"></a></li>
<li>PropTypes <a href="https://github.com/facebook/prop-types"><img src="/assets/proptypes.png" alt="icon"></a></li>
<li>GitHub Pages <a href="https://pages.github.com/"><img src="/assets/github_pages.png" alt="icon"></a></li>
<li>Formkit AutoAnimiate <a href="https://auto-animate.formkit.com/"><img src="/assets/autoAnimate.png" alt="icon"></a></li>
</ul>

- - -

## Screens

<div class="images-grid">
<img src="/assets/react-generic-table_3.png" />
<img src="/assets/react-generic-table_1.png" />
<img src="/assets/react-generic-table_2.png" />
</div>

- - -

## Summary

The goal of this project was to make the Generic Table component I made for my Skateboarding Tricks Tracker project reusable in other projects. The best way to achieve this was to create an NPM React Component Library out of it. I created a repository for it and bootstrapped it using the [create-react-library](https://www.npmjs.com/package/create-react-library) package which is based on [Microbundle](https://github.com/developit/microbundle). I added the React component in the source and imported and used it in the example website. The example website is hosted on GitHub Pages and the library itself is hosted on NPM.

The library is very feature rich and has a lot of options to customize the table. It has built-in sorting, configurable cell rendering, item counts, actions support with callbacks, out-of-the-box sorting & loading states and more! The library is also very lightweight and has a small bundle size. The library is also very easy to use and has a very simple API.

### Features

Sure, here you go:

* 🔄 **Sorting** - The table has built-in sorting on columns. The user can click on the column header to sort the table by that column. The table also has a default sorting on the first column.
* ⚙️ **Actions** - The table has support for actions in an actions column. The user can define actions and their callbacks and the table will display the actions in the actions column.
* ⏳ **Loading State** - The table has a built-in loading state. If the `objArray` prop is set to `null` the table will display a loading state.
* 🎨 **Custom Cell Rendering** - The user can define custom cell rendering for each column like custom column names, capitalization, class names and additional props.
* 🔢 **Item Counts** - The user can choose to display the count of items in the table.
* ➕ **New Link** - The user can choose to display a link to add new entities to the table.
* 🔄🚫 **Sorting Option** - The user can choose to enable or disable sorting on the columns.
* 📱 **Responsive** - The table is responsive and works well on mobile devices.
* 🎬 **Out-of-the-box Animations** - The table has built-in animations. For example, when sorting the table the rows will animate to their new positions.
* ⚙️ **Custom Actions** - The user can define custom actions and their callbacks.
* 🌑 **Dark Mode Support** - The table has support for dark mode.

- - -

<details >
<summary>Code Snippets</summary>
<div>

The following are some code snippets of component code that is powerful, demonstrates good coding practices and that I'm proud of. The snippets demonstrate clean, concise and powerful code. *(Code has been compacted in some cases).*

**Library Index.js**\
This code snippet shows the entire source code of the Generic Table component itself. It shows the entire component code and the props that the component accepts. The component is a functional component and uses hooks to manage state and side effects. The component uses the `useAutoAnimate` hook from the `formkit-auto-animate` library to animate the table rows when sorting the table.

Styling is done using TailwindCSS using a prefix of `rgt-` to avoid conflicts with other TailwindCSS classes

The `GenericTableDataRow` component is a child component of the `GenericTable` component and is used to render the rows of the table. It uses the `deepGet` function to get the value of a nested object property in case the value is nested in the object.

```jsx
const duration = 250; // default auto-animate duration

/**
 * Generic table component
 * @param objArray {Array} - Array of objects to display in table
 * @param columns {Array} - Array of column names or objects with key as column name and options as value
 * @param actions {Array} - Array of action objects with key as action name and value as element function
 * @param entityName {String} - Name of entity to display in table
 * @param onAction {Function} - Callback function to handle actions
 * @param [options] {Object} - Options object
 *     @param [options.showCount] {Boolean} - Whether to show count of objects in table
 *     @param [options.newLink] {String} - Link to create new entity
 *     @param [options.actionsColumnName] {String} - Custom name for the actions column
 *     @param [options.sorting] {Boolean} - Whether to enable sorting on columns
 * @returns {JSX.Element} - Generic table component
 * @constructor - GenericTable
 */

function GenericTable({
  objArray = null,
  columns = [],
  actions,
  entityName = "item",
  onAction = () => {},
  ...options
}) {
  const [columnSortDirection, setColumnSortDirection] = useState({ [columns[0]]: "asc" });
  const [loading, setLoading] = useState(objArray === null);
  const [objArrayState, setObjArrayState] = useState(objArray || []);
  const [tableBody, enableAnimations] = useAutoAnimate();

  if (actions?.length) columns = [...columns, "actions"];

  useEffect(() => sort(getColumnProp(columns[0]), "asc"), []); // Default ascending sort on first column

  useEffect(() => {
    const operations = () => {
      setObjArrayState(objArray || []);
      setLoading(objArray === null);
      const [[column, direction]] = Object.entries(columnSortDirection);
      if (objArray) sort(column, direction); // Sort again if objArray changes
    };

    objArrayState?.length > objArray?.length ? deAnimate(operations) : operations(); // Disable animations if an item was removed
  }, [objArray]);

  const sort = (column, direction) => {
    setObjArrayState((prevObjArrayState) =>
      prevObjArrayState.sort((a, b) => {
        const normalize = (value) => (isString(value) ? value.toUpperCase() : value || "");
        if (normalize(a[column]) > normalize(b[column])) return direction === "asc" ? 1 : -1;
        if (normalize(a[column]) < normalize(b[column])) return direction === "asc" ? -1 : 1;
        return 0;
      }),
    );
    setColumnSortDirection({ [column]: direction });
  };

  const deAnimate = (fn) => {
    enableAnimations(false);
    fn();
    setTimeout(() => enableAnimations(true), duration);
  };

  const getColumnProp = (col) => (isString(col) ? col : Object.keys(col)[0]);

  const { showCount, newLink, actionsColumnName, sorting = true, className = "" } = options;
  const hasItems = !!objArrayState.length;

  return (
    <div className={`${className} react-generic-table rgt-flex rgt-flex-col rgt-items-center rgt-overflow-y-hidden`}>
      <table className="rgt-relative rgt-mx-auto rgt-table-auto rgt-text-neutral-900 dark:rgt-text-neutral-100">
        <thead className="rgt-bg-neutral-200 dark:rgt-bg-neutral-700">
          <tr>
            {columns.map((col) => {
              let isActionsColumn = false;
              let colName = isString(col) ? col : Object.values(col)[0].alias || Object.keys(col)[0];
              const colProp = getColumnProp(col);
              if (colName === "actions") {
                colName = actionsColumnName || colName;
                isActionsColumn = true;
              }

              return (
                <th key={colName} className="rgt-p-3 sm:rgt-p-4">
                  <div className="rgt-flex rgt-justify-center rgt-gap-2">
                    <p className="rgt-font-bold">{capitalize(colName)}</p>
                    {sorting && !loading && hasItems && (
                      <>
                        {columnSortDirection[colProp] === "asc" && (
                          <ChevronDownIcon
                            className="rgt-h-6 rgt-w-6 rgt-cursor-pointer"
                            onClick={() => sort(colProp, "desc")}
                          />
                        )}
                        {columnSortDirection[colProp] === "desc" && (
                          <ChevronUpIcon
                            className="rgt-h-6 rgt-w-6 rgt-cursor-pointer"
                            onClick={() => sort(colProp, "asc")}
                          />
                        )}
                        {!isActionsColumn && !columnSortDirection[colProp] && (
                          <ChevronUpDownIcon
                            className="rgt-h-6 rgt-w-6 rgt-cursor-pointer"
                            onClick={() => sort(colProp, "asc")}
                          />
                        )}
                      </>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody
          className="rgt-bg-neutral-50 after:rgt-absolute after:rgt-bottom-0 after:rgt-left-0 after:rgt-h-[2px] after:rgt-w-full after:rgt-bg-neutral-400 dark:rgt-bg-neutral-800"
          ref={tableBody}
        >
          {!hasItems && (
            <tr>
              <td className="rgt-sm:p-4 rgt-p-2" colSpan={columns.length}>
                <div className="rgt-flex rgt-justify-center rgt-gap-2">
                  {loading ? <Loader className="rgt-mx-auto rgt-my-24" /> : `No ${entityName}s found.`}
                  {newLink && !loading && <IconLink title={`New ${entityName}`} href={newLink} Icon={PlusIcon} />}
                </div>
              </td>
            </tr>
          )}
          {objArrayState.map((obj) => (
            <GenericTableDataRow
              key={obj.id}
              obj={obj}
              columns={columns}
              actions={actions}
              onRowAction={(...params) => onAction(...params, entityName)}
            />
          ))}
        </tbody>
        {(showCount || newLink) && (
          <tfoot>
            <tr>
              {newLink && (
                <td colSpan={!showCount ? columns.length : 1}>
                  <IconLink title={`New ${entityName}`} label="Add new" href={newLink} Icon={PlusIcon} />
                </td>
              )}
              {showCount && (
                <>
                  {columns.length > 2 && <td colSpan={columns.length - (newLink ? 2 : 1)} />}
                  <td className="rgt-text-end">
                    {objArrayState.length} {capitalize(entityName) + sOrNoS(objArrayState.length)}
                  </td>
                </>
              )}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

const colPropsToOmit = ["key", "alias", "capitalize", "onClick"];

function GenericTableDataRow({ obj, columns, actions, onRowAction }) {
  const objColumnMap = {};

  columns.forEach((col) => {
    const [[colName, colProps]] = isString(col) ? [[col]] : Object.entries(col);
    if (colName === "actions") {
      objColumnMap[colName] = { colProps, value: actions }; // Value of actions column are the actions itself
    } else {
      objColumnMap[colName] = { colProps, value: deepGet(obj, colName) };
    }
  });

  const formatActions = (name, value) =>
    value.map((actionObj) => {
      const [[action, elementFunc]] = Object.entries(actionObj);
      if (typeof elementFunc !== "function") {
        console.warn(`No element function provided for action ${actionObj}`);
        return null;
      }
      return cloneElement(elementFunc(obj), {
        onClick: elementFunc(obj).props.onClick
          ? () => {
              elementFunc(obj).props.onClick();
              onRowAction(action, obj);
            }
          : () => onRowAction(action, obj),
        key: action,
      });
    });

  return (
    <tr className="rgt-relative after:rgt-absolute after:rgt-left-0 after:rgt-h-[2px] after:rgt-w-full after:rgt-bg-neutral-400">
      {Object.entries(objColumnMap).map(([colName, colData]) => {
        const { value, colProps } = colData;
        return colName === "actions" ? (
          <td key={colName} className="rgt-p-3 sm:rgt-p-4">
            <div className="rgt-flex rgt-justify-center rgt-gap-2">{formatActions(colName, value)}</div>
          </td>
        ) : (
          <td key={colName} className="rgt-p-3 sm:rgt-p-4">
            <span
              {...omit(colProps, colPropsToOmit)}
              {...(colProps?.onClick && { onClick: () => colProps?.onClick(obj) })}
            >
              {colProps?.capitalize === false ? value.toString() : capitalize(value)}
            </span>
          </td>
        );
      })}
    </tr>
  );
}
```

**CommonUtils.js File**

This code snippet shows a collection of utility functions that are used in the library. The functions are used to perform common operations like capitalizing the first letter of a string, comparing two objects to see if they are equal (deep), checking if a variable is an object, checking if a variable is a string, omitting properties from an object and getting the value of a nested object property.

```javascript
/**
 * Capitalize the first letter of a string
 * @param value {string | number}
 * @returns {string}
 */
export const capitalize = (value) => value?.toString()?.charAt(0)?.toUpperCase() + value?.toString()?.slice(1);

/**
 * Whether to add an 's' to a word depending on the value of a number representing an amount
 * @param amount {number} - The quantity of something
 * @returns {string} - and S or an empty string
 */
export const sOrNoS = (amount) => (amount > 1 || amount === 0 ? 's' : '');

/**
 * Compare two objects to see if they are equal (deep)
 * @param object1 {object}
 * @param object2 {object}
 * @returns {boolean}
 */
export function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => {
    const val1 = object1[key];
    const val2 = object2[key];

    const areObjects = isObject(val1) && isObject(val2);
    return areObjects ? deepEqual(val1, val2) : val1 === val2;
  });
}

/**
 * Check if a variable is an object
 * @param object {*} - Variable to check
 * @returns {boolean} - Whether the variable is an object
 */
export function isObject(object) {
  return object != null && typeof object === 'object';
}

/**
 * Check if a variable is a string
 * @param val {*} - Variable to check
 * @returns {boolean} - Whether the variable is a string or not
 */
export const isString = (val) => typeof val === 'string';

/**
 * Omit properties from an object
 * @param object {object} - Object to omit properties from
 * @param keys {array} - Array of keys to omit from the object
 * @returns {{}} - Object with omitted properties removed
 */
export function omit(object, keys) {
  if (!object) return {};
  return Object.keys(object)
    .filter((key) => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = object[key];
      return acc;
    }, {});
}

/**
 * Get the value of a nested object property
 * @param object {object} - Object to get the value from
 * @param path {string} - Path to the property (e.g. 'foo.bar.baz')
 * @returns {*} - Value of the property
 */
export const deepGet = (object, path) => {
  const keys = path.split('.');
  if (!keys.length) return object; // if path is empty string return object
  if (keys.length === 1) return object[keys[0]]; // if path is one key return object[key]
  let value = object;
  keys.forEach((key) => (value = isObject(value) ? value[key] : undefined));
  return value;
};
```

</div>
</details>

- - -

### Check out the project!

[<button>![icon](/assets/github.png) GitHub</button>](https://github.com/alianza/react-generic-table)
[<button>![icon](/assets/react-generic-table_3.png) Documentation/Demo website</button>](https://alianza.github.io/react-generic-table/)

Projects using the `React-generictable` library:

[<button>![icon](/assets/tricks.jwvbremen.nl_2.png) Skateboard Tricks Tracker</button>](https://tricks.jwvbremen.nl/)
