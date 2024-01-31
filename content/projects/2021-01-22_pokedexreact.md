---
title: PokéDex - React
startDate: 2021-01-22
endDate: 2021-01-30
thumbnail: /assets/pokedexreact.webp
type: Personal
description: For my graduation assignment for my Software Engineering study at
  the University of Applied Sciences in Amsterdam I did an internship at the
  Kabisa B.V. company.
---

As you know by now I like to experiment with the *[PokéApi](https://pokeapi.co/)*. This project is the third Pokémon related application I have built.
This time built using the *[ReactJS](https://reactjs.org/)* web framework. This was my first ever *ReactJS* application I have created.
I have developed the application by myself over the span of a few days. After that I kept tweaking and adding some more features to it off and on for a couple more months.
The goal of this project was to teach myself the workings of the *ReactJS* framework.

- - -

## Technologies & Frameworks

* ReactJS [![icon](/assets/react.png)](https://reactjs.org/)
* React-Router [![icon](/assets/react-router.png)](https://reactrouter.com/)
* Sass [![icon](/assets/sass.png)](https://sass-lang.com/)
* Node.js [![icon](/assets/nodejs.png)](https://www.nodejs.org/)
* Git(hub) [![icon](/assets/github.png)](https://www.github.com/)
* Netlify [![icon](/assets/netlify.png)](https://netlify.com/)
* Progressive Web Application [![icon](/assets/pwa.png)](https://web.dev/progressive-web-apps/)

- - -

## Features

The application features a sleek design that is very responsive. It boasts a slide in/out menu that floats over the UI on mobile devices.
The application allows you to brows through pages of Pokémons on the homepage. Also you are able to browse pokémons by type and see a random Pokémon from the API.
Every Pokémon can be opened and viewed in detail with its detail page. There the Pokémon's profile, types and statistics are displayed.
From here you are also able to view other Pokémons from the same type(s).
On top of that every Pokémon can be *'Caught'* from the detail page which when you do this will show up in the *'My Pokémons'* list.

The Application is fully routed so deeplinking to any page is supported. The UI is fully responsive and all css is written in Sass.
*'Caught'* Pokémons are saved in local storage so loading is fast and persistent. All API endpoints have separated interfaces, so the architecture is loosely coupled.
The biggest file is for styling, and the largest component is 173 lines of code. The application is hosted using the [Netlify](https://netlify.com/) deployment platform.

- - -

## Screens

<div class="images-grid">
<img src="/assets/pokedexreact_1.webp" />
<img src="/assets/pokedexreact_2.webp" />
</div>

- - -

## Techniques & Libraries

* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [react-router-transition](https://github.com/maisano/react-router-transition)
* [NodeJS](https://nodejs.org/)
* [JSON](https://json.org/)

- - -

<details>
<summary>Code Snippets</summary>
<div>
The following are some code snippets of pieces of code I'm proud of from this project. The snippets demonstrate clean, concise and powerful code.

**Retrieving Pokémon types**\
Retrieving remote Pokémon types from the *PokéApi* using the PokémonService interface and assigning it to the current state.

```javascript
  loadTypes = () => {
      Loader.showLoader();
      PokémonService.getTypes().then(json => {
      this.setState({jsonData: json});
      Loader.hideLoader();
    });
  }
```

**Catch Service**\
Create, read and destroy interface for the LocalStorage API with support for Json Objects. (Used for the *'Caught'* Pokémon functionality)

```javascript
const CatchService = {
    add(pokémon)  { // Add to the array and save in local storage
        let pokémons = this.getAll() || []; // Retrieve all
        pokémons.unshift(pokémon); // Add pokémon to beginning of array
        localStorage.setItem('pokémons', JSON.stringify(pokémons)); // Save in local storage
    },

    remove(pokémonName)  { // Remove from the array and save in local storage
        let pokémons = this.getAll() || []; // Retrieve all
        pokémons.forEach(function (pokémon, index) { // Iterate though all
            if (pokémon.name === pokémonName) { pokémons.splice(index, 1); } // Compare names, if match remove it
        });
        localStorage.setItem('pokémons', JSON.stringify(pokémons)); // Save in local storage
    },

    get(pokémonName) { // Get array and find specific pokémon based on name
        let pokémons = this.getAll() || []; // Retrieve all
        pokémons.forEach(function (pokémon) { // Iterate though all
            if (pokémon.name === pokémonName) { return pokémon; } // Compare name, if match return it
        });
    },

    getAll() { // Get the entire array of pokémon and parse it
        return JSON.parse(localStorage.getItem('pokémons')); // Retrieve all
    }
}
```

</div>
</details>

- - -

## Check out the project

[<button>![icon](/assets/github.png) Github</button>](https://github.com/alianza/pokedex_react)
[<button>Visit Site</button>](https://pokedexreact.jwvbremen.nl/)
