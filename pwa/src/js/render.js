import { $, $$, updateUI } from './ui.js'

import { getLocalSearchInput } from './api.js'

export function render(data, id, page) {
  console.log(data)

  switch (page) {
    case "home":
      homePage(data.artObjects)
      break;
    case "art":
      collection(data.artObjects)
      break;
    case "art-detail":
      item(data.artObject, id)
      break;
    case "search":
      collectionSearch(data.artObjects)
      break;
    default:
      collection(data.artObjects)
      break;
  }
}

function homePage(data) {
  const section = $('section[data-route=home]')
  console.log(data)
  data.forEach((item) => {
    const { webImage, objectNumber, headerImage } = item

    const id = objectNumber;

    const article = document.createElement('div');
    article.classList.add('art-container');

    const html = /*html*/`
      <article class='museum-item' id='${id}'">
        <img class='museum-item-image' src="${webImage.url}" alt="" />
        <div class='item-content'>
        <a href="#art/${id}">
          <h4>${item.title}</h4>
        </a>
        </div>
      </article>
    `;
    section.insertAdjacentHTML('beforeend', html)
  })
}


function collection(data) {
  const section = $('section[data-route=art]')
  console.log(data)
  data.forEach((item) => {
    const { webImage, objectNumber, headerImage } = item

    const id = objectNumber;

    const article = document.createElement('div');
    article.classList.add('art-container');

    const html = /*html*/`
        <article class='museum-item' id='${id}'>
            <img class='museum-item-image' src="${webImage.url}" alt="" />
            <div class='item-content'>
              <a href="#art/${id}">
                <h4>${item.title}</h4>
              </a>
            </div>
          </article>
    `;
    section.insertAdjacentHTML('beforeend', html)
  })
}

async function item(data, id) {
  const { title, webImage } = data;

  const section = $('section[data-route=art]')
  const currentItem = section.querySelector(`#${id}`);
  const allItems = section.querySelectorAll('.museum-item');
  const moreContent = $('.extra-content');
  
  const html = /*html*/`
    <article>
      <h2>${title}</h2>
      <img src="${webImage.url}">
    </article>
  `;

  const insertHTML = /*html*/`
  <div class='extra-content'>
      <h2>${title}</h2>
      <img src="${webImage.url}">
    </div>
  
  `

  if (!currentItem) {
    const section = $('section[data-route=art-detail]')
    clearElement(section)
    section.insertAdjacentHTML('beforeend', html)
    updateUI('art-detail')
  } else {
    if (moreContent) {
      moreContent.remove()
    }
    allItems.forEach(item => {
      item.classList.remove('active')

      if (item.matches('.extra-content')) {
        console.log(item)
      }
    })
    currentItem.classList.add('active')
    clearElement(allItems)
    currentItem.insertAdjacentHTML('beforeend', insertHTML)
  }
}


const collectionSearch = async (data) => {
  const section = $('section[data-route=search]')
  console.log(data)

  const UserSearch = await getLocalSearchInput()

  console.log(UserSearch)

  const renderQuerry = `
  <h2>${UserSearch}</h2>
  `;
  data.forEach((item) => {
    const { webImage, objectNumber } = item;
    const id = objectNumber;
    const article = document.createElement('div');

    article.classList.add('art-container');

    const html = /*html*/ `
      <article class='museum-item' id='${id}'>
        <img src="${webImage.url}" alt="" />
        <a href="#art/${id}">
        <h4>${item.title}</h4>
        </a>
      </article>
    `;
    section.insertAdjacentHTML('beforeend', html)
  })
  section.insertAdjacentHTML('beforestart', renderQuerry)
}


function clearElement(node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild)
  }
}
