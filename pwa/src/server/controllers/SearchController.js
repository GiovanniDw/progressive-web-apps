import { searchAll } from '../../helpers/api.js';

export const SearchController = async (req,res, next) => {
	const query = await req.query.q;
	try {
		
		console.log(req.query)
		const data = await searchAll(query);
		// console.log(data)
		return res.render('search.njk', {
			title: 'Search',
			query: query,
			data: data
		})
	} catch (error) {
		next(err)
	}
}
export default SearchController