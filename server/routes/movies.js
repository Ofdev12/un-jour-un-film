const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.API_KEY

router.get('/popular', async (req, res) => {
	const { language } = req.query

	const response = await fetch(
		`${BASE_URL}/movie/popular?${API_KEY}&language=${language || 'en-US'}`
	)
	const movieList = await response.json()
	if (movieList.success === false)
		return res.status(404).send(movieList.status_message)

	res.send(movieList)
})

router.get('/:movieId/videos', async (req, res) => {
	const { movieId } = req.params
	const { language } = req.query

	if (!movieId)
		return res
			.status(400)
			.send('bad request, please contact support with the error.')

	const response = await fetch(
		`${BASE_URL}/movie/${movieId}/videos?${API_KEY}&language=${
			language || 'en-US'
		}`
	)
	const video = await response.json()
	if (video.success === false) return res.status(404).send(video.status_message)

	res.send(video)
})

router.get('/:movieId/recommendations', async (req, res) => {
	const { movieId } = req.params
	const { language } = req.query

	if (!movieId)
		return res
			.status(400)
			.send('bad request, please contact support with the error.')

	const response = await fetch(
		`${BASE_URL}/movie/${movieId}/recommendations?${API_KEY}&language=${
			language || 'en-US'
		}`
	)
	const video = await response.json()
	if (video.success === false) return res.status(404).send(video.status_message)

	res.send(video)
})

router.get('/:movieId', async (req, res) => {
	const { movieId } = req.params
	const { language } = req.query

	if (!movieId)
		return res
			.status(400)
			.send('bad request, please contact support with the error.')

	const response = await fetch(
		`${BASE_URL}/movie/${movieId}?${API_KEY}&language=${language || 'en-US'}`
	)
	const movie = await response.json()
	if (movie.success === false) return res.status(404).send(movie.status_message)

	res.send(movie)
})

module.exports = router
