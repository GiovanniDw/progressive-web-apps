import { Header } from './components/header.js';
import { getDynamicMuseumData } from './api.js';
import { handleSearch, searchObject } from './search.js';
import { $, $$ } from './ui.js'
import './vendor/routie.js'
// const apiKey = import.meta.env.VITE_RIJKSMUSEUM_API;
const apiKey = 'S3GLzVAr'
const URL = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&imgonly=true`;
const rembrand = '&involvedMaker=Rembrandt+van+Rijn';

import { handleRoutes } from './router.js';



// Header()
// handleRoutes()

const museumOptions = {
  lang: 'en',
  apiKey: apiKey,
  color: '',
  involvedMaker: '',
  URL: URL,
  search: ''
};










// createMuseumItemWithTemplate();

// // // handleSearch()

// // // // getSearchResults();


// async function createMuseumItemWithTemplate() {
//   const museumData = await getDynamicMuseumData(museumOptions);
//   const museumItems = museumData.artObjects;
//   console.log(museumItems);

// const art = $('#art')

//   const article = document.createElement('div');
//   article.classList.add('art-container');
//   const template = document.getElementById('museum-items');
//   try {
//     museumItems.forEach((museumItem) => {
//       const articleItem = document.importNode(template.content, true);
//       articleItem.querySelector('.museum-header').style = `background-image: url('${museumItem.webImage.url}')`;
//       // articleItem.querySelector('.title').textContent = museumItem.title;
//       articleItem.querySelector('.title').textContent = museumItem.title;
//       articleItem.querySelector('.artist').textContent = museumItem.principalOrFirstMaker;
//       article.appendChild(articleItem);
//     });
//     template.replaceWith(article);
//   } catch (err) {
//     console.log(err)
//   }
// }

// const input = document.querySelector("#search");

// console.log(input)



// function createListWithTemplate(heroes: Hero[]) {
//   const ul = document.createElement('ul');
//   ul.classList.add('list', 'hero-list');
//   const template = document.getElementById('museumItem') as HTMLTemplateElement;
//   heroes.forEach((hero: Hero) => {
//     const heroCard = document.importNode(template.content, true);
//     heroCard.querySelector('.description').textContent = hero.description;
//     heroCard.querySelector('.name').textContent = hero.name;
//     ul.appendChild(heroCard);
//   });
//   heroPlaceholder.replaceWith(ul);
// }
