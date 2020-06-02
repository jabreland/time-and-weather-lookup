import {weatherData} from './apiClient'


export const convertToUnixTime = (time: number): number => time * 1000

export const formatTime = (timeUTC: number, timeZoneOffset: number): string => {
    const time = timeUTC + timeZoneOffset
    const unixTime = convertToUnixTime(time)
    return new Date(unixTime).toLocaleTimeString()
}


export const formatErrorData = (data: weatherData): string => {
    const {location = 'missing', message = `Unknown reason`} = data
    return (
        `Location: ${location} Unable to locate data for this location due to ${message}`
    )
}

export const formatWeatherData = (data: weatherData): string => {
    const time = formatTime(data.timeUTC, data.timeZoneOffSet)
    const {
        location,
        formattedAddress,
        weather,
        main: {
            temp,
            feels_like, pressure, humidity
        }, wind: {
            speed
        }
    } = data

    return `The local time for ${formattedAddress} is ${time}\nat latitude ${location.lat} and longitude ${location.lng}:\nCurrent Conditions: ${weather[0].description} with a wind speed of ${speed}km/h\nThe temperature is ${temp}C, but feels like ${feels_like}C.\nThe atmospheric pressure is: ${pressure}kpa, and the humidity is ${humidity}percent\n`

}

export const formatData = (data: weatherData): string => {
    if (data.error === true)
        return formatErrorData(data)
    return 'Hello'//formatWeatherData(data)
}
