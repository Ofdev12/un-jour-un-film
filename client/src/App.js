import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { Popular } from './Popular'
import './styles/App.css'

const App = () => {
	return (
		<div className='App'>
			<Header />
			<Popular />
			{/* <iframe
				src='https://www.youtube.com/embed/QkZxoko_HC0?autoplay=1'
				width='560'
				height='315'
				frameborder='0'
				allow='fullscreen'
			></iframe> */}
			{/* {movies?.results.map((item) => {
				return <div>{item.overview}</div>
			})} */}
		</div>
	)
}

export default App
