import React from 'react'
import '../styles/Card.css'
export const Card = ({ data, setMovieSelected }) => {
	// console.log(data)
	return (
		<div className='card' onClick={() => setMovieSelected(data)}>
			<img src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}></img>
			<div className='title-movie'>{data.title}</div>
		</div>
	)
}
