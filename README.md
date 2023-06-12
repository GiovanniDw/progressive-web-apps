# Progressive Web Apps

## Course Info

[GitHub - cmda-minor-web/progressive-web-apps-2223: The course Progressive Web Apps is about learning to build server side rendered applications. Progressive Web Apps is part of the half year minor programme about Web Design and Development in Amsterdam. Bachelor Communication and Multimedia Design, Amsterdam University of Applied Science.](https://github.com/cmda-minor-web/progressive-web-apps-2223)

### Goals

After finishing this program you can:

- *deal with server side rendering;*
- *implement a Service Worker;*
- *enhance the critical render path for a better runtime or percieved performance.*

### Rubic

| **Deficiency**         | **Criterion**                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Project*              | Your app is published and can be accessed using the browser. Your project is thoroughly documented in the R`EADME.mdf`ile in your repository. Included are an explanation of client- server rendering, an activity diagram including the Service Worker and a list of enhancements to optimize the critical render path implemented your app. |
| *Serverside rendering* | You’ve implemented serverside rendering and have articulated how it works and why you should want it.                                                                                                                                                                                                                                         |
| *Service Worker*       | You’ve implemented a usefull Service Worker and show it’s working in an activity diagram.                                                                                                                                                                                                                                                     |
| *Critical render path* | You’ve enhanced the critical render path for a better runtime or percieved performance in multiple ways and have described how you managed to do this.                                                                                                                                                                                        |

### User Story

> **Als kunstliefhebber, wil ik thuis kunst uit het Rijksmuseum kunnen zoeken en bekijken, zodat ik tijdens een lockdown toch van kunst kan genieten.**

![image.png](README.assets/image.png)

### RijksData API

Het Rijksmuseum verbindt mensen, kunst en geschiedenis. De databronnen van het RIjksmuseum vormen daarbij belangrijke bouwstenen.

Van schilderij tot scheepsmodel, je vindt het in de collectiedata van het Rijksmuseum. De gegevens van meer dan een half miljoen objecten hebben we inmiddels beschikbaar gemaakt voor hergebruik, de meeste met hoge resolutie objectfoto.

![Image.png](README.assets/Image.png)

## Rendering

When it comes to rendering web content, there are two approaches Client-Side Rendering & Server-Side Rendering.

### Client Side Rendering

With Client Side rendering the html file is almost empty and Javascript dynamically renders and updates the content on the page without reloading the entire page.

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PWA</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

With This approach, search engines have a hard time understanding and indexing Client-Side Renderen content, which can potentially impact the SEO performance of a web page.

### Server Side Rendering

SSR is a technique that allows rendering web pages on the server and sending the fully rendered HTML to the client's browser. The fully rendered HTML pages is the reason search engines can index the pages better, thats why its important for SEO.

To setup & configure a web server I have used nodeJS with the following packages:

- `expressjs`:Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- `express-nunjucks`
- `nunjucks`
- `nodemon`
- `dotenv`

#### MVC

The FileStructure I’ve used is based on the MVC Model.

```javascript
./src/server
├── controllers
│   ├── CollectionController.js
│   ├── HomeController.js
│   ├── SearchController.js
│   └── index.js
├── helpers
│   ├── api.js
│   └── templateHelpers.js
├── router
│   └── index.js
├── static
│   └── sw.js
└── views
    ├── base.njk
    ├── collection.njk
    ├── details.njk
    ├── error.njk
    ├── index.njk
    ├── partials
    │   ├── foot.njk
    │   ├── head.njk
    │   └── singleArticle.njk
    └── search.njk
```

#### Routing

```javascript
import express from "express";
import { HomeController } from '../controllers/HomeController.js';
import { CollectionController, CollectionDetailsController } from '../controllers/CollectionController.js';
import { SearchController } from '../controllers/SearchController.js';

const router = express.Router();

router.get("/", HomeController);
router.get("/search/:q", SearchController);

router.get("/collection", CollectionController);
router.get("/collection/:id", CollectionDetailsController);


export default router;
```

### Controller

```javascript
import { searchAll, searchId } from "../helpers/api.js";
export const CollectionController = async (req,res, next) => {
	try {
		const data = await searchAll('Rembrand');
		return res.render('collection.njk', {
			title: 'Collecton',
			query: 'Rembrand',
			data: data
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}
export const CollectionDetailsController = async (req,res, next) => {
  const id = req.params.id;
	console.log(req.params)
	try {
		const data = await searchId(id);
		return res.render('details.njk', {
			title: 'Collecton',
			data: data
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}
export default CollectionController
```

## Service Worker

A Service worker handles the installation and caching logic of an PWA. By using a service worker the loading times become faster, offline acces is possible to the files that are specified.

## Critical render Path

![Image.tiff](README.assets/Image.tiff)

I chose to optimize the perceived load speed and load responsiveness as I identified these as areas where the application could improve significantly. I have minified the static files of the Javascript and the CSS are split up so the important css is rendered first. Also I've Implementing caching strategies that also led to better load performance on repeated visits to our application.

![image.png](README.assets/image%20(2).png)

#### First Render

![image.png](README.assets/image%20(3).png)

#### Improvements

![Image.png](README.assets/Image%20(2).png)

To improve the initial page, and reduce content jumping around I've applied the following:

#### CSS

```javascript
<link rel="stylesheet" rel="preload" href="/css/base.css"/>
<link rel="stylesheet" href="/css/main.css"/>
```

#### Images

Add sized so content doesnt jump around when images are loaded in.

```javascript
before  <img class="museum-item-image" src="{{ data.webImage.url }}" alt="{{data.title}}"/>
   after <img class="museum-item-image" src="{{ data.webImage.url }}" alt="{{data.title}}" width="{{data.webImage.width}}" loading="lazy" height="{{data.webImage.height}}"/>
```

