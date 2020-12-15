import React, { useEffect, useState } from 'react'
import './styles/Header.css'
import { Login } from './components/Login'

export const Header = () => {
	return (
		<div className='header'>
			<h1>Un jour, Un film</h1>
			<Login />
		</div>
	)
}
