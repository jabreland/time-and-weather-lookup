/* eslint-disable camelcase */
import type { weatherData } from './apiClient'

export const formatTime = (timeZone: string, utcTime: string): string => {
  return new Date(utcTime).toLocaleTimeString('en-GB', { timeZone })
}

export const formatErrorData = (data: weatherData): string => {
  const { location = 'missing', message = `Unknown reason` } = data
  return `Location: ${location} Unable to locate data for this location due to ${message}`
}

export const formatWeatherData = async (
  data: weatherData,
  timeData?: Date
): Promise<string> => {
  const time = formatTime(data.timeZone, data.utcTime)
  const {
    location,
    formattedAddress,
    weather,
    main: { temp, feels_like, pressure, humidity },
    wind: { speed },
  } = data

  return `The local time for ${formattedAddress} is ${time}\nat latitude ${location.lat} and longitude ${location.lng}:\nCurrent Conditions: ${weather[0].description} with a wind speed of ${speed}km/h\nThe temperature is ${temp}C, but feels like ${feels_like}C.\nThe atmospheric pressure is: ${pressure}kpa, and the humidity is ${humidity}%\n`
}

export const formatData = async (
  rawData: Promise<weatherData>
): Promise<string> => {
  const data = await rawData
  if (data.error === true) return formatErrorData(data)
  return formatWeatherData(data)
}
