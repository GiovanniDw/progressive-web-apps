// const apiKey = import.meta.env.VITE_RIJKSMUSEUM_API;
import { searchInputValue, searchInput, searchForm, getSearchVal, searchObject, returnSearchInputValue, searchButton } from "./search.js";

const apiKey = 'S3GLzVAr'
const URL = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&imgonly=true`;
export const getMuseumData = async () => {
  const urlParams = `${URL}`;

  const data = await request(urlParams);

  return request(urlParams);
}

export const getDynamicMuseumData = async (options, id) => {
  const { lang, color, involvedMaker, search, toppieces } = options;
  if (!id) {
    const urlParams = `${URL}&q=${search}&ps=100&toppieces=${toppieces}`
    console.log(urlParams);
    const data = await request(urlParams)
    return data
  } else {
    const urlParams = `https://www.rijksmuseum.nl/api/en/collection/${id}?key=${apiKey}`
    console.log(urlParams)
    const data = await request(urlParams)
    return data
  }
};

let input = localStorage.getItem('input');
let localStorageURL = localStorage.getItem('urlParams');





function setLocalSearchInput(val) {
  console.log(val)
  localStorage.setItem('input', val)
}

function setLocalParam(val) {
  console.log(val)
  localStorage.setItem('urlParams', val)
}

export async function getLocalSearchInput() {
  const input = await localStorage.getItem('input')
  console.log(input)
  return input
}


export const searchMuseumData = async (newInput) => {
  // let localStorageURL = await localStorage.getItem('urlParams')
  let input = await getLocalSearchInput();
  
  const search = localStorageURL
  console.log(input)
  console.log(search);
  
  // if (!newInput) {
  //   console.log('no search')
  //   console.log(localStorageURL)
  // } else {
  //   console.log('search')
  //   console.log(localStorageURL)
  // }

  const urlParams = `${URL}&q=${newInput}&ps=30`

  const data = await request(urlParams)
  return data
}


const data = (data) => {
  console.log(data)
  return data
};

export function fetchData(url) {
  const data = fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

const request = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data
  } catch (err) {
      console.log(err);
      throw new Error(err)
      
    }
  };




searchForm.addEventListener('submit', (e) => {
  // e.preventDefault();
  const searchVal = searchInput.value


  console.log(searchVal)

  // searchInput.value
  // searchObject.value = searchVal;



  localStorage.setItem('input', input)
  // await data(searchVal)

  setLocalSearchInput(searchVal);

  const urlParams = `${URL}&q=${searchVal}`

  setLocalParam(urlParams);


  localStorage.setItem('urlParams', urlParams)

  // const data = request(urlParams)
  // e.preventDefault();
});


