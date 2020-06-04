import fetch, { Headers } from 'node-fetch'
import dotenv from 'dotenv'
import {
  clientErrorHandler,
  locationData,
  locationAndTimezone,
} from './apiClient'

dotenv.config()
const clientKey = process.env.AZURE_CLIENT_ID
const subscriptionKey = process.env.AZURE_KEY

interface timeZoneResponse {
  ReferenceUtcTimestamp: string
  TimeZones: { Id: string }[]
}

export const createAzureUrl = (
  { lat, lng },
  subscriptionKey: string
): string => {
  return `https://atlas.microsoft.com/timezone/byCoordinates/json?api-version=1.0&query=${lat},${lng}&subscription-key=${subscriptionKey}`
}

export const azureHeaders = (key: string) => {
  const meta = {
    'x-ms-client-id': key,
  }
  return new Headers(meta)
}

export const extractTimeZoneFromResponse = (
  timeData: timeZoneResponse,
  locationData: locationData
): locationAndTimezone => {
  if (timeData == null) throw new Error('Unable to process time data. No data')

  const timeZone = timeData.TimeZones[0].Id
  const utcTime = timeData.ReferenceUtcTimestamp
  return {
    ...locationData,
    timeZone,
    utcTime,
  }
}

const getTimeData = async (data: locationData): Promise<locationAndTimezone> => {
  const locationData = await data
  if (locationData.error) {
    return locationData
  }
  try {
    const url = createAzureUrl(locationData.location, subscriptionKey)
    const timeData = await fetch(url, { headers: azureHeaders(clientKey) })
    if (!timeData.ok) throw new Error('Azure Timezone API request failed')
    return extractTimeZoneFromResponse(await timeData.json(), locationData)
  } catch (err) {
    return clientErrorHandler(err, locationData.index)
  }
}

export default getTimeData
