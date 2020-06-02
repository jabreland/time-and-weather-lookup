import {it, describe} from 'mocha'
import {expect} from 'chai'
import * as formatData from '../src/formatData'
import {weatherData} from '../src/apiClient'

const newYorkWeather : weatherData = {
    error: false, index: 0,
    formattedAddress: 'New York, NY, USA',
    location: { lat: 40.7127753, lng: -74.0059728 },
    timeUTC: 1591092831,
    timeZoneOffSet: -14400,
    wind: { speed: 1.5 },
    weather: [ { id: 800, description: 'clear sky' } ],
    main: {
        temp: 14.54,
        feels_like: 12.49,
        pressure: 1019,
        humidity: 55
    }
}

const newYorkWeatherString =
    `The local time for New York, NY, USA is 10:13:51 AM\nat latitude 40.7127753 and longitude -74.0059728:\nCurrent Conditions: clear sky with a wind speed of 1.5km/h\nThe temperature is 14.54C, but feels like 12.49C.\nThe atmospheric pressure is: 1019kpa, and the humidity is 55percent\n`

describe('formatData/formatTime', function () {
    it('It should calculate the correct local time and return it in a string format', function () {
        const {timeUTC, timeZoneOffSet} = newYorkWeather
        const result = formatData.formatTime(timeUTC, timeZoneOffSet)
        expect (result).to.equal('10:13:51 AM')
    })
})

describe('formatData/formatWeatherData', function () {
    it('It should provided a formatted data and time', function () {
        const results = formatData.formatData(newYorkWeather)
        expect(results).to.equal( newYorkWeatherString)
    })
})

describe('formatData/convertToUnixTime', function () {
    it('should multiply the provided time by 1000 to get proper unix time', function () {
        const result = formatData.convertToUnixTime(2)
        expect(result).to.equal(2000)
    });
})

describe('formatData/formatErrorData', function () {
    it('It should provided a formatted data and time', function () {
        const results = formatData.formatErrorData({index: 10, error: true, message: 'the programmer is not sure what he id doing'} as weatherData)
        expect(results).to.equal( newYorkWeatherString)
    })
})
