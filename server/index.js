const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
// Routes \\
const genres = require('./routes/genres')
const movies = require('./routes/movies')

app.use('/genres', genres)
app.use('/movie', movies)

app.get('/', async (req, res) => {
	res.send('main page')
})

app.listen(port, () => {
	console.info(`listenning on port ${port}`)
})
