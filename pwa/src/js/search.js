import { searchMuseumData } from "./api.js";
import { $, $$ } from './ui.js'
// const input = document.forms["searchForm"]["search"].value;
export const searchButton = $('#search-button')
export const searchInput = $('#search-input')
export const searchForm = $('#search-form')

export const searchObject = {
  value: ''
}


export const returnSearchInputValue = async () => {
return searchInput.value
}


export const handleSearch = async () => {
  // const query = input;

  const searchQuerry = searchInputValue()

  console.log(searchQuerry);

  const data = await searchMuseumData(searchQuerry)
  console.log(data);

  return data
}




const getSearchResults = async (options) => {
  const { lang, apiKey, color, involvedMaker, search } = options;



  const data = searchMuseumData(searchInput);
  console.log(data)

  return data;

}


// export const searchInputValue = () => {
//   searchForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     // let querry = ''
//     // querry = e.target.value;
//     searchInput.value
//     console.log(searchInput.value)

//     return searchInput.value
//   })
// }


export const getSearchVal = (value) => value;

export const searchInputValue = () => {
  let searchVal = ''
  console.log(searchVal)
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // let querry = ''
    querry = e.target.value;
    searchVal = searchInput.value
    getSearchVal(searchVal);

    // searchObject.value = searchVal;

    console.log(searchObject)

    return true
  });
  console.log(searchObject);
  return searchObject
}