import React, { useEffect, useState } from 'react'
import styles from './Weather.module.css'

export default function Weather({ city }) {
	const [weatherData, setWeatherData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		async function fetchWeatherData(city) {
			const apiKey = 'f0264c24df8547cd7ebc707e1672aee6'
			const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
			try {
				const response = await fetch(apiUrl)
				if (!response.ok) {
					throw new Error('Could not fetch weather data')
				}
				const data = await response.json()
				setWeatherData(data)
			} catch (error) {
				setError(error.message)
			}
		}

		fetchWeatherData(city)
	}, [city])

	if (error) {
		return <div>Error: {error}</div>
	}

	if (!weatherData) {
		return <div>Loading...</div>
	}

	const {
		name: cityName,
		main: { temp, humidity },
		weather: [{ description, id }],
	} = weatherData

	return (
		<>
			<h1 className={styles.cityDisplay}>{cityName}</h1>
			<p className={styles['temp-display']}>{parseInt(temp - 273) + '°C'}</p>
			<p className={styles['humidity-display']}>Humidity: {humidity + '%'}</p>
			<p className={styles['desc-display']}>
				{description[0].toUpperCase() + description.slice(1)}
			</p>
		</>
	)
}
