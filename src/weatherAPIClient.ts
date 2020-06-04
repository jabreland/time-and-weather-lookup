import fetch from 'node-fetch'
import { clientErrorHandler, locationAndTimezone } from './apiClient'

export interface completeInfoData extends locationAndTimezone {
  wind?: { speed?: number; direction?: number; gust?: number; deg?: number }
  weather?: {
    description: string
    icon?: string
    id?: number
    main?: string
  }[]
  main?: {
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    temp_max?: number
    temp_min?: number
  }
}

interface openWeatherData {
  wind: { speed: number }
  weather: { description: string }[]
  main: {
    temp: number
    // eslint-disable-next-line camelcase
    feels_like: number
    pressure: number
    humidity: number
    feelsLike?
  }
}
export const createOpenWeatherURL = ({ lat, lng }, key: string): string =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${key}`

export const parseDataFromOpenWeather = (
  locationData: locationAndTimezone,
  weatherData: openWeatherData
): completeInfoData => {
  if (locationData == null || weatherData == null) {
    throw new Error('Unable to process weather data. No data')
  }
  const { wind, weather, main } = weatherData

  return {
    ...locationData,
    wind,
    weather,
    main,
  }
}

export const getWeatherData = async (
  data: locationAndTimezone
): Promise<completeInfoData> => {
  const locationData = data
  if (locationData.error) {
    return { ...locationData, message: 'At weather' }
  }
  try {
    const openWeatherData = await fetch(
      createOpenWeatherURL(
        locationData.location,
        process.env.OPENWEATHERMAP_API_Key
      )
    )
    if (!openWeatherData.ok) throw new Error('OpenWeather request failed')
    const result = await openWeatherData.json()
    return parseDataFromOpenWeather(locationData, result)
  } catch (err) {
    return clientErrorHandler(err, locationData.index)
  }
}
