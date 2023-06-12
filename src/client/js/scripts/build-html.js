import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import Handlebars from 'handlebars';
import nunjucks from 'nunjucks';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { formatMuseumResults, formatMuseumResult } from '../helpers/api.js';
const fsPromises = fs.promises;
dotenv.config()



nunjucks.configure('./views');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

nunjucks.configure('views', {
  autoescape: true,
});

generateHomepage()


var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));

export async function generateHomepage() {
  try {
    const rembrand = await getMuseumDataByMaker('Rembrandt+van+Rijn');
	const Johannes = await getMuseumDataByMaker('Johannes+Vermeer');
  const data = {
    title: 'home',
    makers: [{
      name: 'Rembrand',
      data: rembrand
    },{
      name: 'Johannes Vermeer',
      data: Johannes
    }
  ]
  };
  console.log(data)
  const html = renderTemplate('./src/viewsEJS/index.ejs', data);
  writeFile('./docs/', 'index.html', html);
  } catch (error) {
    console.log(err)
  }
}



function renderTemplate(templatePath, data) {
  const template = fs.readFileSync(templatePath, 'utf8').toString();
  return ejs.render(template, data, { views: [path.join(__dirname, '../', 'viewsEJS')], async: true })
}

function writeFile(fileDirectory, filename, fileContents) {
  return fsPromises.mkdir(fileDirectory, { recursive: true }).then(() => {
    return fsPromises.writeFile(path.join(fileDirectory, filename), fileContents)
  })
}




// function renderTemplate(templatePath, data) {
//   const template = fs.readFileSync(templatePath, 'utf8').toString();
//   console.log(template)
//   const compiled = nunjucks.render(template, data)
//   console.log(compiled)
//   return compiled
//   // return ejs.render(template, data, { views: [path.join(__dirname, '../', 'views')] })

// }

// function writeFile(fileDirectory, filename, fileContents) {
//   return fsPromises.mkdir(fileDirectory, { recursive: true }).then(() => {
//     return fsPromises.writeFile(path.join(fileDirectory, filename), fileContents)
//   })
// }



async function searchAll(q) {
  try {
    const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true&ps=50`;
    const search = `&q=${q}`;
    const URL = baseURL + search;
    const data = await fetch(URL);
    const formattedResults = await formatMuseumResults(data);
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("SearchDone");
  }
}

async function getMuseumDataByMaker(q) {
  try {
    const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}`;
    const maker = `&involvedMaker=${q}`;
    const options = '&imgonly=true&ps=5&toppieces=true';
    const URL = baseURL + maker;
    const response = await fetch(URL);
    const data = response.json();
    // const formattedResults = await formatMuseumResults(data);
    return data;
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Done");
  }
}


async function searchId(id) {
  const baseURL = `https://www.rijksmuseum.nl/api/en/collection/${id}/?key=${process.env.VITE_API_KEY}`;

  // const URL = baseURL + search;
  console.log(import.meta.env);
  try {
    const data = await fetch(baseURL);
    const formattedResult = await formatMuseumResult(data.artObject);
    // console.log(formattedResult);
    return formattedResult;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Got id ");
  }
}
