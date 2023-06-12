import { searchAll, searchId } from "../helpers/api.js";

export const CollectionController = async (req,res, next) => {
	try {
		const data = await searchAll('Rembrand');
		return res.render('collection.njk', {
			title: 'Collecton',
			query: 'Rembrand',
			data: data
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}

export const CollectionDetailsController = async (req,res, next) => {
  const id = req.params.id;
	console.log(req.params)
	try {
		const data = await searchId(id);
		return res.render('details.njk', {
			title: 'Collecton',
			data: data
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}


export default CollectionController
