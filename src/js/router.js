import Routie from './vendor/routie.js';
import { getMuseumData, getDynamicMuseumData, searchMuseumData, getLocalSearchInput } from './api.js';
import { updateUI } from './ui.js'
import { render } from './render.js'
import { handleSearch, searchInputValue } from './search.js';
import { Header } from './components/header.js';
// import routie from './vendor/routie.js';

// import Router from 'vanilla-router';




const museumOptions = {
  lang: 'en',
  color: '',
  involvedMaker: '',
  URL: URL,
  search: '',
  toppieces: false
};

const museumOptionsHome = {
  lang: 'en',
  color: '',
  involvedMaker: ["Rembrand Van Rein"],
  URL: URL,
  search: 'rembrand',
  toppieces: true
};

export function handleRoutes() {
  Header()
  Routie(
    {
      '': async () => {
        const data = await getDynamicMuseumData(museumOptionsHome);
        render(data, undefined, "home");
        updateUI('home');
      },
      'art': async () => {
        const data = await getDynamicMuseumData(museumOptions);
        render(data, undefined, "art");
        updateUI('art');
      },
      'art/:id': async (id) => {
        const data = await getDynamicMuseumData(museumOptions, id);
        render(data, id, "art-detail");
        // updateUI('art');
      },
      'search': async () => {

        const value = await searchInputValue()

        console.log(value)
        const searchInput = await getLocalSearchInput();
        console.log(searchInput);
        const data = await searchMuseumData(searchInput);
        render(data, undefined, "search");
        updateUI('search');
      }
    });
}


// const searchInput = getLocalSearchInput()
// console.log(searchInput)

// const router = new Router({
//   mode: 'hash',
//   root: '/SPA/index.html',
//   page404: function (path) {
//     console.log('"/' + path + '" Page not found');
//   }
// });

// router.add('', async () => {
//   const data = await getDynamicMuseumData(museumOptions)
//   render(data)
//   updateUI('home')
//   });

// router.add('art/(:any)', async (name) => {
//   const data = await getDynamicMuseumData(museumOptions, id)
//   render(data, id)
//   updateUI('art')
//   });

// router.add('search', async () => {
//   const searchInput = await getLocalSearchInput()
//   console.log(searchInput)
//   const data = await searchMuseumData(searchInput)
//   render(data, "search")
//   updateUI('search')  });



// export const handleRoutes = () => {
//   router.add('', async () => {
//     const data = await getDynamicMuseumData(museumOptions)
//     render(data)
//     updateUI('home')
//   });

//   router.add('art/(:any)', async (name) => {
//     const data = await getDynamicMuseumData(museumOptions, id)
//     render(data, id)
//     updateUI('art')
//   });

//   router.add('search', async () => {
//     const searchInput = await getLocalSearchInput()
//     console.log(searchInput)
//     const data = await searchMuseumData(searchInput)
//     render(data, "search")
//     updateUI('search')
//   });
// }
