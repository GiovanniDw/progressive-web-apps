// import fetch from 'node-fetch';

// const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true`;

export const searchAll = async (q) => {
  try {
    const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true`;
    let search = ''
    if (q) {
      const search = `&q=${q}`;
    }
    const URL = baseURL + search;
    console.log(URL)
    const data = await request(URL);
    const formattedResults = await formatMuseumResults(data);
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("SearchDone");
  }
};

export const getMuseumDataByMaker = async (q) => {
  try {
    const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}`;
    const maker = `&involvedMaker=${q}`;
    const options = '&imgonly=true&ps=5&toppieces=true'
    const URL = baseURL + maker;
    // console.log(URL)
    const data = await request(URL);
    const formattedResults = await formatMuseumResults(data);
    return formattedResults;
  } catch (err) {
    console.log(err);
  } finally {
    console.log("got By maker");
  }
};


export const searchId = async (id) => {
  const baseURL = `https://www.rijksmuseum.nl/api/en/collection/${id}/?key=${process.env.VITE_API_KEY}`;

  // const URL = baseURL + search;
  console.log(import.meta.env);
  try {
    const data = await request(baseURL);
    const formattedResult = await formatMuseumResult(data);
    // console.log(formattedResult);
    return formattedResult;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Got id ");
  }
};

const request = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const formatMuseumResults = (data) => {
  const array = data.artObjects;
  return array.map((d) => {
    return {
      id: d.objectNumber,
      title: d.title,
      name: d.name,
      headerImage: d.headerImage,
      productionPlaces: d.productionPlaces,
      links: d.links,
      longTitle: d.longTitle,
      webImage: d.webImage,
      principalOrFirstMaker: d.principalOrFirstMaker,
    };
  });
};

export const formatMuseumResult = (data) => {
  const d = data.artObject
  return {
    id: d.objectNumber,
    title: d.title,
    titles: d.titles,
    materials: d.materials,
    description: d.description,
    productionPlaces: d.productionPlaces,
    longTitle: d.longTitle,
    webImage: d.webImage,
    principalOrFirstMaker: d.principalOrFirstMaker,
    physicalMedium: d.physicalMedium,
    subTitle: d.subTitle,
    plaqueDescription: d.plaqueDescription,
    principalMaker: d.principalMaker,
    location: d.location,
  };
};
