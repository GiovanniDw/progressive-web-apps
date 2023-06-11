import express from 'express';
import ViteExpress from 'vite-express';
import bodyParser from 'body-parser';
import * as exphbs from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { HomeController } from './server/controllers/HomeController.js';
import { CollectionController, CollectionDetailsController } from './server/controllers/CollectionController.js';
import { SearchController } from './server/controllers/SearchController.js';
import dotenv  from "dotenv";
import logger from 'morgan';
import cors from 'cors';
import nunjucks from 'nunjucks';
import expressNunjucks from 'express-nunjucks';
import compression from 'compression';

// const express = require("express");
// const ViteExpress = require("vite-express");

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const __joindirname = path.join(__filename);


const app = express();

const PORT = process.env.PORT || 3000;
const router = express.Router();



app.use(logger('dev'));
app.use(compression())

app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=365000000, immutable');
  next();
});


// app.use(express.static('./public/', {
//   redirect:true
// }))





// const hbs = exphbs.create({
//   defaultLayout: 'main',
//   partialsDir: __dirname + '/views/partials/'
// })


// app.engine('handlebars', 'njk')



app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use("/", express.static("public"));
app.use('/', express.static('src/static'));
app.use('/', express.static('src/public'));

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));


const njk = expressNunjucks(app, {
  templateDirs: path.join(__dirname, 'views'),
  loader: nunjucks.FileSystemLoader,
});

// app.get("/sw.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public/", "sw.js"));
// });

app.get("/", HomeController);
app.get("/search/:q", SearchController);

app.get("/collection", CollectionController);
app.get("/collection/:id", CollectionDetailsController);


app.get('*', function (req, res, next) {
	let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
	err.statusCode = 404;
	err.shouldRedirect = true; //New property on err so that our middleware will redirect
	next(err);
});

app.use((error, req, res, next) => {
	console.error(error);
	res.render('error.njk', {
		title: error,
		error
	});
});


ViteExpress.listen(app, PORT, () => {
  console.log(__dirname)
  console.log("Server is listening on port 3000...")
});


// app.listen(PORT, () => {
//   console.log(__dirname);
//   console.log(`Server is listening on port ${PORT}...`);
// });
