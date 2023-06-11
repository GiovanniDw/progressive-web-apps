import express from "express";
import { HomeController } from '../controllers/HomeController.js';
import { CollectionController, CollectionDetailsController } from '../controllers/CollectionController.js';
import { SearchController } from '../controllers/SearchController.js';

const router = express.Router();

router.get("/", HomeController);
router.get("/search/:q", SearchController);

router.get("/collection", CollectionController);
router.get("/collection/:id", CollectionDetailsController);


export default router;
