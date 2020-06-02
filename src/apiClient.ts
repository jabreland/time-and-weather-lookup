import fetch, {Body} from 'node-fetch'
import dotenv from 'dotenv'

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

export interface weatherData extends geocodeData{
    timeUTC : number
    timeZoneOffSet : number
    wind?: {speed?: number, direction?: number, gust?: number}
    weather?:{id: number, description: string} []
    main?: {temp: number, feels_like: number, pressure: number, humidity: number}
}

export const createGeocodeURL = (address: string, key: string): string => {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
}

export const createOpenWeatherURL = ({lat , lng}:coordinates, key: string) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${key}`
 //                   api.openweathermap.org/data/2.5/weather?lat=38.908133&lon=-77.047119&units=metric&appid=c139cb7da474cb64bd0335580ac289d0
}

export const newGeocodeData = (data :geocodeData)=>{
    const defaultProperties = {index : -1, error: false}
    return {...defaultProperties, ...data}
}

export const extractRequiredDataFromGeocode = (response: any, index = -1): geocodeData => {
   if(response == null || response.results.length === 0) {
       return newGeocodeData({index, error: true, message:'bad response from server'})
   }
    const results = response.results[0]
    return newGeocodeData({
        index,
        formattedAddress: results.formatted_address,
        location: results.geometry.location,
        error: false,
    })
}
export const clientErrorHandler  = (err, index) => {
    let message = err.message
    if(err.code != null)
        message = `error code: ${err.code} ${message}`
    return newGeocodeData({index, error: true, message})
}

export const processResponse = async (response, errorMessage) => {
    if(!response)
        throw new Error(errorMessage)
    return await response.json()
}

export const getLocationData = async (location :string, index : number) => {
    try {
        const geocodeData = await fetch(createGeocodeURL(location, process.env.GOOGLE_API_KEY))
        const result = await processResponse(geocodeData, 'error receiving data from Geocode')
        return extractRequiredDataFromGeocode(result, index)
    } catch (err) {
        console.error(err)
        return clientErrorHandler(err, index)
    }
}

const extractRequiredDataFromOpenWeather = (locationData, weatherData) : weatherData => {
    if (locationData == null || weatherData == null)
        new Error('Unable to process weather data. No data')

    const {dt, timezone, wind, weather, main} = weatherData
    return ({
        ...locationData,
        timeUTC: dt,
        timeZoneOffSet: timezone,
        wind,
        weather,
        main,
    })
}

export const getWeatherData = async (data) => {
    const locationData = await data
    if (locationData.error) {
        return locationData
    }
    try{
        const openWeatherData = await fetch(createOpenWeatherURL(
            locationData.location,
            process.env.OPENWEATHERMAP_API_Key
        ))
        if(!openWeatherData.ok)
            throw new Error(`OpenWeather request failed`)
        const result = await openWeatherData.json()
        return extractRequiredDataFromOpenWeather(locationData, result)
    } catch (error) {
        return clientErrorHandler(error, locationData.index)
    }
}

const getCurrentWeatherForLocations = (locations: string[]) => {
    const locationData = locations.map(async (location, index)=> await getLocationData(location, index))
    const rawWeatherData = locationData.map((location) => getWeatherData(location))
    rawWeatherData.forEach(async (weatherData) => {console.log(await weatherData)})
}
const weather = getCurrentWeatherForLocations(['Toronto', 'New York', 'L9R1J5'])

