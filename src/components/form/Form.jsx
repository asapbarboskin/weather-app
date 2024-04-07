import React, { useState } from 'react'
import Weather from '../weather/Weather'
import styles from './Form.module.css'
function Form() {
	const [city, setCity] = useState('')
	const [sent, setSent] = useState(false)
	const [show, setShow] = useState(false)
	function handleInputChange(e) {
		setCity(e.target.value)
		if (city) {
			setSent(false)
		}
	}
	function handleButtonClick() {
		if (city) {
			setShow(true)
			setSent(true)
		} else {
			setShow(false)
			setSent(false)
		}
	}
	const handleFormSubmit = e => {
		e.preventDefault()
	}

	return (
		<>
			<form className={styles['weather-form']} onSubmit={handleFormSubmit}>
				<input
					value={city}
					onChange={handleInputChange}
					placeholder='Enter city'
					className={styles['city-input']}
					type='text'
				/>

				<button
					onClick={handleButtonClick}
					className={styles['input-button']}
					type='submit'
				>
					Get Weather
				</button>
			</form>
			<div className={styles.card}>
				{show ? (
					sent ? (
						<Weather city={city} />
					) : (
						<Weather />
					)
				) : (
					<p className={styles['error-display']}>Please enter the city</p>
				)}
			</div>
		</>
	)
}
export default Form
