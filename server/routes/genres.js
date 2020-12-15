const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.API_KEY

router.get('/', async (req, res) => {
	const { language } = req.query
	const response = await fetch(
		`${BASE_URL}/genre/movie/list?${API_KEY}&language=${language || 'en-US'}`
	)
	const genres = await response.json()
	if (genres.success === false)
		return res.status(404).send(genres.status_message)

	res.send(genres)
})

router.get('/:genreId', async (req, res) => {
	const { language } = req.query
	const { genreId } = req.params
	if (!genreId)
		return res
			.status(400)
			.send('bad request, please contact support with the error.')

	const response = await fetch(
		`${BASE_URL}/list/${genreId}?${API_KEY}&language=${language || 'en-US'}`
	)
	const movies = await response.json()
	if (movies.success === false)
		return res.status(404).send(movies.status_message)

	res.send(movies)
})

module.exports = router
