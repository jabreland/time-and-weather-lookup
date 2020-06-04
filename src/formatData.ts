/* eslint-disable camelcase */
import { completeInfoData } from './weatherAPIClient'

export const formatTime = (timeZone: string, utcTime: string): string => {
  return new Date(utcTime).toLocaleTimeString('en-GB', { timeZone })
}

export const formatErrorData = (data: completeInfoData): string => {
  const { location = 'missing', message = `Unknown reason` } = data
  return `Location: ${location} Unable to locate data for this location due to ${message}`
}

export const formatWeatherData = (
  data: completeInfoData,
  timeData?: Date
): string => {
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

export const formatData = (rawData: completeInfoData): string => {
  if (rawData.error === true) return formatErrorData(rawData)
  return formatWeatherData(rawData)
}
