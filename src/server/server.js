import express from 'express';
import ViteExpress from 'vite-express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'node:url';
import dotenv  from "dotenv";
import logger from 'morgan';
import nunjucks from 'nunjucks';
import expressNunjucks from 'express-nunjucks';
import compression from 'compression';
import favicon from 'serve-favicon';
import fetch from 'node-fetch';

import router from './router/index.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;



if (process.env.NODE_ENV === 'development') {
app.use(logger('dev'));
}


app.use(compression())

if (process.env.NODE_ENV === 'production') {
app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=365000000, immutable');
  next();
});
app.use(favicon(path.join(__dirname, 'favicon.ico')));
}




// const hbs = exphbs.create({
//   defaultLayout: 'main',
//   partialsDir: __dirname + '/views/partials/'
// })


// app.engine('handlebars', 'njk')



// app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));



if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static('static'));
	app.use('/', express.static('public'));
	app.use('/assets', express.static('assets'));  

	app.get("/sw.js", (req, res) => {
		res.sendFile(path.resolve(__dirname, "public/", "sw.js"));
	});

}

if (process.env.NODE_ENV === 'development') {
	// app.use(express.static('./public/', {
	// 	redirect:true
	// }))
	app.use("/", express.static(path.join(__dirname, "static")));
	app.use("/assets", express.static(path.join(__dirname, "../assets")));
	app.use("/", express.static(path.join(__dirname, "../../public")));

	// app.get("/sw.js", (req, res) => {
	// 	res.sendFile(path.resolve(__dirname, "public/", "sw.js"));
	// });
}

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));


const njk = expressNunjucks(app, {
  templateDirs: path.join(__dirname, 'views'),
  loader: nunjucks.FileSystemLoader,
});

// app.get("/sw.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public/", "sw.js"));
// });

app.use(router);



// app.get("/", HomeController);
// app.get("/search/:q", SearchController);

// app.get("/collection", CollectionController);
// app.get("/collection/:id", CollectionDetailsController);

app.get('/offline', (req, res, next) => {
  res.render('offline.njk', {
		title: 'Oh Oh je bent offline'
	});
  next()
})

app.get('*', function (req, res, next) {
	let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
	err.statusCode = 404;
	err.shouldRedirect = true; //New property on err so that our middleware will redirect
	next(err);
});

app.use((err, req, res, next) => {
	console.error(err);
	res.render('error.njk', {
		title: error,
		error: err
	});
});


ViteExpress.listen(app, PORT, () => {
  console.log(__dirname)
  console.log(`Server is listening on port ${PORT}...`)
});



// app.listen(PORT, () => {
//   console.log(__dirname);
//   console.log(`Server is listening on port ${PORT}...`);
// });
