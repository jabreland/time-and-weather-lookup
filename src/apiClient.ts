/* eslint-disable space-unary-ops */
// eslint-disable-next-line no-unused-vars
import type { Response } from 'node-fetch'
import fetch from 'node-fetch'
// import dotenv from 'dotenv'

// dotenv.config()

export interface locationData {
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

export interface locationAndTimezone extends locationData {
  timeZone?: string
  utcTime?: string
}

export const createGeocodeURL = (address: string, key: string): string => {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
}

export const newGeocodeData = (data: locationData): locationData => {
  const defaultProperties = { index: -1, error: false }
  return { ...defaultProperties, ...data }
}

export const extractRequiredDataFromGeocode = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: Promise<any>,
  index = -1
): Promise<locationData> => {
  const res = await response
  if (response == null || res.results.length === 0) {
    return newGeocodeData({
      index,
      error: true,
      message: 'bad response from server',
    })
  }

  return newGeocodeData({
    index,
    formattedAddress: res.results[0].formatted_address,
    location: res.results[0].geometry.location,
    error: false,
  })
}
export const clientErrorHandler = (err: Error, index: number): locationData => {
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
): Promise<locationData> => {
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
