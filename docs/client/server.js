import express from "express";
import "vite-express";
import bodyParser from "body-parser";
import "express-handlebars";
import path from "path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import nunjucks from "nunjucks";
import expressNunjucks from "express-nunjucks";
import compression from "compression";
import "serve-favicon";
import fetch from "node-fetch";
const searchAll = async (q) => {
  const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}&imgonly=true`;
  let URL = baseURL;
  try {
    let search = `&q=${q}`;
    URL = baseURL + search;
    console.log(URL);
    const data = await request(URL);
    const formattedResults = await formatMuseumResults(data);
    return formattedResults;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("SearchDone");
  }
};
const getMuseumDataByMaker = async (q) => {
  try {
    const baseURL = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.VITE_API_KEY}`;
    const maker = `&involvedMaker=${q}`;
    const options = "&imgonly=true&ps=5&toppieces=true";
    const URL = baseURL + maker;
    const data = await request(URL);
    const formattedResults = await formatMuseumResults(data);
    return formattedResults;
  } catch (err2) {
    console.log(err2);
  } finally {
    console.log("got By maker");
  }
};
const searchId = async (id) => {
  const baseURL = `https://www.rijksmuseum.nl/api/en/collection/${id}/?key=${process.env.VITE_API_KEY}`;
  try {
    const data = await request(baseURL);
    const formattedResult = await formatMuseumResult(data);
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
  } catch (err2) {
    console.log(err2);
    throw new Error(err2);
  }
};
const formatMuseumResults = (data) => {
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
      principalOrFirstMaker: d.principalOrFirstMaker
    };
  });
};
const formatMuseumResult = (data) => {
  const d = data.artObject;
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
    location: d.location
  };
};
const HomeController = async (req, res, next) => {
  try {
    const rembrand = await getMuseumDataByMaker("Rembrandt+van+Rijn");
    const Johannes = await getMuseumDataByMaker("Johannes+Vermeer");
    return res.render("index.njk", {
      title: "home",
      makers: [
        {
          name: "Rembrand",
          data: rembrand
        },
        {
          name: "Johannes Vermeer",
          data: Johannes
        }
      ]
    });
  } catch (err2) {
    console.log(err2);
    next(err2);
  }
};
const CollectionController = async (req, res, next) => {
  try {
    const data = await searchAll("Rembrand");
    return res.render("collection.njk", {
      title: "Collecton",
      query: "Rembrand",
      data
    });
  } catch (err2) {
    console.log(err2);
    next(err2);
  }
};
const CollectionDetailsController = async (req, res, next) => {
  const id = req.params.id;
  console.log(req.params);
  try {
    const data = await searchId(id);
    return res.render("details.njk", {
      title: "Collecton",
      data
    });
  } catch (err2) {
    console.log(err2);
    next(err2);
  }
};
const SearchController = async (req, res, next) => {
  const query = await req.query.q;
  try {
    console.log(req.query);
    const data = await searchAll(query);
    return res.render("search.njk", {
      title: "Search",
      query,
      data
    });
  } catch (error) {
    next(err);
  }
};
const router = express.Router();
router.get("/", HomeController);
router.get("/search/:q", SearchController);
router.get("/collection", CollectionController);
router.get("/collection/:id", CollectionDetailsController);
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3e3;
const CorsOptions = {
  origin: "localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  exposedHeaders: "*",
  credentials: true
  // optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.set("trust proxy", "loopback");
app.use(cors(CorsOptions));
app.use(logger("dev"));
app.use(compression());
app.options("*", cors(CorsOptions));
app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => {
  res.setHeader("Cache-Control", "max-age=365000000, immutable");
  next();
});
app.use(express.static("./public/", {
  redirect: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/", express.static("static"));
app.use("/", express.static("public"));
app.use("/", express.static("assets"));
app.set("view engine", "njk");
app.set("views", path.join(__dirname, "views"));
expressNunjucks(app, {
  templateDirs: path.join(__dirname, "views"),
  loader: nunjucks.FileSystemLoader
});
app.use(router);
app.get("/offline", (req, res, next) => {
  res.render("offline.njk", {
    title: "Oh Oh je bent offline"
  });
});
app.get("*", function(req, res, next) {
  let err2 = new Error(`${req.ip} tried to reach ${req.originalUrl}`);
  err2.statusCode = 404;
  err2.shouldRedirect = true;
  next(err2);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.render("error.njk", {
    title: error,
    error
  });
});
app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`Server is listening on port ${PORT}...`);
});
//# sourceMappingURL=server.js.map
