/* eslint-disable space-unary-ops */
import fetch from 'node-fetch'
import dotenv from 'dotenv'
// eslint-disable-next-line no-unused-vars
import type { Response } from 'node-fetch'
import getLocationTimeData from './timeAPIClient'
import { formatData } from './formatData'

dotenv.config()

export interface geocodeData {
  index: number
  locationAskedFor?: string
  formattedAddress?: string
  location?: coordinates
  error: boolean
  message?: string
}

interface coordinates {
  lat: number
  lng: number
}

export interface geocodeWithTimezone extends geocodeData {
  timeZone?: string
  utcTime?: string
}

export interface weatherData extends geocodeWithTimezone {
  wind?: { speed?: number; direction?: number; gust?: number }
  weather?: { description: string }[]
  main?: {
    temp: number
    feels_like: number
    pressure: number
    humidity: number
  }
}

export const createGeocodeURL = (address: string, key: string): string => {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
}

export const createOpenWeatherURL = ({ lat, lng }, key: string): string =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${key}`

export const newGeocodeData = (data: geocodeData): geocodeData => {
  const defaultProperties = { index: -1, error: false }
  return { ...defaultProperties, ...data }
}

export const extractRequiredDataFromGeocode = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: Promise<any>,
  index = -1
): Promise<geocodeData> => {
  const res = await response
  if (response == null || res.results.length === 0) {
    return newGeocodeData({
      index,
      error: true,
      message: 'bad response from server',
    })
  }

  const result = res.results[0] as [
    { formatted_address; geometry: { location } }
  ]
  return newGeocodeData({
    index,
    formattedAddress: res.results[0].formatted_address,
    location: res.results[0].geometry.location,
    error: false,
  })
}
export const clientErrorHandler = (err: Error, index: number): geocodeData => {
  return newGeocodeData({ index, error: true, message: err.message })
}

export const processResponse = async (
  response: Response,
  errorMessage: string
): Promise<Response> => {
  if (!response) throw new Error(errorMessage)
  const bodyData = await response.json()
  return bodyData
}

export const getLocationData = async (
  location: string,
  index: number
): Promise<geocodeData> => {
  try {
    const geocodeData = await fetch(
      createGeocodeURL(location, process.env.GOOGLE_API_KEY)
    )
    const result = processResponse(
      geocodeData,
      'error receiving data from Geocode'
    )
    const geocode = extractRequiredDataFromGeocode(result, index)
    return geocode
  } catch (err) {
    return clientErrorHandler(err, index)
  }
}

interface openWeatherData {
  dt: number
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

const extractRequiredDataFromOpenWeather = (
  locationData: geocodeWithTimezone,
  weatherData: openWeatherData
): weatherData => {
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
  data: Promise<geocodeWithTimezone>
): Promise<weatherData> => {
  const locationData = await data
  if (locationData.error) {
    return locationData
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
    return extractRequiredDataFromOpenWeather(locationData, result)
  } catch (err) {
    return clientErrorHandler(err, locationData.index)
  }
}

const getLocationForEachCity = (locations: string[]) =>
  locations.map((location, index) => getLocationData(location, index))

const addTimeZoneForEachLocation = (
  locationsData: Promise<geocodeData>[]
): Promise<geocodeWithTimezone>[] =>
  locationsData.map(locationData => getLocationTimeData(locationData))

const addWeatherForEachLocation = (
  locationsWithTimeZoneData: Promise<geocodeWithTimezone>[]
) =>
  locationsWithTimeZoneData.map(async locationWTimeZone =>
    getWeatherData(locationWTimeZone)
  )

const formatDataForEachLocation = (
  rawDataObjects: Promise<weatherData>[]
): Promise<string>[] => {
  const readyData: Promise<
    string
  >[] = rawDataObjects.map((rawDataObject: Promise<weatherData>) =>
    formatData(rawDataObject)
  )
  return readyData
}

const getInfoForLocations = (locations: string[]): Promise<string>[] => {
  const locationsData = getLocationForEachCity(locations)
  const locationsWithTimeZone = addTimeZoneForEachLocation(locationsData)
  const completeData = addWeatherForEachLocation(locationsWithTimeZone)
  return formatDataForEachLocation(completeData)
}
//const weather = getInfoForLocations(['Toronto', 'New York', 'L9R1J5'])
//weather.forEach(async w => console.log(await w))
