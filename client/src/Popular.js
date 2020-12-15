import React, { useEffect, useState } from 'react'
import { Card } from './components/Card'
import './styles/Popular.css'
export const Popular = () => {
	const [movies, setMovies] = useState()
	const [movieSelected, setMovieSelected] = useState()
	useEffect(() => {
		;(async () => {
			const a = await fetch(
				'http://localhost:3001/movie/popular?language=fr-FR'
			)
			setMovies(await a.json())
		})()
	}, [])
	console.log(movieSelected)

	return (
		<div>
			<div className='cards-container'>
				{movies &&
					movies.results.map((movie) => {
						return (
							<Card
								data={movie}
								setMovieSelected={setMovieSelected}
								key={movie.id}
							/>
						)
					})}
			</div>
			{movieSelected && movieSelected.backdrop_path && (
				<div className='movie-details'>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movieSelected.backdrop_path}`}
					></img>
					<button onClick={() => setMovieSelected()}>Close</button>
				</div>
			)}
		</div>
	)
}
